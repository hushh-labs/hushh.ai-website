import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, VStack, Flex, Icon, Badge, useBreakpointValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaShoppingBag,
  FaPlane,
  FaUsers,
  FaHeart,
  FaSearch,
  FaMapMarkerAlt,
  FaFingerprint,
  FaLaptop,
  FaShieldAlt,
  FaDatabase,
  FaLink,
  FaBolt
} from 'react-icons/fa';

const MotionBox = motion(Box);

// Font stack
const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// Removed broken keyframes pulse, using framer-motion instead

// Agent "Cards" that pop up
const AgentCard = ({ icon, name, action, side = 'left' }) => {
  const isLeft = side === 'left';
  return (
    <MotionBox
      layout
      initial={{ x: isLeft ? -40 : 40, opacity: 0, scale: 0.96 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.94 }}
      transition={{ duration: 0.45, type: "spring" }}
      position="relative"
      bg="white"
      p={{ base: 3, md: 4 }}
      borderRadius="2xl"
      boxShadow="0 10px 40px rgba(0,0,0,0.1)"
      w="100%"
      maxW={{ base: "100%", md: "260px" }}
      zIndex={2}
      backdropFilter="blur(10px)"
      border="1px solid rgba(0,0,0,0.05)"
    >
      <Flex align="center" gap={3}>
        <Box p={2} bg="gray.50" borderRadius="xl">
          <Icon as={icon} color="#0071e3" boxSize={5} />
        </Box>
        <VStack align="start" spacing={0}>
          <Text fontSize="xs" fontWeight="700" color="gray.400" textTransform="uppercase">{name}</Text>
          <Text fontSize="sm" fontWeight="600" color="#1d1d1f" lineHeight="1.3">{action}</Text>
        </VStack>
      </Flex>
    </MotionBox>
  );
};

const AGENT_TIMELINE = [
  { id: 'identity', icon: FaFingerprint, name: 'Identity Resolver', action: 'Linking verified identity signals...', side: 'left' },
  { id: 'location', icon: FaMapMarkerAlt, name: 'Location Enricher', action: 'Deriving city, state & zip details...', side: 'right' },
  { id: 'social', icon: FaUsers, name: 'Social Graph', action: 'Mapping your digital circles...', side: 'left' },
  { id: 'shopping', icon: FaShoppingBag, name: 'Shopping Signals', action: 'Finding brands you love...', side: 'right' },
  { id: 'travel', icon: FaPlane, name: 'Travel Pattern', action: 'Analyzing travel frequency...', side: 'left' },
  { id: 'lifestyle', icon: FaHeart, name: 'Lifestyle Sync', action: 'Understanding your daily rhythm...', side: 'right' },
  { id: 'tech', icon: FaLaptop, name: 'Device Insights', action: 'Assessing your primary devices...', side: 'left' },
  { id: 'content', icon: FaSearch, name: 'Content Signals', action: 'Learning content preferences...', side: 'right' },
  { id: 'intent', icon: FaBolt, name: 'Intent Forecaster', action: 'Projecting 24/48/72h intent...', side: 'left' },
  { id: 'trust', icon: FaShieldAlt, name: 'Trust Scorer', action: 'Calculating confidence score...', side: 'right' },
  { id: 'supabase', icon: FaDatabase, name: 'Supabase Sync', action: 'Writing profile to secure store...', side: 'left' },
  { id: 'link', icon: FaLink, name: 'Public Link Builder', action: 'Assembling your Hushh ID link...', side: 'right' }
];

const AnalyzingLoader = ({ progress }) => {
  const [agentsFound, setAgentsFound] = useState([]);
  const nextIndexRef = useRef(0);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const maxVisible = useBreakpointValue({ base: 6, md: 8, lg: 10 }) || 6;

  useEffect(() => {
    nextIndexRef.current = 0;
    setAgentsFound([]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgentsFound((prev) => {
        const idx = nextIndexRef.current % AGENT_TIMELINE.length;
        const baseAgent = AGENT_TIMELINE[idx];
        const agent = { ...baseAgent, uid: `${baseAgent.id}-${nextIndexRef.current}` };
        nextIndexRef.current += 1;
        const trimmed = [...prev, agent].slice(-maxVisible);
        return trimmed;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [maxVisible]);

  return (
    <Box
      minH="100vh"
      bg="#f5f5f7" // Apple Light Gray Background
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      fontFamily={fontFamily}
    >
      {/* Central "Persona" Builder */}
      <Box position="relative" zIndex={1} textAlign="center">
        <Box
          w="200px"
          h="200px"
          borderRadius="full"
          bg="white"
          boxShadow="0 20px 60px rgba(0,0,0,0.1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={8}
          mx="auto"
          position="relative"
        >
          {/* The "Brain" or "Core" pulsing */}
          <MotionBox
            w="120px"
            h="120px"
            borderRadius="full"
            bgGradient="linear(to-tr, #0071e3, #42a5f5)"
            animate={{
              scale: [0.95, 1.05, 0.95],
              boxShadow: [
                "0 0 0 0 rgba(0, 113, 227, 0.7)",
                "0 0 0 20px rgba(0, 113, 227, 0)",
                "0 0 0 0 rgba(0, 113, 227, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Orbital Rings */}
          <Box position="absolute" w="100%" h="100%" borderRadius="full" border="1px solid rgba(0,0,0,0.05)" />
          <Box position="absolute" w="140%" h="140%" borderRadius="full" border="1px dotted rgba(0,0,0,0.05)" opacity={0.5} />
        </Box>

        <VStack spacing={2}>
          <Text fontSize="2xl" fontWeight="700" color="#1d1d1f">
            Building Your Intelligence Profile
          </Text>
          <Text fontSize="md" color="#86868b" maxW="md" mx="auto">
            Our agents are securely connecting the dots to create your personalized Hushh ID.
          </Text>
        </VStack>
      </Box>

      {/* Floating Agent Cards */}
      {isMobile ? (
        <VStack
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          bottom="80px"
          w="90%"
          maxW="360px"
          spacing={3}
        >
          <AnimatePresence initial={false}>
            {agentsFound.map((agent) => (
              <AgentCard key={agent.uid} {...agent} />
            ))}
          </AnimatePresence>
        </VStack>
      ) : (
        <>
          <VStack
            position="absolute"
            top="12%"
            bottom="16%"
            left={{ base: "4%", md: "8%" }}
            w="260px"
            spacing={4}
            justify="space-between"
          >
            <AnimatePresence initial={false}>
              {agentsFound.filter((agent) => agent.side === 'left').map((agent) => (
                <AgentCard key={agent.uid} {...agent} />
              ))}
            </AnimatePresence>
          </VStack>
          <VStack
            position="absolute"
            top="12%"
            bottom="16%"
            right={{ base: "4%", md: "8%" }}
            w="260px"
            spacing={4}
            justify="space-between"
          >
            <AnimatePresence initial={false}>
              {agentsFound.filter((agent) => agent.side === 'right').map((agent) => (
                <AgentCard key={agent.uid} {...agent} />
              ))}
            </AnimatePresence>
          </VStack>
        </>
      )}

      {/* Bottom Status Pill */}
      <Box position="absolute" bottom={10} left="50%" transform="translateX(-50%)">
        <Badge
          bg="white"
          px={4}
          py={2}
          borderRadius="full"
          boxShadow="sm"
          color="gray.500"
          fontWeight="500"
          textTransform="none"
          fontSize="sm"
        >
          {Math.round(progress)}% Complete
        </Badge>
      </Box>

    </Box>
  );
};

export default AnalyzingLoader;
