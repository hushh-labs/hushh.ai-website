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
  const callAgentAPI = useCallback(async (agent, userData) => {
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
          body = {
            text: detailedPrompt,
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
      title: 'Analyzing Profile',
      description: 'Querying all agents with your details...',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })

    try {
      // Only profile fetching agents (removed whatsapp and email)
      const agents = ['brand', 'hushh', 'public']
      const resultMap = {}
      
      // Call agents sequentially to show progress
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i]
        const result = await callAgentAPI(agent, formData)
        resultMap[agent] = result
        
        // Update progress
        const progress = ((i + 1) / agents.length) * 100
        setAnalysisProgress(progress)
        
        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      
      setAgentResults(resultMap)
      
      // Count successes
      const successCount = Object.values(resultMap).filter(r => r.success).length
      
      toast({
        title: 'Analysis Complete',
        description: `Successfully retrieved data from ${successCount} out of ${agents.length} agents`,
        status: successCount > 0 ? 'success' : 'warning',
        duration: 5000,
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

