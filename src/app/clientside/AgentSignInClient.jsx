'use client'
import React, { useState, useCallback } from 'react'
import { Box, Container, useToast } from '@chakra-ui/react'
import UserDetailsForm from './agent-signin/UserDetailsForm'
import ResultsDisplay from './agent-signin/ResultsDisplay'
import DataSourceComparison from './agent-signin/DataSourceComparison'
import AnalyzingLoader from './agent-signin/AnalyzingLoader'
import ContentWrapper from '../_components/layout/ContentWrapper'

export default function AgentSignInClient() {
  const [currentStep, setCurrentStep] = useState('form') // 'form', 'analyzing', 'results'
  const [userData, setUserData] = useState(null)
  const [agentResults, setAgentResults] = useState({})
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const toast = useToast()

  // Call all agent APIs with user details via Next.js proxy
  const callAgentAPI = useCallback(async (agent, userData, aggregatedData = null) => {
    const sessionId = `session-${Date.now()}`
    const id = `task-${Math.random().toString(36).slice(2)}`

    try {
      const startTime = Date.now()
      let body = {}

      // Build full phone number with country code
      const fullPhoneNumber = `${userData.countryCode} ${userData.phoneNumber}`

      // Standardized Prompt Template for all discovery agents
      const detailedPrompt = `Provide a detailed profile of ${userData.fullName} (Email: ${userData.email}, Phone: ${fullPhoneNumber}) in STRICT JSON format.
Use these EXACT keys:
- full_name, phone, email, age, gender, marital_status
- household_size, children_count, education_level, occupation, income_bracket, home_ownership
- city_tier, primary_transport, diet_preference, favorite_cuisine, coffee_or_tea_choice
- fitness_routine, gym_membership, shopping_preference, grocery_store_type, fashion_style
- tech_affinity, primary_device, favorite_social_platform, social_media_usage_time
- content_preference, sports_interest, gaming_preference, travel_frequency, eco_friendliness, sleep_chronotype
- address: { street, city, state, zip_code, country }
- intent_24h: { category, budget_usd, time_window, confidence }
- intent_48h: { category, budget_usd, time_window, confidence }
- intent_72h: { category, budget_usd, time_window, confidence }
- needs: [list], wants: [list], desires: [list]
- summary: (brief AI bio)

If information is unavailable, provide realistic placeholder data based on the user's name and location. DO NOT leave fields blank.`

      // Build the appropriate payload for profile fetching agents only
      switch (agent) {
        case 'brand':
        case 'hushh':
        case 'public':
        case 'gemini':
        case 'gemini-proxy':
          body = {
            text: detailedPrompt,
            sessionId,
            id,
          }
          break

        case 'supabase-profile-creation-agent':
          // Synthesis/Creation Prompt - Sanitize to only flat fields and primitive arrays
          const rawData = aggregatedData || userData;
          const sanitizedData = {};
          Object.keys(rawData).forEach(key => {
            if (typeof rawData[key] !== 'object' || Array.isArray(rawData[key])) {
              sanitizedData[key] = rawData[key];
            }
          });

          const creationPrompt = `Create a comprehensive user profile with these verified data points:
\`\`\`json
${JSON.stringify(sanitizedData, null, 2)}
\`\`\`

Ensure all intent, lifestyle, and psychographic fields are persisted correctly. Return the user_id in the JSON response.`;

          body = {
            text: creationPrompt,
            sessionId,
            id,
          }
          break

        default:
          throw new Error(`Unknown agent: ${agent}`)
      }

      // Call via Next.js API proxy
      const response = await fetch(`/api/a2a/${agent}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const responseTime = `${Date.now() - startTime}ms`
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        return {
          success: false,
          data: result,
          error: result.error || `Request failed with status ${response.status}`,
          responseTime,
          upstreamUrl: result.upstreamUrl, // Show actual agent URL
        }
      }

      return {
        success: true,
        data: result.data || result,
        responseTime,
        upstreamUrl: result.upstreamUrl, // Show actual agent URL
        upstreamStatus: result.upstreamStatus,
      }
    } catch (error) {
      console.error(`Error calling ${agent} agent:`, error)
      return {
        success: false,
        error: error.message || 'Network error',
        data: null,
        responseTime: 'N/A',
      }
    }
  }, [])

  // Handle form submission and call all agents
  const handleFormSubmit = useCallback(async (formData) => {
    setUserData(formData)
    setCurrentStep('analyzing')
    setAnalysisProgress(0)

    toast({
      title: 'Initiating Discovery',
      description: 'Running Brand, Public, and AI Agents...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })

    try {
      // Phase 1: Discovery Agents
      const discoveryAgents = ['brand', 'hushh', 'public', 'gemini']
      const resultMap = {}

      const totalAgents = discoveryAgents.length + 1 // +1 for hushh-profile
      let completedCount = 0

      // Run Discovery Agents
      for (const agent of discoveryAgents) {
        const result = await callAgentAPI(agent, formData)
        resultMap[agent] = result

        completedCount++
        setAnalysisProgress((completedCount / totalAgents) * 100)

        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 300))
      }

      // Phase 1.5: Aggregate Data
      // Merge all discovered data to pass to the Profile Agent
      let aggregatedData = {
        ...formData,
        full_name: formData.fullName,
        phone: `${formData.countryCode} ${formData.phoneNumber}`,
        email: formData.email
      };

      for (const agent of discoveryAgents) {
        if (resultMap[agent]?.success && resultMap[agent]?.data) {
          const text = resultMap[agent].data?.result?.status?.message?.parts?.[0]?.text ||
            resultMap[agent].data?.result?.artifacts?.[0]?.parts?.[0]?.text ||
            resultMap[agent].data?.result?.message?.parts?.[0]?.text ||
            resultMap[agent].data?.result?.response?.parts?.[0]?.text || '';
          try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);

              // 1. Map top-level aliases and core fields
              const mappedParsed = {};
              Object.keys(parsed).forEach(key => {
                let targetKey = key;
                // Basic normalization for Supabase alignment
                if (key === 'fullName') targetKey = 'full_name';
                if (key === 'maritalStatus' || key === 'relationship_status') targetKey = 'marital_status';
                if (key === 'householdSize' || key === 'family_size') targetKey = 'household_size';
                if (key === 'childrenCount') targetKey = 'children_count';
                if (key === 'educationLevel') targetKey = 'education_level';
                if (key === 'incomeBracket' || key === 'salaryRange') targetKey = 'income_bracket';
                if (key === 'homeOwnership') targetKey = 'home_ownership';
                if (key === 'cityTier') targetKey = 'city_tier';
                if (key === 'dietPreference') targetKey = 'diet_preference';
                if (key === 'favoriteCuisine') targetKey = 'favorite_cuisine';
                if (key === 'coffeeOrTeaChoice' || key === 'coffee_or_tea') targetKey = 'coffee_or_tea_choice';
                if (key === 'fitnessRoutine') targetKey = 'fitness_routine';
                if (key === 'gymMembership' || key === 'gym_member') targetKey = 'gym_membership';
                if (key === 'shoppingPreference') targetKey = 'shopping_preference';
                if (key === 'groceryStoreType' || key === 'preferred_grocery_store_type') targetKey = 'grocery_store_type';
                if (key === 'fashionStyle') targetKey = 'fashion_style';
                if (key === 'techAffinity') targetKey = 'tech_affinity';
                if (key === 'primaryDevice') targetKey = 'primary_device';
                if (key === 'favoriteSocialPlatform') targetKey = 'favorite_social_platform';
                if (key === 'social_media') targetKey = 'favorite_social_platform';
                if (key === 'socialMediaUsageTime' || key === 'daily_social_time_minutes') targetKey = 'social_media_usage_time';
                if (key === 'contentPreference') targetKey = 'content_preference';
                if (key === 'sportsInterest') targetKey = 'sports_interest';
                if (key === 'gamingPreference' || key === 'gamer') targetKey = 'gaming_preference';
                if (key === 'travelFrequency') targetKey = 'travel_frequency';
                if (key === 'ecoFriendliness' || key === 'eco_friendly') targetKey = 'eco_friendliness';
                if (key === 'sleepChronotype') targetKey = 'sleep_chronotype';
                if (key === 'primary_transport' || key === 'transport') targetKey = 'primary_transport';

                mappedParsed[targetKey] = parsed[key];
              });

              // 2. Handle nested address normalization
              if (parsed.address && typeof parsed.address === 'object') {
                const addr = parsed.address;
                aggregatedData.street = addr.street || addr.address_line1 || addr.address || aggregatedData.street;
                aggregatedData.city = addr.city || aggregatedData.city;
                aggregatedData.state = addr.state || aggregatedData.state;
                aggregatedData.zip_code = addr.zip_code || addr.zip || addr.zip_code || aggregatedData.zip_code;
                aggregatedData.country = addr.country || aggregatedData.country;
              }

              // 3. Normalized Intent Extraction
              const extractIntentData = (src) => ({
                category: src.category,
                budget: src.budget_usd || src.budget,
                time_window: src.time_window || src.timeWindow,
                confidence: src.confidence
              });

              // Format A: { intent_24h: { category, budget_usd, ... } }
              if (parsed.intent_24h) {
                const i = extractIntentData(parsed.intent_24h);
                aggregatedData.intent_24h_category = i.category || aggregatedData.intent_24h_category;
                aggregatedData.intent_24h_budget = i.budget || aggregatedData.intent_24h_budget;
                aggregatedData.intent_24h_confidence = i.confidence || aggregatedData.intent_24h_confidence;
                aggregatedData.intent_24h_time_window = i.time_window || aggregatedData.intent_24h_time_window;
              }
              if (parsed.intent_48h) {
                const i = extractIntentData(parsed.intent_48h);
                aggregatedData.intent_48h_category = i.category || aggregatedData.intent_48h_category;
                aggregatedData.intent_48h_budget = i.budget || aggregatedData.intent_48h_budget;
                aggregatedData.intent_48h_confidence = i.confidence || aggregatedData.intent_48h_confidence;
                aggregatedData.intent_48h_time_window = i.time_window || aggregatedData.intent_48h_time_window;
              }
              if (parsed.intent_72h) {
                const i = extractIntentData(parsed.intent_72h);
                aggregatedData.intent_72h_category = i.category || aggregatedData.intent_72h_category;
                aggregatedData.intent_72h_budget = i.budget || aggregatedData.intent_72h_budget;
                aggregatedData.intent_72h_confidence = i.confidence || aggregatedData.intent_72h_confidence;
                aggregatedData.intent_72h_time_window = i.time_window || aggregatedData.intent_72h_time_window;
              }

              // Format B: { intents: [ { time_frame: '24h', ... } ] }
              if (Array.isArray(parsed.intents)) {
                parsed.intents.forEach(int => {
                  const tf = int.time_frame || int.timeFrame || int.time_window;
                  const i = extractIntentData(int);
                  if (tf?.includes('24h')) {
                    aggregatedData.intent_24h_category = i.category || aggregatedData.intent_24h_category;
                    aggregatedData.intent_24h_budget = i.budget || aggregatedData.intent_24h_budget;
                    aggregatedData.intent_24h_confidence = i.confidence || aggregatedData.intent_24h_confidence;
                    aggregatedData.intent_24h_time_window = i.time_window || aggregatedData.intent_24h_time_window;
                  } else if (tf?.includes('48h')) {
                    aggregatedData.intent_48h_category = i.category || aggregatedData.intent_48h_category;
                    aggregatedData.intent_48h_budget = i.budget || aggregatedData.intent_48h_budget;
                    aggregatedData.intent_48h_confidence = i.confidence || aggregatedData.intent_48h_confidence;
                    aggregatedData.intent_48h_time_window = i.time_window || aggregatedData.intent_48h_time_window;
                  } else if (tf?.includes('72h')) {
                    aggregatedData.intent_72h_category = i.category || aggregatedData.intent_72h_category;
                    aggregatedData.intent_72h_budget = i.budget || aggregatedData.intent_72h_budget;
                    aggregatedData.intent_72h_confidence = i.confidence || aggregatedData.intent_72h_confidence;
                    aggregatedData.intent_72h_time_window = i.time_window || aggregatedData.intent_72h_time_window;
                  }
                });
              }

              Object.assign(aggregatedData, mappedParsed);
            }
          } catch (e) {
            console.warn(`Failed to parse data from ${agent} for aggregation`, e);
          }
        }
      }

      // Phase 2: Profile Creation Agent (Supabase Profile)
      // The AGENT inserts the data into Supabase. We just need to give it the data.
      console.log("🛠️ Phase 2: Starting Supabase Profile Creation...");
      toast({
        title: 'Creating Profile',
        description: 'Syncing complete profile to secure database...',
        status: 'loading',
        duration: 3000,
        isClosable: true,
      })

      const profileAgent = 'supabase-profile-creation-agent'
      // Use standard API call with aggregated data. Internally it builds the Creation Prompt.
      const profileResult = await callAgentAPI(profileAgent, formData, aggregatedData)
      console.log("📊 Phase 2 Results:", profileResult);

      resultMap[profileAgent] = profileResult
      setAgentResults({ ...resultMap }) // Force state update with new reference

      completedCount++
      setAnalysisProgress(100)

      // Post-Processing: Extract User ID from Agent Response
      // The User ID is needed for the QR code and Public Profile Link
      if (profileResult.success) {
        const responseText = profileResult.data?.result?.status?.message?.parts?.[0]?.text ||
          profileResult.data?.result?.message?.parts?.[0]?.text ||
          '';
        try {
          // Look for JSON block if embedded in markdown
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          const jsonStr = jsonMatch ? jsonMatch[0] : responseText;
          const parsed = JSON.parse(jsonStr);

          if (parsed.user_id || parsed.userId || parsed.id) {
            const finalUserId = parsed.user_id || parsed.userId || parsed.id;
            console.log("✅ Agent Confirmation - User ID:", finalUserId);
            formData.user_id = finalUserId; // Critical for QR code

            // Update aggregated view with final confirmed data
            Object.assign(aggregatedData, parsed);
            setUserData(aggregatedData);
          } else {
            console.warn("⚠️ Profile Agent returned success but no user_id found in response.");
          }
        } catch (e) {
          console.error("Failed to parse Profile Agent response for user_id", e);
        }
      } else {
        toast({
          title: 'Profile Sync Warning',
          description: 'Could not confirm profile creation with agent. Data may be cached locally only.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
      }
      toast({
        title: 'Analysis Complete',
        description: `Profile synthesized and secured.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      // Move to results view
      setCurrentStep('results')
    } catch (error) {
      console.error('Error during analysis:', error)
      toast({
        title: 'Analysis Failed',
        description: error.message || 'Failed to analyze profile',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setCurrentStep('form')
    }
  }, [callAgentAPI, toast])

  // Handle back to form
  const handleBack = useCallback(() => {
    setCurrentStep('form')
    setUserData(null)
    setAgentResults({})
    setAnalysisProgress(0)
  }, [])

  // Render based on current step
  return (
    <ContentWrapper>
      <Box minH="100vh" bg="black">
        {currentStep === 'form' && (
          <UserDetailsForm onSubmit={handleFormSubmit} />
        )}

        {currentStep === 'analyzing' && (
          <AnalyzingLoader progress={analysisProgress} />
        )}

        {currentStep === 'results' && (
          <>
            <ResultsDisplay
              userData={userData}
              agentResults={agentResults}
              onBack={handleBack}
            />
            <DataSourceComparison agentResults={agentResults} />
          </>
        )}
      </Box>
    </ContentWrapper>
  )
}

