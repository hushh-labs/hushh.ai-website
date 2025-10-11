'use client'
import React, { useMemo, useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Grid,
  GridItem,
  Badge,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

// Helper function to extract data from API responses
const extractUserData = (agentResults, userData) => {
  const allData = {}
  
  // Combine all agent data
  Object.entries(agentResults).forEach(([agent, result]) => {
    if (result.success && result.data) {
      // Handle different response structures
      const responseData = result.data?.result?.response?.parts?.[0]?.text || 
                          result.data?.data || 
                          result.data
      
      if (typeof responseData === 'string') {
        try {
          const parsed = JSON.parse(responseData)
          Object.assign(allData, parsed)
        } catch {
          // If not JSON, skip
        }
      } else if (typeof responseData === 'object') {
        Object.assign(allData, responseData)
      }
    }
  })
  
  return allData
}

// Helper to get field value
const getField = (data, ...keys) => {
  for (const key of keys) {
    if (data[key]) return data[key]
  }
  return 'Not available'
}

export default function ResultsDisplay({ userData, agentResults, onBack }) {
  const [showRawData, setShowRawData] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  
  // Extract and parse all data
  const parsedData = useMemo(() => extractUserData(agentResults, userData), [agentResults, userData])
  
  // Calculate metadata
  const metadata = useMemo(() => {
    const totalFields = Object.keys(parsedData).length
    const avgResponseTime = Object.values(agentResults)
      .filter(r => r.responseTime && r.responseTime !== 'N/A')
      .map(r => parseInt(r.responseTime))
      .reduce((acc, val) => acc + val, 0) / Object.values(agentResults).filter(r => r.responseTime && r.responseTime !== 'N/A').length || 0
    
    return {
      confidenceScore: parsedData.confidence_score || parsedData.confidence || '30',
      accuracyScore: parsedData.accuracy_score || parsedData.accuracy || '50',
      totalFields: totalFields || 3,
      responseTime: avgResponseTime ? `${Math.round(avgResponseTime)}ms` : '10ms'
    }
  }, [parsedData, agentResults])

  // Export results as JSON
  const handleExportResults = () => {
    try {
      const exportData = {
        userData,
        parsedData,
        metadata,
        agentResults,
        exportDate: new Date().toISOString(),
      }
      
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `profile-analysis-${userData.fullName.replace(/\s+/g, '-')}-${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      toast({
        title: 'Results Exported',
        description: 'Your profile analysis has been downloaded as JSON',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: error.message || 'Failed to export results',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  // Show raw data modal
  const handleShowRawData = () => {
    onOpen()
  }

  // Clear data and go back
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data and start over?')) {
      onBack?.()
      toast({
        title: 'Data Cleared',
        description: 'All analysis data has been cleared',
        status: 'info',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  const InfoCard = ({ label, value }) => (
    <Box
      bg="rgba(255, 255, 255, 0.03)"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.1)"
      borderRadius="12px"
      p={4}
    >
      <Text fontSize="xs" color="gray.500" textTransform="uppercase" mb={2} fontWeight="600">
        {label}
      </Text>
      <Text fontSize="md" color="white" fontWeight="500">
        {value || 'Not available'}
      </Text>
    </Box>
  )

  return (
    <Box minH="100vh" bg="black" color="white" py={{ base: 6, md: 10 }}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading 
              fontSize={{ base: '2xl', md: '4xl' }} 
              fontWeight="700" 
              color="green.400"
              mb={3}
            >
              Analysis Complete
            </Heading>
            <Text color="gray.400" fontSize={{ base: 'sm', md: 'md' }}>
              Comprehensive profile intelligence generated from multiple data sources
            </Text>
          </Box>

          {/* Action Buttons */}
          <HStack justify="center" flexWrap="wrap" gap={3}>
            <Button
              onClick={onBack}
              bg="green.500"
              color="white"
              _hover={{ bg: 'green.600' }}
              borderRadius="8px"
              px={6}
              size={{ base: 'sm', md: 'md' }}
            >
              New Analysis
            </Button>
            <Button
              onClick={handleExportResults}
              variant="outline"
              borderColor="gray.700"
              color="white"
              _hover={{ bg: 'gray.900', borderColor: 'green.500' }}
              borderRadius="8px"
              px={6}
              size={{ base: 'sm', md: 'md' }}
            >
              📥 Export Results
            </Button>
            <Button
              onClick={handleShowRawData}
              variant="outline"
              borderColor="gray.700"
              color="white"
              _hover={{ bg: 'gray.900', borderColor: 'blue.500' }}
              borderRadius="8px"
              px={6}
              size={{ base: 'sm', md: 'md' }}
            >
              🔍 Show Raw Data
            </Button>
            <Button
              onClick={handleClearData}
              variant="outline"
              borderColor="gray.700"
              color="white"
              _hover={{ bg: 'red.900', borderColor: 'red.500' }}
              borderRadius="8px"
              px={6}
              size={{ base: 'sm', md: 'md' }}
            >
              🗑️ Clear Data
            </Button>
          </HStack>

          {/* BASIC INFORMATION */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              BASIC INFORMATION
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Full Name" value={userData?.fullName || getField(parsedData, 'fullName', 'full_name', 'name')} />
              <InfoCard label="Email" value={userData?.email || getField(parsedData, 'email', 'email_address')} />
              <InfoCard label="Phone" value={userData?.phoneNumber || getField(parsedData, 'phone', 'phoneNumber', 'phone_number')} />
              <InfoCard label="Age" value={getField(parsedData, 'age', 'age_range')} />
              <InfoCard label="Gender" value={getField(parsedData, 'gender', 'sex')} />
            </Grid>
          </Box>

          {/* LOCATION */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              LOCATION
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Address" value={getField(parsedData, 'address', 'street_address', 'location')} />
              <InfoCard label="City" value={getField(parsedData, 'city', 'town')} />
              <InfoCard label="State" value={getField(parsedData, 'state', 'province', 'region')} />
            </Grid>
          </Box>

          {/* DEMOGRAPHICS */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              DEMOGRAPHICS
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Marital Status" value={getField(parsedData, 'maritalStatus', 'marital_status', 'relationship_status')} />
              <InfoCard label="Household Size" value={getField(parsedData, 'householdSize', 'household_size', 'family_size')} />
              <InfoCard label="Children Count" value={getField(parsedData, 'childrenCount', 'children_count', 'number_of_children')} />
            </Grid>
          </Box>

          {/* PROFESSIONAL */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              PROFESSIONAL
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Occupation" value={getField(parsedData, 'occupation', 'job', 'profession', 'job_title')} />
              <InfoCard label="Education" value={getField(parsedData, 'education', 'education_level', 'degree')} />
              <InfoCard label="Income Bracket" value={getField(parsedData, 'incomeBracket', 'income_bracket', 'income', 'salary_range')} />
            </Grid>
          </Box>

          {/* LIFESTYLE */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              LIFESTYLE
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Diet Preference" value={getField(parsedData, 'dietPreference', 'diet_preference', 'diet', 'dietary_restrictions')} />
              <InfoCard label="Favorite Cuisine" value={getField(parsedData, 'favoriteCuisine', 'favorite_cuisine', 'cuisine_preference')} />
              <InfoCard label="Fitness Routine" value={getField(parsedData, 'fitnessRoutine', 'fitness_routine', 'exercise', 'workout_frequency')} />
              <InfoCard label="Sleep Chronotype" value={getField(parsedData, 'sleepChronotype', 'sleep_chronotype', 'sleep_pattern')} />
            </Grid>
          </Box>

          {/* TECHNOLOGY */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              TECHNOLOGY
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Tech Affinity" value={getField(parsedData, 'techAffinity', 'tech_affinity', 'technology_adoption')} />
              <InfoCard label="Primary Device" value={getField(parsedData, 'primaryDevice', 'primary_device', 'device')} />
              <InfoCard label="Favorite Social Platform" value={getField(parsedData, 'favoriteSocialPlatform', 'favorite_social_platform', 'social_media')} />
            </Grid>
          </Box>

          {/* INTERESTS */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              INTERESTS
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Sports Interest" value={getField(parsedData, 'sportsInterest', 'sports_interest', 'favorite_sport')} />
              <InfoCard label="Gaming Preference" value={getField(parsedData, 'gamingPreference', 'gaming_preference', 'gaming')} />
              <InfoCard label="Travel Frequency" value={getField(parsedData, 'travelFrequency', 'travel_frequency', 'travel')} />
            </Grid>
          </Box>

          {/* INTENT ANALYSIS */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              INTENT ANALYSIS
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
              <InfoCard label="Needs" value={getField(parsedData, 'needs', 'user_needs')} />
              <InfoCard label="Wants" value={getField(parsedData, 'wants', 'user_wants')} />
              <InfoCard label="Desires" value={getField(parsedData, 'desires', 'user_desires')} />
              <InfoCard label="Intent 24h" value={getField(parsedData, 'intent24h', 'intent_24h', 'shortTermIntent')} />
              <InfoCard label="Intent 48h" value={getField(parsedData, 'intent48h', 'intent_48h', 'mediumTermIntent')} />
              <InfoCard label="Intent 72h" value={getField(parsedData, 'intent72h', 'intent_72h', 'longTermIntent')} />
            </Grid>
          </Box>

          {/* ANALYSIS METADATA */}
          <Box>
            <Heading 
              fontSize={{ base: 'lg', md: 'xl' }} 
              fontWeight="700" 
              mb={4}
              pb={3}
              borderBottomWidth="1px"
              borderBottomColor="gray.800"
            >
              ANALYSIS METADATA
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              <Box
                bg="rgba(255, 255, 255, 0.03)"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                p={6}
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="700" color="green.400" mb={2}>
                  {metadata.confidenceScore}%
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  Confidence Score
                </Text>
              </Box>
              <Box
                bg="rgba(255, 255, 255, 0.03)"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                p={6}
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="700" color="pink.400" mb={2}>
                  {metadata.accuracyScore}%
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  Accuracy Score
                </Text>
              </Box>
              <Box
                bg="rgba(255, 255, 255, 0.03)"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                p={6}
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="700" color="yellow.400" mb={2}>
                  {metadata.totalFields}
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  Total Fields
                </Text>
              </Box>
              <Box
                bg="rgba(255, 255, 255, 0.03)"
                borderWidth="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                p={6}
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="700" color="cyan.400" mb={2}>
                  {metadata.responseTime}
                </Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">
                  Response Time
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>

      {/* Raw Data Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <ModalContent bg="gray.900" color="white" maxH="90vh">
          <ModalHeader borderBottomWidth="1px" borderBottomColor="gray.700">
            <VStack align="start" spacing={1}>
              <Heading fontSize="xl">Raw API Response Data</Heading>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                Complete JSON response from all agent APIs
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={6}>
            <VStack align="stretch" spacing={6}>
              <Box>
                <Heading fontSize="md" mb={3} color="green.400">User Data</Heading>
                <Box
                  bg="black"
                  p={4}
                  borderRadius="8px"
                  borderWidth="1px"
                  borderColor="gray.700"
                  overflow="auto"
                  maxH="200px"
                >
                  <pre style={{ fontSize: '12px', margin: 0 }}>
                    {JSON.stringify(userData, null, 2)}
                  </pre>
                </Box>
              </Box>

              <Box>
                <Heading fontSize="md" mb={3} color="blue.400">Parsed Data</Heading>
                <Box
                  bg="black"
                  p={4}
                  borderRadius="8px"
                  borderWidth="1px"
                  borderColor="gray.700"
                  overflow="auto"
                  maxH="200px"
                >
                  <pre style={{ fontSize: '12px', margin: 0 }}>
                    {JSON.stringify(parsedData, null, 2)}
                  </pre>
                </Box>
              </Box>

              <Box>
                <Heading fontSize="md" mb={3} color="purple.400">Agent Results</Heading>
                {Object.entries(agentResults).map(([agent, result]) => (
                  <Box key={agent} mb={4}>
                    <HStack mb={2}>
                      <Badge colorScheme={result.success ? 'green' : 'red'}>
                        {agent.toUpperCase()}
                      </Badge>
                      <Text fontSize="sm" color="gray.400">
                        {result.responseTime}
                      </Text>
                    </HStack>
                    <Box
                      bg="black"
                      p={4}
                      borderRadius="8px"
                      borderWidth="1px"
                      borderColor={result.success ? 'green.900' : 'red.900'}
                      overflow="auto"
                      maxH="300px"
                    >
                      <pre style={{ fontSize: '12px', margin: 0 }}>
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box>
                <Heading fontSize="md" mb={3} color="yellow.400">Metadata</Heading>
                <Box
                  bg="black"
                  p={4}
                  borderRadius="8px"
                  borderWidth="1px"
                  borderColor="gray.700"
                  overflow="auto"
                >
                  <pre style={{ fontSize: '12px', margin: 0 }}>
                    {JSON.stringify(metadata, null, 2)}
                  </pre>
                </Box>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
