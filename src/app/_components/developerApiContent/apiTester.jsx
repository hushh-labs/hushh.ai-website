import {
  Badge,
  Box,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  useDisclosure,
  VStack,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

const FALLBACK_BASE_URL = "https://hushh.ai";

const resolveBaseUrl = (endpointBaseUrl) => {
  if (endpointBaseUrl) {
    return endpointBaseUrl;
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return FALLBACK_BASE_URL;
};

/**
 * Generates a dummy JSON object based on the endpoint.requestBody definition.
 * @param {Object} requestBodyDefinition - The requestBody object from your endpoint, e.g.:
 * {
 *   phone_number: { type: "string" },
 *   access_token: { type: "string" },
 *   brand: { type: "string" },
 *   purchase_amount: { type: "number" },
 *   answers: {
 *     type: "array",
 *     items: {
 *       type: "object",
 *       additionalProperties: { type: "string" }
 *     }
 *   }
 * }
 */
function generateDummyData(requestBodyDefinition) {
  const result = {};

  for (const [key, definition] of Object.entries(requestBodyDefinition)) {
    const fieldType = definition.type;

    if (fieldType === "string") {
      if (key === "text") {
        result[key] =
          "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.";
      } else if (key === "sessionId") {
        result[key] = "session-456";
      } else if (key === "id") {
        result[key] = "task-124";
      } else {
        // Provide a generic string placeholder
        result[key] = `dummy_${key}`;
      }
    } else if (fieldType === "number") {
      // Provide a generic numeric placeholder
      result[key] = 123;
    } else if (fieldType === "array") {
      // If it's an array, decide what dummy content to insert
      // Example: if items are objects, add a single object with sampleKey
      if (definition.items?.type === "object") {
        // We can guess a simple structure
        result[key] = [
          {
            sampleKey: "sampleValue",
          },
        ];
      } else {
        // Maybe an array of strings or numbers
        result[key] = ["sampleItem1", "sampleItem2"];
      }
    } else {
      // Fallback for unknown types or nested objects
      result[key] = `dummy_${key}`;
    }
  }

  return JSON.stringify(result, null, 2);
}

const ApiSection = ({ endpoint, apiKey }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [localApiKey] = useState(apiKey || "");

  // Query parameters
  const [queryParams, setQueryParams] = useState(
    endpoint?.queryParams?.reduce((acc, param) => {
      acc[param.name] = "";
      return acc;
    }, {}) || {}
  );

  // Header parameters
  const [headerParams, setHeaderParams] = useState(
    endpoint?.headers?.reduce((acc, header) => {
      acc[header.name] = "";
      return acc;
    }, {}) || {}
  );

  // Generate a dummy JSON string if requestBody is defined
  const initialJsonBody = endpoint?.requestBody
    ? generateDummyData(endpoint.requestBody)
    : "";

  const [jsonBody, setJsonBody] = useState(initialJsonBody);

  // Response & requested URL
  const [response, setResponse] = useState(null);
  const [requestedUrl, setRequestedUrl] = useState("");

  const handleInputChange = (setter, key, value) => {
    setter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    // Construct query string
    const queryString = new URLSearchParams(queryParams).toString();
    const baseUrl = resolveBaseUrl(endpoint?.baseUrl);
    const isAbsolutePath = /^https?:\/\//i.test(endpoint?.path || "");
    const urlRoot = isAbsolutePath ? "" : baseUrl;
    const fullUrl = `${urlRoot}${endpoint.path}${
      queryString ? "?" + queryString : ""
    }`;
    setRequestedUrl(fullUrl);

    // Prepare headers
    const finalHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localApiKey}`,
      ...headerParams,
    };

    // Parse the JSON body if the method is not GET
    let parsedBody = {};
    if (endpoint.method !== "GET") {
      if (jsonBody.trim()) {
        try {
          parsedBody = JSON.parse(jsonBody);
        } catch (error) {
          setResponse("Invalid JSON in request body");
          return;
        }
      }
    }

    try {
      const res = await axios({
        method: endpoint.method,
        url: fullUrl,
        headers: finalHeaders,
        data: endpoint.method !== "GET" ? parsedBody : undefined,
      });
      setResponse(res.data);
    } catch (error) {
      setResponse(error.response ? error.response.data : "Error occurred.");
    }
  };

  return (
    <Box
      mb={6}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.200"
      bg="white"
      shadow="sm"
      transition="all 0.2s ease"
      _hover={{ shadow: "md" }}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" onClick={onToggle} cursor="pointer">
        <Flex align="center" gap={3}>
          <Badge colorScheme="green">{endpoint?.method || "POST"}</Badge>
          <Text fontFamily="mono" fontSize="sm" color="gray.800">
            {endpoint?.path}
          </Text>
        </Flex>
        <Icon as={isOpen ? FaChevronUp : FaChevronDown} boxSize={5} />
      </Flex>
      {endpoint?.description && (
        <Text mt={2} fontSize="sm" color="gray.500">
          {endpoint.description}
        </Text>
      )}

      {/* Collapsible Content */}
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" spacing={4} mt={4} bg="gray.50" p={4}>
          {/* Query Parameters */}
          {endpoint?.queryParams && endpoint.queryParams.length > 0 && (
            <Box w="full">
              <Text fontWeight="bold">Query Parameters:</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {endpoint.queryParams.map((param) => (
                  <FormControl key={param.name}>
                    <FormLabel>{param.name}</FormLabel>
                    <Input
                      placeholder={param.placeholder || `Enter ${param.name}`}
                      value={queryParams[param.name] || ""}
                      onChange={(e) =>
                        handleInputChange(setQueryParams, param.name, e.target.value)
                      }
                    />
                  </FormControl>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* Headers */}
          {endpoint?.headers && endpoint.headers.length > 0 && (
            <Box w="full">
              <Text fontWeight="bold">Headers:</Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {endpoint.headers.map((header) => (
                  <FormControl key={header.name}>
                    <FormLabel>{header.name}</FormLabel>
                    <Input
                      placeholder={header.placeholder || `Enter ${header.name}`}
                      value={headerParams[header.name] || ""}
                      onChange={(e) =>
                        handleInputChange(setHeaderParams, header.name, e.target.value)
                      }
                    />
                  </FormControl>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* Request Body (JSON TextArea) */}
          {endpoint?.requestBody && (
            <Box w="full">
              <Text fontWeight="bold">Request Body (JSON):</Text>
              <Textarea
                value={jsonBody}
                onChange={(e) => setJsonBody(e.target.value)}
                rows={8}
                bg="white"
              />
            </Box>
          )}

          {/* Send Request Button */}
          <button
            onClick={handleSubmit}
            className="bg-[#0a2540] text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 mt-4"
          >
            Send Request
          </button>

          {/* Display Requested URL */}
          {requestedUrl && (
            <Box w="full">
              <Text fontWeight="bold">Requested URL:</Text>
              <Textarea value={requestedUrl} readOnly bg="gray.100" />
            </Box>
          )}

          {/* Display Response */}
          {response && (
            <Box w="full">
              <Text fontWeight="bold">Response:</Text>
              <Textarea
                value={
                  typeof response === "string"
                    ? response
                    : JSON.stringify(response, null, 2)
                }
                readOnly
                bg="gray.100"
                minH={'200px'}
              />
            </Box>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default ApiSection;
