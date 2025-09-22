import { siteMetadata } from '../app/sitemetadata';

/**
 * Advanced SEO Utilities for Hushh AI Website
 * Provides comprehensive SEO optimization functions for all pages
 */

/**
 * Generate page-specific structured data
 * @param {Object} pageData - Page-specific data
 * @param {string} pageType - Type of page (homepage, product, blog, etc.)
 * @returns {Object} Structured data object
 */
export function generatePageStructuredData(pageData = {}, pageType = 'WebPage') {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: pageData.title || siteMetadata.title,
    description: pageData.description || siteMetadata.description,
    url: pageData.url || siteMetadata.siteUrl,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: siteMetadata.organization.name,
      url: siteMetadata.siteUrl
    },
    about: pageData.about || siteMetadata.organization.description,
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`
      }
    },
    datePublished: pageData.publishedAt || new Date().toISOString(),
    dateModified: pageData.updatedAt || new Date().toISOString(),
  };

  // Add page-specific schema enhancements
  switch (pageType) {
    case 'Product':
      return {
        ...baseStructuredData,
        '@type': 'Product',
        brand: {
          '@type': 'Brand',
          name: 'Hushh AI'
        },
        manufacturer: {
          '@type': 'Organization',
          name: siteMetadata.organization.name
        },
        category: pageData.category || 'Privacy Software',
        offers: {
          '@type': 'Offer',
          price: pageData.price || '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: siteMetadata.organization.name
          }
        },
        aggregateRating: pageData.rating ? {
          '@type': 'AggregateRating',
          ratingValue: pageData.rating.value || '4.8',
          reviewCount: pageData.rating.count || '1000'
        } : undefined
      };

    case 'BlogPosting':
      return {
        ...baseStructuredData,
        '@type': 'BlogPosting',
        headline: pageData.title,
        author: {
          '@type': 'Person',
          name: pageData.author || siteMetadata.author
        },
        articleSection: pageData.category || 'Technology',
        wordCount: pageData.wordCount || 1000,
        timeRequired: pageData.readingTime || 'PT5M',
        keywords: pageData.keywords || pageData.tags?.join(', ')
      };

    case 'FAQPage':
      return {
        ...baseStructuredData,
        '@type': 'FAQPage',
        mainEntity: pageData.faqs?.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        })) || []
      };

    default:
      return baseStructuredData;
  }
}

/**
 * Generate comprehensive metadata for any page
 * @param {Object} pageData - Page-specific data
 * @param {Object} options - Additional options
 * @returns {Object} Next.js metadata object
 */
export function generatePageMetadata(pageData = {}, options = {}) {
  const {
    title,
    description,
    keywords = [],
    canonical,
    images = [],
    noIndex = false,
    pageType = 'website'
  } = pageData;

  const fullTitle = title ? `${title} | ${siteMetadata.organization.name}` : siteMetadata.title;
  const fullDescription = description || siteMetadata.description;
  const fullKeywords = [...keywords, ...siteMetadata.keywordClusters.dataPrivacy.slice(0, 10)].join(', ');
  const canonicalUrl = canonical || siteMetadata.canonicalUrl;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    
    alternates: {
      canonical: canonicalUrl,
      languages: siteMetadata.alternateUrls,
    },
    
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: siteMetadata.organization.name,
      type: pageType,
      locale: siteMetadata.locale,
      images: [
        ...images,
        ...siteMetadata.openGraph.images
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      site: siteMetadata.social.twitterHandle,
      creator: siteMetadata.social.twitterHandle,
      title: fullTitle,
      description: fullDescription,
      images: [
        ...(images.map(img => img.url || img)),
        ...siteMetadata.twitter.images
      ],
    },
    
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    
    other: {
      'content-type': 'text/html',
      'content-language': 'en-US',
      'cache-control': 'public, max-age=31536000',
      ...options.other
    }
  };
}

/**
 * Generate product-specific metadata
 * @param {Object} productData - Product information
 * @returns {Object} Product metadata
 */
export function generateProductMetadata(productData) {
  const productKeywords = [
    ...siteMetadata.keywordClusters.products,
    ...siteMetadata.keywordClusters.technical.slice(0, 5),
    productData.name?.toLowerCase(),
    `${productData.name} features`,
    `${productData.name} benefits`,
    `${productData.name} privacy`,
    `${productData.name} AI`,
  ].filter(Boolean);

  return generatePageMetadata({
    title: `${productData.name} | ${productData.tagline || 'Privacy-First Solution'}`,
    description: `${productData.description} Discover how ${productData.name} empowers you with data privacy, ethical AI personalization, and user-controlled data monetization.`,
    keywords: productKeywords,
    canonical: `${siteMetadata.siteUrl}${productData.url}`,
    images: productData.images || [],
    pageType: 'product'
  });
}

/**
 * Generate blog-specific metadata with enhanced SEO
 * @param {Object} blogData - Blog post data
 * @returns {Object} Blog metadata
 */
export function generateBlogMetadata(blogData) {
  const blogKeywords = [
    ...(blogData.tags || []),
    ...siteMetadata.keywordClusters.longTail.slice(0, 5),
    ...siteMetadata.keywordClusters.aiPersonalization.slice(0, 3),
    `${blogData.title?.split(' ').slice(0, 3).join(' ')} guide`,
    `${blogData.title?.split(' ').slice(0, 3).join(' ')} tutorial`,
  ].filter(Boolean);

  return generatePageMetadata({
    title: blogData.title,
    description: `${blogData.description} Learn about ${blogData.tags?.[0]} with expert insights from Hushh AI's privacy-first approach.`,
    keywords: blogKeywords,
    canonical: `${siteMetadata.siteUrl}/blogs/${blogData.slug}`,
    images: blogData.images || [],
    pageType: 'article'
  });
}

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @returns {Object} Breadcrumb structured data
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate FAQ structured data
 * @param {Array} faqs - Array of FAQ items
 * @returns {Object} FAQ structured data
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate local business structured data
 * @returns {Object} Local business structured data
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteMetadata.siteUrl}#organization`,
    name: siteMetadata.organization.legalName,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
    image: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
    description: siteMetadata.organization.description,
    address: siteMetadata.organization.address,
    telephone: siteMetadata.phoneNumber,
    email: siteMetadata.email,
    foundingDate: siteMetadata.organization.foundingDate,
    founders: siteMetadata.organization.founders,
    sameAs: siteMetadata.organization.sameAs,
    knowsAbout: [
      'Data Privacy Technology',
      'AI Personalization',
      'Data Monetization',
      'Privacy-First Software',
      'Ethical AI Development'
    ],
    areaServed: 'Worldwide',
    serviceType: 'Privacy Technology Solutions'
  };
}

/**
 * Generate software application structured data
 * @param {Object} appData - Application data
 * @returns {Object} Software application structured data
 */
export function generateSoftwareApplicationSchema(appData = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appData.name || 'Hushh AI Platform',
    applicationCategory: appData.category || 'Privacy Software',
    operatingSystem: appData.os || 'Web, iOS, Android',
    description: appData.description || siteMetadata.description,
    url: appData.url || siteMetadata.siteUrl,
    downloadUrl: appData.downloadUrl,
    softwareVersion: appData.version || '2.0.0',
    releaseNotes: appData.releaseNotes,
    screenshot: appData.screenshots || [],
    author: {
      '@type': 'Organization',
      name: siteMetadata.organization.name
    },
    offers: {
      '@type': 'Offer',
      price: appData.price || '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: appData.rating ? {
      '@type': 'AggregateRating',
      ratingValue: appData.rating.value,
      reviewCount: appData.rating.count
    } : undefined
  };
}

/**
 * Validate and optimize keywords for density and relevance
 * @param {string} content - Page content
 * @param {Array} targetKeywords - Target keywords
 * @returns {Object} Keyword optimization analysis
 */
export function analyzeKeywordDensity(content, targetKeywords) {
  const wordCount = content.split(/\s+/).length;
  const keywordAnalysis = {};
  
  targetKeywords.forEach(keyword => {
    const regex = new RegExp(keyword.toLowerCase(), 'gi');
    const matches = content.toLowerCase().match(regex) || [];
    const density = (matches.length / wordCount) * 100;
    
    keywordAnalysis[keyword] = {
      count: matches.length,
      density: density.toFixed(2),
      optimal: density >= 0.5 && density <= 3.0,
      recommendation: density < 0.5 ? 'increase' : density > 3.0 ? 'decrease' : 'optimal'
    };
  });
  
  return {
    wordCount,
    keywordAnalysis,
    overallScore: Object.values(keywordAnalysis).filter(k => k.optimal).length / targetKeywords.length
  };
}

/**
 * Generate content optimization suggestions
 * @param {Object} pageData - Page data
 * @returns {Array} Optimization suggestions
 */
export function generateContentOptimizationSuggestions(pageData) {
  const suggestions = [];
  
  // Title optimization
  if (!pageData.title || pageData.title.length < 30) {
    suggestions.push({
      type: 'title',
      priority: 'high',
      message: 'Title should be 30-60 characters and include primary keyword'
    });
  }
  
  // Description optimization
  if (!pageData.description || pageData.description.length < 150) {
    suggestions.push({
      type: 'description',
      priority: 'high',
      message: 'Meta description should be 150-160 characters with compelling call-to-action'
    });
  }
  
  // Keyword optimization
  if (!pageData.keywords || pageData.keywords.length < 5) {
    suggestions.push({
      type: 'keywords',
      priority: 'medium',
      message: 'Include 5-10 relevant keywords including LSI terms'
    });
  }
  
  // Image optimization
  if (!pageData.images || pageData.images.length === 0) {
    suggestions.push({
      type: 'images',
      priority: 'medium',
      message: 'Add optimized images with descriptive alt text'
    });
  }
  
  return suggestions;
}

export default {
  generatePageStructuredData,
  generatePageMetadata,
  generateProductMetadata,
  generateBlogMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateSoftwareApplicationSchema,
  analyzeKeywordDensity,
  generateContentOptimizationSuggestions
};
