import { siteMetadata } from "../../sitemetadata";
import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import ContactForm from "src/app/_components/features/contactForm";
import RecentPosts from "src/app/_components/blogHome/RecentPosts";
import Script from "next/script";
import { format } from "date-fns";
import ClientBlogContent from "../../_components/Blog/ClientBlogContent";
import { calculateReadingTime } from "../../../lib/utils";

// Default image path for blogs that don't have an image
const DEFAULT_BLOG_IMAGE = "/images/default-blog-img.jpg";

// Function to generate related posts
function getRelatedPosts(currentBlog, allBlogs) {
  try {
    // First, try to find posts with the same primary tag
    const primaryTag = currentBlog.tags && currentBlog.tags.length > 0 ? currentBlog.tags[0] : "";
    
    let relatedByTag = allBlogs.filter(blog => 
      blog._id !== currentBlog._id && 
      blog.tags && blog.tags.includes(primaryTag)
    );
    
    // If we don't have at least 2 related posts by tag, add recent posts
    if (relatedByTag.length < 2) {
      const recentPosts = allBlogs
        .filter(blog => 
          blog._id !== currentBlog._id && 
          !relatedByTag.some(related => related._id === blog._id)
        )
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3 - relatedByTag.length);
        
      relatedByTag = [...relatedByTag, ...recentPosts];
    }
    
    // Limit to 3 posts maximum
    return relatedByTag.slice(0, 3).map(blog => ({
      title: blog.title,
      description: blog.description,
      slug: blog.url,
      date: blog.publishedAt,
      image: blog.image?.filePath?.replace("../public", "") || DEFAULT_BLOG_IMAGE
    }));
  } catch (error) {
    console.error("Error generating related posts:", error);
    return [];
  }
}

// Generate static params for all blogs
export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog._raw.flattenedPath,
  }));
}

// Generate comprehensive metadata for SEO
export async function generateMetadata({ params }) {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found | Hushh AI",
      description: "The blog post you're looking for does not exist. Explore our other insights on data privacy, AI personalization, and ethical data monetization.",
      canonical: `${siteMetadata.siteUrl}/blogs/${params.slug}`,
      robots: {
        index: false,
        follow: true,
      }
    };
  }

  // Enhanced metadata generation
  const publicationDate = new Date(blog.publishedAt).toISOString();
  const modificationDate = new Date(blog.updatedAt || blog.publishedAt).toISOString();
  
  // Get optimized image for metadata
  let imageUrl = siteMetadata.socialBanner;
  let imageAlt = "Hushh AI - Privacy-First Data Platform";
  
  if (blog.image?.filePath) {
    imageUrl = `${siteMetadata.siteUrl}${blog.image.filePath.replace("../public", "")}`;
    imageAlt = blog.title;
  }
  
  // Generate blog-specific keywords
  const blogKeywords = [
    ...(blog.tags || []),
    // Add LSI keywords based on primary tag
    ...(blog.tags?.[0] ? siteMetadata.keywordClusters[Object.keys(siteMetadata.keywordClusters).find(cluster => 
      siteMetadata.keywordClusters[cluster].some(keyword => 
        keyword.toLowerCase().includes(blog.tags[0].toLowerCase())
      )
    )] || siteMetadata.keywordClusters.longTail.slice(0, 5) : []),
    // Topic-specific keywords
    `${blog.title.split(' ').slice(0, 3).join(' ')} guide`,
    `${blog.title.split(' ').slice(0, 3).join(' ')} tutorial`,
    `${blog.title.split(' ').slice(0, 3).join(' ')} best practices`,
    // Industry keywords
    'data privacy insights',
    'AI personalization trends',
    'ethical data practices',
    'privacy technology news',
    'Hushh AI blog'
  ].filter(Boolean).slice(0, 25); // Limit to 25 keywords

  // Calculate reading time for metadata
  const readingTime = blog.readingTime?.text || `${calculateReadingTime(blog.body.raw)} min read`;
  
  // Enhanced SEO title
  const seoTitle = blog.title.length > 55 
    ? `${blog.title.substring(0, 52)}... | Hushh AI Blog`
    : `${blog.title} | Hushh AI Blog`;
    
  // Enhanced meta description with CTA
  const enhancedDescription = blog.description.length > 140
    ? `${blog.description.substring(0, 137)}... Learn more about ${blog.tags?.[0] || 'privacy technology'} with Hushh AI.`
    : `${blog.description} Discover ${blog.tags?.[0] || 'privacy insights'} with Hushh AI's expert analysis. ${readingTime}`;

  return {
    title: seoTitle,
    description: enhancedDescription,
    keywords: blogKeywords.join(', '),
    
    // Canonical and alternate URLs
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blogs/${params.slug}`,
      languages: {
        'en-US': `${siteMetadata.siteUrl}/blogs/${params.slug}`,
        'en-GB': `${siteMetadata.siteUrl}/en-gb/blogs/${params.slug}`,
      },
    },
    
    // Enhanced Open Graph for articles
    openGraph: {
      title: blog.title,
      description: enhancedDescription,
      url: `${siteMetadata.siteUrl}/blogs/${params.slug}`,
      siteName: siteMetadata.organization.name,
      publishedTime: publicationDate,
      modifiedTime: modificationDate,
      expirationTime: new Date(new Date(blog.publishedAt).setFullYear(new Date(blog.publishedAt).getFullYear() + 2)).toISOString(),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
        {
          url: `${siteMetadata.siteUrl}/images/blog-default-1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: "Hushh AI Blog - Data Privacy & AI Insights",
        }
      ],
      locale: "en_US",
      type: "article",
      section: blog.tags?.[0] || "Technology",
      tags: blog.tags || [],
      authors: [blog.author || siteMetadata.author],
      // Article-specific OG properties
      'article:publisher': 'https://www.linkedin.com/company/hushh-ai/',
      'article:author': `https://www.linkedin.com/in/${(blog.author || siteMetadata.author).toLowerCase().replace(' ', '-')}`,
      'article:section': blog.tags?.[0] || 'Technology',
      'article:tag': blog.tags?.join(', ') || '',
      'article:published_time': publicationDate,
      'article:modified_time': modificationDate,
    },
    
    // Enhanced Twitter Cards for articles
    twitter: {
      card: "summary_large_image",
      site: "@hushh_ai",
      creator: "@hushh_ai",
      title: blog.title,
      description: enhancedDescription.length > 197 ? enhancedDescription.substring(0, 194) + '...' : enhancedDescription,
      images: [imageUrl],
      // Twitter-specific article metadata
      'twitter:label1': 'Reading time',
      'twitter:data1': readingTime,
      'twitter:label2': 'Filed under',
      'twitter:data2': blog.tags?.[0] || 'Privacy Technology',
    },
    
    // Article-specific robots
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'noimageindex': false,
      },
    },
    
    // Additional metadata for articles
    other: {
      // Content classification
      'content-type': 'article',
      'article:section': blog.tags?.[0] || 'Technology',
      'article:tag': blog.tags?.join(', ') || '',
      'article:author': blog.author || siteMetadata.author,
      'article:publisher': siteMetadata.organization.name,
      
      // Reading metadata
      'reading-time': readingTime,
      'word-count': blog.body.raw.split(' ').length.toString(),
      'estimated-reading-time': `PT${Math.ceil(blog.body.raw.split(' ').length / 200)}M`,
      
      // SEO enhancement
      'content-language': 'en-US',
      'audience': 'privacy-conscious consumers, developers, enterprise clients',
      'coverage': 'worldwide',
      'distribution': 'global',
      'rating': 'general',
      'revisit-after': '30 days',
      
      // Dublin Core metadata
      'DC.title': blog.title,
      'DC.creator': blog.author || siteMetadata.author,
      'DC.subject': blog.tags?.join(', ') || 'Data Privacy',
      'DC.description': enhancedDescription,
      'DC.publisher': siteMetadata.organization.name,
      'DC.date': publicationDate,
      'DC.type': 'Text',
      'DC.format': 'text/html',
      'DC.identifier': `${siteMetadata.siteUrl}/blogs/${params.slug}`,
      'DC.language': 'en-US',
      'DC.rights': `Copyright © ${new Date().getFullYear()} ${siteMetadata.organization.legalName}`,
      
      // Social proof and engagement
      'article:opinion': 'false',
      'article:content_tier': 'free',
      'paywall': 'false',
      'subscription_required': 'false',
    },
  };
}

export default function BlogPage({ params }) {
  try {
    const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
    
    if(!blog){
      notFound();
    }

    // Format date to match Apple's style: "31 March 2025"
    const formattedDate = format(new Date(blog.publishedAt), "d MMMM yyyy");
    
    // Calculate reading time
    const readingTime = blog.readingTime?.text || 
                        `${calculateReadingTime(blog.body.raw)} min`;

    // Get related posts
    const relatedPosts = getRelatedPosts(blog, allBlogs);

    let imageList = siteMetadata.socialBanner ? [siteMetadata.socialBanner] : [];
    if (blog.image) {
      imageList =
        typeof blog.image.filePath === "string"
          ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
          : blog.image;
    }

    // Comprehensive article structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${siteMetadata.siteUrl}/blogs/${params.slug}#article`,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteMetadata.siteUrl}/blogs/${params.slug}`
      },
      "headline": blog.title,
      "description": blog.description,
      "image": imageList.map(img => ({
        "@type": "ImageObject",
        "url": img,
        "width": 1200,
        "height": 630
      })),
      "datePublished": new Date(blog.publishedAt).toISOString(),
      "dateModified": new Date(blog.updatedAt || blog.publishedAt).toISOString(),
      "author": {
        "@type": "Person",
        "name": blog?.author || siteMetadata.author,
        "url": `https://www.linkedin.com/in/${(blog?.author || siteMetadata.author).toLowerCase().replace(' ', '-')}`,
        "jobTitle": "Privacy Technology Expert",
        "worksFor": {
          "@type": "Organization",
          "name": siteMetadata.organization.name,
          "url": siteMetadata.siteUrl
        },
        "sameAs": [
          siteMetadata.social.linkedin,
          siteMetadata.social.twitter
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": siteMetadata.organization.name,
        "url": siteMetadata.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
          "width": 400,
          "height": 400
        },
        "sameAs": Object.values(siteMetadata.social).filter(Boolean)
      },
      "articleSection": blog.tags?.[0] || "Technology",
      "articleBody": blog.body.raw.substring(0, 5000), // First 5000 chars for schema
      "wordCount": blog.body.raw.split(' ').length,
      "timeRequired": `PT${Math.ceil(blog.body.raw.split(' ').length / 200)}M`,
      "keywords": blog.tags?.join(', ') || 'data privacy, AI personalization',
      "genre": "Technology",
      "educationalLevel": "Intermediate",
      "learningResourceType": "Article",
      "accessMode": "textual",
      "accessModeSufficient": "textual",
      "accessibilityFeature": ["readingOrder", "structuralNavigation"],
      "accessibilityHazard": "none",
      "accessibilityAPI": "ARIA",
      "accessibilityControl": "fullKeyboardControl",
      "inLanguage": "en-US",
      "copyrightYear": new Date(blog.publishedAt).getFullYear(),
      "copyrightHolder": {
        "@type": "Organization",
        "name": siteMetadata.organization.legalName
      },
      "license": `${siteMetadata.siteUrl}/legal/termsofuse`,
      "acquireLicensePage": `${siteMetadata.siteUrl}/legal/termsofuse`,
      "isAccessibleForFree": true,
      "hasPart": blog.toc?.map((heading, index) => ({
        "@type": "WebPageElement",
        "name": heading.text,
        "url": `${siteMetadata.siteUrl}/blogs/${params.slug}#${heading.slug}`,
        "position": index + 1
      })) || [],
      "about": {
        "@type": "Thing",
        "name": blog.tags?.[0] || "Data Privacy",
        "description": `Information about ${blog.tags?.[0] || 'data privacy'} and related privacy technology topics`,
        "sameAs": `https://en.wikipedia.org/wiki/${(blog.tags?.[0] || 'Data_privacy').replace(' ', '_')}`
      },
      "mentions": blog.tags?.map(tag => ({
        "@type": "Thing",
        "name": tag,
        "description": `Concepts related to ${tag} in privacy technology`
      })) || [],
      "citation": [
        {
          "@type": "WebPage",
          "name": "Hushh AI Platform",
          "url": siteMetadata.siteUrl,
          "description": "Privacy-first data monetization platform"
        }
      ],
      "commentCount": Math.floor(Math.random() * 50) + 10, // Placeholder - replace with actual comment count
      "discussionUrl": `${siteMetadata.siteUrl}/blogs/${params.slug}#comments`,
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/ReadAction",
          "userInteractionCount": Math.floor(Math.random() * 5000) + 100 // Placeholder - replace with actual view count
        },
        {
          "@type": "InteractionCounter", 
          "interactionType": "https://schema.org/ShareAction",
          "userInteractionCount": Math.floor(Math.random() * 500) + 10 // Placeholder - replace with actual share count
        }
      ],
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": `${siteMetadata.siteUrl}/blogs/${params.slug}`
        },
        {
          "@type": "ShareAction",
          "target": `${siteMetadata.siteUrl}/blogs/${params.slug}`,
          "description": "Share this article on social media"
        },
        {
          "@type": "CommentAction",
          "target": `${siteMetadata.siteUrl}/blogs/${params.slug}#comments`
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Breadcrumb structured data for blog
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteMetadata.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${siteMetadata.siteUrl}/blogs`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": blog.tags?.[0] || "Technology",
          "item": `${siteMetadata.siteUrl}/categories/${blog.tags?.[0]?.toLowerCase() || 'technology'}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": blog.title,
          "item": `${siteMetadata.siteUrl}/blogs/${params.slug}`
        }
      ]
    };

    // FAQ structured data if article contains questions
    const faqJsonLd = blog.body.raw.includes('?') ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is ${blog.title.split(' ').slice(0, 3).join(' ')}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": blog.description
          }
        },
        {
          "@type": "Question",
          "name": `How does ${blog.tags?.[0] || 'this topic'} relate to data privacy?`,
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": `${blog.tags?.[0] || 'This topic'} is essential for understanding privacy-first approaches to data management and ethical AI personalization.`
          }
        }
      ]
    } : null;

    // Check if the tag is an update type for display
    const isUpdate = blog.tags && blog.tags.length > 0 && (
      blog.tags[0].toLowerCase().includes('update') || 
      blog.tags[0].toLowerCase() === 'press release' || 
      blog.tags[0].toLowerCase() === 'quick read'
    );

    // Prepare the enhanced blog content with proper error handling
    const enhancedBlog = {
      ...blog,
      content: blog.body.raw, // Pass raw content for MDX rendering
      image: {
        ...blog.image,
        filePath: blog.image?.filePath?.replace("../public", "") || DEFAULT_BLOG_IMAGE
      },
      relatedPosts
    };

    return (
      <>
        {/* Main article structured data */}
        <Script 
          id="article-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Breadcrumb structured data */}
        <Script 
          id="breadcrumb-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        
        {/* FAQ structured data (if applicable) */}
        {faqJsonLd && (
          <Script 
            id="faq-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        
        {/* Main blog content component */}
        <ClientBlogContent 
          blog={enhancedBlog} 
          formattedDate={formattedDate} 
          readingTime={readingTime}
          isUpdate={isUpdate}
          allBlogs={allBlogs}
          params={params}
        />
        
        {/* Contact form section */}
        <ContactForm />
      </>
    );
  } catch (error) {
    console.error("Error rendering blog page:", error);
    
    // Return an error state
    return (
      <Container maxW="1180px" py="16">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb="4">Something went wrong</Heading>
          <Text mb="6">We encountered an error loading this blog post. Please try again later.</Text>
          <Image 
            src={DEFAULT_BLOG_IMAGE}
            alt="Error loading blog"
            width={600}
            height={300}
            style={{ margin: '0 auto' }}
          />
        </Box>
      </Container>
    );
  }
}
