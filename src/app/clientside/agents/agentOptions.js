import { FiUsers, FiDatabase, FiUserPlus, FiRefreshCw, FiGlobe, FiAperture, FiMessageCircle, FiMail } from 'react-icons/fi'

export const AGENT_OPTIONS = [
  {
    id: 'brand',
    name: 'Brand Agent',
    description: 'CRM user intelligence',
    tagline: 'Understand CRM profiles and surface conversational insights instantly.',
    accent: {
      gradient: 'linear(135deg, #6366F1 0%, #8B5CF6 100%)',
      softBg: 'rgba(99, 102, 241, 0.12)',
      softText: '#4338CA',
      tagBg: 'purple.50',
      tagColor: 'purple.700',
    },
    icon: FiUsers,
  },
  {
    id: 'hushh',
    name: 'Hushh Agent',
    description: 'Supabase data query agent',
    tagline: 'Ask natural language questions to retrieve Supabase-driven intelligence.',
    accent: {
      gradient: 'linear(135deg, #0EA5E9 0%, #38BDF8 100%)',
      softBg: 'rgba(14, 165, 233, 0.12)',
      softText: '#0369A1',
      tagBg: 'blue.50',
      tagColor: 'blue.700',
    },
    icon: FiDatabase,
  },
  {
    id: 'hushh-profile',
    name: 'Hushh Profile Creation Agent',
    description: 'Supabase profile onboarding',
    tagline: 'Create rich Supabase user profiles with conversational prompts.',
    accent: {
      gradient: 'linear(135deg, #22C55E 0%, #10B981 100%)',
      softBg: 'rgba(34, 197, 94, 0.14)',
      softText: '#047857',
      tagBg: 'green.50',
      tagColor: 'green.700',
    },
    icon: FiUserPlus,
  },
  {
    id: 'hushh-profile-update',
    name: 'Hushh Profile Update Agent',
    description: 'Supabase profile maintenance',
    tagline: 'Update Supabase records accurately with a single natural language request.',
    accent: {
      gradient: 'linear(135deg, #F97316 0%, #FB923C 100%)',
      softBg: 'rgba(249, 115, 22, 0.15)',
      softText: '#C2410C',
      tagBg: 'orange.50',
      tagColor: 'orange.700',
    },
    icon: FiRefreshCw,
  },
  {
    id: 'public',
    name: 'Public Data Agent',
    description: 'OpenAI data enrichment',
    tagline: 'Blend public web knowledge with your brand data in seconds.',
    accent: {
      gradient: 'linear(135deg, #6366F1 0%, #14B8A6 100%)',
      softBg: 'rgba(99, 102, 241, 0.12)',
      softText: '#0F766E',
      tagBg: 'teal.50',
      tagColor: 'teal.700',
    },
    icon: FiGlobe,
  },
  {
    id: 'gemini',
    name: 'Gemini Agent',
    description: 'Gemini AI data enrichment',
    tagline: 'Cross-check answers with Google Gemini for balanced coverage.',
    accent: {
      gradient: 'linear(135deg, #7C3AED 0%, #4C1D95 100%)',
      softBg: 'rgba(124, 58, 237, 0.14)',
      softText: '#4C1D95',
      tagBg: 'purple.50',
      tagColor: 'purple.700',
    },
    icon: FiAperture,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp CRM Agent',
    description: 'Send WhatsApp messages',
    tagline: 'Trigger templated WhatsApp engagements without leaving the console.',
    accent: {
      gradient: 'linear(135deg, #22C55E 0%, #16A34A 100%)',
      softBg: 'rgba(34, 197, 94, 0.16)',
      softText: '#166534',
      tagBg: 'green.50',
      tagColor: 'green.700',
    },
    icon: FiMessageCircle,
  },
  {
    id: 'email',
    name: 'Email Integration Agent',
    description: 'Send transactional emails',
    tagline: 'Deliver branded transactional emails with pre-approved templates.',
    accent: {
      gradient: 'linear(135deg, #6366F1 0%, #4338CA 100%)',
      softBg: 'rgba(99, 102, 241, 0.15)',
      softText: '#312E81',
      tagBg: 'indigo.50',
      tagColor: 'indigo.700',
    },
    icon: FiMail,
  },
]

export const CHAT_ENABLED_AGENT_IDS = ['brand', 'hushh', 'hushh-profile', 'hushh-profile-update', 'public', 'gemini']

export function getAgentOptionById(id) {
  return AGENT_OPTIONS.find((agent) => agent.id === id)
}
