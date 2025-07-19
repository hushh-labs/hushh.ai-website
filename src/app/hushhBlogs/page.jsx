import { allBlogs } from "contentlayer/generated";
import ContactForm from "../_components/features/contactForm";
import HushhBlogsContent from "../_components/Blog/HushhBlogsContent";
import { siteMetadata } from "../sitemetadata";
import ContentWrapper from "../_components/layout/ContentWrapper";

export const metadata = {
  title: "Hushh Newsroom | Latest Insights and Updates",
  description:
    "Explore the latest news, articles, and updates from Hushh covering technology, privacy, and data solutions. Stay informed with expert insights and product announcements.",
  keywords:
    "hushh newsroom, technology insights, data privacy, data monetization, user-controlled data, luxury consumers, AI-powered personalization, privacy-preserving technology, decentralized data, ethical advertising, data marketplace, human-AI interaction",
  canonical: "https://hushh.ai/hushhBlogs",
  alternates: {
    canonical: "https://hushh.ai/hushhBlogs",
  },
  openGraph: {
    title: "Hushh Newsroom | Latest Insights and Updates",
    description:
      "Explore the latest news, articles, and updates from Hushh covering technology, privacy, and data solutions. Stay informed with expert insights and product announcements.",
    url: "https://hushh.ai/hushhBlogs",
    type: "website",
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: "Hushh Newsroom",
      },
    ],
  },
};

export default function HushhBlogs() {
  return (
    <>
      <ContentWrapper includeHeaderSpacing={true}>
        <HushhBlogsContent blogs={allBlogs} />
        <ContactForm />
      </ContentWrapper>
    </>
  );
}
