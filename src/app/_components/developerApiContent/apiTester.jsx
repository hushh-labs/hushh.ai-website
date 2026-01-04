import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Loader2 } from "lucide-react"; // Assuming lucide-react is available since we used it elsewhere
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
 */
function generateDummyData(requestBodyDefinition) {
  const result = {};

  for (const [key, definition] of Object.entries(requestBodyDefinition)) {
    const fieldType = definition.type;
    const hasExample = Object.prototype.hasOwnProperty.call(definition, "example");

    if (fieldType === "string") {
      if (hasExample) {
        result[key] = definition.example;
      } else if (key === "text") {
        result[key] =
          "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.";
      } else if (key === "sessionId") {
        result[key] = "session-456";
      } else if (key === "id") {
        result[key] = "task-124";
      } else {
        result[key] = `dummy_${key}`;
      }
    } else if (fieldType === "number") {
      if (hasExample) {
        result[key] = definition.example;
      } else {
        result[key] = 123;
      }
    } else if (fieldType === "array") {
      if (hasExample) {
        result[key] = definition.example;
      } else {
        if (definition.items?.type === "object") {
          result[key] = [
            {
              sampleKey: "sampleValue",
            },
          ];
        } else {
          result[key] = ["sampleItem1", "sampleItem2"];
        }
      }
    } else {
      if (hasExample) {
        result[key] = definition.example;
      } else {
        result[key] = `dummy_${key}`;
      }
    }
  }

  return JSON.stringify(result, null, 2);
}

const ApiSection = ({ endpoint, apiKey }) => {
  const [isOpen, setIsOpen] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (setter, key, value) => {
    setter((prev) => ({ ...prev, [key]: value }));
  };

  const onToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async () => {
    // Construct query string
    const queryString = new URLSearchParams(queryParams).toString();
    const baseUrl = resolveBaseUrl(endpoint?.baseUrl);
    const isAbsolutePath = /^https?:\/\//i.test(endpoint?.path || "");
    const urlRoot = isAbsolutePath ? "" : baseUrl;
    const fullUrl = `${urlRoot}${endpoint.path}${queryString ? "?" + queryString : ""
      }`;
    setRequestedUrl(fullUrl);
    setResponse(null);
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  const methodColors = {
    GET: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    POST: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    PUT: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    DELETE: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  const badgeClass = methodColors[endpoint?.method] || "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";

  return (
    <div className="my-6 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md hover:border-[var(--border-secondary)]">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className={`px-2 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
            {endpoint?.method || "POST"}
          </span>
          <span className="font-mono text-sm text-[var(--text-primary)]">
            {endpoint?.path}
          </span>
        </div>
        <div className={`transition-transform duration-200 text-[var(--text-tertiary)] ${isOpen ? 'rotate-180' : ''}`}>
          <FaChevronDown size={14} />
        </div>
      </div>

      {endpoint?.description && (
        <div className="px-4 pb-4 text-sm text-[var(--text-secondary)]">
          {endpoint.description}
        </div>
      )}

      {/* Collapsible Content */}
      {isOpen && (
        <div className="border-t border-[var(--border-primary)] bg-[var(--bg-tertiary)]/30 p-4">
          <div className="flex flex-col gap-6">

            {/* Query Parameters */}
            {endpoint?.queryParams && endpoint.queryParams.length > 0 && (
              <div className="w-full">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Query Parameters</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {endpoint.queryParams.map((param) => (
                    <div key={param.name}>
                      <span className="block text-xs text-[var(--text-secondary)] mb-1">{param.name}</span>
                      <input
                        className="w-full px-3 py-2 rounded-md bg-[var(--bg-primary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] placeholder-[var(--text-tertiary)]"
                        placeholder={param.placeholder || `Enter ${param.name}`}
                        value={queryParams[param.name] || ""}
                        onChange={(e) =>
                          handleInputChange(setQueryParams, param.name, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Headers */}
            {endpoint?.headers && endpoint.headers.length > 0 && (
              <div className="w-full">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Headers</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {endpoint.headers.map((header) => (
                    <div key={header.name}>
                      <span className="block text-xs text-[var(--text-secondary)] mb-1">{header.name}</span>
                      <input
                        className="w-full px-3 py-2 rounded-md bg-[var(--bg-primary)] border border-[var(--border-primary)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] placeholder-[var(--text-tertiary)]"
                        placeholder={header.placeholder || `Enter ${header.name}`}
                        value={headerParams[header.name] || ""}
                        onChange={(e) =>
                          handleInputChange(setHeaderParams, header.name, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Body (JSON TextArea) */}
            {endpoint?.requestBody && (
              <div className="w-full">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Request Body (JSON)</label>
                <textarea
                  className="w-full px-3 py-2 rounded-md bg-[var(--bg-primary)] border border-[var(--border-primary)] text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] min-h-[150px]"
                  value={jsonBody}
                  onChange={(e) => setJsonBody(e.target.value)}
                  rows={8}
                />
              </div>
            )}

            {/* Send Request Button */}
            <div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent-primary)] text-[var(--accent-contrast)] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                {isLoading ? "Sending..." : "Send Request"}
              </button>
            </div>


            {/* Display Requested URL */}
            {requestedUrl && (
              <div className="w-full">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Requested URL</label>
                <div className="px-3 py-2 rounded-md bg-[var(--code-bg)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-secondary)] break-all">
                  {requestedUrl}
                </div>
              </div>
            )}

            {/* Display Response */}
            {(isLoading || response) && (
              <div className="w-full">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Response</label>
                {isLoading ? (
                  <div className="flex items-center gap-2 px-3 py-4 rounded-md bg-[var(--bg-primary)] border border-[var(--border-primary)]">
                    <Loader2 size={16} className="animate-spin text-[var(--text-tertiary)]" />
                    <span className="text-sm text-[var(--text-secondary)]">Waiting for response...</span>
                  </div>
                ) : (
                  <textarea
                    className="w-full px-3 py-2 rounded-md bg-[var(--code-block-bg)] border border-[var(--border-primary)] text-sm font-mono text-[var(--code-block-text)] focus:outline-none min-h-[200px]"
                    value={
                      typeof response === "string"
                        ? response
                        : JSON.stringify(response, null, 2)
                    }
                    readOnly
                  />
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default ApiSection;
