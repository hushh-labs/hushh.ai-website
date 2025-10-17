import HushhVoice from '../clientside/hushhVoice';

export const metadata = {
  title: 'HushhVoice - Your Consent-First AI Copilot | Hushh',
  description: 'Meet HushhVoice — Your personal AI copilot that works only with the data you choose to share. Think. Plan. Act. Available on Web and iOS.',
  keywords: 'HushhVoice, AI copilot, consent-first AI, privacy AI, personal assistant, iOS app, Siri integration',
  openGraph: {
    title: 'HushhVoice - Your Consent-First AI Copilot',
    description: 'Think. Plan. Act. Your personal AI copilot powered by consent, not compromise.',
    type: 'website',
  },
};

export default function HushhVoicePage() {
  return <HushhVoice />;
}

