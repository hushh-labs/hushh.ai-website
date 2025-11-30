'use client'

import React, { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Code,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import ContentWrapper from '../../_components/layout/ContentWrapper'

const flattenObject = (obj, prefix = '') => {
  if (!obj || typeof obj !== 'object') return []
  return Object.entries(obj).flatMap(([key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenObject(value, nextKey)
    }
    return [{ key: nextKey, value }]
  })
}

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'object' && value !== null) return JSON.stringify(value)
  if (value === null || value === undefined || value === '') return 'Not available'
  return String(value)
}

const getField = (data, ...keys) => {
  for (const key of keys) {
    if (key.includes('.')) {
      const parts = key.split('.')
      let value = data
      for (const part of parts) {
        if (value && value[part] !== undefined && value[part] !== null) {
          value = value[part]
        } else {
          value = null
          break
        }
      }
      if (value !== null && value !== undefined && value !== '') return value
    } else if (data && data[key] !== undefined && data[key] !== null && data[key] !== '') {
      return data[key]
    }
  }
  return null
}

const extractProfile = (data) => {
  if (!data) return {}

  let responseData =
    data?.result?.status?.message?.parts?.[0]?.text ||
    data?.result?.artifacts?.[0]?.parts?.[0]?.text ||
    data?.result?.message?.parts?.[0]?.text ||
    data?.result?.response?.parts?.[0]?.text ||
    data?.data ||
    data

  if (typeof responseData === 'string') {
    try {
      const cleaned = responseData.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(cleaned)
      if (parsed && typeof parsed === 'object') {
        return parsed.userProfile || parsed
      }
    } catch (err) {
      return {}
    }
  }

  if (responseData && typeof responseData === 'object') {
    if (responseData.userProfile) return responseData.userProfile
    return responseData
  }

  return {}
}

export default function PublicPdaPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [payload, setPayload] = useState(null)
  const parsedProfile = useMemo(() => extractProfile(payload?.data), [payload?.data])

  useEffect(() => {
    if (!token) return
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`/api/pda/public?token=${encodeURIComponent(token)}`)
        const json = await res.json()
        if (!res.ok) {
          setError(json?.error || 'Unable to load data')
          return
        }
        setPayload(json)
      } catch (err) {
        setError(err?.message || 'Network error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token])

  const tableRows = useMemo(() => {
    const fields = [
      { label: 'Full Name', keys: ['fullName', 'full_name', 'name', 'fullname'] },
      { label: 'Email', keys: ['email', 'email_address', 'emailAddress'] },
      { label: 'Phone', keys: ['phone', 'phoneNumber', 'phone_number', 'contact'] },
      { label: 'Age', keys: ['age', 'age_range', 'ageRange'] },
      { label: 'Gender', keys: ['gender', 'sex'] },
      { label: 'Address', keys: ['address.street', 'address', 'street'] },
      { label: 'City', keys: ['address.city', 'city', 'town'] },
      { label: 'State', keys: ['address.state', 'state', 'province'] },
      { label: 'Postal Code', keys: ['address.postalCode', 'postalCode', 'zipCode', 'postal_code', 'zip_code'] },
      { label: 'Country', keys: ['address.country', 'country', 'nation'] },
      { label: 'Marital Status', keys: ['maritalStatus', 'marital_status', 'relationship_status'] },
      { label: 'Household Size', keys: ['householdSize', 'household_size', 'family_size'] },
      { label: 'Children Count', keys: ['childrenCount', 'children_count', 'number_of_children'] },
      { label: 'Occupation', keys: ['occupation', 'job', 'profession', 'job_title'] },
      { label: 'Education', keys: ['educationLevel', 'education_level', 'education', 'degree'] },
      { label: 'Income Bracket', keys: ['incomeBracket', 'income_bracket', 'income', 'salary_range'] },
      { label: 'Home Ownership', keys: ['homeOwnership', 'home_ownership', 'homeowner'] },
      { label: 'City Tier', keys: ['cityTier', 'city_tier', 'tier'] },
      { label: 'Diet Preference', keys: ['dietPreference', 'diet_preference', 'diet'] },
      { label: 'Favorite Cuisine', keys: ['favoriteCuisine', 'favorite_cuisine', 'cuisine_preference'] },
      { label: 'Coffee or Tea', keys: ['coffeeOrTeaChoice', 'coffee_or_tea_choice', 'beverage_preference'] },
      { label: 'Fitness Routine', keys: ['fitnessRoutine', 'fitness_routine', 'exercise', 'workout_frequency'] },
      { label: 'Gym Membership', keys: ['gymMembership', 'gym_membership', 'fitness_membership'] },
      { label: 'Shopping Preference', keys: ['shoppingPreference', 'shopping_preference', 'retail_preference'] },
      { label: 'Grocery Store Type', keys: ['groceryStoreType', 'grocery_store_type', 'store_type'] },
      { label: 'Fashion Style', keys: ['fashionStyle', 'fashion_style', 'style'] },
      { label: 'Transport', keys: ['transport', 'transportation', 'vehicle', 'travel_mode'] },
      { label: 'Sleep Chronotype', keys: ['sleepChronotype', 'sleep_chronotype', 'sleep_pattern'] },
      { label: 'Eco-Friendliness', keys: ['ecoFriendliness', 'eco_friendliness', 'sustainability'] },
      { label: 'Tech Affinity', keys: ['techAffinity', 'tech_affinity', 'technology_adoption'] },
      { label: 'Primary Device', keys: ['primaryDevice', 'primary_device', 'device'] },
      { label: 'Favorite Social Platform', keys: ['favoriteSocialPlatform', 'favorite_social_platform', 'social_media'] },
      { label: 'Social Media Usage Time', keys: ['socialMediaUsageTime', 'social_media_usage_time', 'usage_time'] },
      { label: 'Content Preference', keys: ['contentPreference', 'content_preference', 'media_preference'] },
      { label: 'Sports Interest', keys: ['sportsInterest', 'sports_interest', 'favorite_sport'] },
      { label: 'Gaming Preference', keys: ['gamingPreference', 'gaming_preference', 'games'] },
      { label: 'Travel Frequency', keys: ['travelFrequency', 'travel_frequency', 'trip_frequency'] },
      { label: 'Needs', keys: ['needs', 'user_needs', 'requirements'], formatter: formatValue },
      { label: 'Wants', keys: ['wants', 'user_wants', 'preferences'], formatter: formatValue },
      { label: 'Desires', keys: ['desires', 'user_desires', 'wishes'], formatter: formatValue },
      { label: '24h Intent Category', keys: ['intents.24h.category', 'intent24h.category'] },
      { label: '24h Intent Budget', keys: ['intents.24h.budget', 'intent24h.budget'] },
      { label: '24h Intent Time Window', keys: ['intents.24h.timeWindow', 'intents.24h.time_window', 'intent24h.timeWindow'] },
      { label: '24h Intent Confidence', keys: ['intents.24h.confidence', 'intent24h.confidence'] },
      { label: '48h Intent Category', keys: ['intents.48h.category', 'intent48h.category'] },
      { label: '48h Intent Budget', keys: ['intents.48h.budget', 'intent48h.budget'] },
      { label: '48h Intent Time Window', keys: ['intents.48h.timeWindow', 'intents.48h.time_window', 'intent48h.timeWindow'] },
      { label: '48h Intent Confidence', keys: ['intents.48h.confidence', 'intent48h.confidence'] },
      { label: '72h Intent Category', keys: ['intents.72h.category', 'intent72h.category'] },
      { label: '72h Intent Budget', keys: ['intents.72h.budget', 'intent72h.budget'] },
      { label: '72h Intent Time Window', keys: ['intents.72h.timeWindow', 'intents.72h.time_window', 'intent72h.timeWindow'] },
      { label: '72h Intent Confidence', keys: ['intents.72h.confidence', 'intent72h.confidence'] },
    ]

    return fields
      .map(({ label, keys, formatter }) => {
        const rawValue = getField(parsedProfile, ...keys)
        const value = rawValue !== null && rawValue !== undefined && rawValue !== '' ? (formatter ? formatter(rawValue) : formatValue(rawValue)) : null
        return { label, value }
      })
      .filter(row => row.value && row.value !== 'Not available')
  }, [parsedProfile])

  const viewerUrl = useMemo(() => {
    if (!token || typeof window === 'undefined') return ''
    return `${window.location.origin}/pda/public?token=${token}`
  }, [token])

  const apiUrl = useMemo(() => {
    if (!token || typeof window === 'undefined') return ''
    return `${window.location.origin}/api/pda/public?token=${token}`
  }, [token])

  const copyToClipboard = (value, label) => {
    if (!value) return
    navigator?.clipboard?.writeText(value).then(() => {
      toast({
        title: `${label} copied`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }).catch(() => {
      toast({
        title: `Could not copy ${label}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    })
  }

  const downloadJson = () => {
    if (!payload?.data) return
    const dataStr = JSON.stringify(payload.data, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `public-pda-${payload?.user?.fullName || 'user'}-${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadCsv = () => {
    if (!tableRows.length) return
    const rows = tableRows.map(({ label, value }) => `"${label.replace(/"/g, '""')}","${String(value).replace(/"/g, '""')}"`)
    const blob = new Blob([`field,value\n${rows.join('\n')}`], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `public-pda-${payload?.user?.fullName || 'user'}-${Date.now()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const shareViewerLink = async () => {
    if (!viewerUrl) return
    try {
      if (navigator?.share) {
        await navigator.share({ title: 'Hushh PDA Snapshot', url: viewerUrl })
      } else {
        await navigator?.clipboard?.writeText(viewerUrl)
        toast({
          title: 'Viewer link copied',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      }
    } catch (err) {
      toast({
        title: 'Unable to share',
        description: err?.message || 'Please copy the link instead.',
        status: 'error',
        duration: 2500,
        isClosable: true,
      })
    }
  }

  return (
    <ContentWrapper>
      <Box bg="#0b1220" color="white" minH="100vh" py={{ base: 8, md: 12 }}>
        <Container maxW="6xl">
          <Stack spacing={6}>
            <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={4} wrap="wrap">
              <Box>
                <Text fontSize="xs" letterSpacing="widest" textTransform="uppercase" color="gray.400" fontWeight="700">
                  Public Data Agent
                </Text>
                <Heading size={{ base: 'lg', md: 'xl' }} color="white" mt={1}>
                  Shareable PDA snapshot
                </Heading>
                <Text color="gray.300" mt={2} maxW="3xl">
                  This page uses the MuleSoft Public Data Agent to fetch and present a user profile. Share the API endpoint or this viewer to let others consume the same snapshot.
                </Text>
              </Box>
              <HStack spacing={3}>
                <Button size="sm" bg="green.500" color="white" _hover={{ bg: 'green.600' }} onClick={() => viewerUrl && window.open(viewerUrl, '_blank')} isDisabled={!viewerUrl}>
                  Open viewer
                </Button>
                <Button size="sm" variant="outline" borderColor="gray.600" color="white" _hover={{ bg: 'whiteAlpha.100' }} onClick={() => copyToClipboard(viewerUrl, 'Viewer link')} isDisabled={!viewerUrl}>
                  Copy viewer link
                </Button>
                <Button size="sm" variant="outline" borderColor="gray.600" color="white" _hover={{ bg: 'whiteAlpha.100' }} onClick={shareViewerLink} isDisabled={!viewerUrl}>
                  Share
                </Button>
                <Button size="sm" variant="outline" borderColor="gray.600" color="white" _hover={{ bg: 'whiteAlpha.100' }} onClick={() => copyToClipboard(apiUrl, 'API link')} isDisabled={!apiUrl}>
                  Copy API link
                </Button>
              </HStack>
            </Flex>

            {!token && (
              <Alert status="warning" bg="yellow.900" borderColor="yellow.700" borderWidth="1px">
                <AlertIcon />
                <Box>
                  <AlertTitle>Missing token</AlertTitle>
                  <AlertDescription>Pass a token in the URL (?token=...) to view a public PDA snapshot.</AlertDescription>
                </Box>
              </Alert>
            )}

            {token && (
              <Box bg="#0f172a" borderRadius="16px" borderWidth="1px" borderColor="gray.700" p={{ base: 4, md: 6 }}>
                {loading && (
                  <Flex align="center" justify="center" py={10} gap={3}>
                    <Spinner color="green.300" />
                    <Text color="gray.300">Fetching from MuleSoft...</Text>
                  </Flex>
                )}

                {!loading && error && (
                  <Alert status="error" bg="red.900" borderColor="red.700" borderWidth="1px">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Unable to load data</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Box>
                  </Alert>
                )}

                {!loading && !error && payload && (
                  <Stack spacing={6}>
                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap={4}>
                      <Box>
                        <Heading size="md" color="white">{payload?.user?.fullName || parsedProfile.fullName || parsedProfile.name || 'User profile'}</Heading>
                        <Text color="gray.300" fontSize="sm">
                          {payload?.user?.email || parsedProfile.email || 'No email'} · {payload?.user?.phone || parsedProfile.phone || 'No phone'}
                        </Text>
                      </Box>
                      <HStack spacing={3}>
                        <Button size="sm" onClick={downloadJson} bg="green.500" _hover={{ bg: 'green.600' }}>
                          Download JSON
                        </Button>
                        <Button size="sm" variant="outline" borderColor="gray.700" color="white" _hover={{ bg: 'whiteAlpha.100' }} onClick={downloadCsv} isDisabled={!tableRows.length}>
                          Download table CSV
                        </Button>
                      </HStack>
                    </Flex>

                    <Box bg="gray.800" borderRadius="12px" p={4} borderWidth="1px" borderColor="gray.700">
                      <Text fontSize="xs" color="gray.300">Endpoint</Text>
                      <Code mt={1} p={3} borderRadius="10px" w="full" whiteSpace="pre-wrap" wordBreak="break-all" bg="rgba(255,255,255,0.06)" color="white" borderWidth="1px" borderColor="gray.600">
                        GET {apiUrl || '/api/pda/public?token={token}'}
                      </Code>
                    </Box>

                    <Tabs variant="enclosed" colorScheme="green">
                      <TabList>
                        <Tab>Table</Tab>
                        <Tab>JSON</Tab>
                        <Tab>Metadata</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel px={0}>
                          <Box overflowX="auto" borderWidth="1px" borderColor="gray.800" borderRadius="12px">
                            <Table size="sm" variant="simple">
                              <Thead bg="gray.800">
                                <Tr>
                                  <Th color="gray.300">Field</Th>
                                  <Th color="gray.300">Value</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {tableRows.length === 0 && (
                                  <Tr>
                                    <Td colSpan={2}>
                                      <Text color="gray.400">No data returned from the agent.</Text>
                                    </Td>
                                  </Tr>
                                )}
                                {tableRows.map(({ label, value }) => (
                                  <Tr key={label} borderBottomColor="gray.800">
                                    <Td color="gray.200" fontWeight="700" maxW="240px">{label}</Td>
                                    <Td color="gray.100" maxW="520px" whiteSpace="pre-wrap">{value}</Td>
                                  </Tr>
                                ))}
                              </Tbody>
                            </Table>
                          </Box>
                        </TabPanel>
                        <TabPanel px={0}>
                          <Box bg="black" borderRadius="12px" borderWidth="1px" borderColor="gray.800" p={4} maxH="520px" overflow="auto">
                            <pre style={{ margin: 0, fontSize: '13px', color: '#e5e7eb' }}>
                              {JSON.stringify(payload.data, null, 2)}
                            </pre>
                          </Box>
                        </TabPanel>
                        <TabPanel px={0}>
                          <Stack spacing={3}>
                            <Box bg="gray.800" borderRadius="12px" p={4} borderWidth="1px" borderColor="gray.700">
                              <Text fontSize="sm" color="gray.300">Fetched at</Text>
                              <Text fontWeight="600">{payload.fetchedAt}</Text>
                            </Box>
                            <Box bg="gray.800" borderRadius="12px" p={4} borderWidth="1px" borderColor="gray.700">
                              <Text fontSize="sm" color="gray.300">Upstream status</Text>
                              <Text fontWeight="600">{payload.upstreamStatus}</Text>
                            </Box>
                            <Box bg="gray.800" borderRadius="12px" p={4} borderWidth="1px" borderColor="gray.700">
                              <Text fontSize="sm" color="gray.300" mb={2}>Prompt sent to MuleSoft</Text>
                              <Box bg="black" borderRadius="8px" p={3} borderWidth="1px" borderColor="gray.700">
                                <pre style={{ margin: 0, fontSize: '12px', whiteSpace: 'pre-wrap', color: '#e5e7eb' }}>
                                  {payload.prompt}
                                </pre>
                              </Box>
                            </Box>
                          </Stack>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Stack>
                )}
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
    </ContentWrapper>
  )
}
