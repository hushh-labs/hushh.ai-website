"use client";
import React, { useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  Link,
  HStack,
  Divider,
  Flex,
  List,
  ListItem,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jobs } from "./jobs";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";

// const offices = ["Any", "Remote", "Palo Alto", "San Francisco", "Memphis", "Atlanta", "London", "Bay Area"];
// const departments = ["Any", "Research, Engineering & Product", "Human Data", "Data Center Operations", "Other"];

const CareerPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("Any");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("Any");
  const [selectedCategory, setSelectedCategory] = useState("Any");
  const router = useRouter();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const countries = ["Any", "India", "United States"];
  const employmentTypes = ["Any", "Internship", "Full-time"];
  const categories = [
    "Any",
    "Software Development",
    "Customer Success",
    "Data Science",
    "AI/ML",
    "Human Resources"
  ];
  const openRolesRef = useRef(null);

  const handleViewOpenRolesClick = () => {
    if (openRolesRef.current) {
      openRolesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesCountry =
      selectedCountry === "Any" || job.country === selectedCountry;
    const matchesEmploymentType =
      selectedEmploymentType === "Any" || job.employmentType === selectedEmploymentType;
    const matchesCategory =
      selectedCategory === "Any" || job.category === selectedCategory;
    return matchesCountry && matchesEmploymentType && matchesCategory;
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Ensure component is hydrated on the client
  }, []);

  if (!isHydrated) {
    return null; // Don't render anything until the client is hydrated
  }

  const handleJobClick = (id) => {
    router.push(`/job/${id}`); // Navigate to job details page
  };

  const renderDropdownFilter = (label, options, selected, setSelected) => {
    return (
      <HStack display={'flex'} flexDirection={'row'} spacing={4} w="100%" align="center">
        <Text flex={1} fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          {label}:
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg="black"
            flex={1}
            color="white"
            border="1px solid #444"
            _hover={{ bg: "#333" }}
            _expanded={{ bg: "#555" }}
            fontSize={{ base: "sm", md: "md" }}
          >
            {selected}
          </MenuButton>
          <MenuList bg="black" borderColor="#444">
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => setSelected(option)}
                bg="black"
                _hover={{ bg: "#333" }}
                color="white"
                fontSize={{ base: "sm", md: "md" }}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
    );
  };

  return (
    <>
      <Box
        p={5}
        w={"100%"}
        bg={"black"}
        fontFamily={"aktiv-grotesk ,sans-serif"}
      >
        <VStack mx={{ md: '3rem', base: '0' }} spacing={8} align="center" mt={{ md: "6rem", base: "2.75rem" }}>
          <Heading
            as="h1"
            textAlign={"center"}
            fontWeight={"300"}
            fontSize={{ md: "1.8rem", base: "0.9rem" }}
            color="#9fa1a3"
          >
            Careers at hushh.ai
          </Heading>
          <Text
            fontSize={{ md: "3.5rem", base: "1.75rem" }}
            fontWeight={"300"}
            textAlign={"center"}
            color="#fff"
            as={'h1'}
          >
            Join Hushh and Build the Future of AI
          </Text>
          <Text fontWeight={"300"}
            textAlign={"center"}
            px={{ base: 5, md: 10 }}
            color="#fff"
            fontSize={{md:'md',base:'sm'}}
            as={'h2'}
            >
          At Hushh, we are a team of passionate AI researchers and engineers on a mission to deepen humanity's understanding of the world through groundbreaking AI systems. We thrive on ambitious goals, rapid execution, and a shared sense of urgency. If you're ready to shape the future of AI, we want to hear from you.
          </Text>
          <HStack mt={{ md: '6rem', base: '3rem' }}  px={{ base: 0, md: 8 }}
            py={{ base: 6, md: 12 }} w={"100%"} gap={{ md: "1.25rem", base: "0.5rem" }}>
            <Text
              color={"#fff"}
              fontWeight={"500"}
              lineHeight={"1.2"}
              letterSpacing={"-0.25px"}
              fontSize={{ md: "1.5rem", base: "0.75rem" }}
            >
              Work at hushh.ai
            </Text>
            <Divider height={"1px"} stroke={"#9fa1a3"} />
            <Text
        color={"#9fa1a3"}
        fontWeight={"500"}
        cursor={'pointer'}
        whiteSpace="nowrap"
        lineHeight={"1.2"}
        letterSpacing={"-0.25px"}
        fontSize={{ md: "1.5rem", base: "0.75rem" }}
        position="relative"
        _after={{
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '2px',
          bottom: '0',
          left: '0',
          backgroundColor: '#fff',
          transform: 'scaleX(0)',
          transformOrigin: 'bottom right',
          transition: 'transform 0.25s ease-out',
        }}
        _hover={{
          _after: {
            transform: 'scaleX(1)',
            transformOrigin: 'bottom left',
          },
          color:'white'
        }}
        onClick={handleViewOpenRolesClick}
      >
        View open roles
      </Text>
          </HStack>
          <Box
            bg="black"
            color="white"
            // minH="100vh"
            w="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="flex-start"
            textAlign="left"
             px={{ base: 0, md: 8 }}
            // py={{ base: 6, md: 12 }}
          >
            {/* Text Block */}
            <Text
              fontSize={{ md: "1.15rem", base: "0.65rem" }}
              fontWeight="500"
              color="#e7e8e8"
              flex="0.4"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              Why Hushh ?
            </Text>

            {/* Content Block */}
            <VStack
              color="#ccc"
              fontSize={{ md: "1rem", base: "0.65rem" }}
              lineHeight={{ md: "2rem", base: "0.9rem" }}
              flex="0.6"
              align="start"
              spacing={4}
              // maxW="600px"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              textAlign="left"
            >
              <Text
                fontWeight="400"
                fontSize={{ md: "1rem", base: "0.65rem" }}
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign="left"
              >
          At Hushh, we are a team of passionate AI researchers and engineers on a mission to deepen humanity's understanding of the world through groundbreaking AI systems. We thrive on ambitious goals, rapid execution, and a shared sense of urgency. If you're ready to shape the future of AI, we want to hear from you.
          </Text>
            </VStack>
          </Box>

          <Box
            bg="black"
            color="white"
            // minH="100vh"
            w="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="flex-start"
            textAlign="left"
            px={{ base: 0, md: 8 }}
          >
            {/* Text Block */}
            <Text
              fontSize={{ md: "1.15rem", base: "0.65rem" }}
              fontWeight="500"
              color="#e7e8e8"
              flex="0.4"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              What We Do ?
            </Text>

            {/* Content Block */}
            <VStack
              color="#ccc"
              fontSize={{ md: "1rem", base: "0.65rem" }}
              lineHeight={{ md: "2rem", base: "0.9rem" }}
              flex="0.6"
              align="start"
              spacing={4}
              // maxW="600px"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              textAlign="left"
            >
              <Text
                fontWeight="400"
                fontSize={{ md: "1rem", base: "0.65rem" }}
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign="left"
              >
         We are pushing the boundaries of AI by tackling some of the field's most challenging problems. From developing advanced machine learning algorithms to creating innovative AI-powered applications, our work spans diverse domains. We’re constantly exploring new frontiers in AI research and development.
          </Text>
            </VStack>
          </Box>

          <Box
            bg="black"
            color="white"
            // minH="100vh"
            w="100%"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="flex-start"
            textAlign="left"
            px={{ base: 0, md: 8 }}
          >
            {/* Text Block */}
            <Text
              fontSize={{ md: "1.15rem", base: "0.65rem" }}
              fontWeight="500"
              color="#e7e8e8"
              flex="0.4"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              Our Culture
            </Text>

            {/* Content Block */}
            <VStack
              color="#ccc"
              fontSize={{ md: "1rem", base: "0.65rem" }}
              lineHeight={{ md: "2rem", base: "0.9rem" }}
              flex="0.6"
              align="start"
              spacing={4}
              // maxW="600px"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              textAlign="left"
            >
              <Text
                fontWeight="400"
                fontSize={{ md: "1rem", base: "0.65rem" }}
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign="left"
              >
At Hushh, we foster a fast-paced, collaborative environment where innovation thrives. Our "hustling" culture encourages team members to push boundaries, continuously learn, and contribute meaningfully to our mission.
</Text>
<Text fontWeight="400"
                fontSize={{ md: "1rem", base: "0.65rem" }}
                
                justifyContent="flex-start"
                alignItems="flex-start"
                textAlign="left">Our <span style={{fontWeight:'700'}}>Hushh Garages</span>  in Pune, and Mumbai integrate living and working spaces to promote seamless collaboration and vibrant community engagement.</Text>
            </VStack>
          </Box>


          <Box
            bg="black"
            color="white"
            minH="100vh"
            w="100%"
            px={{ base: 4, md: 8 }}
            pt={{ base: 6, md: 12 }}
          >
            {/* Header Section */}
         
            <Box
              mb={{md:8,base:2}}
              display={"flex"}
              flexDirection={"row"}
              gap={{ md: "2rem", base: "0.75rem" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={{ base: "md", md: "3xl" }}
                fontWeight="bold"
                mb={2}
                textAlign="left"
              >
                Perks and Other Benefits
              </Text>
              <Divider height={"1px"} borderColor="#9fa1a3" />
            </Box>
            {/* Main Content */}
            <Box
              display="flex"
              mt={{ md: "6rem", base: "2.2rem" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              
              {/* Left Section */}
              <Box
                flex={0.3}
                mb={{ base: 6, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text fontWeight={'500'} fontSize={{ base: "sm", md: "1.25rem" }} color="#e7e8e8">
                Employee Benefits
                </Text>
              </Box>

              {/* Right Section */}
              <Box flex={0.7} pl={{ md: 8, base: "0" }}>
                <VStack spacing={6} align="start">
                  <Text fontSize={{ base: "sm", md: "lg" }} color="#ccc">
                  We offer a comprehensive benefits package to support your well-being and professional growth:
                  </Text>
                  <UnorderedList  fontSize={{ base: "xs", md: "lg" }} display={'flex'} flexDirection={'column'} gap={{md:'1rem',base:'0.5rem'}} lineHeight={{md:'2rem',base:'1rem'}} color={'#ccc'}>
                    <ListItem> <span style={{fontWeight:'600'}}>Competitive Compensation: </span>Highly competitive cash and equity-based packages.</ListItem>
                    <ListItem> <span style={{fontWeight:'600'}}>Flexible PTO: </span>  Unlimited paid time off (subject to approval).</ListItem>
                    <ListItem display={'flex'}  flexDirection={'column'}> <span style={{fontWeight:'600'}}>Networking Opportunities: </span>
                    Collaborate with seasoned professionals and dynamic young innovators.
                     </ListItem>
                     <ListItem> <span style={{fontWeight:'600'}}>Garage Benefits:</span>  Employees working with the founding team at Hushh Garages receive:
                     <UnorderedList listStyleType="disc">
                       <ListItem>Free Wi-Fi, maintenance, and electricity.</ListItem>
                       <ListItem>Accommodation and food subsidies.</ListItem>
                     </UnorderedList>
                     </ListItem>

                  </UnorderedList>

                  <Text fontStyle="italic" color={'#ccc'}>Note: All applications and interviews are handled directly by our technical team via Google Meet—no recruiters involved.</Text>
                </VStack>
              </Box>
            </Box>
          </Box>


          <Box
            bg="black"
            color="white"
            minH="100vh"
            w="100%"
            px={{ base: 4, md: 8 }}
            py={{ base: 6, md: 12 }}
          >
            {/* Header Section */}
            <Box
              mb={{md:8,base:2}}
              display={"flex"}
              flexDirection={"row"}
              gap={{ md: "2rem", base: "0.75rem" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={{ base: "xl", md: "3xl" }}
                fontWeight="bold"
                mb={2}
                textAlign="left"
              >
                Locations
              </Text>
              <Divider height={"1px"} borderColor="#9fa1a3" />
            </Box>

            {/* Main Content */}
            <Box
              display="flex"
              mt={{ md: "6rem", base: "2.2rem" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              {/* Left Section */}
              <Box
                flex={0.3}
                mb={{ base: 6, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text fontWeight={'500'} fontSize={{ base: "sm", md: "1.25rem" }} color="#e7e8e8">
                  India (currently)
                </Text>
              </Box>

              {/* Right Section */}
              <Box flex={0.7} pl={{ md: 8, base: "0" }}>
                <VStack spacing={6} align="start">
                  <Text fontSize={{ base: "sm", md: "lg" }} color="#ccc">
                  We are hiring for on-site roles at our <span style={{fontWeight:'700'}}>Hushh Garages</span>  in:
                  </Text>

                  {/* Grid of Locations */}
                  <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    spacing={{ base: 4, md: 6 }}
                    w="100%"
                    mt={{ md: "2.5rem", base: "1.2rem" }}
                  >
                    {/* Palo Alto */}
                    <Box>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                         Palo Alto, California
                      </Text>
                    </Box>

                    {/* San Francisco */}
                    <Box>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                         San Francisco, CA 
                      </Text>
                    </Box>
                    
                    <Box>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                        Pune, India
                      </Text>
                    </Box>

                    

                  </SimpleGrid>
                  <Text fontSize={{ base: "sm", md: "lg" }} color={'#ccc'}>While all roles are on-site to foster our unique live-work culture, we may consider remote opportunities for exceptionally qualified candidates.
                  </Text>
<Text fontSize={{ base: "sm", md: "lg" }} fontWeight={'700'} color={'#ccc'}>Join Us:</Text>
                  <Text fontSize={{ base: "sm", md: "lg" }} color={'#ccc'}>
We’re excited to connect with talented individuals who share our passion for AI. Apply today and help us build the future of AI!
</Text>
                </VStack>
              </Box>
            </Box>
          </Box>

          <Box
            bg="black"
            color="white"
            minH="100vh"
            w="100%"
            px={{ base: 4, md: 8 }}
            py={{ base: 6, md: 12 }}
          >
            {/* Header Section */}
            <Box
              w={"100%"}
              mb={8}
              display={"flex"}
              flexDirection={"row"}
              gap={{ md: "2rem", base: "0.75rem" }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={{ base: "lg", md: "3xl" }}
                fontWeight="bold"
                mb={2}
                whiteSpace="nowrap"
                textAlign="left"
              >
                Application Process
              </Text>
              <Divider height={"1px"} borderColor="#9fa1a3" />
            </Box>

            {/* Main Content */}
            <Box
              display="flex"
              mt={{ md: "6rem", base: "2.2rem" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              {/* Left Section */}
              <Box
                flex={0.3}
                mb={{ base: 6, md: 0 }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Text fontWeight={'500'} fontSize={{ base: "md", md: "1.25rem" }} color="#e7e8e8">
                  Step-by-Step
                </Text>
              </Box>

              {/* Right Section */}
              <Box flex={0.7} pl={{ md: 8, base: "0" }}>
                <VStack spacing={6} align="start">
                  <Text fontSize={{ base: "sm", md: "lg" }} color="#ccc">
                  We ensure a quick and efficient hiring process:
                  </Text>
                  <OrderedList fontSize={{ base: "xs", md: "lg" }} display={'flex'} flexDirection={'column'} gap={{md:'1rem',base:'0.5rem'}} lineHeight={{md:'2rem',base:'1rem'}} color={'#ccc'}>
                    <ListItem> <span style={{fontWeight:'600'}}>Submit Your Application:</span> Apply online with your CV and a compelling statement showcasing your most challenging and impactful work. Candidates who complete the Hushh Proto Assignment (provided with the job details) will be given priority.</ListItem>
                    <ListItem> <span style={{fontWeight:'600'}}>Initial Review:</span> Our technical team will assess your skills, experience, potential, and submitted assignments.                    </ListItem>
                    <ListItem display={'flex'}  flexDirection={'column'}> <span style={{fontWeight:'600'}}>Technical Interviews (2 Rounds):</span>
                    <UnorderedList>
                      <ListItem> <span style={{fontWeight:'600'}}>1-on-1 Interviews: </span>Evaluate coding, systems design, or research expertise, depending on the role.
                      </ListItem>
                      <ListItem>
                      <span style={{fontWeight:'600'}}> Team Interview:</span> Deliver a 20-minute presentation on a complex technical challenge you’ve solved.

                      </ListItem>
                    </UnorderedList>
                     </ListItem>
                    <ListItem> <span style={{fontWeight:'600'}}>Decision: </span>We aim to complete the process within 1–2 weeks.                    </ListItem>

                  </OrderedList>

                  <Text fontStyle="italic" color={'#ccc'}>Note: All applications and interviews are handled directly by our technical team via Google Meet—no recruiters involved.</Text>
                </VStack>
              </Box>
            </Box>
          </Box>


          

          <Box
  bg="black"
  color="white"
  minH="100vh"
  w="100%"
  px={{ base: 4, md: 8 }}
  py={{ base: 6, md: 12 }}
  ref={openRolesRef}
>
  <Box
    mb={8}
    display="flex"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    gap={{ base: "0.75rem", md: "1rem" }}
  >
    <Text
      fontSize={{ base: "xl", md: "3xl" }}
      fontWeight="bold"
      color="white"
      whiteSpace="nowrap"
    >
      Open roles
    </Text>
    <Divider
      flex="1"
      borderColor="#9fa1a3"
      borderWidth="1px"
      orientation="horizontal"
    />
  </Box>

  {/* Filters and Job Listings */}
  {!isMobile && (
    <>
      {/* Country Filter */}
      <VStack align="start" spacing={4} mb={6}>
        <HStack spacing={4} flexWrap="wrap">
          <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
            Country:
          </Text>
          {countries.map((country) => (
            <Button
              key={country}
              variant="ghost"
              color={selectedCountry === country ? "white" : "#aaa"}
              fontWeight={selectedCountry === country ? "bold" : "normal"}
              _hover={{ color: "white" }}
              onClick={() => setSelectedCountry(country)}
            >
              {country}
            </Button>
          ))}
        </HStack>
        <Divider borderColor="#444" />
      </VStack>

      {/* Employment Type Filter */}
      <VStack align="start" spacing={4} mb={6}>
      <HStack spacing={4} flexWrap="wrap">
        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          Employment Type:
        </Text>
        {employmentTypes.map((type) => (
          <Button
            key={type}
            variant="ghost"
            color={selectedEmploymentType === type ? "white" : "#aaa"}
            fontWeight={selectedEmploymentType === type ? "bold" : "normal"}
            _hover={{ color: "white" }}
            onClick={() => setSelectedEmploymentType(type)}
          >
            {type}
          </Button>
        ))}
      </HStack>
      <Divider borderColor="#444" />
    </VStack>

      {/* Category Filter */}
      <VStack align="start" spacing={4} mb={6}>
        <HStack spacing={4} flexWrap="wrap">
          <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
            Category:
          </Text>
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              color={selectedCategory === category ? "white" : "#aaa"}
              fontWeight={selectedCategory === category ? "bold" : "normal"}
              _hover={{ color: "white" }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </HStack>
        <Divider borderColor="#444" />
      </VStack>
    </>
  )}

  {isMobile && (
    <VStack align="start" spacing={4} mb={6}>
      {/* Country Filter */}
      {renderDropdownFilter(
        "Country",
        countries,
        selectedCountry,
        setSelectedCountry
      )}
      <Divider borderColor="#444" />

      {/* Employment Type Filter */}
      {renderDropdownFilter(
        "Employment Type",
        employmentTypes,
        selectedEmploymentType,
        setSelectedEmploymentType
      )}
      <Divider borderColor="#444" />

      {/* Category Filter */}
      {renderDropdownFilter(
        "Category",
        categories,
        selectedCategory,
        setSelectedCategory
      )}
      <Divider borderColor="#444" />
    </VStack>
  )}

  {/* Job Listings */}
  <VStack align="start" spacing={6}>
    {filteredJobs.length > 0 ? (
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} w="100%">
        {filteredJobs.map((job) => (
          <HStack
            key={job.id}
            justifyContent="space-between"
            w="100%"
            borderBottom="1px solid #444"
            pb={2}
            spacing={4}
            onClick={() => handleJobClick(job.id)}
            cursor="pointer"
            _hover={{ borderColor: "white" }}
          >
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                {job.title}
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }} color="#aaa">
                {job.location}
              </Text>
            </VStack>
            <ArrowForwardIcon color="#aaa" />
          </HStack>
        ))}
      </SimpleGrid>
    ) : (
      <Text color="#aaa">No jobs found for the selected filters.</Text>
    )}
  </VStack>
</Box>

        </VStack>


      </Box>
    </>
  );
};

export default CareerPage;
