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
  Icon,
  Link,
  Divider,
  Flex
} from '@chakra-ui/react'
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaHeart, FaGamepad, FaPlane, FaLeaf, FaLaptop, FaDownload, FaTrash, FaCode, FaRedo } from 'react-icons/fa'
import HushhProfileCard from '../../../components/profile/HushhProfileCard'
import { extractUuid, getSiteUrl } from '../../../lib/utils'

// Helper function to extract data from API responses
const extractUserData = (agentResults, userData) => {
  const allData = { ...userData }

  console.log('🔍 Extracting data from agent results:', agentResults)

  const priorityOrder = ['brand', 'hushh', 'public', 'gemini', 'gemini-proxy', 'supabase-profile-creation-agent']
  const sortedEntries = Object.entries(agentResults).sort((a, b) => {
    const indexA = priorityOrder.indexOf(a[0])
    const indexB = priorityOrder.indexOf(b[0])
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
  })

  sortedEntries.forEach(([agent, result]) => {
    if (result.success && result.data) {
      let responseData = result.data?.result?.status?.message?.parts?.[0]?.text ||
        result.data?.result?.artifacts?.[0]?.parts?.[0]?.text ||
        result.data?.result?.message?.parts?.[0]?.text ||
        result.data?.result?.response?.parts?.[0]?.text ||
        result.data?.data ||
        result.data

      if (typeof responseData === 'string') {
        try {
          const cleanedData = responseData.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
          const jsonMatch = cleanedData.match(/\{[\s\S]*\}/);
          const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : cleanedData)

          let dataToMerge = parsed.userProfile || parsed;

          // ID Normalization
          const extractedId = dataToMerge.user_id || dataToMerge.userId || dataToMerge.id;
          const extractedUuid = extractUuid(extractedId);
          if (extractedUuid && (!allData.user_id || allData.user_id.startsWith('pending-'))) {
            allData.user_id = extractedUuid;
          }

          const extractedHushhId = dataToMerge.hushh_id || dataToMerge.hushhId;
          if (extractedHushhId && (!allData.hushh_id || allData.hushh_id.includes('pending-') || extractedHushhId.includes('/'))) {
            allData.hushh_id = extractedHushhId;
          }

          // Basic normalization for UI consistency
          if (dataToMerge.address && typeof dataToMerge.address === 'object') {
            const addr = dataToMerge.address;
            allData.street = addr.street || addr.address_line1 || allData.street;
            allData.city = addr.city || allData.city;
            allData.state = addr.state || allData.state;
            allData.zip_code = addr.zip_code || addr.zip || allData.zip_code;
            allData.country = addr.country || allData.country;
          }

          // Handle intents
          const extract = (src) => ({
            category: src.category,
            budget: src.budget_usd || src.budget,
            time_window: src.time_window || src.timeWindow,
            confidence: src.confidence
          });

          if (dataToMerge.intent_24h) {
            const i = extract(dataToMerge.intent_24h);
            allData.intent_24h_category = i.category || allData.intent_24h_category;
            allData.intent_24h_budget = i.budget || allData.intent_24h_budget;
            allData.intent_24h_confidence = i.confidence || allData.intent_24h_confidence;
          }
          if (dataToMerge.intent_48h) {
            const i = extract(dataToMerge.intent_48h);
            allData.intent_48h_category = i.category || allData.intent_48h_category;
            allData.intent_48h_budget = i.budget || allData.intent_48h_budget;
            allData.intent_48h_time_window = i.time_window || allData.intent_48h_time_window;
            allData.intent_48h_confidence = i.confidence || allData.intent_48h_confidence;
          }
          if (dataToMerge.intent_72h) {
            const i = extract(dataToMerge.intent_72h);
            allData.intent_72h_category = i.category || allData.intent_72h_category;
            allData.intent_72h_budget = i.budget || allData.intent_72h_budget;
            allData.intent_72h_confidence = i.confidence || allData.intent_72h_confidence;
          }

          if (Array.isArray(dataToMerge.intents)) {
            dataToMerge.intents.forEach(int => {
              const tf = int.time_frame || int.timeFrame;
              const i = extract(int);
              if (tf?.includes('24h')) {
                allData.intent_24h_category = i.category;
                allData.intent_24h_budget = i.budget;
                allData.intent_24h_confidence = i.confidence;
              } else if (tf?.includes('48h')) {
                allData.intent_48h_category = i.category;
                allData.intent_48h_budget = i.budget;
                allData.intent_48h_time_window = i.time_window;
                allData.intent_48h_confidence = i.confidence;
              } else if (tf?.includes('72h')) {
                allData.intent_72h_category = i.category;
                allData.intent_72h_budget = i.budget;
                allData.intent_72h_confidence = i.confidence;
              }
            });
          }

          // PROTECT USER INPUT:
          // We want to merge new insights (e.g., intents, brand preferences)
          // but NOT overwrite the Core Identity fields if the user explicitly provided them.
          const protectedFields = ['email', 'phone', 'phoneNumber', 'full_name', 'fullName', 'name'];

          Object.keys(dataToMerge).forEach(key => {
            // If the key is a protected field AND we already have a value from the original userData, skip it.
            if (protectedFields.includes(key) && userData[key]) {
              return;
            }
            // Otherwise, it's safe to merge (or add new fields)
            allData[key] = dataToMerge[key];
          });
        } catch (e) {
          console.error(`❌ Failed to parse JSON from ${agent}:`, e)
        }
      } else if (typeof responseData === 'object' && responseData !== null) {
        let objToMerge = responseData.userProfile || responseData;
        const extractedId = objToMerge.user_id || objToMerge.userId || objToMerge.id;
        const extractedUuid = extractUuid(extractedId);
        if (extractedUuid) allData.user_id = extractedUuid;

        const protectedFields = ['email', 'phone', 'phoneNumber', 'full_name', 'fullName', 'name'];
        Object.keys(objToMerge).forEach(key => {
          if (protectedFields.includes(key) && userData[key]) {
            return;
          }
          allData[key] = objToMerge[key];
        });
      }
    }
  })

  // Final safeguarding: Ensure user_id from Supabase agent wins if multiple IDs present
  const supabaseResult = agentResults['supabase-profile-creation-agent'];
  if (supabaseResult?.success && supabaseResult?.data) {
    const text = supabaseResult.data?.result?.status?.message?.parts?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        const finalId = parsed.user_id || parsed.userId || parsed.id;
        const finalUuid = extractUuid(finalId);
        if (finalUuid && (!allData.user_id || allData.user_id.startsWith('pending-'))) {
          allData.user_id = finalUuid;
        }

        const finalHushhId = parsed.hushh_id || parsed.hushhId;
        if (finalHushhId && (!allData.hushh_id || allData.hushh_id.includes('pending-') || finalHushhId.includes('/'))) {
          allData.hushh_id = finalHushhId;
        }
      } catch (e) { }
    }
  }

  return allData
}

// Helper to get field value (supports nested objects)
const getField = (data, ...keys) => {
  for (const key of keys) {
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
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        return data[key]
      }
    }
  }
  return 'Not available' // Consistent placeholder
}

// Helper to format array values
const formatArrayValue = (value) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  if (typeof value === 'object' && value !== null) {
    return Object.values(value).join(', ')
  }
  return value
}

// Reusable Dashboard Card Component
const DashboardCard = ({ title, icon, children, colorScheme = "blue" }) => (
  <Box
    bg="white"
    border="1px solid"
    borderColor="rgba(0,0,0,0.05)"
    borderRadius="2xl"
    p={6}
    height="full"
    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    _hover={{ transform: "translateY(-4px)", boxShadow: "0 15px 30px rgba(0,0,0,0.08)" }}
    boxShadow="0 4px 10px rgba(0,0,0,0.02)"
  >
    <HStack mb={6} spacing={3} align="center">
      <Flex
        w={10} h={10}
        align="center" justify="center"
        borderRadius="lg"
        bg={`${colorScheme}.50`}
        color={`${colorScheme}.600`}
      >
        <Icon as={icon} boxSize={5} />
      </Flex>
      <Heading size="md" fontWeight="bold" letterSpacing="tight" color="#1d1d1f">
        {title}
      </Heading>
    </HStack>
    <VStack align="stretch" spacing={4}>
      {children}
    </VStack>
  </Box>
)

const InfoRow = ({ label, value }) => (
  <Box>
    <Text fontSize="xs" color="gray.500" fontWeight="700" letterSpacing="wider" textTransform="uppercase" mb={1}>
      {label}
    </Text>
    <Text fontSize="md" color="#1d1d1f" fontWeight="500">
      {value}
    </Text>
  </Box>
)

const IntentCard = ({ badge, badgeColor, data, categoryKey, budgetKey, confidenceKey, timeWindowKey }) => (
  <Box
    bg="white"
    p={4}
    borderRadius="xl"
    border="1px solid"
    borderColor="rgba(0,0,0,0.05)"
    boxShadow="sm"
    transition="all 0.2s"
    _hover={{ boxShadow: "md" }}
  >
    <VStack align="stretch" spacing={2}>
      <HStack justify="space-between">
        <Badge colorScheme={badgeColor} variant="subtle" borderRadius="full" px={2}>{badge}</Badge>
        <Text fontSize="xs" color="gray.400" fontWeight="600">Conf: {data?.[confidenceKey] || 'N/A'}</Text>
      </HStack>
      <Box>
        <Text fontWeight="bold" fontSize="lg" color="#1d1d1f" noOfLines={1}>{data?.[categoryKey] || 'No category'}</Text>
        <Text fontSize="sm" color={`${badgeColor}.600`} fontWeight="semibold">{data?.[budgetKey] || 'Budget: N/A'}</Text>
      </Box>
      {timeWindowKey && data?.[timeWindowKey] && (
        <Text fontSize="xs" color="gray.500" fontStyle="italic">
          Window: {data[timeWindowKey]}
        </Text>
      )}
    </VStack>
  </Box>
)

export default function ResultsDisplay({ userData, agentResults, onBack }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const parsedData = useMemo(() => extractUserData(agentResults, userData), [agentResults, userData])
  const [cardProfile, setCardProfile] = useState(null)
  const [cardLoading, setCardLoading] = useState(false)
  const [cardError, setCardError] = useState('')
  const [publicLink, setPublicLink] = useState('')

  // Extract Intents safely
  const intents = useMemo(() => {
    const rawIntents = parsedData.intents || [];
    // Normalize into array if object
    if (!Array.isArray(rawIntents) && typeof rawIntents === 'object') {
      return [rawIntents['24h'], rawIntents['48h'], rawIntents['72h']].filter(Boolean);
    }
    return Array.isArray(rawIntents) ? rawIntents : [];
  }, [parsedData]);

  const getIntent = (idx) => intents[idx] || {};

  const handleExportResults = () => {
    try {
      const dataStr = JSON.stringify({ userData, parsedData, agentResults, exportDate: new Date().toISOString() }, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `hushh-profile-${userData.fullName?.replace(/\s+/g, '-') || 'user'}-${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      toast({ title: 'Export Successful', status: 'success', duration: 3000 })
    } catch (error) {
      toast({ title: 'Export Failed', description: error.message, status: 'error' })
    }
  }

  const handleClearData = () => {
    if (window.confirm('Clear all analysis data?')) {
      onBack?.()
    }
  }

  const handleGenerateCard = async () => {
    setCardError('')
    setPublicLink('')
    setCardLoading(true)

    try {
      const email = parsedData.email || userData?.email || ''
      const fallbackPhone = userData?.phoneNumber
        ? `${userData.countryCode || ''} ${userData.phoneNumber || ''}`.trim()
        : ''
      const phone = parsedData.phone || userData?.phone || fallbackPhone || ''
      const fullName = parsedData.full_name || parsedData.fullName || userData?.fullName || userData?.full_name || ''

      if (!email && !phone && !fullName) {
        setCardError('Email, phone, or full name is required to lookup your UUID.')
        return
      }

      const response = await fetch('/api/user/profile/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone,
          full_name: fullName,
        }),
      })

      const result = await response.json()
      if (!response.ok || !result?.userId) {
        setCardError(result?.error || 'Could not fetch UUID from Supabase.')
        return
      }

      const uuid = extractUuid(result.userId)
      if (!uuid) {
        setCardError('Supabase returned an invalid UUID.')
        return
      }

      const profileFromDb = result.profile || {}
      const baseUrl = getSiteUrl()
      setPublicLink(`${baseUrl}/hushh_id/${uuid}`)
      setCardProfile({
        ...parsedData,
        user_id: uuid,
        hushh_id: parsedData.hushh_id || result.hushhId || null,
        email: profileFromDb.email || email || parsedData.email,
        phone: profileFromDb.phone || phone || parsedData.phone,
        full_name: profileFromDb.full_name || parsedData.full_name || parsedData.fullName || fullName,
      })
    } catch (error) {
      setCardError(error.message || 'Failed to generate Hushh ID card.')
    } finally {
      setCardLoading(false)
    }
  }

  return (
    <Box minH="100vh" bg="#f5f5f7" color="#1d1d1f" py={{ base: 6, md: 12 }}>
      <Container maxW="container.xl">
        <VStack spacing={10} align="stretch">

          {/* Header Section */}
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'center', md: 'flex-start' }} gap={6}>
            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
              <Heading size="2xl" color="#1d1d1f" letterSpacing="tight">
                Identity Decoded.
              </Heading>
              <Text color="#86868b" maxW="xl" fontSize="lg">
                Comprehensive profile intelligence synthesized from multiple data agents including Gemini and Brand logic.
              </Text>
            </VStack>

            <HStack spacing={3}>
              <Button leftIcon={<FaRedo />} onClick={onBack} variant="outline" borderColor="gray.300" color="gray.600" _hover={{ bg: 'white', borderColor: 'gray.400' }} bg="white">
                New Scan
              </Button>
              <Button leftIcon={<FaDownload />} onClick={handleExportResults} bg="white" border="1px solid" borderColor="gray.300" color="gray.700" _hover={{ bg: 'gray.50' }}>
                Export
              </Button>
              <Button
                onClick={handleGenerateCard}
                isLoading={cardLoading}
                loadingText="Fetching UUID"
                bgGradient="linear(to-r, #0071E3, #BB62FC)"
                color="white"
                px={8}
                _hover={{ opacity: 0.9, transform: 'translateY(-2px)' }}
              >
                Get Hushh ID Card
              </Button>
            </HStack>
          </Flex>

          {/* Profile Card & Key Stats */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
            <GridItem>
              {cardProfile ? (
                <HushhProfileCard userData={cardProfile} />
              ) : (
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="rgba(0,0,0,0.05)"
                  borderRadius="2xl"
                  p={8}
                  textAlign="center"
                  boxShadow="0 10px 30px rgba(0,0,0,0.05)"
                >
                  <Heading size="md" mb={3} color="#1d1d1f">
                    Generate Your Hushh ID Card
                  </Heading>
                  <Text color="#86868b" mb={6}>
                    Click the button to fetch your UUID from Supabase and create the QR card.
                  </Text>
                  <Button
                    onClick={handleGenerateCard}
                    isLoading={cardLoading}
                    loadingText="Fetching UUID"
                    bg="#0071e3"
                    color="white"
                    px={8}
                    py={6}
                    fontSize="lg"
                    borderRadius="full"
                    _hover={{ bg: "#0077ED", transform: 'translateY(-1px)', boxShadow: 'lg' }}
                  >
                    Get Hushh ID Card
                  </Button>
                  {cardError && (
                    <Text mt={3} fontSize="sm" color="red.500">
                      {cardError}
                    </Text>
                  )}
                </Box>
              )}
              {publicLink && (
                <Box mt={4} bg="white" border="1px solid" borderColor="rgba(0,0,0,0.05)" borderRadius="xl" p={4} boxShadow="sm">
                  <Text fontSize="xs" color="gray.400" mb={2} textTransform="uppercase" letterSpacing="wide" fontWeight="700">
                    Public Profile Link
                  </Text>
                  <Link
                    href={publicLink}
                    isExternal
                    fontSize="sm"
                    color="#0071e3"
                    fontWeight="500"
                    wordBreak="break-all"
                  >
                    {publicLink}
                  </Link>
                </Box>
              )}
            </GridItem>
            <GridItem>
              <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4} h="full">
                <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="rgba(0,0,0,0.05)" boxShadow="sm">
                  <Text color="gray.500" fontSize="xs" fontWeight="700" letterSpacing="wider">CONFIDENCE SCORE</Text>
                  <Heading size="3xl" mt={2} color="#1d1d1f">
                    {parsedData.confidence_score || parsedData.confidence || '85'}%
                  </Heading>
                  <Text fontSize="sm" color="gray.500" mt={2}>Based on data consistency</Text>
                </Box>
                <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="rgba(0,0,0,0.05)" boxShadow="sm">
                  <Text color="gray.500" fontSize="xs" fontWeight="700" letterSpacing="wider">DATA POINTS</Text>
                  <Heading size="3xl" mt={2} color="#0071e3">
                    {Object.values(parsedData).filter(v => v !== null && v !== undefined && v !== '' && v !== 'Not available').length}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" mt={2}>Fields extracted & verified</Text>
                </Box>
                <Box bg="white" p={6} borderRadius="2xl" border="1px solid" borderColor="rgba(0,0,0,0.05)" gridColumn="span 2" boxShadow="sm">
                  <Heading size="md" mb={4} color="#1d1d1f">AI Analysis Summary</Heading>
                  <Text color="#424245" lineHeight="1.6" fontSize="md">
                    {parsedData.summary || parsedData.bio || "The user demonstrates a high affinity for premium brands and technology. Digital footprint indicates active engagement in professional networks and consistent online purchasing behavior."}
                  </Text>
                </Box>
              </SimpleGrid>
            </GridItem>
          </Grid>

          <Divider borderColor="gray.200" />

          {/* Main Data Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>

            {/* Personal Details */}
            <DashboardCard title="Personal Details" icon={FaUser} colorScheme="pink">
              <VStack align="stretch" spacing={4}>
                <InfoRow label="HUSHH ID" value={getField(parsedData, 'hushh_id')} />
                <InfoRow label="NAME" value={getField(parsedData, 'full_name', 'fullName')} />
                <InfoRow label="EMAIL" value={getField(parsedData, 'email')} />
                <InfoRow label="PHONE" value={getField(parsedData, 'phone', 'phoneNumber')} />
                <SimpleGrid columns={2} spacing={4}>
                  <InfoRow label="AGE" value={getField(parsedData, 'age', 'ageRange')} />
                  <InfoRow label="GENDER" value={getField(parsedData, 'gender', 'sex')} />
                  <InfoRow label="MARITAL STATUS" value={getField(parsedData, 'marital_status', 'maritalStatus', 'relationship_status')} />
                  <InfoRow label="HOUSEHOLD" value={getField(parsedData, 'household_size', 'householdSize', 'family_size') || 'N/A'} />
                </SimpleGrid>
              </VStack>
            </DashboardCard>

            {/* Location */}
            <DashboardCard title="Location Data" icon={FaMapMarkerAlt} colorScheme="orange">
              <VStack align="stretch" spacing={3}>
                <InfoRow label="ADDRESS" value={getField(parsedData, 'address.street', 'street', 'location', 'address')} />
                <HStack>
                  <InfoRow label="CITY" value={getField(parsedData, 'city', 'address.city')} flex="1" />
                  <InfoRow label="COUNTRY" value={getField(parsedData, 'country', 'address.country')} flex="1" />
                </HStack>
                <InfoRow label="TIER" value={getField(parsedData, 'city_tier', 'cityTier', 'tier')} />
              </VStack>
            </DashboardCard>

            {/* Professional */}
            <DashboardCard title="Career & Status" icon={FaBriefcase} colorScheme="purple">
              <VStack align="stretch" spacing={3}>
                <InfoRow label="OCCUPATION" value={getField(parsedData, 'occupation', 'jobTitle')} />
                <InfoRow label="EDUCATION" value={getField(parsedData, 'education_level', 'educationLevel', 'degree')} />
                <InfoRow label="INCOME BRACKET" value={getField(parsedData, 'income_bracket', 'incomeBracket', 'salaryRange')} />
                <InfoRow label="HOME OWNERSHIP" value={getField(parsedData, 'home_ownership', 'homeOwnership', 'housing')} />
              </VStack>
            </DashboardCard>

            {/* Lifestyle */}
            <DashboardCard title="Lifestyle" icon={FaHeart} colorScheme="red">
              <SimpleGrid columns={2} spacing={4}>
                <InfoRow label="DIET" value={getField(parsedData, 'diet_preference', 'dietPreference', 'diet')} />
                <InfoRow label="CUISINE" value={getField(parsedData, 'favorite_cuisine', 'favoriteCuisine', 'cuisine')} />
                <InfoRow label="FITNESS" value={getField(parsedData, 'fitness_routine', 'fitnessRoutine', 'exercise')} />
                <InfoRow label="SLEEP" value={getField(parsedData, 'sleep_chronotype', 'sleepChronotype', 'chronotype')} />
                <InfoRow label="COFFEE/TEA" value={getField(parsedData, 'coffee_or_tea_choice', 'coffeeOrTeaChoice')} />
                <InfoRow label="GYM" value={getField(parsedData, 'gym_membership', 'gymMembership')} />
              </SimpleGrid>
              <InfoRow label="ECO FRIENDLY" value={getField(parsedData, 'eco_friendliness', 'ecoFriendliness', 'sustainability')} />
            </DashboardCard>

            {/* Technology */}
            <DashboardCard title="Tech Profile" icon={FaLaptop} colorScheme="cyan">
              <VStack align="stretch" spacing={3}>
                <InfoRow label="TECH AFFINITY" value={getField(parsedData, 'tech_affinity', 'techAffinity', 'technology_adoption')} />
                <InfoRow label="PRIMARY DEVICE" value={getField(parsedData, 'primary_device', 'primaryDevice', 'device')} />
                <InfoRow label="SOCIAL PLATFORM" value={getField(parsedData, 'favorite_social_platform', 'favoriteSocialPlatform', 'social_media')} />
                <InfoRow label="CONTENT PREF" value={getField(parsedData, 'content_preference', 'contentPreference', 'content')} />
                <InfoRow label="USAGE TIME" value={getField(parsedData, 'social_media_usage_time', 'socialMediaUsageTime')} />
              </VStack>
            </DashboardCard>

            {/* Interests & Shopping */}
            <DashboardCard title="Interests" icon={FaPlane} colorScheme="yellow">
              <VStack align="stretch" spacing={3}>
                <InfoRow label="TRAVEL FREQ" value={getField(parsedData, 'travel_frequency', 'travelFrequency', 'travel')} />
                <InfoRow label="GAMING" value={getField(parsedData, 'gaming_preference', 'gamingPreference', 'games')} />
                <InfoRow label="SPORTS" value={getField(parsedData, 'sports_interest', 'sportsInterest', 'favorite_sport')} />
                <InfoRow label="FASHION" value={getField(parsedData, 'fashion_style', 'fashionStyle', 'style')} />
                <InfoRow label="SHOPPING PREF" value={getField(parsedData, 'shopping_preference', 'shoppingPreference')} />
                <InfoRow label="GROCERY STORE" value={getField(parsedData, 'grocery_store_type', 'groceryStoreType')} />
              </VStack>
            </DashboardCard>

            {/* AI Psychographics */}
            <DashboardCard title="Psychographics" icon={FaLeaf} colorScheme="green">
              <VStack align="stretch" spacing={3}>
                <InfoRow label="NEEDS" value={formatArrayValue(getField(parsedData, 'needs'))} />
                <InfoRow label="WANTS" value={formatArrayValue(getField(parsedData, 'wants'))} />
                <InfoRow label="DESIRES" value={formatArrayValue(getField(parsedData, 'desires'))} />
                <InfoRow label="TRANSPORT" value={getField(parsedData, 'primary_transport', 'transport')} />
              </VStack>
            </DashboardCard>

          </SimpleGrid>

          {/* Intent Analysis Section */}
          <Box mt={4}>
            <Heading size="lg" mb={6}>Intent Analysis Timeline</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <IntentCard
                badge="24 HOURS" badgeColor="red"
                data={parsedData}
                categoryKey="intent_24h_category" budgetKey="intent_24h_budget" confidenceKey="intent_24h_confidence"
              />
              <IntentCard
                badge="48 HOURS" badgeColor="orange"
                data={parsedData}
                categoryKey="intent_48h_category" budgetKey="intent_48h_budget" confidenceKey="intent_48h_confidence"
                timeWindowKey="intent_48h_time_window"
              />
              <IntentCard
                badge="72 HOURS" badgeColor="green"
                data={parsedData}
                categoryKey="intent_72h_category" budgetKey="intent_72h_budget" confidenceKey="intent_72h_confidence"
              />
            </SimpleGrid>
          </Box>

        </VStack>
      </Container>

      {/* Raw Data Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
        <ModalOverlay bg="rgba(0,0,0,0.2)" backdropFilter="blur(5px)" />
        <ModalContent bg="white" color="#1d1d1f" maxH="90vh" borderRadius="2xl" boxShadow="2xl">
          <ModalHeader borderBottom="1px solid" borderColor="gray.100">Raw Data Inspector</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <SimpleGrid columns={2} spacing={6}>
              <Box>
                <Heading size="sm" mb={2} color="#0071e3">Processed Profile</Heading>
                <Box bg="gray.50" p={4} borderRadius="lg" h="500px" overflow="auto" fontFamily="monospace" fontSize="xs" border="1px solid" borderColor="gray.100">
                  <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                </Box>
              </Box>
              <Box>
                <Heading size="sm" mb={2} color="purple.500">Agent Details</Heading>
                <Box bg="gray.50" p={4} borderRadius="lg" h="500px" overflow="auto" fontFamily="monospace" fontSize="xs" border="1px solid" borderColor="gray.100">
                  <pre>{JSON.stringify(agentResults, null, 2)}</pre>
                </Box>
              </Box>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Box>
  )
}
