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

  // Call all agent APIs with user details
  const callAgentAPI = useCallback(async (agent, userData) => {
    const sessionId = `session-${Date.now()}`
    const id = `task-${Math.random().toString(36).slice(2)}`
    
    try {
      const startTime = Date.now()
      let body = {}
      
      // Build the appropriate payload for each agent type
      switch (agent) {
        case 'brand':
          body = {
            text: `Fetch all details for user with email ${userData.email}, phone ${userData.phoneNumber}, and name ${userData.fullName}`,
            sessionId,
            id,
          }
          break
          
        case 'hushh':
          body = {
            text: `Get user profile information for ${userData.fullName} with email ${userData.email} and phone number ${userData.phoneNumber}`,
            sessionId,
            id,
          }
          break
          
        case 'public':
          body = {
            text: `Enrich public data for user ${userData.fullName} with email ${userData.email}`,
            sessionId,
            id,
          }
          break
          
        case 'whatsapp':
          // WhatsApp agent sends a message notification
          body = {
            messaging_product: 'whatsapp',
            to: userData.phoneNumber,
            type: 'template',
            template: {
              name: 'hello_world',
              language: { code: 'en_US' },
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: userData.fullName }
                  ]
                }
              ]
            }
          }
          break
          
        case 'email':
          // Email agent sends a notification email
          body = {
            to: userData.email,
            subject: 'Profile Analysis Complete - Hushh.ai',
            body: `<html><body><h2>Hello ${userData.fullName}!</h2><p>Your profile analysis has been completed successfully. Thank you for using Hushh.ai agents.</p></body></html>`,
            mimeType: 'text/html',
          }
          break
          
        default:
          throw new Error(`Unknown agent: ${agent}`)
      }
      
      const response = await fetch(`/api/a2a/${agent}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      
      const responseTime = `${Date.now() - startTime}ms`
      const result = await response.json()
      
      if (!response.ok) {
        return {
          success: false,
          data: result,
          error: result.error || 'Request failed',
          responseTime,
        }
      }
      
      return {
        success: true,
        data: result.data || result,
        responseTime,
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
      const agents = ['brand', 'hushh', 'public', 'whatsapp', 'email']
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

