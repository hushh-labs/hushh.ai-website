// components/index.js
import CustomPre from './CustomPre';
import Onboarding from './onboarding';
import DocsHero from './docsHero';
import TryItOut from './tryItOut';
// Import other custom components here

const MDXComponents = {
  pre: CustomPre,
  OnBoarding:Onboarding,
  DocsHero,
  TryItOut,
  
  // Map other tags to custom components
};

export default MDXComponents;
