import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import { useResponsiveSizes } from "../../context/responsive";
import contentMap from "../productData/contentMap";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const isMobile = useResponsiveSizes();
  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const inputRef = useRef(null);
  const recommendationsRef = useRef(null);

  const updateRecommendations = (query) => {
    if (!query) {
      setRecommendations([]);
      setShowRecommendations(false);
      return;
    }

    const matched = contentMap.filter(
      (item) =>
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase())
        ) || item.content.toLowerCase().includes(query.toLowerCase())
    );

    setRecommendations(matched);
    setShowRecommendations(true);
  };

  useEffect(() => {
    updateRecommendations(searchQuery);
  }, [searchQuery]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    if (
      (inputRef.current &&
      !inputRef.current.contains(event.target) )
    ) {
      setIsClicked(false);
      setShowRecommendations(false);
    }  
  };
  const handleClick = (event) => {
    if (
      (inputRef.current && !inputRef.current.contains(event.target)) || (recommendationsRef.current && !recommendationsRef.current.contains(event.target))
    ) {
      setIsClicked(false);
      setShowRecommendations(false);
    }
  };
  
  const highlightMatchedText = (text, query) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index !== -1) {
      const startIndex = Math.max(0, isDesktop ? index - 10 : index - 25);
      const endIndex = Math.min(
        text.length,
        isDesktop ? index + query.length + 15 : index + query.length + 20
      );
      const highlightedText = text.substring(startIndex, endIndex);
      const formattedText = (
        <Text as="span" key={index}>
          ...{highlightedText.substring(0, index - startIndex)}
          <Text as="span" fontWeight="bold">
            {highlightedText.substring(
              index - startIndex,
              index - startIndex + query.length
            )}
          </Text>
          {highlightedText.substring(index - startIndex + query.length)}
          ...
        </Text>
      );
      return formattedText;
    }
    return <Text>{text}</Text>;
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      recommendationsRef.current &&
      !recommendationsRef.current.contains(event.target)
    ) {
      setIsClicked(false);
      setShowRecommendations(false);
    }
  };

  const handleScroll = () => {
    setIsClicked(false);
    setShowRecommendations(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <div onClick={() => setIsClicked(true)}>
      {!isClicked ? (
        <IconButton
          style={{marginTop: isDesktop ? '0.5rem':'0.5rem', marginRight: isDesktop ? '2rem':'0.1rem'}}
          icon={<SearchIcon color={"#606060"} boxSize={isDesktop ? 32 : 22} />}
          aria-label="Search"
          className="search-icon"
          onClick={() => setIsClicked(true)}
          colorScheme="#606060"
        />
      ) : (
        <>
          <Box
            position="fixed"
            top="0"
            left="0"
            width={{md:"100%", base:'60%'}}
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            backdropFilter="blur(5px)"
            zIndex="999"
            onClick={() => {
              setIsClicked(false);
              setShowRecommendations(false);
            }}
          />
          <Box
            position="fixed"
            top="75%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex="1000"
            width="100%"
            maxWidth="600px"
            bg="white"
            borderRadius="md"
            boxShadow="lg"
          >
            <VStack bg="#FFFFFF" spacing={4}  align="stretch">
              <Flex width="100%" position="fixed" p={'1rem'}>
                <Input
                  ref={inputRef}
                  placeholder="Search into our website"
                  value={searchQuery}
                  onChange={handleChange}
                  // variant="filled"
                  onPointerCancel={() => setIsClicked(false)}
                  borderRadius="none"
                  width={"100%"}
                  size="md"
                  // onPointerLeave={() => setIsClicked(false)}
                  color={'white'}
                  bg={'transparent'}
                  _hover={{ background: "transparent" }}
                  border={"1px solid #606060"}
                  _focus={{ color: "white",bg:'transparent', border: "1px solid #FFFFFF" }}
                  _placeholder={{ color: "gray.400" }}
                  px="4"
                  py="2"
                />
              </Flex>
              {showRecommendations && (
                <VStack
                  pos={'fixed'}
                  align="stretch"
                  zIndex="10"
                  // borderRadius={"16px"}
                  ref={recommendationsRef}
                  bg="white"
                  shadow="md"
                  maxH="300px"
                  minH={'100px'}
                  overflowY="auto"
                  p={8}
                  width="100%"
                  mt={50} // Changed from mt={3} to mt={0} to ensure it appears right below the input
                >
                  {recommendations.length === 0 ? (
                    <Box
                      p={3}
                      minW={{ base: "90%", md: "20rem" }}
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      display={"flex"}
                      gap={"1rem"}
                    >
                      <Text
                        color={"#111B29"}
                        fontSize={"1rem"}
                        fontWeight={"600"}
                      >
                        No results found
                      </Text>
                    </Box>
                  ) : (
                    recommendations.map((rec, index) => (
                      <Box
                        key={index}
                        onClick={() => {
                          router.push(rec.url);
                          setShowRecommendations(false);
                          setIsClicked(false);
                        }}
                        _hover={{ bg: "grey",color:'white',textColor:'white', cursor: "pointer" }}
                        p={3}
                        minW={{ base: "90%", md: "20rem" }}
                        borderBottom="1px solid"
                        borderColor="gray.200"
                        display={"flex"}
                        gap={"1rem"}
                      >
                        <Box>{rec.icon}</Box>
                        <Box display={"flex"} _hover={{ bg: "grey",color:'white',textColor:'white', cursor: "pointer" }} flexDirection={"column"}>
                          <Text
                            color={"#111B29"}
                            fontSize={"1rem"}
                            fontWeight={"600"}
                            
                          >
                            {highlightMatchedText(
                              rec.showRecommentationContentHeading,
                              searchQuery
                            )}
                          </Text>
                          <Text fontSize={"0.8rem"} fontWeight={"300"}>
                            {highlightMatchedText(
                              rec.showRecommentationContentDescription,
                              searchQuery
                            )}
                          </Text>
                          <Text fontSize={"0.7rem"} fontWeight={"300"}>
                            {highlightMatchedText(rec.content, searchQuery)}
                          </Text>
                        </Box>
                      </Box>
                    ))
                  )}
                </VStack>
              )}
            </VStack>
          </Box>
        </>
      )}
      </div>
    </>
  );
};

export default SearchBar;
