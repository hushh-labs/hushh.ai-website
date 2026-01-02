import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const FALLBACK_BASE_URL = "https://hushh.ai";

const resolveBaseUrl = (endpointBaseUrl) => {
  if (endpointBaseUrl) return endpointBaseUrl;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return FALLBACK_BASE_URL;
};

const generateDummyData = (requestBodyDefinition) => {
  if (!requestBodyDefinition) return "";
  const result = {};

  for (const [key, definition] of Object.entries(requestBodyDefinition)) {
    const fieldType = definition.type;
    const hasExample = Object.prototype.hasOwnProperty.call(definition, "example");

    if (fieldType === "string") {
      if (hasExample) {
        result[key] = definition.example;
      } else if (key === "text") {
        result[key] =
          "Provide a JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.";
      } else if (key === "sessionId") {
        result[key] = "session-456";
      } else if (key === "id") {
        result[key] = "task-124";
      } else {
        result[key] = `dummy_${key}`;
      }
    } else if (fieldType === "number") {
      result[key] = hasExample ? definition.example : 123;
    } else if (fieldType === "array") {
      if (hasExample) {
        result[key] = definition.example;
      } else if (definition.items?.type === "object") {
        result[key] = [{ sampleKey: "sampleValue" }];
      } else {
        result[key] = ["sampleItem1", "sampleItem2"];
      }
    } else {
      result[key] = hasExample ? definition.example : `dummy_${key}`;
    }
  }

  return JSON.stringify(result, null, 2);
};

const TryItOut = ({
  title = "Try it out",
  subtitle = "Run a live request against the Hushh API in test mode.",
  samples = [],
  apiKey = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [jsonBody, setJsonBody] = useState("");
  const [response, setResponse] = useState("");
  const [requestedUrl, setRequestedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeSample = samples[activeIndex] || samples[0];
  const activeEndpoint = activeSample?.endpoint || {};
  const method = activeEndpoint.method || "POST";
  const path = activeEndpoint.path || "";
  const hasRequestBody = Boolean(activeEndpoint.requestBody);

  const initialBody = useMemo(
    () => generateDummyData(activeEndpoint.requestBody),
    [activeEndpoint.requestBody]
  );

  useEffect(() => {
    setJsonBody(initialBody);
    setResponse("");
    setRequestedUrl("");
  }, [initialBody, activeIndex]);

  const handleSubmit = async () => {
    const queryString = new URLSearchParams(
      activeEndpoint?.queryParams?.reduce((acc, param) => {
        acc[param.name] = param.defaultValue || "";
        return acc;
      }, {}) || {}
    ).toString();

    const baseUrl = resolveBaseUrl(activeEndpoint?.baseUrl);
    const isAbsolutePath = /^https?:\/\//i.test(path || "");
    const urlRoot = isAbsolutePath ? "" : baseUrl;
    const fullUrl = `${urlRoot}${path}${queryString ? `?${queryString}` : ""}`;
    setRequestedUrl(fullUrl);
    setResponse("");
    setIsLoading(true);

    let parsedBody = {};
    if (method !== "GET" && hasRequestBody) {
      if (jsonBody.trim()) {
        try {
          parsedBody = JSON.parse(jsonBody);
        } catch (error) {
          setResponse("Invalid JSON in request body.");
          setIsLoading(false);
          return;
        }
      }
    }

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
      }

      const res = await axios({
        method,
        url: fullUrl,
        headers,
        data: method !== "GET" ? parsedBody : undefined,
      });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      const errorData = error?.response?.data || "Error occurred.";
      setResponse(
        typeof errorData === "string"
          ? errorData
          : JSON.stringify(errorData, null, 2)
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!samples.length) return null;

  return (
    <section className="docs-tryout">
      <div className="docs-tryout-header">
        <p className="docs-tryout-kicker">Try it out</p>
        <h2 className="docs-tryout-title">{title}</h2>
        {subtitle ? <p className="docs-tryout-subtitle">{subtitle}</p> : null}
      </div>

      <div className="docs-tryout-grid">
        <div className="docs-tryout-list">
          {samples.map((sample, index) => (
            <button
              key={sample.title}
              type="button"
              className={`docs-tryout-item${
                index === activeIndex ? " is-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              <span className="docs-tryout-item-title">{sample.title}</span>
              {sample.description ? (
                <span className="docs-tryout-item-desc">{sample.description}</span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="docs-tryout-console">
          <div className="docs-tryout-console-head">
            <div className="docs-tryout-endpoint">
              <span className={`docs-tryout-method is-${method.toLowerCase()}`}>
                {method}
              </span>
              <span className="docs-tryout-path">{path}</span>
            </div>
            <button
              type="button"
              className="docs-tryout-run"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Running..." : "Run request"}
            </button>
          </div>

          <div className="docs-tryout-console-body">
            <div className="docs-tryout-panel">
              <div className="docs-tryout-panel-title">Request body</div>
              {hasRequestBody ? (
                <textarea
                  className="docs-tryout-textarea"
                  value={jsonBody}
                  onChange={(event) => setJsonBody(event.target.value)}
                  rows={10}
                />
              ) : (
                <div className="docs-tryout-placeholder">
                  This endpoint does not require a request body.
                </div>
              )}
            </div>

            <div className="docs-tryout-panel">
              <div className="docs-tryout-panel-title">Response</div>
              <pre className="docs-tryout-response">
                {isLoading
                  ? "Waiting for response..."
                  : response || "Run a request to see the response."}
              </pre>
            </div>
          </div>

          <div className="docs-tryout-footnote">
            {requestedUrl ? (
              <span>Requested URL: {requestedUrl}</span>
            ) : (
              <span>Requests run against the live test endpoint.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryItOut;
