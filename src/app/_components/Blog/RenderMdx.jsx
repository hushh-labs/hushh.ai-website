"use client"
import React from 'react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import { Box, Text, useColorMode } from '@chakra-ui/react'
import { ServiceCard } from '../primitives/serviceCard'
import HushhWalletIcon from '../svg/hushhWalletIcon'
import dynamic from 'next/dynamic';
import Link from 'next/link';
// Import syntax highlighting styles already handled in layout.jsx
const Mermaid = dynamic(() => import('../hooks/useMermaid'), { ssr: false });

const CustomLink = ({ href, children }) => {
  const { colorMode } = useColorMode();
  return (
    <Link 
      href={href}
      className="apple-link"
      style={{
        color: colorMode === 'light' ? '#0066CC' : '#2997FF',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {children}
    </Link>
  );
};

const CustomImage = ({ src, alt }) => {
  return (
    <div className="apple-image-container">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="apple-image"
        style={{
          borderRadius: '12px',
          transition: 'transform 0.3s ease',
        }}
      />
    </div>
  );
};

const CustomPre = (props) => {
  const { colorMode } = useColorMode();
  const className = props.children?.props?.className || '';
  const language = className.replace('language-', '');
  
  return (
    <div className="apple-code-block">
      {language && (
        <div className="language-badge">
          {language}
        </div>
      )}
      <pre
        {...props}
        style={{
          borderRadius: '12px',
          padding: '1.5rem',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          margin: '2rem 0',
          overflow: 'auto',
          backgroundColor: '#0d1117', // GitHub dark theme background
          color: '#c9d1d9', // Light text color for dark theme
          border: `1px solid ${colorMode === 'light' ? '#e5e5e7' : '#333336'}`,
        }}
        className={`${props.className || ''} hljs-pre`}
      />
    </div>
  );
};

const CustomCode = (props) => {
  const isInline = !props.className;

  if (isInline) {
    return (
      <code
        {...props}
        style={{
          backgroundColor: 'transparent',
          padding: 0,
          borderRadius: 0,
          fontSize: '0.9em',
          fontFamily: 'SF Mono, Menlo, Monaco, Consolas, monospace',
          border: 'none',
        }}
      />
    );
  }

  return <code {...props} />;
};

const CustomHeading = ({ level, children }) => {
  const Tag = `h${level}`;
  return (
    <Tag className="apple-heading">
      {children}
    </Tag>
  );
};

const CustomParagraph = ({ children }) => {
  return (
    <p className="apple-paragraph">
      {children}
    </p>
  );
};

const CustomList = ({ ordered, children }) => {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <ListTag className="apple-list">
      {children}
    </ListTag>
  );
};

const CustomListItem = ({ children }) => {
  return (
    <li className="apple-list-item">
      {children}
    </li>
  );
};

const CustomBlockquote = ({ children }) => {
  return (
    <blockquote className="apple-blockquote">
      {children}
    </blockquote>
  );
};

const mdxComponents = {
  a: CustomLink,
  img: CustomImage,
  code: CustomCode,
  pre: CustomPre,
  h1: (props) => <CustomHeading level={1} {...props} />,
  h2: (props) => <CustomHeading level={2} {...props} />,
  h3: (props) => <CustomHeading level={3} {...props} />,
  p: CustomParagraph,
  ul: (props) => <CustomList ordered={false} {...props} />,
  ol: (props) => <CustomList ordered={true} {...props} />,
  li: CustomListItem,
  blockquote: CustomBlockquote,
  ServiceCard,
  HushhWalletIcon,
  Mermaid,
}

const RenderMdx = ({ blog }) => {
  const { colorMode } = useColorMode();

  if (!blog?.body?.code) {
    console.error('Blog content is missing or improperly formatted');
    return (
      <Box p={5} textAlign="center">
        <Text fontSize="lg" color={colorMode === 'dark' ? 'red.300' : 'red.500'}>
          Sorry, this blog content could not be loaded.
        </Text>
      </Box>
    );
  }

  try {
    const MDXContent = useMDXComponent(blog.body.code);

    return (
      <article 
        className={`max-w-none apple-article ${colorMode === 'light' ? 'light-mode' : 'dark-mode'}`}
        style={{
          color: colorMode === 'light' ? "#1d1d1f" : "#f5f5f7",
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Helvetica, Arial, sans-serif',
        }}
      >
        <MDXContent components={mdxComponents} />
        
        <style jsx global>{`
          .apple-article .apple-paragraph:first-of-type {
            font-size: 1.125rem;
            line-height: 1.6;
            color: ${colorMode === 'light' ? '#424245' : '#a1a1a6'};
            letter-spacing: -0.011em;
          }
          
          .apple-code-block {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
          }
          
          .apple-code-block:hover {
            transform: translateY(-2px);
            box-shadow: ${colorMode === 'light' 
              ? '0 6px 20px rgba(0, 0, 0, 0.1)' 
              : '0 6px 20px rgba(0, 0, 0, 0.3)'};
          }
          
          .apple-code-block pre {
            font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
            tab-size: 2;
          }
          
          .apple-code-block pre code {
            display: grid;
            font-family: 'SF Mono', Menlo, Monaco, Consolas, monospace;
            letter-spacing: -0.01em;
          }
          
          .apple-code-block pre code span {
            color: ${colorMode === 'light' ? '#111827' : '#E5E7EB'} !important;
          }
          
          .apple-code-block pre code .line {
            padding: 0 0.25rem;
            min-height: 1.5rem;
            display: block;
            line-height: 1.5rem;
          }
          
          .apple-code-block pre code .line.highlighted {
            background-color: ${colorMode === 'light' 
              ? 'rgba(0, 102, 204, 0.1)' 
              : 'rgba(0, 102, 204, 0.2)'};
            border-left: 2px solid #0066CC;
          }
          
          .apple-code-block pre code .line .word {
            background-color: ${colorMode === 'light' 
              ? 'rgba(0, 102, 204, 0.1)' 
              : 'rgba(0, 102, 204, 0.2)'};
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
          }
          
          .apple-heading {
            position: relative;
          }
          
          .apple-heading:after {
            content: '';
            display: block;
            width: 0;
            height: 2px;
            margin-top: 8px;
            transition: width 0.3s ease;
            background-color: ${colorMode === 'light' ? '#0066CC' : '#2997FF'};
          }
          
          .apple-heading:hover:after {
            width: 40px;
          }
          
          .apple-list {
            position: relative;
            margin: 1.5rem 0;
          }
          
          .apple-list-item {
            position: relative;
            padding-left: 0.25rem;
            margin: 0.5rem 0;
          }
          
          .apple-list-item::marker {
            color: ${colorMode === 'light' ? '#1d1d1f' : '#f5f5f7'};
          }
          
          .apple-blockquote {
            position: relative;
            margin: 2rem 0;
            padding: 1.5rem 2rem;
            background-color: ${colorMode === 'light' ? '#f5f5f7' : '#1A1A1A'};
            border-radius: 12px;
            font-style: italic;
          }
          
          .apple-blockquote:before {
            content: """;
            position: absolute;
            top: -0.5rem;
            left: -0.5rem;
            font-size: 4rem;
            color: ${colorMode === 'light' ? '#0066CC' : '#2997FF'};
            opacity: 0.3;
          }
          
          .apple-link {
            position: relative;
          }
          
          .apple-link:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: -2px;
            left: 0;
            background-color: currentColor;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
          }
          
          .apple-link:hover:after {
            transform: scaleX(1);
            transform-origin: left;
          }
          
          .apple-image-container {
            margin: 2rem 0;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease;
          }
          
          .apple-image-container:hover {
            transform: scale(1.02);
          }
          
          .apple-article table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            font-size: 0.9rem;
            box-shadow: ${colorMode === 'light' 
              ? '0 2px 8px rgba(0, 0, 0, 0.05)' 
              : '0 2px 8px rgba(0, 0, 0, 0.2)'};
            border-radius: 12px;
            overflow: hidden;
          }
          
          .apple-article th {
            background-color: ${colorMode === 'light' ? '#f5f5f7' : '#1A1A1A'};
            color: ${colorMode === 'light' ? '#1d1d1f' : '#f5f5f7'};
            font-weight: 600;
            text-align: left;
            padding: 0.75rem 1rem;
            border: 1px solid ${colorMode === 'light' ? '#e5e5e7' : '#333336'};
          }
          
          .apple-article td {
            padding: 0.75rem 1rem;
            border: 1px solid ${colorMode === 'light' ? '#e5e5e7' : '#333336'};
            transition: background-color 0.2s ease;
          }
          
          .apple-article tr:hover td {
            background-color: ${colorMode === 'light' ? 'rgba(0, 102, 204, 0.05)' : 'rgba(0, 102, 204, 0.1)'};
          }
        `}</style>
      </article>
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    return (
      <Box p={5} textAlign="center">
        <Text fontSize="lg" color={colorMode === 'dark' ? 'red.300' : 'red.500'}>
          An error occurred while rendering this blog post.
        </Text>
      </Box>
    );
  }
};

export default RenderMdx
