'use client'
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Heading,
  Text,
  Grid,
  GridItem,
  useToast,
  Select,
  Link as ChakraLink,
  Container,
  Icon,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
  Badge,
  SimpleGrid,
  Tooltip,
  Progress,
  useColorModeValue,
  Center,
  Image,
} from "@chakra-ui/react";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock, 
  FiMic, 
  FiMicOff, 
  FiUpload, 
  FiCalendar, 
  FiMessageCircle,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiGithub,
  FiVideo,
  FiPlayCircle,
  FiStopCircle,
  FiTrash2,
  FiDownload,
  FiExternalLink,
  FiGlobe,
  FiBuilding,
  FiUsers,
  FiSend,
  FiFile,
  FiX
} from "react-icons/fi";
import { FaWhatsapp, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import FooterComponent from "./FooterComponent";

const MotionBox = motion(Box);

const ContactForm = () => {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { isOpen: isVoiceModalOpen, onOpen: onVoiceModalOpen, onClose: onVoiceModalClose } = useDisclosure();
  const { isOpen: isVideoModalOpen, onOpen: onVideoModalOpen, onClose: onVideoModalClose } = useDisclosure();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal',
    department: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  // Company contact information
  const companyInfo = {
    headquarters: {
      title: "Global Headquarters",
      address: "1021 5th St W, Kirkland, WA 98033, United States",
      phone: "+1 (888) 462-1726",
      email: "hello@hushh.ai"
    },
    corporate: {
      title: "Corporate Office",
      address: "Innovation District, San Francisco, CA 94105, United States",
      phone: "+1 (555) 123-4567",
      email: "corporate@hushh.ai"
    },
    support: {
      title: "Customer Support",
      phone: "+1 (888) 462-1726",
      email: "support@hushh.ai",
      whatsapp: "+1 (888) 462-1726",
      hours: "24/7 Support Available"
    }
  };

  const socialLinks = [
    { icon: FaLinkedin, url: "https://www.linkedin.com/company/hushh-ai/", label: "LinkedIn", color: "#0077B5" },
    { icon: FaTwitter, url: "https://twitter.com/hushh_ai", label: "Twitter", color: "#1DA1F2" },
    { icon: FaInstagram, url: "https://instagram.com/hushh.ai", label: "Instagram", color: "#E4405F" },
    { icon: FaYoutube, url: "https://youtube.com/@hushhAI", label: "YouTube", color: "#FF0000" },
    { icon: FaGithub, url: "https://github.com/hushh-labs", label: "GitHub", color: "#333333" }
  ];

  useEffect(() => {
    let interval;
    if (isRecording || isVideoRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, isVideoRecording]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('audio/') || 
                         file.type.startsWith('video/') || 
                         file.type.startsWith('image/') ||
                         file.type === 'application/pdf';
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid files detected",
        description: "Please upload only audio, video, image, or PDF files under 50MB.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], `voice-note-${Date.now()}.wav`, { type: 'audio/wav' });
        setRecordedAudio(audioFile);
        setUploadedFiles(prev => [...prev, audioFile]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record voice notes.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      onVoiceModalClose();
    }
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(audioChunksRef.current, { type: 'video/webm' });
        const videoFile = new File([videoBlob], `video-message-${Date.now()}.webm`, { type: 'video/webm' });
        setRecordedVideo(videoFile);
        setUploadedFiles(prev => [...prev, videoFile]);
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      mediaRecorderRef.current.start();
      setIsVideoRecording(true);
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera and microphone access to record video messages.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isVideoRecording) {
      mediaRecorderRef.current.stop();
      setIsVideoRecording(false);
      onVideoModalClose();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openWhatsApp = () => {
    const phone = companyInfo.support.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(`Hi! I'm interested in learning more about Hushh. Can you help me?`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const openCalendly = () => {
    // Replace with your actual Calendly link
    window.open('https://calendly.com/hushh-team/consultation', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Please fill in all required fields correctly.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data including files
      const submitData = new FormData();
      
      // Add text fields
      submitData.append('full_name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('company', formData.company || '');
      submitData.append('phone', formData.phone || '');
      submitData.append('subject', formData.subject || 'General Inquiry');
      submitData.append('message', formData.message);
      submitData.append('preferred_contact', formData.preferredContact);
      submitData.append('urgency', formData.urgency);
      submitData.append('department', formData.department);
      
      // Add files
      uploadedFiles.forEach((file, index) => {
        submitData.append(`attachment_${index}`, file);
      });

      // For now, convert to JSON for the existing API
      const apiData = {
        full_name: formData.name,
        email: formData.email,
        company: formData.company || '',
        phone: formData.phone || '',
        subject: formData.subject || 'General Inquiry',
        message: `${formData.message}\n\nAdditional Info:\n- Preferred Contact: ${formData.preferredContact}\n- Urgency: ${formData.urgency}\n- Department: ${formData.department}\n- Attachments: ${uploadedFiles.length} file(s) uploaded`,
        preferred_contact: formData.preferredContact,
        urgency: formData.urgency,
        department: formData.department,
        has_attachments: uploadedFiles.length > 0,
        attachment_count: uploadedFiles.length
      };

      const response = await fetch('https://hushh-api-53407187172.us-central1.run.app/send-email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "Message sent successfully! 🎉",
        description: "We'll get back to you as soon as possible. Check your email for confirmation.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal',
        department: 'general'
      });
      setUploadedFiles([]);
      setRecordedAudio(null);
      setRecordedVideo(null);

    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly via WhatsApp.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const bgGradient = useColorModeValue(
    "white",
    "gray.900"
  );

  return (
    <>
    <Box bg={bgGradient} w="100%" py={{ base: 16, md: 24 }} minH="100vh">
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 12, md: 16 }}
        >
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            fontWeight="600"
            color="#1d1d1f"
            letterSpacing="-0.015em"
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"
            mb={4}
          >
            Get in Touch
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="#86868b"
            maxW="2xl"
            mx="auto"
            lineHeight={1.4}
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
          >
            Ready to take control of your data? Let's start a conversation about how Hushh can empower your digital journey.
          </Text>

          {/* Quick Action Buttons */}
          <HStack 
            spacing={4} 
            justify="center" 
            mt={8}
            flexWrap="wrap"
            gap={4}
          >
            <Button
              leftIcon={<FaWhatsapp />}
              bg="#25D366"
              color="white"
              onClick={openWhatsApp}
              borderRadius="12px"
              size="lg"
              fontWeight="500"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              px={8}
              _hover={{ 
                bg: "#128C7E",
                transform: "translateY(-1px)",
                boxShadow: "0 10px 25px rgba(37, 211, 102, 0.3)"
              }}
              transition="all 0.2s ease"
              border="none"
            >
              WhatsApp Chat
            </Button>
            <Button
              leftIcon={<FiCalendar />}
              bg="white"
              color="#007AFF"
              border="1px solid"
              borderColor="#007AFF"
              onClick={openCalendly}
              borderRadius="12px"
              size="lg"
              fontWeight="500"
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              px={8}
              _hover={{ 
                bg: "#007AFF",
                color: "white",
                transform: "translateY(-1px)",
                boxShadow: "0 10px 25px rgba(0, 122, 255, 0.3)"
              }}
              transition="all 0.2s ease"
            >
              Schedule Meeting
            </Button>
          </HStack>
        </MotionBox>

        {/* 🎯 TOP PRIORITY: Voice & Video Messaging Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          mb={{ base: 12, md: 16 }}
        >
          <Box
            bg="white"
            p={{ base: 8, md: 12 }}
            borderRadius="24px"
            boxShadow="0 20px 60px rgba(0, 0, 0, 0.08)"
            border="1px solid"
            borderColor="#f5f5f7"
            position="relative"
            overflow="hidden"
          >
            {/* Gradient accent */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="4px"
              bgGradient="linear(to-r, #007AFF, #34C759, #5856D6)"
            />
            
            <VStack spacing={8} textAlign="center">
              <Box>
                <Heading 
                  as="h2"
                  size={{ base: "lg", md: "xl" }}
                  color="#1d1d1f"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                  fontWeight="600"
                  letterSpacing="-0.015em"
                  mb={4}
                >
                  🎙️ Express Yourself Your Way
                </Heading>
                <Text 
                  fontSize={{ base: "md", md: "lg" }}
                  color="#86868b"
                  maxW="4xl"
                  mx="auto"
                  lineHeight={1.5}
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                >
                  Skip the typing. Record a quick voice note, send a video message, or upload files directly. 
                  Choose the most natural way to communicate with our team.
                </Text>
              </Box>
              
              {/* Featured Action Buttons */}
              <HStack 
                spacing={{ base: 4, md: 6 }} 
                justify="center" 
                flexWrap="wrap"
                gap={4}
              >
                <Button
                  leftIcon={<FiMic />}
                  onClick={onVoiceModalOpen}
                  bg="#007AFF"
                  color="white"
                  borderRadius="16px"
                  size="lg"
                  fontWeight="500"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                  px={8}
                  h="56px"
                  fontSize="md"
                  _hover={{ 
                    bg: "#0051D5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 35px rgba(0, 122, 255, 0.4)"
                  }}
                  transition="all 0.3s ease"
                  border="none"
                >
                  🎤 Record Voice Note
                </Button>
                
                <Button
                  leftIcon={<FiVideo />}
                  onClick={onVideoModalOpen}
                  bg="white"
                  color="#5856D6"
                  border="2px solid"
                  borderColor="#5856D6"
                  borderRadius="16px"
                  size="lg"
                  fontWeight="500"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                  px={8}
                  h="56px"
                  fontSize="md"
                  _hover={{ 
                    bg: "#5856D6",
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 35px rgba(88, 86, 214, 0.4)"
                  }}
                  transition="all 0.3s ease"
                >
                  📹 Record Video Message
                </Button>
                
                <Button
                  leftIcon={<FiUpload />}
                  onClick={() => fileInputRef.current?.click()}
                  bg="white"
                  color="#34C759"
                  border="2px solid"
                  borderColor="#34C759"
                  borderRadius="16px"
                  size="lg"
                  fontWeight="500"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                  px={8}
                  h="56px"
                  fontSize="md"
                  _hover={{ 
                    bg: "#34C759",
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 35px rgba(52, 199, 89, 0.4)"
                  }}
                  transition="all 0.3s ease"
                >
                  📎 Upload Files
                </Button>
              </HStack>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept="audio/*,video/*,image/*,.pdf"
                style={{ display: 'none' }}
              />
              
              {/* Feature highlights */}
              <HStack 
                spacing={8} 
                justify="center" 
                flexWrap="wrap"
                fontSize="sm"
                color="#86868b"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              >
                <HStack spacing={2}>
                  <Icon as={FiMic} color="#007AFF" />
                  <Text>HD Audio Recording</Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FiVideo} color="#5856D6" />
                  <Text>4K Video Messages</Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FiUpload} color="#34C759" />
                  <Text>Secure File Upload</Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </MotionBox>

        {/* Uploaded Files Display - Visible immediately after voice/video section */}
        {uploadedFiles.length > 0 && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            mb={{ base: 8, md: 12 }}
          >
            <Box
              bg="white"
              p={6}
              borderRadius="16px"
              boxShadow="0 8px 25px rgba(0, 0, 0, 0.05)"
              border="1px solid"
              borderColor="#f5f5f7"
            >
              <HStack mb={4} spacing={3}>
                <Icon as={FiUpload} color="#34C759" boxSize={5} />
                <Heading 
                  size="sm" 
                  color="#1d1d1f"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                  fontWeight="600"
                >
                  Uploaded Files ({uploadedFiles.length})
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {uploadedFiles.map((file, index) => (
                  <HStack 
                    key={index} 
                    p={3} 
                    bg="#f9f9f9" 
                    borderRadius="8px"
                    justify="space-between"
                  >
                    <HStack spacing={3}>
                      <Icon as={FiFile} color="#86868b" />
                      <Text 
                        fontSize="sm" 
                        color="#1d1d1f"
                        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                        fontWeight="500"
                      >
                        {file.name}
                      </Text>
                      <Text 
                        fontSize="xs" 
                        color="#86868b"
                        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                      >
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </Text>
                    </HStack>
                    <Button
                      size="xs"
                      variant="ghost"
                      color="#FF3B30"
                      onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                      _hover={{ bg: "#fff5f5" }}
                    >
                      <Icon as={FiX} />
                    </Button>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </MotionBox>
        )}

        <Grid
          templateColumns={{ base: "1fr", xl: "2fr 1fr" }}
          gap={{ base: 12, lg: 16 }}
          alignItems="start"
        >
          {/* Enhanced Contact Form */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box
              bg="white"
              p={{ base: 8, md: 10 }}
              borderRadius="20px"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.04)"
              border="1px solid"
              borderColor="#f5f5f7"
              position="relative"
              overflow="hidden"
            >

              <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                  <Heading 
                    size="md" 
                    mb={2} 
                    color="#1d1d1f" 
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                    fontWeight="600"
                    letterSpacing="-0.01em"
                  >
                    Contact Form
                  </Heading>
                  <Text 
                    color="#86868b"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                    fontSize="sm"
                  >
                    Prefer typing? Fill out the details below and we'll get back to you soon
                  </Text>
                </Box>

                <form onSubmit={handleSubmit}>
                  <VStack spacing={6} align="stretch">
                    {/* Personal Information */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl isRequired isInvalid={errors.name}>
                        <FormLabel 
                          fontWeight="500" 
                          color="#1d1d1f"
                          fontSize="md"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          mb={2}
                        >
                          Full Name
                        </FormLabel>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          size="lg"
                          borderRadius="12px"
                          borderColor="#d2d2d7"
                          _focus={{ 
                            borderColor: "#007AFF", 
                            boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.1)",
                            bg: "white"
                          }}
                          bg="#f5f5f7"
                          _hover={{ bg: "white", borderColor: "#a1a1a6" }}
                          transition="all 0.2s ease"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          h="48px"
                          fontSize="md"
                        />
                        {errors.name && (
                          <Text 
                            color="#FF3B30" 
                            fontSize="sm" 
                            mt={1}
                            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          >
                            {errors.name}
                          </Text>
                        )}
                      </FormControl>

                      <FormControl isRequired isInvalid={errors.email}>
                        <FormLabel 
                          fontWeight="500" 
                          color="#1d1d1f"
                          fontSize="md"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          mb={2}
                        >
                          Email Address
                        </FormLabel>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@company.com"
                          size="lg"
                          borderRadius="12px"
                          borderColor="#d2d2d7"
                          _focus={{ 
                            borderColor: "#007AFF", 
                            boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.1)",
                            bg: "white"
                          }}
                          bg="#f5f5f7"
                          _hover={{ bg: "white", borderColor: "#a1a1a6" }}
                          transition="all 0.2s ease"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          h="48px"
                          fontSize="md"
                        />
                        {errors.email && (
                          <Text 
                            color="#FF3B30" 
                            fontSize="sm" 
                            mt={1}
                            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          >
                            {errors.email}
                          </Text>
                        )}
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel 
                          fontWeight="500" 
                          color="#1d1d1f"
                          fontSize="md"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          mb={2}
                        >
                          Company / Organization
                        </FormLabel>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          size="lg"
                          borderRadius="12px"
                          borderColor="#d2d2d7"
                          _focus={{ 
                            borderColor: "#007AFF", 
                            boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.1)",
                            bg: "white"
                          }}
                          bg="#f5f5f7"
                          _hover={{ bg: "white", borderColor: "#a1a1a6" }}
                          transition="all 0.2s ease"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          h="48px"
                          fontSize="md"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel 
                          fontWeight="500" 
                          color="#1d1d1f"
                          fontSize="md"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          mb={2}
                        >
                          Phone Number
                        </FormLabel>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          size="lg"
                          borderRadius="12px"
                          borderColor="#d2d2d7"
                          _focus={{ 
                            borderColor: "#007AFF", 
                            boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.1)",
                            bg: "white"
                          }}
                          bg="#f5f5f7"
                          _hover={{ bg: "white", borderColor: "#a1a1a6" }}
                          transition="all 0.2s ease"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          h="48px"
                          fontSize="md"
                        />
                      </FormControl>
                    </SimpleGrid>

                    {/* Additional Options */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <FormControl>
                        <FormLabel fontWeight="600" color="gray.700">
                          Department
                        </FormLabel>
                        <Select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="xl"
                          borderColor="gray.300"
                          _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                          bg="gray.50"
                          _hover={{ bg: "white" }}
                          transition="all 0.2s"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="sales">Sales</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="media">Media & Press</option>
                          <option value="careers">Careers</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="600" color="gray.700">
                          Urgency Level
                        </FormLabel>
                        <Select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="xl"
                          borderColor="gray.300"
                          _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                          bg="gray.50"
                          _hover={{ bg: "white" }}
                          transition="all 0.2s"
                        >
                          <option value="low">Low - General inquiry</option>
                          <option value="normal">Normal - Standard response</option>
                          <option value="high">High - Priority response</option>
                          <option value="urgent">Urgent - Immediate attention</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="600" color="gray.700">
                          Preferred Contact
                        </FormLabel>
                        <Select
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="xl"
                          borderColor="gray.300"
                          _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                          bg="gray.50"
                          _hover={{ bg: "white" }}
                          transition="all 0.2s"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone Call</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="video">Video Call</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>

                    <FormControl>
                      <FormLabel fontWeight="600" color="gray.700">
                        Subject
                      </FormLabel>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Brief subject of your message"
                        size="lg"
                        borderRadius="xl"
                        borderColor="gray.300"
                        _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                        bg="gray.50"
                        _hover={{ bg: "white" }}
                        transition="all 0.2s"
                      />
                    </FormControl>

                    <FormControl isRequired isInvalid={errors.message}>
                      <FormLabel fontWeight="600" color="gray.700">
                        Message *
                      </FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        resize="vertical"
                        borderRadius="xl"
                        borderColor="gray.300"
                        _focus={{ borderColor: "#0071E3", boxShadow: "0 0 0 1px #0071E3" }}
                        bg="gray.50"
                        _hover={{ bg: "white" }}
                        transition="all 0.2s"
                      />
                      {errors.message && (
                        <Text color="red.500" fontSize="sm" mt={1}>{errors.message}</Text>
                      )}
                    </FormControl>





                    <Button
                      type="submit"
                      size="lg"
                      bg="#007AFF"
                      color="white"
                      borderRadius="12px"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                      leftIcon={<FiSend />}
                      _hover={{
                        bg: "#0051D5",
                        transform: "translateY(-1px)",
                        boxShadow: "0 10px 25px rgba(0, 122, 255, 0.3)"
                      }}
                      transition="all 0.2s ease"
                      fontWeight="500"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                      h="56px"
                      fontSize="md"
                      border="none"
                      _focus={{
                        boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.3)"
                      }}
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </VStack>
            </Box>
          </MotionBox>

          {/* Contact Information & Quick Actions */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <VStack spacing={8} align="stretch">
              {/* Company Information */}
              <Box
                bg="white"
                p={8}
                borderRadius="20px"
                boxShadow="0 8px 30px rgba(0, 0, 0, 0.04)"
                border="1px solid"
                borderColor="#f5f5f7"
              >
                <Heading 
                  size="lg" 
                  mb={6} 
                  color="#1d1d1f" 
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                  fontWeight="600"
                  letterSpacing="-0.01em"
                >
                  Contact Information
                </Heading>
                
                <VStack spacing={6} align="stretch">
                  {/* Headquarters */}
                  <Box 
                    p={5} 
                    bg="#f9f9f9" 
                    borderRadius="12px" 
                    border="1px solid" 
                    borderColor="#e5e5e7"
                  >
                    <Text 
                      fontWeight="600" 
                      color="#1d1d1f" 
                      mb={3}
                      fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                      fontSize="md"
                    >
                      {companyInfo.headquarters.title}
                    </Text>
                    <VStack align="start" spacing={2}>
                      <HStack spacing={3}>
                        <Icon as={FiMapPin} color="#007AFF" boxSize={4} />
                        <Text 
                          fontSize="sm" 
                          color="#86868b"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                        >
                          {companyInfo.headquarters.address}
                        </Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiPhone} color="#007AFF" boxSize={4} />
                        <ChakraLink 
                          href={`tel:${companyInfo.headquarters.phone}`} 
                          color="#007AFF"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          fontSize="sm"
                          _hover={{ textDecoration: "none", opacity: 0.8 }}
                        >
                          {companyInfo.headquarters.phone}
                        </ChakraLink>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiMail} color="#007AFF" boxSize={4} />
                        <ChakraLink 
                          href={`mailto:${companyInfo.headquarters.email}`} 
                          color="#007AFF"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          fontSize="sm"
                          _hover={{ textDecoration: "none", opacity: 0.8 }}
                        >
                          {companyInfo.headquarters.email}
                        </ChakraLink>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Corporate Office */}
                  <Box 
                    p={5} 
                    bg="#f9f9f9" 
                    borderRadius="12px" 
                    border="1px solid" 
                    borderColor="#e5e5e7"
                  >
                    <Text 
                      fontWeight="600" 
                      color="#1d1d1f" 
                      mb={3}
                      fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                      fontSize="md"
                    >
                      {companyInfo.corporate.title}
                    </Text>
                    <VStack align="start" spacing={2}>
                      <HStack spacing={3}>
                        <Icon as={FiMapPin} color="#5856D6" boxSize={4} />
                        <Text 
                          fontSize="sm" 
                          color="#86868b"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                        >
                          {companyInfo.corporate.address}
                        </Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiPhone} color="#5856D6" boxSize={4} />
                        <ChakraLink 
                          href={`tel:${companyInfo.corporate.phone}`} 
                          color="#5856D6"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          fontSize="sm"
                          _hover={{ textDecoration: "none", opacity: 0.8 }}
                        >
                          {companyInfo.corporate.phone}
                        </ChakraLink>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiMail} color="#5856D6" boxSize={4} />
                        <ChakraLink 
                          href={`mailto:${companyInfo.corporate.email}`} 
                          color="#5856D6"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          fontSize="sm"
                          _hover={{ textDecoration: "none", opacity: 0.8 }}
                        >
                          {companyInfo.corporate.email}
                        </ChakraLink>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Support */}
                  <Box 
                    p={5} 
                    bg="#f9f9f9" 
                    borderRadius="12px" 
                    border="1px solid" 
                    borderColor="#e5e5e7"
                  >
                    <Text 
                      fontWeight="600" 
                      color="#1d1d1f" 
                      mb={3}
                      fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                      fontSize="md"
                    >
                      {companyInfo.support.title}
                    </Text>
                    <VStack align="start" spacing={2}>
                      <HStack spacing={3}>
                        <Icon as={FiClock} color="#34C759" boxSize={4} />
                        <Text 
                          fontSize="sm" 
                          color="#86868b"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                        >
                          {companyInfo.support.hours}
                        </Text>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FiPhone} color="#34C759" boxSize={4} />
                        <ChakraLink 
                          href={`tel:${companyInfo.support.phone}`} 
                          color="#34C759"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          fontSize="sm"
                          _hover={{ textDecoration: "none", opacity: 0.8 }}
                        >
                          {companyInfo.support.phone}
                        </ChakraLink>
                      </HStack>
                      <HStack spacing={3}>
                        <Icon as={FaWhatsapp} color="#25D366" boxSize={4} />
                        <Button
                          size="sm"
                          bg="transparent"
                          color="#25D366"
                          variant="link"
                          onClick={openWhatsApp}
                          p={0}
                          h="auto"
                          fontWeight="500"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                          fontSize="sm"
                          _hover={{ opacity: 0.8, textDecoration: "none" }}
                        >
                          Chat on WhatsApp
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              </Box>

              {/* Social Media Links */}
              <Box
                bg="white"
                p={8}
                borderRadius="20px"
                boxShadow="0 8px 30px rgba(0, 0, 0, 0.04)"
                border="1px solid"
                borderColor="#f5f5f7"
              >
                <Heading 
                  size="md" 
                  mb={6} 
                  color="#1d1d1f" 
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                  fontWeight="600"
                  letterSpacing="-0.01em"
                >
                  Connect With Us
                </Heading>
                <VStack spacing={4}>
                  {socialLinks.map((social, index) => (
                    <ChakraLink
                      key={index}
                      href={social.url}
                      isExternal
                      w="full"
                      _hover={{ textDecoration: 'none' }}
                    >
                      <HStack
                        p={4}
                        bg="gray.50"
                        borderRadius="xl"
                        _hover={{ 
                          bg: "gray.100", 
                          transform: "translateY(-2px)",
                          boxShadow: "md"
                        }}
                        transition="all 0.2s"
                        spacing={4}
                      >
                        <Icon as={social.icon} boxSize={6} color={social.color} />
                        <VStack align="start" spacing={0} flex={1}>
                          <Text fontWeight="600" color="gray.800">
                            {social.label}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            Follow us on {social.label}
                          </Text>
                        </VStack>
                        <Icon as={FiExternalLink} color="gray.400" />
                      </HStack>
                    </ChakraLink>
                  ))}
                </VStack>
              </Box>

              {/* Calendly Integration */}
              <Box
                bg="white"
                p={8}
                borderRadius="20px"
                boxShadow="0 8px 30px rgba(0, 0, 0, 0.04)"
                border="1px solid"
                borderColor="#f5f5f7"
              >
                <Heading 
                  size="md" 
                  mb={4} 
                  color="#1d1d1f" 
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
                  fontWeight="600"
                  letterSpacing="-0.01em"
                >
                  Schedule a Meeting
                </Heading>
                <Text 
                  color="#86868b" 
                  mb={6} 
                  lineHeight={1.5}
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                  fontSize="md"
                >
                  Book a one-on-one consultation with our team to discuss your specific needs and explore how Hushh can help.
                </Text>
                <Button
                  onClick={openCalendly}
                  size="lg"
                  bg="#007AFF"
                  color="white"
                  leftIcon={<FiCalendar />}
                  rightIcon={<FiExternalLink />}
                  borderRadius="12px"
                  w="full"
                  fontWeight="500"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                  h="52px"
                  _hover={{
                    bg: "#0051D5",
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 25px rgba(0, 122, 255, 0.3)"
                  }}
                  transition="all 0.2s ease"
                  border="none"
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(0, 122, 255, 0.3)"
                  }}
                >
                  Book Meeting Now
                </Button>
              </Box>

              
            </VStack>
          </MotionBox>
        </Grid>
      </Container>

      {/* Voice Recording Modal */}
      <Modal isOpen={isVoiceModalOpen} onClose={onVoiceModalClose} size="md" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>🎙️ Record Voice Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Box textAlign="center">
                {isRecording ? (
                  <>
                    <Box
                      w={20}
                      h={20}
                      bg="red.500"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      mb={4}
                      animation="pulse 1.5s infinite"
                    >
                      <Icon as={FiMic} boxSize={10} color="white" />
                    </Box>
                    <Text fontWeight="bold" color="red.500" fontSize="lg">
                      Recording... {formatTime(recordingDuration)}
                    </Text>
                    <Progress value={(recordingDuration % 60) * (100/60)} colorScheme="red" mt={2} />
                  </>
                ) : (
                  <>
                    <Box
                      w={20}
                      h={20}
                      bg="blue.500"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      mb={4}
                    >
                      <Icon as={FiMic} boxSize={10} color="white" />
                    </Box>
                    <Text fontWeight="medium" color="gray.600">
                      Click to start recording your voice note
                    </Text>
                  </>
                )}
              </Box>

              <HStack spacing={4}>
                {!isRecording ? (
                  <Button
                    onClick={startVoiceRecording}
                    colorScheme="blue"
                    leftIcon={<FiPlayCircle />}
                    size="lg"
                  >
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={stopVoiceRecording}
                    colorScheme="red"
                    leftIcon={<FiStopCircle />}
                    size="lg"
                  >
                    Stop Recording
                  </Button>
                )}
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Video Recording Modal */}
      <Modal isOpen={isVideoModalOpen} onClose={onVideoModalClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>📹 Record Video Message</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Box
                w="full"
                h="300px"
                bg="gray.100"
                borderRadius="xl"
                overflow="hidden"
                position="relative"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                {isVideoRecording && (
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    bg="red.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    REC {formatTime(recordingDuration)}
                  </Box>
                )}
              </Box>

              <HStack spacing={4}>
                {!isVideoRecording ? (
                  <Button
                    onClick={startVideoRecording}
                    colorScheme="blue"
                    leftIcon={<FiPlayCircle />}
                    size="lg"
                  >
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={stopVideoRecording}
                    colorScheme="red"
                    leftIcon={<FiStopCircle />}
                    size="lg"
                  >
                    Stop Recording
                  </Button>
                )}
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
    <FooterComponent />
    </>
  );
};

export default ContactForm;