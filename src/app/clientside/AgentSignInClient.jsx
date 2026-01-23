'use client'
import React, { useState, useCallback } from 'react'
import { Box, Container, useToast } from '@chakra-ui/react'
import UserDetailsForm from './agent-signin/UserDetailsForm'
import ResultsDisplay from './agent-signin/ResultsDisplay'
import DataSourceComparison from './agent-signin/DataSourceComparison'
import AnalyzingLoader from './agent-signin/AnalyzingLoader'
import ContentWrapper from '../_components/layout/ContentWrapper'
import { buildHushhId, extractUuid } from '../../lib/utils'

export default function AgentSignInClient() {
  const [currentStep, setCurrentStep] = useState('form') // 'form', 'analyzing', 'results'
  const [userData, setUserData] = useState(null)
  const [agentResults, setAgentResults] = useState({})
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const toast = useToast()

  // Call all agent APIs with user details via Next.js proxy
  const callAgentAPI = useCallback(async (agent, userData, aggregatedData = null, attempt = 0) => {
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
- address_line1, city, state, zip
- intent_24h: { category, budget_usd, time_window, confidence }
- intent_48h: { category, budget_usd, time_window, confidence }
- intent_72h: { category, budget_usd, time_window, confidence }
- needs: [list], wants: [list], desires: [list]
- summary: (brief AI bio)

If information is unavailable, provide realistic placeholder data based on the user's name. DO NOT leave fields blank.`

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

          const normalizedData = { ...sanitizedData };
          normalizedData.full_name = normalizedData.full_name || normalizedData.fullName;
          normalizedData.phone = normalizedData.phone || normalizedData.phoneNumber;
          normalizedData.hushh_id = normalizedData.hushh_id || normalizedData.hushhId;
          normalizedData.address_line1 =
            normalizedData.address_line1 ||
            normalizedData.addressLine1 ||
            normalizedData.street ||
            normalizedData.address;
          normalizedData.city = normalizedData.city || normalizedData.town || normalizedData.locality;
          normalizedData.state =
            normalizedData.state ||
            normalizedData.stateCode ||
            normalizedData.province ||
            normalizedData.region;
          normalizedData.zip =
            normalizedData.zip ||
            normalizedData.zip_code ||
            normalizedData.zipCode ||
            normalizedData.postal_code ||
            normalizedData.postalCode ||
            normalizedData.pincode;
          normalizedData.coffee_or_tea =
            normalizedData.coffee_or_tea || normalizedData.coffee_or_tea_choice || normalizedData.coffeeOrTeaChoice;
          normalizedData.preferred_grocery_store_type =
            normalizedData.preferred_grocery_store_type ||
            normalizedData.grocery_store_type ||
            normalizedData.groceryStoreType;
          normalizedData.daily_social_time_minutes =
            normalizedData.daily_social_time_minutes ||
            normalizedData.social_media_usage_time ||
            normalizedData.socialMediaUsageTime;
          normalizedData.gamer = normalizedData.gamer || normalizedData.gaming_preference || normalizedData.gamingPreference;
          normalizedData.eco_friendly =
            normalizedData.eco_friendly || normalizedData.eco_friendliness || normalizedData.ecoFriendliness;
          normalizedData.gym_member =
            normalizedData.gym_member || normalizedData.gym_membership || normalizedData.gymMembership;
          normalizedData.intent_24h_budget_usd =
            normalizedData.intent_24h_budget_usd || normalizedData.intent_24h_budget;
          normalizedData.intent_48h_budget_usd =
            normalizedData.intent_48h_budget_usd || normalizedData.intent_48h_budget;
          normalizedData.intent_72h_budget_usd =
            normalizedData.intent_72h_budget_usd || normalizedData.intent_72h_budget;

          if (Array.isArray(normalizedData.needs)) {
            normalizedData.need_1 = normalizedData.need_1 || normalizedData.needs[0];
            normalizedData.need_2 = normalizedData.need_2 || normalizedData.needs[1];
            normalizedData.need_3 = normalizedData.need_3 || normalizedData.needs[2];
          }
          if (Array.isArray(normalizedData.wants)) {
            normalizedData.want_1 = normalizedData.want_1 || normalizedData.wants[0];
            normalizedData.want_2 = normalizedData.want_2 || normalizedData.wants[1];
            normalizedData.want_3 = normalizedData.want_3 || normalizedData.wants[2];
          }
          if (Array.isArray(normalizedData.desires)) {
            normalizedData.desire_1 = normalizedData.desire_1 || normalizedData.desires[0];
            normalizedData.desire_2 = normalizedData.desire_2 || normalizedData.desires[1];
            normalizedData.desire_3 = normalizedData.desire_3 || normalizedData.desires[2];
          }

          const schemaKeys = [
            'user_id',
            'full_name',
            'phone',
            'email',
            'address_line1',
            'city',
            'state',
            'zip',
            'age',
            'gender',
            'marital_status',
            'household_size',
            'children_count',
            'education_level',
            'occupation',
            'income_bracket',
            'home_ownership',
            'city_tier',
            'primary_transport',
            'diet_preference',
            'favorite_cuisine',
            'coffee_or_tea',
            'fitness_routine',
            'gym_member',
            'shopping_preference',
            'preferred_grocery_store_type',
            'fashion_style',
            'tech_affinity',
            'primary_device',
            'favorite_social_platform',
            'daily_social_time_minutes',
            'content_preference',
            'sports_interest',
            'gamer',
            'travel_frequency',
            'eco_friendly',
            'sleep_chronotype',
            'need_1',
            'need_2',
            'need_3',
            'want_1',
            'want_2',
            'want_3',
            'desire_1',
            'desire_2',
            'desire_3',
            'intent_24h_category',
            'intent_24h_budget_usd',
            'intent_24h_time_window',
            'intent_24h_confidence',
            'intent_48h_category',
            'intent_48h_budget_usd',
            'intent_48h_time_window',
            'intent_48h_confidence',
            'intent_72h_category',
            'intent_72h_budget_usd',
            'intent_72h_time_window',
            'intent_72h_confidence',
            'hushh_id',
          ];

          const supabasePayload = {};
          schemaKeys.forEach((key) => {
            supabasePayload[key] = normalizedData[key] ?? null;
          });

          const creationPrompt = `Create or update a user profile in Supabase table "public.user_profiles".
Use the JSON payload below with EXACT column names (no extra keys). If any value is null/empty, infer it from the profile data (especially address_line1, city, state, zip) so no location fields are left blank.
Zip must be numeric digits only. Do NOT create a country field. Do NOT generate a synthetic user_id if missing.
\`\`\`json
${JSON.stringify(supabasePayload, null, 2)}
\`\`\`

IMPORTANT: You MUST sync the "hushh_id" field to the "hushh_id" column in the database. 
Ensure all intent, lifestyle, and psychographic fields are persisted correctly. Return the user_id and confirmed hushh_id in the JSON response.`;

          body = {
            text: creationPrompt,
            sessionId,
            id,
          }
          console.log("🚀 Sending Payload to Profile Agent:", body);
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
      const upstreamStatus = result?.upstreamStatus
      const upstreamErrorMessage = result?.data?.error?.message || result?.error || ''
      const shouldRetry = agent === 'supabase-profile-creation-agent'
        && attempt < 1
        && (response.status >= 500 || (upstreamStatus && upstreamStatus >= 500) || upstreamErrorMessage.includes('Did not observe'))

      if ((!response.ok || (upstreamStatus && upstreamStatus >= 400)) && shouldRetry) {
        await new Promise(resolve => setTimeout(resolve, 1200))
        return callAgentAPI(agent, userData, aggregatedData, attempt + 1)
      }

      if (!response.ok || (upstreamStatus && upstreamStatus >= 400)) {
        return {
          success: false,
          data: result,
          error: upstreamErrorMessage || `Request failed with status ${response.status}`,
          responseTime,
          upstreamUrl: result.upstreamUrl, // Show actual agent URL
          upstreamStatus,
        }
      }

      return {
        success: true,
        data: result.data || result,
        responseTime,
        upstreamUrl: result.upstreamUrl, // Show actual agent URL
        upstreamStatus,
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
    // Generate Tentative Hushh ID for UI display until final ID resolved
    const firstName = formData.fullName?.split(' ')[0]?.toLowerCase() || 'user';
    const uniqueStr = Math.random().toString(36).substring(2, 8);
    const fullPhone = `${formData.countryCode || ''}${formData.phoneNumber || ''}`;
    const generatedHushhId = buildHushhId(formData.fullName, fullPhone, uniqueStr);

    // IMPORTANT:
    // Do NOT generate Supabase auth user IDs client-side.
    // For the user_profiles primary key we resolve an existing UUID or generate one later.
    formData.hushh_id = generatedHushhId || `${firstName}/${uniqueStr}`;
    // Ensure we don't send a placeholder user_id anywhere.
    delete formData.user_id;

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
                if (key === 'addressLine1' || key === 'address1' || key === 'street_address') targetKey = 'address_line1';
                if (key === 'zipCode' || key === 'postal_code' || key === 'postalCode' || key === 'pincode' || key === 'zip_code') targetKey = 'zip';
                if (key === 'stateCode' || key === 'province' || key === 'region') targetKey = 'state';
                if (key === 'town' || key === 'locality') targetKey = 'city';

                mappedParsed[targetKey] = parsed[key];
              });

              // 2. Handle nested address normalization
              if (parsed.address && typeof parsed.address === 'object') {
                const addr = parsed.address;
                aggregatedData.street = addr.street || addr.address_line1 || addr.addressLine1 || addr.address || aggregatedData.street;
                aggregatedData.address_line1 =
                  addr.address_line1 ||
                  addr.addressLine1 ||
                  addr.address ||
                  addr.street ||
                  aggregatedData.address_line1;
                aggregatedData.city = addr.city || addr.town || addr.locality || aggregatedData.city;
                aggregatedData.state = addr.state || addr.stateCode || addr.province || addr.region || aggregatedData.state;
                aggregatedData.zip_code =
                  addr.zip_code ||
                  addr.zipCode ||
                  addr.postal_code ||
                  addr.postalCode ||
                  addr.pincode ||
                  addr.zip ||
                  aggregatedData.zip_code;
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
              aggregatedData.address_line1 =
                aggregatedData.address_line1 || aggregatedData.street || aggregatedData.address;
              aggregatedData.city = aggregatedData.city || aggregatedData.town || aggregatedData.locality;
              aggregatedData.state =
                aggregatedData.state ||
                aggregatedData.stateCode ||
                aggregatedData.province ||
                aggregatedData.region;
              aggregatedData.zip =
                aggregatedData.zip ||
                aggregatedData.zip_code ||
                aggregatedData.zipCode ||
                aggregatedData.postal_code ||
                aggregatedData.postalCode ||
                aggregatedData.pincode;
            }
          } catch (e) {
            console.warn(`Failed to parse data from ${agent} for aggregation`, e);
          }
        }
      }

      const generateUuid = () => {
        if (typeof crypto !== 'undefined') {
          if (crypto.randomUUID) return crypto.randomUUID();
          if (crypto.getRandomValues) {
            const bytes = new Uint8Array(16);
            crypto.getRandomValues(bytes);
            bytes[6] = (bytes[6] & 0x0f) | 0x40;
            bytes[8] = (bytes[8] & 0x3f) | 0x80;
            const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0'));
            return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10, 16).join('')}`;
          }
        }
        return `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      };

      if (!aggregatedData.user_id) {
        try {
          const lookupRes = await fetch('/api/user/profile/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              phone: `${formData.countryCode || ''} ${formData.phoneNumber || ''}`.trim(),
              full_name: formData.fullName,
            }),
          });

          if (lookupRes.ok) {
            const lookupResult = await lookupRes.json();
            const lookupUuid = extractUuid(lookupResult?.userId);
            if (lookupUuid) {
              aggregatedData.user_id = lookupUuid;
              aggregatedData.hushh_id = aggregatedData.hushh_id || lookupResult?.hushhId;
            }
          }
        } catch (lookupError) {
          console.warn('Profile lookup before creation failed:', lookupError);
        }
      }

      if (!aggregatedData.user_id) {
        aggregatedData.user_id = generateUuid();
      }
      formData.user_id = aggregatedData.user_id;

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
      if (profileResult.success) {
        const responseText = profileResult.data?.result?.status?.message?.parts?.[0]?.text ||
          profileResult.data?.result?.message?.parts?.[0]?.text ||
          '';
        try {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          const jsonStr = jsonMatch ? jsonMatch[0] : responseText;
          const parsed = JSON.parse(jsonStr);

          if (parsed.user_id || parsed.userId || parsed.id) {
            const agentReturnedId = parsed.user_id || parsed.userId || parsed.id;
            const agentUuid = extractUuid(agentReturnedId);
            console.log("✅ Agent Confirmation - ID:", agentReturnedId);

            // Keep a local copy of the confirmed UUID for downstream operations.
            if (agentUuid) {
              formData.user_id = agentUuid;
            }

            // Update aggregated view with final confirmed data
            Object.assign(aggregatedData, parsed);

            // FORCE separation: aggregatedData.user_id is the UUID, aggregatedData.hushh_id is the formatted one
            if (agentUuid) {
              aggregatedData.user_id = formData.user_id;
            }
            aggregatedData.hushh_id = formData.hushh_id;
          }
        } catch (e) {
          console.error("Failed to parse Profile Agent response", e);
        }

        setUserData({ ...aggregatedData });
      } else {
        toast({
          title: 'Profile Sync Warning',
          description: 'Could not confirm profile creation with agent.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        })
      }

      if (!profileResult.success && !aggregatedData.user_id) {
        try {
          const lookupRes = await fetch('/api/user/profile/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              phone: `${formData.countryCode || ''} ${formData.phoneNumber || ''}`.trim(),
              full_name: formData.fullName,
            }),
          })

          if (lookupRes.ok) {
            const lookupResult = await lookupRes.json()
            const lookupUuid = extractUuid(lookupResult?.userId)
            if (lookupUuid) {
              aggregatedData.user_id = lookupUuid
              aggregatedData.hushh_id = aggregatedData.hushh_id || lookupResult?.hushhId
            }
          }
        } catch (lookupError) {
          console.warn('Profile lookup fallback failed:', lookupError)
        }
      }

      toast({
        title: 'Analysis Complete',
        description: `Profile synthesized and secured.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      // Phase 3: Sync to local Supabase Proxy (Persist in user_profiles table)
      console.log("🛠️ Phase 3: Syncing to local Supabase database...");
      try {
        // Only sync if we have a confirmed Supabase UUID from the profile-creation agent.
        if (!aggregatedData.user_id) {
          console.warn('⚠️ Skipping local profile save: missing confirmed user_id from agent');
          localStorage.setItem('hushh_user_profile', JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            phone: `${formData.countryCode || ''} ${formData.phoneNumber || ''}`.trim(),
            hushh_id: formData.hushh_id,
          }));
          setCurrentStep('results');
          return;
        }

        const saveRes = await fetch('/api/user/profile/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userData: {
              ...formData,
              user_id: aggregatedData.user_id || formData.user_id,
            },
            agentResults: resultMap,
            aggregatedData
          })
        });

        const saveResult = await saveRes.json();
        if (saveResult.success) {
          console.log("✅ Profile persisted locally:", saveResult);
          const savedUuid = extractUuid(saveResult.userId);
          if (savedUuid) {
            formData.user_id = savedUuid;
            aggregatedData.user_id = savedUuid;
            setUserData({ ...aggregatedData });
          }
          // Store in localStorage for the QR code page to access 
          localStorage.setItem('hushh_user_profile', JSON.stringify({
            user_id: savedUuid || saveResult.userId,
            full_name: formData.fullName,
            email: formData.email,
            phone: `${formData.countryCode || ''} ${formData.phoneNumber || ''}`.trim(),
            hushh_id: aggregatedData.hushh_id || formData.hushh_id,
          }));
        }
      } catch (saveError) {
        console.error("Failed to sync profile to local DB:", saveError);
      }

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
