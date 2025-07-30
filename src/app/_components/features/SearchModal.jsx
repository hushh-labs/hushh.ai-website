"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Box,
  Input,
  Text,
  VStack,
  HStack,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Icon,
  Kbd,
  Spinner,
  useColorModeValue
} from "@chakra-ui/react";
import { SearchIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useResponsiveSizes } from "../../context/responsive";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [contentIndex, setContentIndex] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const router = useRouter();
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const { isDesktop, isTablet, isMobile } = useResponsiveSizes();
  
  // Apple-style colors
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(0, 0, 0, 0.95)");
  const overlayColor = useColorModeValue("rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.6)");
  const borderColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)");
  const textColor = useColorModeValue("#1d1d1f", "#f5f5f7");
  const secondaryTextColor = useColorModeValue("#86868b", "#a1a1a6");

  // Load content index and recent searches on mount
  useEffect(() => {
    const loadContentIndex = async () => {
      try {
        console.log('🔍 Loading search index from professional API...');
        
        // Fetch from our new search API endpoint
        const response = await fetch('/api/search');
        const data = await response.json();
        
        if (data.success && data.results) {
          console.log(`✅ Search index loaded with ${data.indexSize} total items (${data.totalResults} recent blogs)`);
          
          // Store both recent blogs and the full index for search
          setContentIndex(data.results); // Recent blogs for initial display
          
          // Store full index for searching
          window.hushhSearchIndex = data.results;
          
        } else {
          console.warn('⚠️ API returned unsuccessful response:', data);
          setContentIndex([]);
        }
        
      } catch (error) {
        console.error("❌ Error loading search index from API:", error);
        
        // Fallback - basic content if API fails
        const fallbackContent = [
          {
            id: 'home',
            title: 'Hushh - Your Data, Your Business',
            description: 'Transform how you control, share, and monetize your personal data with AI-powered privacy tools.',
            url: '/',
            type: 'page',
            category: 'Main Pages',
            author: 'Hushh Team',
            tags: ['home', 'privacy', 'data control']
          }
        ];
        
        console.log('🔄 Using fallback content');
        setContentIndex(fallbackContent);
      }
    };

    if (isOpen) {
      loadContentIndex();
      
      // Load recent searches from localStorage
      const stored = localStorage.getItem("hushh-recent-searches");
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing recent searches:", e);
        }
      }
    }
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Debounced search function using professional API
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim() || query.length < 2) {
        setSearchResults([]);
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      
      try {
        // Use our professional search API for live search
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=15`);
        const data = await response.json();
        
        if (data.success && data.results) {
          console.log(`🔍 Search "${query}" found ${data.totalResults} results`);
          setSearchResults(data.results);
          
          // Generate suggestions from API results
          const suggestionSet = new Set();
          
          data.results.forEach(item => {
            const title = item.title.toLowerCase();
            const queryLower = query.toLowerCase();
            
            // Add matching titles
            if (title.includes(queryLower)) {
              suggestionSet.add(item.title);
            }
            
            // Add matching tags
            (item.tags || []).forEach(tag => {
              if (tag.toLowerCase().includes(queryLower)) {
                suggestionSet.add(tag);
              }
            });
            
            // Add matching authors
            if (item.author && item.author.toLowerCase().includes(queryLower)) {
              suggestionSet.add(item.author);
            }
          });
          
          setSuggestions(Array.from(suggestionSet).slice(0, 6));
          
        } else {
          console.warn('Search API returned no results for:', query);
          setSearchResults([]);
          setSuggestions([]);
        }
        
      } catch (error) {
        console.error("❌ Search API error:", error);
        
        // Fallback to local search if API fails
        try {
          const results = searchContent(query, contentIndex);
          setSearchResults(results);
          
          const suggestionsList = generateSuggestions(query, contentIndex);
          setSuggestions(suggestionsList);
        } catch (fallbackError) {
          console.error("Fallback search also failed:", fallbackError);
          setSearchResults([]);
          setSuggestions([]);
        }
        
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [contentIndex]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);
    debouncedSearch(value);
  };

  // Handle result selection
  const handleResultSelect = (result) => {
    // Save to recent searches
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem("hushh-recent-searches", JSON.stringify(newRecentSearches));
    
    // Navigate to result
    router.push(result.url);
    onClose();
    setSearchQuery("");
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!searchResults.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleResultSelect(searchResults[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        onClose();
        break;
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSuggestions([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle recent search click
  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    debouncedSearch(search);
  };

  // Get icon for content type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'blog':
        return "📝";
      case 'product':
        return "🚀";
      case 'page':
        return "📄";
      case 'documentation':
        return "📚";
      default:
        return "🔍";
    }
  };

  // Get type badge color
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'blog':
        return "blue";
      case 'product':
        return "purple";
      case 'page':
        return "green";
      case 'documentation':
        return "orange";
      default:
        return "gray";
    }
  };

  // Highlight search term in text
  const highlightSearchTerm = (text, term) => {
    if (!term || !text) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <Text as="span" key={index} fontWeight="600" color="blue.500">
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="2xl"
      motionPreset="slideInTop"
      closeOnOverlayClick={true}
      closeOnEsc={true}
    >
      <ModalOverlay 
        bg={overlayColor}
        backdropFilter="blur(20px)"
        backdropSaturate="180%"
      />
      <ModalContent
        bg={bgColor}
        backdropFilter="saturate(180%) blur(20px)"
        border={`1px solid ${borderColor}`}
        borderRadius={{ base: "0", md: "16px" }}
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
        maxH="80vh"
        mt={{ base: 0, md: "10vh" }}
        mx={{ base: 0, md: "auto" }}
        overflow="hidden"
      >
        <Box p={0}>
          {/* Search Header */}
          <Flex
            align="center"
            px={6}
            py={4}
            borderBottom={`1px solid ${borderColor}`}
            position="relative"
          >
            <Icon as={SearchIcon} color={secondaryTextColor} mr={3} boxSize={5} />
            <Input
              ref={inputRef}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search Hushh..."
              variant="unstyled"
              fontSize="lg"
              color={textColor}
              _placeholder={{ color: secondaryTextColor }}
              bg="transparent"
              border="none"
              outline="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              autoComplete="off"
              spellCheck="false"
            />
            {isSearching && (
              <Spinner size="sm" color={secondaryTextColor} mr={2} />
            )}
            {searchQuery && !isSearching && (
              <Text 
                cursor="pointer" 
                onClick={clearSearch}
                color={secondaryTextColor}
                fontSize="sm"
                _hover={{ color: textColor }}
                mr={2}
              >
                Clear
              </Text>
            )}
            <ModalCloseButton 
              position="static" 
              color={secondaryTextColor}
              _hover={{ color: textColor }}
            />
          </Flex>

          {/* Search Content */}
          <Box maxH="60vh" overflowY="auto">
            {!searchQuery ? (
              // Empty State - Recent Searches
              <Box p={6}>
                {recentSearches.length > 0 && (
                  <VStack align="stretch" spacing={3}>
                    <Text fontSize="sm" fontWeight="600" color={secondaryTextColor} mb={2}>
                      Recent Searches
                    </Text>
                    {recentSearches.map((search, index) => (
                      <Flex
                        key={index}
                        align="center"
                        p={3}
                        borderRadius="8px"
                        cursor="pointer"
                        _hover={{ bg: "rgba(0, 0, 0, 0.05)" }}
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <Icon as={SearchIcon} color={secondaryTextColor} mr={3} boxSize={4} />
                        <Text color={textColor}>{search}</Text>
                      </Flex>
                    ))}
                  </VStack>
                )}
                
                {/* Quick Tips */}
                <Box mt={6} pt={6} borderTop={`1px solid ${borderColor}`}>
                  <Text fontSize="sm" fontWeight="600" color={secondaryTextColor} mb={4}>
                    Search Tips
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    <HStack>
                      <Kbd fontSize="xs">↑↓</Kbd>
                      <Text fontSize="sm" color={secondaryTextColor}>to navigate</Text>
                    </HStack>
                    <HStack>
                      <Kbd fontSize="xs">↵</Kbd>
                      <Text fontSize="sm" color={secondaryTextColor}>to select</Text>
                    </HStack>
                    <HStack>
                      <Kbd fontSize="xs">esc</Kbd>
                      <Text fontSize="sm" color={secondaryTextColor}>to close</Text>
                    </HStack>
                  </VStack>
                </Box>
              </Box>
            ) : searchResults.length > 0 ? (
              // Search Results
              <VStack spacing={0} align="stretch">
                {searchResults.map((result, index) => (
                  <Flex
                    key={result.id}
                    p={4}
                    cursor="pointer"
                    bg={selectedIndex === index ? "rgba(0, 122, 255, 0.1)" : "transparent"}
                    borderLeft={selectedIndex === index ? "3px solid #007AFF" : "3px solid transparent"}
                    _hover={{ bg: "rgba(0, 122, 255, 0.05)" }}
                    onClick={() => handleResultSelect(result)}
                    align="center"
                  >
                    <Text fontSize="lg" mr={3}>
                      {getTypeIcon(result.type)}
                    </Text>
                    <Box flex={1} minW={0}>
                      <HStack mb={1} spacing={2}>
                        <Text 
                          fontSize="md" 
                          fontWeight="600" 
                          color={textColor}
                          noOfLines={1}
                        >
                          {highlightSearchTerm(result.title, searchQuery)}
                        </Text>
                        <Badge 
                          colorScheme={getTypeBadgeColor(result.type)}
                          size="sm"
                          fontSize="xs"
                          textTransform="capitalize"
                        >
                          {result.type}
                        </Badge>
                      </HStack>
                      <Text 
                        fontSize="sm" 
                        color={secondaryTextColor} 
                        noOfLines={2}
                        lineHeight="1.4"
                      >
                        {highlightSearchTerm(result.description, searchQuery)}
                      </Text>
                      {result.author && (
                        <Text fontSize="xs" color={secondaryTextColor} mt={1}>
                          by {result.author}
                        </Text>
                      )}
                    </Box>
                    <ChevronRightIcon color={secondaryTextColor} boxSize={4} />
                  </Flex>
                ))}
              </VStack>
            ) : searchQuery.length >= 2 && !isSearching ? (
              // No Results
              <Box p={6} textAlign="center">
                <Text fontSize="lg" color={textColor} mb={2}>
                  No results found
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  Try different keywords or check your spelling
                </Text>
              </Box>
            ) : null}
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function searchContent(query, contentIndex) {
  if (!query || query.trim().length < 2 || !contentIndex.length) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const limit = 20;

  let results = contentIndex.filter(item => {
    // Search in searchableText (comprehensive search)
    const matchesContent = item.searchableText?.includes(searchTerm);
    
    // Search in keywords (exact and partial matches)
    const matchesKeywords = item.keywords?.some(keyword => 
      keyword.toLowerCase().includes(searchTerm)
    );
    
    // Title and description exact matches get higher priority
    const matchesTitle = item.title.toLowerCase().includes(searchTerm);
    const matchesDescription = item.description.toLowerCase().includes(searchTerm);
    
    return matchesContent || matchesKeywords || matchesTitle || matchesDescription;
  });

  // Sort by relevance
  results = results.map(item => {
    let relevanceScore = 0;
    
    // Title matches get highest score
    if (item.title.toLowerCase().includes(searchTerm)) {
      relevanceScore += 100;
      if (item.title.toLowerCase().startsWith(searchTerm)) {
        relevanceScore += 50; // Boost for title starting with search term
      }
    }
    
    // Description matches get high score
    if (item.description.toLowerCase().includes(searchTerm)) {
      relevanceScore += 50;
    }
    
    // Keyword matches get medium score
    if (item.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))) {
      relevanceScore += 30;
    }
    
    // Content matches get base score
    if (item.searchableText?.includes(searchTerm)) {
      relevanceScore += 10;
      
      // Count occurrences for frequency boost
      const occurrences = (item.searchableText.match(new RegExp(searchTerm, 'g')) || []).length;
      relevanceScore += occurrences * 2;
    }
    
    return { ...item, relevanceScore };
  });

  // Sort by relevance score (highest first)
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return results.slice(0, limit);
}

function generateSuggestions(query, contentIndex) {
  if (!query || query.trim().length < 2 || !contentIndex.length) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const suggestions = new Set();
  const limit = 8;

  // Extract suggestions from titles and keywords
  contentIndex.forEach(item => {
    // Add title if it contains the search term
    if (item.title.toLowerCase().includes(searchTerm)) {
      suggestions.add(item.title);
    }
    
    // Add matching keywords
    item.keywords?.forEach(keyword => {
      if (keyword.toLowerCase().includes(searchTerm)) {
        suggestions.add(keyword);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}

export default SearchModal; 