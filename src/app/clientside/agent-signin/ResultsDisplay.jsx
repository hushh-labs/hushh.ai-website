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
  
  console.log('🔍 Extracting data from agent results:', agentResults)
  
  // Process agents in priority order: brand -> hushh -> public -> gemini (last = highest priority)
  const priorityOrder = ['brand', 'hushh', 'public', 'gemini', 'gemini-proxy']
  const sortedEntries = Object.entries(agentResults).sort((a, b) => {
    const indexA = priorityOrder.indexOf(a[0])
    const indexB = priorityOrder.indexOf(b[0])
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
  })
  
  // Combine all agent data with Gemini taking priority (processed last)
  sortedEntries.forEach(([agent, result]) => {
    console.log(`📊 Processing ${agent} agent:`, result)
    
    if (result.success && result.data) {
      // Handle different response structures - JSON-RPC format
      let responseData = result.data?.result?.status?.message?.parts?.[0]?.text || 
                         result.data?.result?.artifacts?.[0]?.parts?.[0]?.text ||
                         result.data?.result?.message?.parts?.[0]?.text ||
                         result.data?.result?.response?.parts?.[0]?.text || 
                         result.data?.data || 
                         result.data
      
      console.log(`📝 Extracted response data from ${agent}:`, responseData)
      
      // If responseData is a string, try to parse it as JSON
      if (typeof responseData === 'string') {
        try {
          // Remove markdown code blocks if present
          const cleanedData = responseData
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim()
          
          console.log(`🧹 Cleaned data from ${agent}:`, cleanedData.substring(0, 200))
          
          const parsed = JSON.parse(cleanedData)
          console.log(`✅ Parsed JSON from ${agent}:`, parsed)
          
          // Handle userProfile wrapper
          if (parsed.userProfile) {
            Object.assign(allData, parsed.userProfile)
            console.log(`📦 Merged userProfile from ${agent}`, Object.keys(parsed.userProfile))
          } else if (typeof parsed === 'object' && parsed !== null) {
            Object.assign(allData, parsed)
            console.log(`📦 Merged direct object from ${agent}`, Object.keys(parsed))
          }
        } catch (e) {
          console.error(`❌ Failed to parse JSON from ${agent}:`, e, '\nData:', responseData?.substring(0, 500))
        }
      } else if (typeof responseData === 'object' && responseData !== null) {
        // If already an object, handle userProfile wrapper
        if (responseData.userProfile) {
          Object.assign(allData, responseData.userProfile)
          console.log(`📦 Merged object userProfile from ${agent}`, Object.keys(responseData.userProfile))
        } else {
          Object.assign(allData, responseData)
          console.log(`📦 Merged direct object from ${agent}`, Object.keys(responseData))
        }
      }
    } else {
      console.warn(`⚠️ ${agent} agent failed or has no data:`, result)
    }
  })
  
  console.log('✨ Final merged data:', allData)
  console.log('📋 Available fields:', Object.keys(allData))
  console.log('🔑 Total fields extracted:', Object.keys(allData).length)
  
  // Log specific important fields for debugging
  console.log('🏋️ Gym Membership field:', allData.gymMembership || allData.gym_membership || allData.GymMembership || 'NOT FOUND')
  console.log('👤 Full Name field:', allData.fullName || allData.full_name || allData.name || 'NOT FOUND')
  console.log('📧 Email field:', allData.email || allData.Email || 'NOT FOUND')
  
  return allData
}

// Helper to get field value (supports nested objects)
const getField = (data, ...keys) => {
  for (const key of keys) {
    // Handle nested object notation (e.g., "address.city")
    if (key.includes('.')) {
      const parts = key.split('.')
      let value = data
      for (const part of parts) {
        if (value && value[part] !== undefined) {
          value = value[part]
        } else {
          value = null
          break
        }
      }
      if (value !== null && value !== undefined) return value
    } else {
      // Direct key access
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        return data[key]
      }
    }
  }
  return 'Not available'
}

// Helper to format array values
const formatArrayValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value
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
            <Text color="gray.400" fontSize={{ base: 'sm', md: 'md' }} mb={2}>
              Comprehensive profile intelligence generated from multiple data sources
            </Text>
            {agentResults.gemini?.success && (
              <Badge 
                colorScheme="white" 
                fontSize="xs" 
                px={3} 
                py={1} 
                borderRadius="full"
              >
                ✨ Enhanced with Gemini AI and Open AI
              </Badge>
            )}
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
              {/* <InfoCard label="User ID" value={getField(parsedData, 'userID', 'user_id', 'userId', 'id')} /> */}
              <InfoCard label="Full Name" value={userData?.fullName || getField(parsedData, 'fullName', 'full_name', 'name', 'fullname', 'Name', 'FullName')} />
              <InfoCard label="Email" value={userData?.email || getField(parsedData, 'email', 'email_address', 'emailAddress', 'Email', 'EmailAddress')} />
              <InfoCard label="Phone" value={userData ? `${userData.countryCode} ${userData.phoneNumber}` : getField(parsedData, 'phone', 'phoneNumber', 'phone_number', 'Phone', 'PhoneNumber', 'contact', 'mobile')} />
              <InfoCard label="Age" value={getField(parsedData, 'age', 'age_range', 'ageRange', 'Age', 'AgeRange')} />
              <InfoCard label="Gender" value={getField(parsedData, 'gender', 'sex', 'Gender', 'Sex')} />
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
              <InfoCard label="Address" value={getField(parsedData, 'address.street', 'address.Street', 'street', 'Street', 'address', 'Address', 'street_address', 'streetAddress', 'location', 'Location')} />
              <InfoCard label="City" value={getField(parsedData, 'address.city', 'address.City', 'city', 'City', 'town', 'Town')} />
              <InfoCard label="State" value={getField(parsedData, 'address.state', 'address.State', 'state', 'State', 'province', 'Province', 'region', 'Region')} />
              <InfoCard label="Postal Code" value={getField(parsedData, 'address.postalCode', 'address.PostalCode', 'address.zipCode', 'address.ZipCode', 'postalCode', 'PostalCode', 'zipCode', 'ZipCode', 'postal_code', 'zip_code', 'pincode', 'Pincode')} />
              <InfoCard label="Country" value={getField(parsedData, 'address.country', 'address.Country', 'country', 'Country', 'nation', 'Nation')} />
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
              <InfoCard label="Marital Status" value={getField(parsedData, 'maritalStatus', 'marital_status', 'MaritalStatus', 'relationship_status', 'relationshipStatus', 'RelationshipStatus', 'marital', 'Marital')} />
              <InfoCard label="Household Size" value={getField(parsedData, 'householdSize', 'household_size', 'HouseholdSize', 'family_size', 'familySize', 'FamilySize', 'household', 'Household')} />
              <InfoCard label="Children Count" value={getField(parsedData, 'childrenCount', 'children_count', 'ChildrenCount', 'number_of_children', 'numberOfChildren', 'NumberOfChildren', 'kids', 'Kids')} />
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
              <InfoCard label="Occupation" value={getField(parsedData, 'occupation', 'Occupation', 'job', 'Job', 'profession', 'Profession', 'job_title', 'jobTitle', 'JobTitle', 'career', 'Career', 'work', 'Work')} />
              <InfoCard label="Education" value={getField(parsedData, 'educationLevel', 'education_level', 'EducationLevel', 'education', 'Education', 'degree', 'Degree', 'qualification', 'Qualification')} />
              <InfoCard label="Income Bracket" value={getField(parsedData, 'incomeBracket', 'income_bracket', 'IncomeBracket', 'income', 'Income', 'salary_range', 'salaryRange', 'SalaryRange', 'salary', 'Salary')} />
              <InfoCard label="Home Ownership" value={getField(parsedData, 'homeOwnership', 'home_ownership', 'HomeOwnership', 'homeowner', 'Homeowner', 'housing', 'Housing')} />
              <InfoCard label="City Tier" value={getField(parsedData, 'cityTier', 'city_tier', 'CityTier', 'tier', 'Tier')} />
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
              <InfoCard label="Diet Preference" value={getField(parsedData, 'dietPreference', 'diet_preference', 'DietPreference', 'diet', 'Diet', 'dietary_restrictions', 'dietaryRestrictions', 'DietaryRestrictions', 'foodPreference', 'food_preference')} />
              <InfoCard label="Favorite Cuisine" value={getField(parsedData, 'favoriteCuisine', 'favorite_cuisine', 'FavoriteCuisine', 'cuisine_preference', 'cuisinePreference', 'CuisinePreference', 'cuisine', 'Cuisine')} />
              <InfoCard label="Coffee or Tea" value={getField(parsedData, 'coffeeOrTeaChoice', 'coffee_or_tea_choice', 'CoffeeOrTeaChoice', 'beverage_preference', 'beveragePreference', 'BeveragePreference', 'drink_preference', 'drinkPreference')} />
              <InfoCard label="Fitness Routine" value={getField(parsedData, 'fitnessRoutine', 'fitness_routine', 'FitnessRoutine', 'exercise', 'Exercise', 'workout_frequency', 'workoutFrequency', 'WorkoutFrequency', 'workout', 'Workout')} />
              <InfoCard label="Gym Membership" value={getField(parsedData, 'gymMembership', 'gym_membership', 'GymMembership', 'gym', 'Gym', 'membership', 'Membership', 'fitness_membership', 'fitnessMembership')} />
              <InfoCard label="Shopping Preference" value={getField(parsedData, 'shoppingPreference', 'shopping_preference', 'ShoppingPreference', 'shopping', 'Shopping', 'retail_preference', 'retailPreference')} />
              <InfoCard label="Grocery Store Type" value={getField(parsedData, 'groceryStoreType', 'grocery_store_type', 'GroceryStoreType', 'grocery', 'Grocery', 'store_type', 'storeType', 'StoreType')} />
              <InfoCard label="Fashion Style" value={getField(parsedData, 'fashionStyle', 'fashion_style', 'FashionStyle', 'fashion', 'Fashion', 'style', 'Style', 'clothing_style', 'clothingStyle')} />
              <InfoCard label="Transport" value={getField(parsedData, 'transport', 'Transport', 'transportation', 'Transportation', 'vehicle', 'Vehicle', 'travel_mode', 'travelMode')} />
              <InfoCard label="Sleep Chronotype" value={getField(parsedData, 'sleepChronotype', 'sleep_chronotype', 'SleepChronotype', 'sleep_pattern', 'sleepPattern', 'SleepPattern', 'chronotype', 'Chronotype', 'sleep', 'Sleep')} />
              <InfoCard label="Eco-Friendliness" value={getField(parsedData, 'ecoFriendliness', 'eco_friendliness', 'EcoFriendliness', 'environmental_awareness', 'environmentalAwareness', 'EnvironmentalAwareness', 'sustainability', 'Sustainability', 'eco', 'Eco')} />
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
              <InfoCard label="Tech Affinity" value={getField(parsedData, 'techAffinity', 'tech_affinity', 'TechAffinity', 'technology_adoption', 'technologyAdoption', 'TechnologyAdoption', 'tech', 'Tech', 'technology', 'Technology')} />
              <InfoCard label="Primary Device" value={getField(parsedData, 'primaryDevice', 'primary_device', 'PrimaryDevice', 'device', 'Device', 'main_device', 'mainDevice')} />
              <InfoCard label="Favorite Social Platform" value={getField(parsedData, 'favoriteSocialPlatform', 'favorite_social_platform', 'FavoriteSocialPlatform', 'social_media', 'socialMedia', 'SocialMedia', 'social_platform', 'socialPlatform', 'platform', 'Platform')} />
              <InfoCard label="Social Media Usage Time" value={getField(parsedData, 'socialMediaUsageTime', 'social_media_usage_time', 'SocialMediaUsageTime', 'usage_time', 'usageTime', 'UsageTime', 'screen_time', 'screenTime', 'ScreenTime')} />
              <InfoCard label="Content Preference" value={getField(parsedData, 'contentPreference', 'content_preference', 'ContentPreference', 'content', 'Content', 'media_preference', 'mediaPreference')} />
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
              <InfoCard label="Sports Interest" value={getField(parsedData, 'sportsInterest', 'sports_interest', 'SportsInterest', 'favorite_sport', 'favoriteSport', 'FavoriteSport', 'sports', 'Sports', 'sport', 'Sport')} />
              <InfoCard label="Gaming Preference" value={getField(parsedData, 'gamingPreference', 'gaming_preference', 'GamingPreference', 'gaming', 'Gaming', 'game_preference', 'gamePreference', 'games', 'Games')} />
              <InfoCard label="Travel Frequency" value={getField(parsedData, 'travelFrequency', 'travel_frequency', 'TravelFrequency', 'travel', 'Travel', 'trip_frequency', 'tripFrequency')} />
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
            <VStack align="stretch" spacing={4}>
              {/* Needs, Wants, Desires */}
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                <InfoCard label="Needs" value={formatArrayValue(getField(parsedData, 'needs', 'Needs', 'user_needs', 'userNeeds', 'UserNeeds', 'requirements', 'Requirements'))} />
                <InfoCard label="Wants" value={formatArrayValue(getField(parsedData, 'wants', 'Wants', 'user_wants', 'userWants', 'UserWants', 'preferences', 'Preferences'))} />
                <InfoCard label="Desires" value={formatArrayValue(getField(parsedData, 'desires', 'Desires', 'user_desires', 'userDesires', 'UserDesires', 'wishes', 'Wishes'))} />
              </Grid>

              {/* Intent Timeline */}
              <Box>
                <Text fontSize="md" fontWeight="600" color="gray.300" mb={3}>
                  Intent Timeline
                </Text>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                  {/* 24h Intent */}
                  <Box
                    bg="rgba(255, 255, 255, 0.03)"
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="12px"
                    p={4}
                  >
                    <VStack align="start" spacing={2}>
                      <Badge colorScheme="green" fontSize="xs" px={2} py={1}>24 HOURS</Badge>
                      <Text fontSize="sm" color="gray.400">Category</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.24h.category', 'intent24h.category') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[0] ? parsedData.intents[0].category : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Budget</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.24h.budget', 'intent24h.budget') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[0] ? parsedData.intents[0].budget : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Time Window</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.24h.timeWindow', 'intent24h.timeWindow', 'intents.24h.time_window') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[0] ? parsedData.intents[0].timeWindow : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Confidence</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.24h.confidence', 'intent24h.confidence') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[0] ? parsedData.intents[0].confidence : 'Not available')}
                      </Text>
                    </VStack>
                  </Box>

                  {/* 48h Intent */}
                  <Box
                    bg="rgba(255, 255, 255, 0.03)"
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="12px"
                    p={4}
                  >
                    <VStack align="start" spacing={2}>
                      <Badge colorScheme="blue" fontSize="xs" px={2} py={1}>48 HOURS</Badge>
                      <Text fontSize="sm" color="gray.400">Category</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.48h.category', 'intent48h.category') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[1] ? parsedData.intents[1].category : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Budget</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.48h.budget', 'intent48h.budget') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[1] ? parsedData.intents[1].budget : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Time Window</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.48h.timeWindow', 'intent48h.timeWindow', 'intents.48h.time_window') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[1] ? parsedData.intents[1].timeWindow : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Confidence</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.48h.confidence', 'intent48h.confidence') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[1] ? parsedData.intents[1].confidence : 'Not available')}
                      </Text>
                    </VStack>
                  </Box>

                  {/* 72h Intent */}
                  <Box
                    bg="rgba(255, 255, 255, 0.03)"
                    borderWidth="1px"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="12px"
                    p={4}
                  >
                    <VStack align="start" spacing={2}>
                      <Badge colorScheme="purple" fontSize="xs" px={2} py={1}>72 HOURS</Badge>
                      <Text fontSize="sm" color="gray.400">Category</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.72h.category', 'intent72h.category') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[2] ? parsedData.intents[2].category : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Budget</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.72h.budget', 'intent72h.budget') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[2] ? parsedData.intents[2].budget : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Time Window</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.72h.timeWindow', 'intent72h.timeWindow', 'intents.72h.time_window') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[2] ? parsedData.intents[2].timeWindow : 'Not available')}
                      </Text>
                      <Text fontSize="sm" color="gray.400">Confidence</Text>
                      <Text fontSize="md" color="white" fontWeight="500">
                        {getField(parsedData, 'intents.72h.confidence', 'intent72h.confidence') || 
                         (Array.isArray(parsedData.intents) && parsedData.intents[2] ? parsedData.intents[2].confidence : 'Not available')}
                      </Text>
                    </VStack>
                  </Box>
                </Grid>
              </Box>
            </VStack>
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
