import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Flex, Icon, Avatar, Badge } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingBag, FaPlane, FaUsers, FaHeart, FaSearch } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionText = motion(Text);

// Font stack
const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// Removed broken keyframes pulse, using framer-motion instead

// Agent "Cards" that pop up
const AgentCard = ({ icon, name, action, side = 'left', delay, top }) => {
  const isLeft = side === 'left';
  return (
    <MotionBox
      initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: delay, duration: 0.8, type: "spring" }}
      position="absolute"
      top={top} // Use fixed top position
      left={isLeft ? { base: "2%", md: "10%" } : undefined} // Move slightly closer to edge to avoid center
      right={!isLeft ? { base: "2%", md: "10%" } : undefined}
      bg="white"
      p={4}
      borderRadius="2xl"
      boxShadow="0 10px 40px rgba(0,0,0,0.1)"
      maxW="280px"
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
          <Text fontSize="sm" fontWeight="600" color="#1d1d1f" lineHeight="1.2">{action}</Text>
        </VStack>
      </Flex>
    </MotionBox>
  );
};

const AnalyzingLoader = ({ progress }) => {
  const [agentsFound, setAgentsFound] = useState([]);

  // Timeline of "Agents" appearing based on progress
  // Fixed positions to avoid overlap: Top-Left, Top-Right, Bottom-Left, Bottom-Right
  useEffect(() => {
    if (progress >= 0 && !agentsFound.some(a => a.id === 'social')) {
      setAgentsFound(prev => [...prev, { id: 'social', icon: FaUsers, name: 'Social Agent', action: 'Mapping your digital circles...', side: 'left', top: '20%' }]);
    }
    if (progress > 15 && !agentsFound.some(a => a.id === 'shopping')) {
      setAgentsFound(prev => [...prev, { id: 'shopping', icon: FaShoppingBag, name: 'Shopping Ace', action: 'Finding brands you love...', side: 'right', top: '25%' }]);
    }
    if (progress > 30 && !agentsFound.some(a => a.id === 'travel')) {
      setAgentsFound(prev => [...prev, { id: 'travel', icon: FaPlane, name: 'Travel Guide', action: 'Planning your next getaway...', side: 'left', top: '70%' }]);
    }
    if (progress > 45 && !agentsFound.some(a => a.id === 'lifestyle')) {
      setAgentsFound(prev => [...prev, { id: 'lifestyle', icon: FaHeart, name: 'Lifestyle Guru', action: 'Understanding your daily rhythm...', side: 'right', top: '75%' }]);
    }
  }, [progress]);

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
      <AnimatePresence>
        {agentsFound.map((agent, i) => (
          <AgentCard key={agent.id} {...agent} delay={0} />
        ))}
      </AnimatePresence>

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
