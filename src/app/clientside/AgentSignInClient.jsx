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

      // Custom prompt template for detailed JSON profile
      const detailedPrompt = `Can you provide me with a detailed JSON profile of ${userData.fullName} having email ${userData.email} and phone ${fullPhoneNumber} that includes all possible fields such as user ID, full name, phone, email, address, age, gender, marital status, household size, children count, education level, occupation, income bracket, home ownership, city tier, transport, diet preference, favorite cuisine, coffee or tea choice, fitness routine, gym membership, shopping preference, grocery store type, fashion style, tech affinity, primary device, favorite social platform, social media usage time, content preference, sports interest, gaming preference, travel frequency, eco-friendliness, sleep chronotype, needs, wants, desires, and 24h/48h/72h intents with category, budget, time window, and confidence. The output should strictly be in JSON format. If some information is not available from public sources, please generate reasonable and relevant placeholder data instead of leaving fields blank, while keeping it realistic and respectful.`

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
          // Synthesis/Creation Prompt
          // Matches the pattern in A2AAgentClient.jsx
          const dataToSync = aggregatedData || userData;
          const creationPrompt = `Can you create a user profile with the details below? ${JSON.stringify(dataToSync)}`;
          console.log("🚀 Calling Supabase Profile Creation Agent with payload:", body);
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
            resultMap[agent].data?.result?.message?.parts?.[0]?.text ||
            resultMap[agent].data?.result?.response?.parts?.[0]?.text || '';
          try {
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[0]);

              // Map camelCase to snake_case for Supabase alignment
              const mappedParsed = {};
              Object.keys(parsed).forEach(key => {
                let targetKey = key;
                if (key === 'fullName') targetKey = 'full_name';
                if (key === 'maritalStatus') targetKey = 'marital_status';
                if (key === 'relationship_status') targetKey = 'marital_status';
                if (key === 'householdSize') targetKey = 'household_size';
                if (key === 'family_size') targetKey = 'household_size';
                if (key === 'childrenCount') targetKey = 'children_count';
                if (key === 'educationLevel') targetKey = 'education_level';
                if (key === 'incomeBracket') targetKey = 'income_bracket';
                if (key === 'salaryRange') targetKey = 'income_bracket';
                if (key === 'homeOwnership') targetKey = 'home_ownership';
                if (key === 'cityTier') targetKey = 'city_tier';
                if (key === 'dietPreference') targetKey = 'diet_preference';
                if (key === 'favoriteCuisine') targetKey = 'favorite_cuisine';
                if (key === 'coffeeOrTeaChoice') targetKey = 'coffee_or_tea_choice';
                if (key === 'fitnessRoutine') targetKey = 'fitness_routine';
                if (key === 'gymMembership') targetKey = 'gym_membership';
                if (key === 'shoppingPreference') targetKey = 'shopping_preference';
                if (key === 'groceryStoreType') targetKey = 'grocery_store_type';
                if (key === 'fashionStyle') targetKey = 'fashion_style';
                if (key === 'techAffinity') targetKey = 'tech_affinity';
                if (key === 'primaryDevice') targetKey = 'primary_device';
                if (key === 'favoriteSocialPlatform') targetKey = 'favorite_social_platform';
                if (key === 'social_media') targetKey = 'favorite_social_platform';
                if (key === 'socialMediaUsageTime') targetKey = 'social_media_usage_time';
                if (key === 'contentPreference') targetKey = 'content_preference';
                if (key === 'sportsInterest') targetKey = 'sports_interest';
                if (key === 'gamingPreference') targetKey = 'gaming_preference';
                if (key === 'travelFrequency') targetKey = 'travel_frequency';
                if (key === 'ecoFriendliness') targetKey = 'eco_friendliness';
                if (key === 'sleepChronotype') targetKey = 'sleep_chronotype';

                mappedParsed[targetKey] = parsed[key];
              });

              // Handle nested intents mapping
              if (parsed.intents) {
                const i = parsed.intents;
                if (i['24h']) {
                  aggregatedData.intent_24h_category = i['24h'].category;
                  aggregatedData.intent_24h_budget = i['24h'].budget;
                  aggregatedData.intent_24h_confidence = i['24h'].confidence;
                }
                if (i['48h']) {
                  aggregatedData.intent_48h_category = i['48h'].category;
                  aggregatedData.intent_48h_budget = i['48h'].budget;
                  aggregatedData.intent_48h_time_window = i['48h'].timeWindow || i['48h'].time_window;
                  aggregatedData.intent_48h_confidence = i['48h'].confidence;
                }
                if (i['72h']) {
                  aggregatedData.intent_72h_category = i['72h'].category;
                  aggregatedData.intent_72h_budget = i['72h'].budget;
                  aggregatedData.intent_72h_confidence = i['72h'].confidence;
                }
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

