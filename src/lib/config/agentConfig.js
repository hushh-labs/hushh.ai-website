// Agent API URLs Configuration (from verified Postman collections)
// These URLs match the working Postman collection endpoints

export const AGENT_API_URLS = {
  brand: 'https://hushh-brand-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/crm-agent',
  hushh: 'https://hushh-supabase-query-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-query-agent',
  'hushh-profile': 'https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent',
  'hushh-profile-update': 'https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent',
  public: 'https://hushh-open-ai-agent-ap-bt5gn1.7y6hwo.usa-e2.cloudhub.io/public-data-agent',
  whatsapp: 'https://hushh-whatsapp-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMessageToWhatsapp',
  email: 'https://hushh-email-app-bt5gn1.7y6hwo.usa-e2.cloudhub.io/sendMail',
};

// Helper function to get agent URL
export function getAgentUrl(agentType) {
  const url = AGENT_API_URLS[agentType?.toLowerCase()];
  if (!url) {
    throw new Error(`Unknown agent type: ${agentType}`);
  }
  return url;
}

// Helper function to build JSON-RPC payload for AI agents
export function buildJsonRpcPayload(text, sessionId, id) {
  return {
    jsonrpc: "2.0",
    id: id || `task-${Math.random().toString(36).slice(2)}`,
    method: "tasks/send",
    params: {
      sessionId: sessionId || `session-${Date.now()}`,
      message: {
        role: "user",
        parts: [{ type: "text", text: text || "Hello!" }],
      },
    },
  };
}

// Helper function to build WhatsApp payload
export function buildWhatsappPayload(phoneNumber, templateName = 'hello_world', userName = '') {
  return {
    messaging_product: 'whatsapp',
    to: phoneNumber.replace(/[^0-9]/g, ''), // Remove all non-numeric characters
    type: 'template',
    template: {
      name: templateName,
      language: { code: 'en_US' },
      components: userName ? [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: userName }
          ]
        }
      ] : []
    }
  };
}

// Helper function to build Email payload
export function buildEmailPayload(to, subject, body, mimeType = 'text/html') {
  return {
    to,
    subject,
    body,
    mimeType,
  };
}

