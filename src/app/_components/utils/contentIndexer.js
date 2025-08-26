// Dynamic imports for server-side only modules
let fs, path, matter;

if (typeof window === 'undefined') {
  try {
    fs = require('fs');
    path = require('path');
    matter = require('gray-matter');
  } catch (error) {
    console.warn('Server-side dependencies not available:', error);
  }
}

// Comprehensive content indexer for the entire website
export class ContentIndexer {
  constructor() {
    this.contentIndex = [];
    this.isClient = typeof window !== 'undefined';
  }

  // Extract content from all blog MDX files in /content/ directory
  async indexBlogContent() {
    if (this.isClient || !fs || !path || !matter) return [];

    const blogEntries = [];
    const contentDir = path.join(process.cwd(), 'content');
    
    try {
      if (!fs.existsSync(contentDir)) {
        console.warn('Content directory not found:', contentDir);
        return [];
      }
      
      const blogFolders = fs.readdirSync(contentDir);
      console.log(`Found ${blogFolders.length} blog folders in content directory`);
      
      for (const folder of blogFolders) {
        const folderPath = path.join(contentDir, folder);
        const stat = fs.statSync(folderPath);
        
        if (stat.isDirectory()) {
          const indexPath = path.join(folderPath, 'index.mdx');
          
          if (fs.existsSync(indexPath)) {
            try {
              const fileContent = fs.readFileSync(indexPath, 'utf-8');
              const { data: frontmatter, content } = matter(fileContent);
              
              // Clean content - remove MDX syntax and get text content
              const cleanContent = content
                .replace(/```[\s\S]*?```/g, '') // Remove code blocks
                .replace(/`[^`]*`/g, '') // Remove inline code
                .replace(/import\s+.*?from\s+['"][^'"]*['"];?/gi, '') // Remove import statements
                .replace(/export\s+.*?from\s+['"][^'"]*['"];?/gi, '') // Remove export statements
                .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/gi, '') // Remove named imports
                .replace(/import\s+\w+\s*,?\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/gi, '') // Remove mixed imports
                .replace(/const\s+\w+\s*=\s*require\(['"][^'"]*['"]\);?/gi, '') // Remove require statements
                .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
                .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Extract link text
                .replace(/<[^>]*>/g, '') // Remove HTML tags
                .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
                .replace(/^\s*\/\/.*$/gm, '') // Remove single-line comments
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
                .replace(/^\s*\*.*$/gm, '') // Remove JSDoc style comments
                .replace(/\n\s*\n/g, '\n') // Normalize line breaks
                .replace(/[#*_`]/g, '') // Remove markdown formatting
                .replace(/^\s+/gm, '') // Remove leading whitespace
                .trim();

              const blogUrl = `/blogs/${folder}`;
              
              // Enhanced title extraction with better fallbacks
              let title = frontmatter.title;
              if (!title) {
                // Extract first heading from content
                const headingMatch = content.match(/^#\s+(.+)$/m);
                if (headingMatch) {
                  title = headingMatch[1].trim();
                } else {
                  title = folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }
              }
              
              // Enhanced description extraction
              let description = frontmatter.description || frontmatter.excerpt;
              if (!description && cleanContent.length > 10) {
                // Extract first meaningful paragraph (at least 50 characters)
                const paragraphs = cleanContent.split('\n').filter(p => p.trim().length > 50);
                if (paragraphs.length > 0) {
                  description = paragraphs[0].substring(0, 200) + '...';
                } else {
                  // Fallback to first sentences
                  const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 20);
                  if (sentences.length > 0) {
                    description = sentences.slice(0, 2).join('. ').substring(0, 200) + '...';
                  } else {
                    description = `Blog post about ${title}`;
                  }
                }
              } else if (!description) {
                description = `Blog post about ${title}`;
              }
              
              blogEntries.push({
                id: `blog-${folder}`,
                title: title,
                description: description,
                content: cleanContent,
                url: blogUrl,
                type: 'blog',
                category: frontmatter.category || 'Blog',
                tags: frontmatter.tags || [],
                author: frontmatter.author || 'Hushh Team',
                date: frontmatter.date || new Date().toISOString(),
                keywords: [
                  ...(frontmatter.tags || []),
                  'blog', 'article', 'hushh', 'AI', 'data', 'privacy', 'technology',
                  ...title.toLowerCase().split(' '),
                  ...(frontmatter.keywords || [])
                ].filter(Boolean),
                searchableText: `${title} ${description} ${cleanContent} ${(frontmatter.tags || []).join(' ')} ${folder.replace(/-/g, ' ')}`.toLowerCase()
              });
              
              console.log(`✅ Indexed blog: ${title}`);
            } catch (error) {
              console.error(`❌ Error processing blog ${folder}:`, error);
            }
          }
        }
      }
    } catch (error) {
      console.error('❌ Error indexing blog content:', error);
    }
    
    return blogEntries;
  }

  // Extract content from all MDX files in /pages/ directory
  async indexPagesContent() {
    if (this.isClient || !fs || !path || !matter) return [];

    const pagesEntries = [];
    const pagesDir = path.join(process.cwd(), 'pages');
    
    try {
      if (!fs.existsSync(pagesDir)) {
        console.warn('Pages directory not found:', pagesDir);
        return [];
      }

      const scanDirectory = (dir, basePath = '') => {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && !item.startsWith('.')) {
            scanDirectory(fullPath, path.join(basePath, item));
          } else if (item.endsWith('.mdx')) {
            try {
              const relativeFilePath = path.join(basePath, item);
              
              // 🚫 TEMPORARILY SKIP DEVELOPER API MDX FILES
              // Skip any files in developer-Api directory or containing developer API content
              if (relativeFilePath.includes('developer-Api') || 
                  relativeFilePath.includes('developerApi') ||
                  (relativeFilePath.toLowerCase().includes('api') && 
                   (relativeFilePath.includes('dev') || relativeFilePath.includes('getting-started')))) {
                console.log(`⏭️ Skipping developer API MDX file: ${relativeFilePath}`);
                continue; // Skip this file completely
              }
              
              const fileContent = fs.readFileSync(fullPath, 'utf-8');
              const { data: frontmatter, content } = matter(fileContent);
              
              const cleanContent = content
                .replace(/```[\s\S]*?```/g, '') // Remove code blocks
                .replace(/`[^`]*`/g, '') // Remove inline code
                .replace(/import\s+.*?from\s+['"][^'"]*['"];?/gi, '') // Remove import statements
                .replace(/export\s+.*?from\s+['"][^'"]*['"];?/gi, '') // Remove export statements
                .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/gi, '') // Remove named imports
                .replace(/import\s+\w+\s*,?\s*\{[^}]*\}\s*from\s*['"][^'"]*['"];?/gi, '') // Remove mixed imports
                .replace(/const\s+\w+\s*=\s*require\(['"][^'"]*['"]\);?/gi, '') // Remove require statements
                .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
                .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Extract link text
                .replace(/<[^>]*>/g, '') // Remove HTML tags
                .replace(/\{[^}]*\}/g, '') // Remove JSX expressions
                .replace(/^\s*\/\/.*$/gm, '') // Remove single-line comments
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
                .replace(/^\s*\*.*$/gm, '') // Remove JSDoc style comments
                .replace(/\n\s*\n/g, '\n') // Normalize line breaks
                .replace(/[#*_`]/g, '') // Remove markdown formatting
                .replace(/^\s+/gm, '') // Remove leading whitespace
                .trim();

              const urlPath = relativeFilePath.replace(/\.mdx$/, '').replace(/\\/g, '/');
              
              // Enhanced title extraction with better fallbacks
              let title = frontmatter.title;
              if (!title) {
                // Extract first heading from content
                const headingMatch = content.match(/^#\s+(.+)$/m);
                if (headingMatch) {
                  title = headingMatch[1].trim();
                } else {
                  title = path.basename(item, '.mdx').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }
              }
              
              // Enhanced description extraction 
              let description = frontmatter.description || frontmatter.excerpt;
              if (!description && cleanContent.length > 10) {
                // Extract first meaningful paragraph (at least 50 characters)
                const paragraphs = cleanContent.split('\n').filter(p => p.trim().length > 50);
                if (paragraphs.length > 0) {
                  description = paragraphs[0].substring(0, 200) + '...';
                } else {
                  // Fallback to first sentences
                  const sentences = cleanContent.split(/[.!?]+/).filter(s => s.trim().length > 20);
                  if (sentences.length > 0) {
                    description = sentences.slice(0, 2).join('. ').substring(0, 200) + '...';
                  } else {
                    description = `Documentation for ${title}`;
                  }
                }
              } else if (!description) {
                description = `Documentation for ${title}`;
              }
              
              pagesEntries.push({
                id: `page-${urlPath.replace(/[^a-z0-9]/gi, '-')}`,
                title: title,
                description: description,
                content: cleanContent,
                url: `/${urlPath}`,
                type: relativeFilePath.includes('developer-Api') ? 'api-docs' : 'documentation',
                category: relativeFilePath.includes('developer-Api') ? 'API Documentation' : 'Documentation',
                keywords: [
                  'documentation', 'API', 'developer', 'guide', 'hushh',
                  ...title.toLowerCase().split(' '),
                  ...(frontmatter.tags || []),
                  ...relativeFilePath.replace(/[-_]/g, ' ').toLowerCase().split(' ')
                ].filter(Boolean),
                searchableText: `${title} ${description} ${cleanContent} ${(frontmatter.tags || []).join(' ')} ${relativeFilePath.replace(/[-_]/g, ' ')}`.toLowerCase()
              });
              
              console.log(`✅ Indexed page: ${title}`);
            } catch (error) {
              console.error(`❌ Error processing ${fullPath}:`, error);
            }
          }
        }
      };

      scanDirectory(pagesDir);
    } catch (error) {
      console.error('❌ Error indexing pages content:', error);
    }
    
    return pagesEntries;
  }

  // Index all product pages - COMPREHENSIVE PRODUCT COVERAGE
  async indexProductPages() {
    const productPages = [
      // Core Products - COMPLETE COVERAGE
      {
        id: 'product-personal-data-agent',
        title: 'Personal Data Agent (PDA)',
        description: 'Your AI-powered personal data assistant that intelligently manages, organizes, and protects your digital information across all platforms.',
        content: 'Personal Data Agent PDA AI assistant data management privacy protection intelligent automation digital assistant personal information organization data security user control artificial intelligence machine learning data analytics personal data vault secure storage encrypted data processing intelligent recommendations data insights personalized experiences automated data organization smart data categorization privacy-first AI assistant digital life management data sovereignty user empowerment intelligent data processing secure data sharing consent management data monetization personal data marketplace personal AI intelligent agent automated assistance data intelligence smart data management intelligent personal assistant AI-powered data organization automated data categorization intelligent data insights personalized data management smart data processing intelligent data automation AI data assistant personal data intelligence automated personal data management intelligent data organization smart personal data assistant AI personal data agent intelligent data management automation personal data AI assistant smart data categorization intelligent personal data organization automated data insights personalized data automation intelligent data assistant AI data management platform',
        url: '/products/personal-data-agent',
        type: 'product',
        category: 'Core Products',
        keywords: ['PDA', 'personal data agent', 'AI assistant', 'data management', 'privacy', 'automation', 'digital assistant', 'data organization', 'intelligent processing', 'personal AI', 'data intelligence', 'smart assistant', 'AI agent', 'personal assistant', 'intelligent automation']
      },
      {
        id: 'product-hushh-vault',
        title: 'Hushh Vault',
        description: 'Secure personal data storage and management platform that puts you in complete control of your digital footprint.',
        content: 'Hushh Vault secure storage personal data management encrypted vault data protection privacy-first storage digital vault personal information security data encryption user control data sovereignty secure data repository personal data warehouse encrypted storage vault data organization privacy protection secure file storage personal data backup data security measures vault encryption personal data control digital privacy vault secure data management encrypted personal vault data protection platform privacy-focused storage personal information vault secure digital storage vault security encrypted data vault secure personal data storage digital data vault personal data security vault data privacy vault personal vault security encrypted vault storage secure vault platform data vault security personal data vault encryption vault data protection secure vault management encrypted vault platform digital vault security personal vault encryption vault data security encrypted personal data vault secure vault storage platform personal data vault security digital vault encryption vault storage security encrypted digital vault secure personal vault platform vault encryption security personal data vault platform secure vault data protection',
        url: '/hushh-vault',
        type: 'product',
        category: 'Core Products',
        keywords: ['vault', 'secure storage', 'data encryption', 'privacy', 'personal data', 'security', 'data protection', 'encrypted vault', 'data management', 'digital vault', 'secure vault', 'vault security', 'encrypted storage', 'data vault', 'personal vault', 'vault encryption']
      },
      {
        id: 'product-hushh-link',
        title: 'Hushh Link',
        description: 'Connect and share data seamlessly across platforms while maintaining complete privacy and user control.',
        content: 'Hushh Link data sharing seamless connection platform integration privacy-preserving sharing secure data exchange cross-platform connectivity data portability user-controlled sharing intelligent data linking secure connections data synchronization privacy-first sharing platform interoperability data bridging secure data transfer controlled data sharing encrypted data links privacy-protected sharing seamless data flow cross-platform data management secure data connectivity intelligent data sharing user-centric data exchange privacy-aware data linking secure platform integration data link platform secure data linking platform cross-platform data sharing intelligent data connections seamless platform integration secure data bridge platform connectivity data integration secure link platform intelligent data bridging cross-platform data connection secure data platform integration intelligent platform connectivity seamless data platform integration secure cross-platform data sharing intelligent data platform connection seamless platform data sharing secure platform data integration intelligent cross-platform data linking secure platform connectivity seamless data connectivity platform intelligent platform data sharing secure data platform connectivity cross-platform data platform integration',
        url: '/hushh-link',
        type: 'product',
        category: 'Core Products',
        keywords: ['link', 'data sharing', 'platform integration', 'connectivity', 'seamless sharing', 'privacy protection', 'data exchange', 'cross-platform', 'secure sharing', 'data synchronization', 'data linking', 'platform connectivity', 'data bridge', 'secure connection', 'data integration']
      },
      {
        id: 'product-hushh-flow',
        title: 'Hushh Flow',
        description: 'Streamline your data workflows with intelligent automation and privacy-preserving data processing.',
        content: 'Hushh Flow workflow automation data processing streamlined operations intelligent workflows automated data handling privacy-preserving automation workflow optimization data flow management automated processes intelligent data routing workflow intelligence data pipeline automation business process automation workflow streamlining intelligent automation privacy-first workflows automated data processing workflow optimization data automation intelligent workflow management automated data flows streamlined data processing workflow intelligence automated operations data workflow optimization intelligent workflow automation streamlined workflow management automated workflow processing intelligent data workflow automation workflow data processing automated workflow optimization intelligent workflow data management streamlined data workflow automation workflow automation platform intelligent data flow automation automated workflow platform data workflow automation platform intelligent workflow processing automation streamlined workflow automation platform automated data workflow management intelligent workflow optimization platform workflow automation data processing automated intelligent workflow platform streamlined automated workflow management intelligent data workflow processing automation workflow data optimization platform automated workflow intelligence platform',
        url: '/products/hushh-flow',
        type: 'product',
        category: 'Core Products',
        keywords: ['flow', 'workflow automation', 'data processing', 'automation', 'intelligent workflows', 'data pipeline', 'streamlined operations', 'workflow optimization', 'process automation', 'data flows', 'workflow management', 'automated processes', 'intelligent automation', 'data workflow', 'workflow intelligence']
      },
      {
        id: 'product-hushh-grid',
        title: 'Hushh Grid',
        description: 'Visualize and organize your data with advanced grid-based interfaces and intelligent data organization.',
        content: 'Hushh Grid data visualization grid interface data organization visual data management intelligent grid system data visualization platform grid-based data display visual data organization interactive data grid intelligent data visualization data presentation grid layout advanced data views visualization tools grid-based interface visual data exploration data visualization dashboard interactive data display grid visualization system visual data management organized data display intelligent data grids visual data presentation data organization grid advanced visualization interface intelligent grid visualization data grid platform visual grid interface interactive grid system advanced grid visualization intelligent data grid platform visual data grid interface grid-based visualization platform intelligent grid interface system visual grid data management interactive data grid platform advanced data grid visualization intelligent visual grid system grid data visualization platform interactive grid visualization system advanced grid data interface intelligent grid data visualization platform visual grid management system interactive grid data platform advanced intelligent grid visualization visual grid data organization platform',
        url: '/products/hushh-grid',
        type: 'product',
        category: 'Core Products',
        keywords: ['grid', 'data visualization', 'visual organization', 'grid interface', 'data display', 'visual management', 'interactive grid', 'data presentation', 'visualization tools', 'organized display', 'grid visualization', 'visual grid', 'data grid', 'grid platform', 'visual interface']
      },

      // Solution Products - COMPLETE COVERAGE
      {
        id: 'product-hushh-wallet-app',
        title: 'Hushh Wallet App',
        description: 'Your personal data vault. Organize, control, and monetize your information with our comprehensive mobile application.',
        content: 'Hushh Wallet App mobile application personal data wallet digital wallet data organization user control data monetization personal information management mobile data vault privacy app data control app personal data organizer mobile privacy digital identity wallet mobile data management user empowerment app data sovereignty mobile personal data marketplace mobile app data security personal information app digital wallet app mobile data protection privacy-first mobile app personal data mobile wallet user-controlled data app mobile data organizer wallet mobile app personal wallet application digital wallet mobile app mobile personal data app wallet app mobile platform personal data wallet mobile application mobile wallet platform digital personal wallet app mobile data wallet application personal wallet mobile platform wallet application mobile personal data wallet app mobile digital wallet application personal mobile wallet app digital mobile wallet platform wallet mobile application platform personal data mobile wallet application mobile wallet app platform digital wallet mobile platform personal wallet app mobile digital wallet app platform mobile personal wallet platform',
        url: '/products/hushh-wallet-app',
        type: 'product',
        category: 'Solution Products',
        keywords: ['wallet app', 'mobile app', 'personal data', 'data monetization', 'mobile wallet', 'privacy app', 'data organization', 'digital wallet', 'personal information', 'mobile data management', 'wallet application', 'mobile platform', 'personal wallet', 'digital mobile wallet', 'mobile data app']
      },
      {
        id: 'product-hushh-button',
        title: 'Hushh Button',
        description: 'Seamlessly share your preferences with brands for personalized experiences while maintaining complete privacy control.',
        content: 'Hushh Button preference sharing personalized experiences brand interaction privacy-controlled sharing user preferences personalization button seamless sharing controlled data sharing preference management personalized recommendations brand engagement user-controlled personalization privacy-preserving personalization preference sharing tool personalized experiences button brand preferences user consent personalization privacy-first personalization controlled brand interaction preference sharing platform user preference management personalized content delivery controlled personalization tool privacy-aware personalization button personalization widget preference button interface user preference button personalized button experience preference sharing widget button personalization platform personalized preference button user preference interface preference button system personalized button platform controlled preference sharing button privacy preference button personalized brand interaction button user preference sharing platform preference button widget personalized button interface controlled personalization button privacy-aware preference button personalized experience button user-controlled preference button privacy preference sharing button personalized button platform interface',
        url: '/products/hushh-button',
        type: 'product',
        category: 'Solution Products',
        keywords: ['button', 'preference sharing', 'personalization', 'brand interaction', 'user preferences', 'privacy control', 'personalized experiences', 'controlled sharing', 'brand engagement', 'user consent', 'preference button', 'personalization button', 'preference widget', 'button interface', 'personalization widget']
      },
      {
        id: 'product-browser-companion',
        title: 'Hushh Browser Companion',
        description: 'Track and manage your online browsing data, building a complete digital profile while maintaining privacy.',
        content: 'Hushh Browser Companion browser extension web tracking data collection browsing data management online privacy digital profile web data tracking browser data privacy browsing history management web data organization online activity tracking browser privacy extension web data control browsing data collection online data management browser data organization web activity monitoring privacy-focused browsing browser data tracking online privacy protection web data privacy browsing data security digital footprint management browser privacy tool web data vault online data protection browser companion extension web companion browser web data companion online data companion browser tracking companion web privacy companion browser data companion digital browser companion online browser companion web browsing companion browser privacy companion online tracking companion web data tracking companion browser extension companion digital privacy companion web companion extension browser data extension online data extension web tracking extension privacy browser extension digital browser extension online browser extension web data browser extension browser tracking extension privacy extension browser web privacy browser extension online privacy browser extension',
        url: '/products/browser-companion',
        type: 'product',
        category: 'Solution Products',
        keywords: ['browser companion', 'browser extension', 'web tracking', 'browsing data', 'online privacy', 'digital profile', 'web data', 'browser privacy', 'online activity', 'digital footprint', 'web companion', 'browser data', 'web extension', 'privacy extension', 'tracking extension']
      },
      {
        id: 'product-hushh-vibe-search',
        title: 'VIBE Search App',
        description: 'Discover products you love with image-based search and AI recommendations powered by your personal data.',
        content: 'VIBE Search App image search visual search AI recommendations product discovery image-based shopping visual product search intelligent recommendations personalized shopping AI-powered search visual commerce image recognition product matching visual shopping assistant intelligent product discovery image-driven search visual search engine AI shopping assistant personalized product recommendations visual product discovery intelligent shopping app image-based product search visual search platform AI recommendation engine visual commerce platform personalized visual search intelligent product matching visual search app image search app AI search app visual shopping app product search app intelligent search app personalized search app visual commerce app image recognition app product discovery app visual product app image-based search app AI product search app visual search platform app intelligent visual search app personalized visual search app AI visual search app visual product search app intelligent product search app personalized product search app visual AI search app image-based visual search app intelligent image search app personalized image search app',
        url: '/products/hushh-vibe-search',
        type: 'product',
        category: 'Solution Products',
        keywords: ['VIBE search', 'image search', 'visual search', 'AI recommendations', 'product discovery', 'visual commerce', 'image recognition', 'personalized shopping', 'AI shopping', 'visual product search', 'search app', 'visual app', 'AI search', 'product search', 'shopping app']
      },
      {
        id: 'product-developer-api',
        title: 'Developer API',
        description: 'Comprehensive tools for businesses to integrate Hushh data and privacy features into their applications.',
        content: 'Developer API REST API GraphQL API integration tools business integration data API privacy API developer tools API documentation SDK software development kit API endpoints data integration platform API developer resources business API enterprise API data platform API privacy-first API secure API developer platform API integration business tools enterprise integration data platform API developer documentation API reference business developer tools API gateway data access API privacy-aware API developer API platform business API platform enterprise API platform data API platform integration API platform developer API tools business API tools enterprise API tools data API tools API development platform business integration platform enterprise integration platform data integration API platform developer integration platform API business platform enterprise data platform privacy API platform secure API platform developer platform API business platform integration enterprise platform integration data platform integration API platform integration tools business integration API enterprise integration API data integration API tools',
        url: '/developerApi',
        type: 'product',
        category: 'Solution Products',
        keywords: ['developer API', 'REST API', 'GraphQL', 'integration', 'SDK', 'developer tools', 'business integration', 'API documentation', 'enterprise API', 'data platform', 'API platform', 'developer platform', 'business API', 'integration tools', 'API tools']
      },
      {
        id: 'product-hushh-for-students',
        title: 'Hushh For Students',
        description: 'Rewards & empowers students with data control in a safe and secure educational environment.',
        content: 'Hushh For Students student data privacy educational data protection student empowerment data control students student data security educational privacy student data management campus data protection student privacy rights educational data security student data sovereignty academic data protection student information security educational data management student privacy platform educational technology student data control academic privacy protection student data organization educational data privacy student empowerment platform academic data security student information management educational privacy tools student platform educational student platform academic student platform campus student platform educational data platform student privacy platform academic privacy platform campus privacy platform educational security platform student security platform academic security platform campus security platform educational empowerment platform student empowerment platform academic empowerment platform campus empowerment platform educational technology platform student technology platform academic technology platform campus technology platform',
        url: '/products/hushh-for-students',
        type: 'product',
        category: 'Solution Products',
        keywords: ['students', 'educational data', 'student privacy', 'campus data', 'educational technology', 'student empowerment', 'academic privacy', 'student data security', 'educational privacy', 'student data control', 'student platform', 'educational platform', 'academic platform', 'campus platform', 'student technology']
      },
      {
        id: 'product-concierge-app',
        title: 'Concierge App',
        description: 'Personalized concierge service powered by your data to provide tailored recommendations and assistance.',
        content: 'Concierge App personal concierge AI concierge personalized assistance AI-powered concierge intelligent assistance personal assistant app concierge service digital concierge automated assistance personal service app intelligent concierge platform AI assistant app personalized service digital assistant app concierge platform automated concierge service intelligent personal assistant AI-driven concierge personalized concierge platform digital personal assistant intelligent service app personal AI concierge automated personal assistant concierge app platform personal concierge app AI concierge app intelligent concierge app automated concierge app digital concierge app personalized concierge app assistant concierge app personal assistant concierge app AI assistant concierge app intelligent assistant concierge app automated assistant concierge app digital assistant concierge app personalized assistant concierge app service concierge app personal service concierge app AI service concierge app intelligent service concierge app automated service concierge app digital service concierge app personalized service concierge app',
        url: '/products/concierge-app',
        type: 'product',
        category: 'Solution Products',
        keywords: ['concierge', 'personal assistant', 'AI concierge', 'personalized assistance', 'intelligent assistance', 'personal service', 'digital assistant', 'automated assistance', 'AI assistant', 'personal AI', 'concierge app', 'assistant app', 'service app', 'personal app', 'AI app']
      },
      {
        id: 'product-valet-chat',
        title: 'Valet Chat',
        description: 'Intelligent chat assistant that learns from your data to provide personalized communication experiences.',
        content: 'Valet Chat intelligent chat AI chat assistant personalized chat smart messaging AI-powered chat intelligent messaging chat AI conversational AI personal chat assistant intelligent conversation automated chat AI chat bot personalized messaging intelligent chat platform AI communication assistant smart chat intelligent dialogue automated conversation AI messaging platform personalized AI chat intelligent chat experience AI conversation assistant automated personal chat intelligent messaging platform AI-driven chat personalized conversation AI smart communication assistant valet chat app intelligent chat app AI chat app personalized chat app smart chat app conversational chat app messaging chat app intelligent messaging app AI messaging app personalized messaging app automated chat app digital chat app smart messaging app intelligent conversation app AI conversation app personalized conversation app automated conversation app digital conversation app smart conversation app intelligent communication app AI communication app personalized communication app automated communication app digital communication app smart communication app',
        url: '/products/hushh-valet-chat',
        type: 'product',
        category: 'Solution Products',
        keywords: ['valet chat', 'AI chat', 'intelligent chat', 'personalized chat', 'chat assistant', 'conversational AI', 'smart messaging', 'AI communication', 'automated chat', 'intelligent messaging', 'chat app', 'messaging app', 'conversation app', 'communication app', 'AI messaging']
      }
    ];

    return productPages.map(product => ({
      ...product,
      searchableText: `${product.title} ${product.description} ${product.content} ${product.keywords.join(' ')}`.toLowerCase()
    }));
  }

  // Index all static pages and navigation content - COMPREHENSIVE COVERAGE
  async indexStaticPages() {
    const staticPages = [
      // Main navigation pages
      {
        id: 'home',
        title: 'Hushh - Your Data, Your Business',
        description: 'Transform how you control, share, and monetize your personal data with AI-powered privacy tools and intelligent data management solutions.',
        content: 'Hushh data privacy personal data control AI-powered tools data monetization privacy-first technology user empowerment data sovereignty digital identity data management personal data wallet AI recommendations privacy protection secure data sharing personalized experiences data analytics intelligent automation data security user control privacy by design data ownership digital privacy artificial intelligence machine learning data insights personal data marketplace privacy technology data protection platform user-centric design data intelligence privacy-preserving AI secure data processing intelligent data management home page main website landing page platform overview technology showcase user experience privacy tools data tools AI tools intelligent tools automated tools smart tools digital tools privacy platform data platform AI platform intelligent platform automated platform smart platform digital platform',
        url: '/',
        type: 'page',
        category: 'Main Pages',
        keywords: ['home', 'hushh', 'data privacy', 'personal data', 'AI', 'data control', 'privacy technology', 'data monetization', 'digital identity', 'user empowerment', 'landing page', 'main page', 'website', 'platform']
      },
      {
        id: 'about',
        title: 'About Hushh - Our Mission & Vision',
        description: 'Learn about Hushh\'s mission to empower users with complete control over their personal data and privacy.',
        content: 'About Hushh company mission vision team privacy advocacy data empowerment user rights digital privacy company values data sovereignty user control privacy technology leadership team company culture innovation privacy-first approach data protection advocacy user empowerment mission company background technology innovation privacy leadership data rights advocacy user privacy protection company philosophy digital rights privacy innovation technology leadership user-centric approach privacy by design company values data ethics privacy advocacy team expertise about page company information team information leadership information mission statement vision statement company story founder story team story privacy mission data mission AI mission technology mission innovation mission',
        url: '/about',
        type: 'page',
        category: 'Company',
        keywords: ['about', 'mission', 'vision', 'team', 'company', 'privacy advocacy', 'data empowerment', 'user rights', 'company values', 'leadership', 'company information', 'team information', 'mission statement', 'vision statement', 'company story']
      },
      {
        id: 'contact',
        title: 'Contact Hushh - Get In Touch',
        description: 'Contact Hushh for support, partnerships, or inquiries about our privacy-first data solutions.',
        content: 'Contact Hushh customer support business inquiries partnerships collaboration support team contact information get in touch customer service business development partnership opportunities support requests technical support sales inquiries business contacts customer relations support channels communication contact details business partnerships collaboration opportunities customer assistance support services business inquiries contact support team business development contact sales team partnership inquiries contact page contact us get in touch contact form support contact customer contact business contact technical contact sales contact partnership contact collaboration contact support information contact details',
        url: '/contact-us',
        type: 'page',
        category: 'Support',
        keywords: ['contact', 'support', 'customer service', 'business inquiries', 'partnerships', 'get in touch', 'customer support', 'technical support', 'sales', 'collaboration', 'contact us', 'contact page', 'support contact', 'business contact']
      },
      {
        id: 'careers',
        title: 'Careers at Hushh - Join Our Team',
        description: 'Join Hushh in revolutionizing data privacy and building the future of user-controlled digital experiences.',
        content: 'Careers Hushh jobs employment opportunities team members hiring work opportunities job openings career development professional growth tech careers privacy technology careers software engineering jobs data science careers product management careers design careers marketing careers business development careers remote work opportunities technology jobs startup careers innovation careers privacy advocacy careers user experience careers engineering careers technical careers career opportunities professional development careers page job listings employment job opportunities work at hushh join team hiring jobs open positions tech jobs startup jobs privacy jobs data jobs AI jobs technology careers innovation careers',
        url: '/career',
        type: 'page',
        category: 'Company',
        keywords: ['careers', 'jobs', 'employment', 'hiring', 'team', 'work opportunities', 'job openings', 'tech careers', 'software engineering', 'data science', 'product management', 'startup careers', 'careers page', 'job listings', 'work at hushh', 'join team']
      },
      {
        id: 'blogs',
        title: 'Hushh Blogs - Privacy & Technology Insights',
        description: 'Latest insights, news, and thought leadership on data privacy, AI, and technology from the Hushh team.',
        content: 'Hushh blogs articles insights thought leadership privacy technology AI artificial intelligence data science technology trends privacy news data protection insights technology articles AI insights privacy advocacy technology innovation data privacy trends AI technology blog posts privacy technology insights data science articles AI research technology updates privacy insights technology thought leadership AI advancements privacy innovation technology blog privacy articles AI blog technology insights data privacy blog blog page articles page insights page thought leadership page technology blog AI blog data blog privacy blog innovation blog research blog news blog updates blog trends blog',
        url: '/hushhBlogs',
        type: 'page',
        category: 'Content',
        keywords: ['blogs', 'articles', 'insights', 'thought leadership', 'privacy', 'technology', 'AI', 'data science', 'technology trends', 'privacy news', 'innovation', 'blog page', 'articles page', 'technology blog', 'AI blog', 'data blog', 'privacy blog']
      },
      {
        id: 'faq',
        title: 'Frequently Asked Questions - Hushh FAQ',
        description: 'Find answers to common questions about Hushh products, privacy features, and data management.',
        content: 'FAQ frequently asked questions help support answers common questions product help user guide troubleshooting product information feature explanations how to guides user assistance support documentation product support frequently asked questions help center support resources user help product questions technical support user documentation product guidance support answers help documentation user support resources FAQ page help page support page user guide page documentation page troubleshooting page product help page technical help page user assistance page support assistance page',
        url: 'https://github.com/hushh-labs/consent-protocol/blob/main/docs/faq.md',
        type: 'page',
        category: 'Support',
        keywords: ['FAQ', 'frequently asked questions', 'help', 'support', 'answers', 'user guide', 'troubleshooting', 'product help', 'documentation', 'assistance', 'FAQ page', 'help page', 'support page', 'user guide page', 'documentation page']
      },

      // Developer pages
      {
        id: 'getting-started',
        title: 'Getting Started - Hushh Developer Guide',
        description: 'Begin your journey with Hushh development tools, APIs, and integration guides.',
        content: 'Getting started developer guide API documentation integration tutorial development setup SDK installation developer resources development tools API integration getting started guide developer documentation technical documentation development tutorial API setup integration guide developer quickstart API quickstart development guide technical guide developer onboarding API onboarding development resources technical resources developer tools development platform API platform integration platform developer support technical support getting started page developer page API page documentation page tutorial page setup page installation page integration page development page technical page developer guide page',
        url: '/getting-started',
        type: 'page',
        category: 'Developer Resources',
        keywords: ['getting started', 'developer guide', 'API documentation', 'integration', 'development', 'SDK', 'developer resources', 'technical documentation', 'API setup', 'developer onboarding', 'getting started page', 'developer page', 'API page', 'documentation page']
      },
      {
        id: 'github-protocol',
        title: 'GitHub Protocol - Open Source Development',
        description: 'Open source development framework and protocols for building privacy-first applications.',
        content: 'GitHub protocol open source development framework privacy-first development open source tools development protocols GitHub repositories open source projects development framework open source platform development guidelines technical protocols development standards open source contributions GitHub development open source community development collaboration technical framework development tools open source development privacy development protocols GitHub open source technical standards development community GitHub page protocol page open source page development framework page technical protocol page development standards page open source development page GitHub development page community development page collaboration development page',
        url: '/agent-kit-cli#github-protocol',
        type: 'page',
        category: 'Developer Resources',
        keywords: ['GitHub protocol', 'open source', 'development framework', 'privacy development', 'open source tools', 'development protocols', 'GitHub repositories', 'technical framework', 'development standards', 'open source community', 'GitHub page', 'protocol page', 'open source page']
      },
      {
        id: 'agentkit-cli',
        title: 'AgentKit CLI - Command Line Tools',
        description: 'Command line interface tools for developers to build and deploy Hushh-powered applications.',
        content: 'AgentKit CLI command line interface developer tools CLI tools command line tools developer CLI development tools command line development CLI utilities developer utilities command line utilities development CLI technical tools developer command line CLI development tools command line development platform CLI platform developer CLI tools command line interface development CLI utilities technical CLI command line technical tools developer command line interface CLI development platform AgentKit page CLI page command line page developer tools page CLI tools page development tools page command line tools page technical tools page developer CLI page development CLI page',
        url: '/agent-kit-cli#agentkit-cli',
        type: 'page',
        category: 'Developer Resources',
        keywords: ['AgentKit CLI', 'command line interface', 'CLI tools', 'developer tools', 'command line tools', 'development tools', 'CLI utilities', 'developer CLI', 'technical tools', 'command line development', 'AgentKit page', 'CLI page', 'developer tools page']
      },
      {
        id: 'build-operon',
        title: 'Build an Operon - Custom Data Operations',
        description: 'Create custom data operations and intelligent agents using Hushh\'s Operon framework.',
        content: 'Build Operon custom data operations intelligent agents agent development data operations framework custom agents agent building Operon development agent framework intelligent agent development custom data processing agent creation data operation development intelligent data operations custom agent development agent building platform Operon framework agent development tools intelligent agent framework custom agent framework agent development platform data operation framework intelligent operations custom operations development Operon page build page agent page development page framework page custom development page agent building page intelligent agent page custom agent page data operations page',
        url: '/agent-kit-cli#build-operon',
        type: 'page',
        category: 'Developer Resources',
        keywords: ['build operon', 'custom data operations', 'intelligent agents', 'agent development', 'data operations', 'agent framework', 'custom agents', 'agent building', 'intelligent operations', 'agent development tools', 'Operon page', 'build page', 'agent page', 'development page']
      },
      {
        id: 'submit-marketplace',
        title: 'Submit to Marketplace - Publish Your Creations',
        description: 'Publish your Hushh-powered applications and data operations to our developer marketplace.',
        content: 'Submit marketplace publish applications developer marketplace app marketplace publish creations developer submissions marketplace submissions app publishing application publishing marketplace platform developer platform publish apps submit applications marketplace publishing developer marketplace platform app submission application submission marketplace developer portal publishing platform developer publishing marketplace apps developer creations marketplace platform submission process marketplace page submit page publish page developer marketplace page app marketplace page publishing page submission page developer platform page marketplace platform page developer portal page',
        url: '/agent-kit-cli#submit-marketplace',
        type: 'page',
        category: 'Developer Resources',
        keywords: ['submit marketplace', 'publish applications', 'developer marketplace', 'app marketplace', 'marketplace submissions', 'app publishing', 'developer platform', 'marketplace platform', 'developer publishing', 'application submission', 'marketplace page', 'submit page', 'publish page']
      },

      // Why Hushh pages
      {
        id: 'why-hushh',
        title: 'Why Hushh? - Our Philosophy',
        description: 'Understanding our core beliefs about data privacy, user empowerment, and the future of digital identity.',
        content: 'Why Hushh philosophy core beliefs data privacy user empowerment digital identity privacy philosophy user rights data sovereignty digital rights privacy advocacy user control data ownership privacy principles user empowerment philosophy data ethics privacy ethics digital privacy philosophy user-centric approach privacy-first philosophy data protection philosophy user privacy philosophy digital sovereignty privacy advocacy philosophy user empowerment principles data rights philosophy privacy principles digital rights philosophy user control philosophy why hushh page philosophy page beliefs page privacy philosophy page user empowerment page digital identity page privacy principles page data ethics page user rights page data sovereignty page',
        url: '/why-hushh',
        type: 'page',
        category: 'Philosophy',
        keywords: ['why hushh', 'philosophy', 'core beliefs', 'data privacy', 'user empowerment', 'digital identity', 'privacy philosophy', 'user rights', 'data sovereignty', 'privacy principles', 'why hushh page', 'philosophy page', 'beliefs page', 'privacy philosophy page']
      },
      {
        id: 'privacy-manifesto',
        title: 'Privacy Manifesto - Our Commitment',
        description: 'Our comprehensive commitment to privacy rights, data protection, and user empowerment.',
        content: 'Privacy manifesto privacy commitment privacy policy data protection user privacy rights digital privacy manifesto privacy principles privacy advocacy privacy protection privacy rights manifesto data privacy manifesto user empowerment manifesto digital rights manifesto privacy philosophy manifesto user control manifesto data sovereignty manifesto privacy-first manifesto digital privacy principles privacy advocacy manifesto user rights manifesto data protection manifesto privacy ethics manifesto privacy manifesto page privacy policy page data protection page privacy commitment page privacy rights page digital privacy page privacy principles page privacy advocacy page',
        url: '/legal/privacypolicy',
        type: 'page',
        category: 'Legal',
        keywords: ['privacy manifesto', 'privacy commitment', 'privacy policy', 'data protection', 'user privacy rights', 'digital privacy', 'privacy principles', 'privacy advocacy', 'privacy rights', 'data privacy', 'privacy manifesto page', 'privacy policy page', 'data protection page']
      },
      {
        id: 'consent-protocol',
        title: 'Consent AI Protocol - How We Handle Consent',
        description: 'Advanced AI-powered consent management protocol that puts users in complete control of their data permissions.',
        content: 'Consent AI protocol consent management AI consent consent AI user consent data consent privacy consent consent framework consent system AI-powered consent intelligent consent automated consent consent management platform consent technology consent protocol AI consent platform consent automation user consent management data consent management privacy consent management consent AI system intelligent consent management automated consent protocol consent management system AI consent framework consent technology platform consent protocol page consent AI page consent management page user consent page data consent page privacy consent page consent framework page consent system page AI consent page',
        url: '/consent-ai-protocol',
        type: 'page',
        category: 'Technology',
        keywords: ['consent protocol', 'AI consent', 'consent management', 'user consent', 'data consent', 'privacy consent', 'consent framework', 'AI-powered consent', 'consent technology', 'consent automation', 'consent protocol page', 'consent AI page', 'consent management page']
      },

      // Community pages
      {
        id: 'agent-builders-club',
        title: 'Agent Builders Club - Developer Community',
        description: 'Join our vibrant community of developers building the future of privacy-first AI agents and applications.',
        content: 'Agent Builders Club developer community AI agents community developer network agent development community privacy developers AI development community intelligent agents community agent builders developer club AI developer community privacy-first developers agent development network developer collaboration community building AI community privacy community developer ecosystem agent development ecosystem AI development ecosystem privacy development community intelligent agent community community page developer community page AI community page agent community page developer network page community building page developer collaboration page AI development community page privacy community page',
        url: '/hushh-community',
        type: 'page',
        category: 'Community',
        keywords: ['agent builders club', 'developer community', 'AI agents', 'privacy developers', 'AI development', 'developer network', 'agent development', 'developer collaboration', 'AI community', 'privacy community', 'community page', 'developer community page', 'AI community page']
      },
      {
        id: 'hushh-labs',
        title: 'Hushh Labs - Advanced AI Research',
        description: 'Advanced AI research and development lab focused on privacy-preserving artificial intelligence and data technologies.',
        content: 'Hushh Labs AI research advanced research privacy AI research artificial intelligence research AI lab research lab privacy research data research technology research AI innovation privacy innovation research and development AI R&D privacy R&D technology innovation research projects AI research projects privacy research projects data science research machine learning research AI technology research privacy technology research advanced AI research cutting-edge research labs page research page AI research page advanced research page privacy research page research lab page AI lab page technology research page innovation research page R&D page research projects page',
        url: '/labs',
        type: 'page',
        category: 'Research',
        keywords: ['hushh labs', 'AI research', 'advanced research', 'privacy AI', 'research lab', 'AI innovation', 'technology research', 'R&D', 'AI technology', 'privacy research', 'labs page', 'research page', 'AI research page', 'research lab page']
      },
      {
        id: 'solutions',
        title: 'Solutions - Delivering Tailored IT Services',
        description: 'Comprehensive IT solutions that meet the rigorous demands of modern business with privacy-first technology.',
        content: 'Solutions IT solutions business solutions enterprise solutions tailored solutions technology solutions custom solutions business technology enterprise technology IT services business services technology services custom technology privacy solutions data solutions AI solutions intelligent solutions business intelligence enterprise solutions technology consulting IT consulting business consulting technology implementation enterprise implementation custom implementation privacy technology solutions data technology solutions solutions page IT solutions page business solutions page enterprise solutions page technology solutions page custom solutions page business technology page IT services page technology consulting page business consulting page',
        url: '/solutions',
        type: 'page',
        category: 'Business',
        keywords: ['solutions', 'IT solutions', 'business solutions', 'enterprise solutions', 'technology solutions', 'custom solutions', 'business technology', 'IT services', 'technology consulting', 'privacy solutions', 'solutions page', 'IT solutions page', 'business solutions page']
      },
      {
        id: 'hackathons',
        title: 'Hackathons - Build the Future With Us',
        description: 'Join Hushh hackathons to build innovative privacy-first applications and compete for exciting prizes.',
        content: 'Hackathons developer events coding competitions innovation events tech events developer competitions coding hackathons AI hackathons privacy hackathons technology competitions developer challenges coding challenges innovation challenges tech competitions hackathon events developer hackathons innovation hackathons technology hackathons AI competitions privacy competitions developer contests coding contests innovation contests tech contests hackathon competitions development competitions hackathons page hackathon page developer events page coding competitions page innovation events page tech events page developer competitions page coding hackathons page AI hackathons page',
        url: '/pda/iithackathon',
        type: 'page',
        category: 'Events',
        keywords: ['hackathons', 'developer events', 'coding competitions', 'innovation events', 'tech events', 'developer competitions', 'coding hackathons', 'AI hackathons', 'privacy hackathons', 'technology competitions', 'hackathons page', 'hackathon page', 'developer events page']
      },

      // Support pages
      {
        id: 'live-demo',
        title: 'Live Demo - See Hushh in Action',
        description: 'Schedule a live demonstration of Hushh products and see how our privacy-first technology works.',
        content: 'Live demo product demonstration Hushh demo technology demonstration product showcase live presentation product demo schedule demo book demo demo booking demo session product walkthrough technology showcase live product demo product presentation technology demo privacy demo AI demo data demo interactive demo product tour technology tour live showcase product experience demo experience demo page live demo page product demo page technology demo page demo booking page demo session page product demonstration page live presentation page product showcase page technology showcase page',
        url: '/demoBookingPage',
        type: 'page',
        category: 'Support',
        keywords: ['live demo', 'product demonstration', 'demo booking', 'product showcase', 'technology demo', 'product walkthrough', 'demo session', 'interactive demo', 'product tour', 'live presentation', 'demo page', 'live demo page', 'product demo page']
      },

      // Legal pages
      {
        id: 'terms-of-service',
        title: 'Terms of Service - Hushh Legal Terms',
        description: 'Comprehensive terms of service governing the use of Hushh products and services.',
        content: 'Terms of service legal terms user agreement service agreement terms and conditions legal agreement usage terms service terms legal document user terms service conditions legal conditions usage agreement terms of use legal terms and conditions service agreement terms legal policy user agreement terms service legal terms legal framework user legal terms service legal agreement terms legal conditions terms of service page legal terms page user agreement page service agreement page terms and conditions page legal agreement page usage terms page legal document page legal policy page',
        url: '/legal/termsofuse',
        type: 'page',
        category: 'Legal',
        keywords: ['terms of service', 'legal terms', 'user agreement', 'service agreement', 'terms and conditions', 'legal agreement', 'usage terms', 'legal document', 'user terms', 'service terms', 'terms of service page', 'legal terms page', 'user agreement page']
      }
    ];

    return staticPages.map(page => ({
      ...page,
      searchableText: `${page.title} ${page.description} ${page.content} ${page.keywords.join(' ')}`.toLowerCase()
    }));
  }

  // Index all clientside components and app pages
  async indexAppPagesContent() {
    const appPagesContent = [
      // Clientside Components
      {
        id: 'clientside-browser-companion',
        title: 'Browser Companion Features',
        description: 'Comprehensive browser extension for tracking and managing online browsing data with privacy-first approach.',
        content: 'Browser companion extension web tracking online privacy browsing data management digital footprint web data collection browser privacy online activity tracking web data organization browser data control online data protection web privacy browser security browsing history management web activity monitoring browser data tracking online privacy protection digital activity tracking web data privacy browser extension features privacy extension web companion browser data companion',
        url: '/products/browser-companion',
        type: 'feature',
        category: 'Browser Extension',
        keywords: ['browser companion', 'extension', 'web tracking', 'browsing data', 'online privacy', 'digital footprint', 'web data', 'browser privacy', 'privacy extension']
      },
      {
        id: 'clientside-hushh-wallet',
        title: 'Hushh Wallet Mobile Experience',
        description: 'Comprehensive mobile wallet application for personal data management and monetization.',
        content: 'Hushh wallet mobile app personal data wallet digital wallet mobile data management data monetization mobile privacy personal data control mobile data organization user empowerment app data sovereignty mobile personal data marketplace mobile app data security personal information app digital wallet app mobile data protection privacy-first mobile app wallet application mobile platform',
        url: '/products/hushh-wallet-app',
        type: 'feature',
        category: 'Mobile Application',
        keywords: ['wallet app', 'mobile app', 'personal data', 'data monetization', 'mobile wallet', 'privacy app', 'mobile platform']
      },
      {
        id: 'clientside-vibe-search',
        title: 'VIBE Search Experience',
        description: 'Visual and AI-powered search experience for product discovery and recommendations.',
        content: 'VIBE search visual search AI search image search product discovery visual product search intelligent recommendations personalized shopping AI-powered search visual commerce image recognition product matching visual shopping assistant intelligent product discovery image-driven search visual search engine AI shopping assistant',
        url: '/products/hushh-vibe-search',
        type: 'feature',
        category: 'Search Platform',
        keywords: ['VIBE search', 'visual search', 'AI search', 'image search', 'product discovery', 'visual commerce', 'AI shopping']
      },
      {
        id: 'app-labs',
        title: 'Hushh Labs Research Platform',
        description: 'Advanced AI research and development laboratory for privacy-preserving technologies.',
        content: 'Hushh Labs AI research advanced research privacy AI research artificial intelligence research AI lab research lab privacy research data research technology research AI innovation privacy innovation research and development AI R&D privacy R&D technology innovation research projects cutting-edge research labs careers research careers',
        url: '/labs',
        type: 'page',
        category: 'Research Lab',
        keywords: ['hushh labs', 'AI research', 'advanced research', 'privacy AI', 'research lab', 'AI innovation', 'technology research', 'R&D']
      },
      {
        id: 'app-labs-career',
        title: 'Hushh Labs Career Opportunities',
        description: 'Career opportunities in AI research and privacy technology development at Hushh Labs.',
        content: 'Hushh Labs career opportunities AI research careers privacy technology careers research scientist positions AI engineer jobs data scientist careers machine learning careers privacy researcher jobs AI developer positions research lab careers technology research careers innovation careers cutting-edge technology careers startup research careers',
        url: '/labs/career',
        type: 'page',
        category: 'Careers',
        keywords: ['labs career', 'AI research jobs', 'privacy technology careers', 'research scientist', 'AI engineer', 'data scientist', 'research careers']
      },
      {
        id: 'app-why-hushh',
        title: 'Why Choose Hushh - Our Philosophy',
        description: 'Understanding Hushh\'s core philosophy about data privacy, user empowerment, and digital sovereignty.',
        content: 'Why Hushh philosophy core beliefs data privacy user empowerment digital identity privacy philosophy user rights data sovereignty digital rights privacy advocacy user control data ownership privacy principles user empowerment philosophy data ethics privacy ethics digital privacy philosophy user-centric approach privacy-first philosophy',
        url: '/why-hushh',
        type: 'page',
        category: 'Philosophy',
        keywords: ['why hushh', 'philosophy', 'core beliefs', 'data privacy', 'user empowerment', 'digital identity', 'privacy philosophy']
      },
      {
        id: 'app-solutions',
        title: 'Business Solutions & Services',
        description: 'Comprehensive IT solutions and business services powered by privacy-first technology.',
        content: 'Solutions IT solutions business solutions enterprise solutions tailored solutions technology solutions custom solutions business technology enterprise technology IT services business services technology services custom technology privacy solutions data solutions AI solutions intelligent solutions business intelligence enterprise solutions technology consulting',
        url: '/solutions',
        type: 'page',
        category: 'Business Services',
        keywords: ['solutions', 'IT solutions', 'business solutions', 'enterprise solutions', 'technology solutions', 'business services']
      },
      {
        id: 'app-consent-ai-protocol',
        title: 'Consent AI Protocol Documentation',
        description: 'Advanced AI-powered consent management protocol for complete user control over data permissions.',
        content: 'Consent AI protocol consent management AI consent consent AI user consent data consent privacy consent consent framework consent system AI-powered consent intelligent consent automated consent consent management platform consent technology consent protocol AI consent platform consent automation user consent management',
        url: '/consent-ai-protocol',
        type: 'page',
        category: 'Technology Documentation',
        keywords: ['consent protocol', 'AI consent', 'consent management', 'user consent', 'data consent', 'privacy consent', 'consent framework']
      },
      {
        id: 'app-outbound-services',
        title: 'Outbound Services Platform',
        description: 'Professional outbound services and business development solutions.',
        content: 'Outbound services business development enterprise services custom services technology services outbound platform business technology service platform enterprise solutions technology consulting business consulting outbound solutions service delivery business services technology implementation',
        url: '/outbound-services',
        type: 'page',
        category: 'Business Services',
        keywords: ['outbound services', 'business development', 'enterprise services', 'technology consulting', 'business consulting']
      },
      {
        id: 'app-pricing-plans',
        title: 'Pricing Plans & Subscriptions',
        description: 'Comprehensive pricing plans and subscription options for all Hushh products and services.',
        content: 'Pricing plans subscription plans pricing options service plans product pricing enterprise pricing business pricing individual pricing team pricing organization pricing pricing tiers subscription tiers pricing models payment plans billing plans cost structure pricing structure subscription options',
        url: '/pricingPlans',
        type: 'page',
        category: 'Pricing',
        keywords: ['pricing plans', 'subscription plans', 'pricing options', 'enterprise pricing', 'business pricing', 'payment plans']
      },
      {
        id: 'app-user-guide',
        title: 'User Guide & Documentation',
        description: 'Comprehensive user documentation and guidance for all Hushh products and features.',
        content: 'User guide documentation user documentation product guide help documentation user manual product manual user help guide assistance user support documentation help guide product help user assistance guide user instructions product instructions user tutorial product tutorial help center',
        url: '/UserGuide',
        type: 'page',
        category: 'Documentation',
        keywords: ['user guide', 'documentation', 'user manual', 'help guide', 'product guide', 'user instructions', 'tutorial']
      },
      {
        id: 'app-frequently-asked-questions',
        title: 'Frequently Asked Questions',
        description: 'Common questions and answers about Hushh products, privacy features, and data management.',
        content: 'Frequently asked questions FAQ help support answers common questions product help user guide troubleshooting product information feature explanations how to guides user assistance support documentation product support help center support resources user help',
        url: '/frequently-asked-questions',
        type: 'page',
        category: 'Support',
        keywords: ['FAQ', 'frequently asked questions', 'help', 'support', 'answers', 'troubleshooting', 'user assistance']
      },
      {
        id: 'app-user-registration',
        title: 'User Registration & Onboarding',
        description: 'User registration process and onboarding experience for Hushh platform.',
        content: 'User registration sign up account creation onboarding user onboarding registration process account setup user account new user registration user signup platform registration onboarding experience user journey registration flow account registration',
        url: '/user-registration',
        type: 'page',
        category: 'User Experience',
        keywords: ['user registration', 'sign up', 'account creation', 'onboarding', 'user onboarding', 'account setup']
      },
      {
        id: 'app-login',
        title: 'User Login & Authentication',
        description: 'Secure user login and authentication system for Hushh platform access.',
        content: 'User login authentication sign in user authentication secure login user access platform login account access user signin authentication system login system user login system secure access authentication flow login flow',
        url: '/login',
        type: 'page',
        category: 'Authentication',
        keywords: ['user login', 'authentication', 'sign in', 'secure login', 'user access', 'platform login', 'account access']
      },
      {
        id: 'app-user-profile',
        title: 'User Profile Management',
        description: 'User profile management system for personal data and account settings.',
        content: 'User profile profile management account settings user settings personal profile profile settings user account management profile information user information account information profile data user data management profile customization',
        url: '/user-profile',
        type: 'page',
        category: 'User Management',
        keywords: ['user profile', 'profile management', 'account settings', 'user settings', 'personal profile', 'profile data']
      },
      {
        id: 'app-legal-terms',
        title: 'Legal Terms & Policies',
        description: 'Comprehensive legal terms, privacy policies, and terms of service.',
        content: 'Legal terms privacy policy terms of service user agreement service agreement terms and conditions legal agreement usage terms service terms legal document user terms service conditions legal conditions legal policy terms of use',
        url: '/legal',
        type: 'page',
        category: 'Legal',
        keywords: ['legal terms', 'privacy policy', 'terms of service', 'user agreement', 'legal agreement', 'terms and conditions']
      }
    ];

    return appPagesContent.map(page => ({
      ...page,
      searchableText: `${page.title} ${page.description} ${page.content} ${page.keywords.join(' ')}`.toLowerCase()
    }));
  }

  // Build comprehensive search index
  async buildSearchIndex() {
    try {
      console.log('🚀 Building comprehensive search index...');
      
      const blogContent = await this.indexBlogContent();
      const pagesContent = await this.indexPagesContent();
      const productPages = await this.indexProductPages();
      const staticPages = await this.indexStaticPages();
      const appPagesContent = await this.indexAppPagesContent();

      this.contentIndex = [
        ...blogContent,
        ...pagesContent,
        ...productPages,
        ...staticPages,
        ...appPagesContent
      ];

      console.log(`✅ COMPREHENSIVE SEARCH INDEX BUILT with ${this.contentIndex.length} items:`, {
        blogs: blogContent.length,
        pages: pagesContent.length,
        products: productPages.length,
        static: staticPages.length,
        appPages: appPagesContent.length,
        total: this.contentIndex.length
      });

      // Log sample of indexed content for debugging
      if (this.contentIndex.length > 0) {
        console.log('📋 Sample indexed items:', this.contentIndex.slice(0, 3).map(item => ({ 
          id: item.id, 
          title: item.title, 
          type: item.type,
          url: item.url 
        })));
      }

      return this.contentIndex;
    } catch (error) {
      console.error('❌ Error building comprehensive search index:', error);
      return [];
    }
  }

  // Enhanced search through all content with better scoring
  searchContent(query, options = {}) {
    if (!query || query.trim().length < 1) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const { limit = 25, type = null } = options;

    let results = this.contentIndex.filter(item => {
      if (type && item.type !== type) return false;
      
      // Comprehensive search across all fields
      const matchesContent = item.searchableText && item.searchableText.includes(searchTerm);
      const matchesKeywords = item.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      const matchesTitle = item.title.toLowerCase().includes(searchTerm);
      const matchesDescription = item.description.toLowerCase().includes(searchTerm);
      const matchesUrl = item.url.toLowerCase().includes(searchTerm);
      
      return matchesContent || matchesKeywords || matchesTitle || matchesDescription || matchesUrl;
    });

    // Enhanced relevance scoring
    results = results.map(item => {
      let relevanceScore = 0;
      
      // Exact title match gets highest score
      if (item.title.toLowerCase() === searchTerm) {
        relevanceScore += 1000;
      } else if (item.title.toLowerCase().includes(searchTerm)) {
        relevanceScore += 200;
        if (item.title.toLowerCase().startsWith(searchTerm)) {
          relevanceScore += 100;
        }
      }
      
      // Description matches
      if (item.description.toLowerCase().includes(searchTerm)) {
        relevanceScore += 100;
      }
      
      // Keyword exact matches
      const exactKeywordMatch = item.keywords?.some(keyword => 
        keyword.toLowerCase() === searchTerm
      );
      if (exactKeywordMatch) {
        relevanceScore += 150;
      } else if (item.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))) {
        relevanceScore += 75;
      }
      
      // URL matches (for specific page searches)
      if (item.url.toLowerCase().includes(searchTerm)) {
        relevanceScore += 50;
      }
      
      // Content frequency scoring
      if (item.searchableText && item.searchableText.includes(searchTerm)) {
        relevanceScore += 25;
        const occurrences = (item.searchableText.match(new RegExp(searchTerm, 'g')) || []).length;
        relevanceScore += occurrences * 5;
      }
      
      // Type-based scoring boost
      if (item.type === 'product') relevanceScore += 20;
      if (item.type === 'blog') relevanceScore += 15;
      if (item.type === 'page') relevanceScore += 10;
      
      return { ...item, relevanceScore };
    });

    // Sort by relevance score (highest first)
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return results.slice(0, limit);
  }

  // Enhanced suggestions with better coverage
  getSuggestions(query, limit = 10) {
    if (!query || query.trim().length < 1) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const suggestions = new Set();

    // Extract suggestions from titles, keywords, and content
    this.contentIndex.forEach(item => {
      // Add matching titles
      if (item.title.toLowerCase().includes(searchTerm)) {
        suggestions.add(item.title);
      }
      
      // Add matching keywords
      item.keywords?.forEach(keyword => {
        if (keyword.toLowerCase().includes(searchTerm)) {
          suggestions.add(keyword);
        }
      });
      
      // Add matching product/page names from URLs
      const urlParts = item.url.split('/').filter(part => part.length > 0);
      urlParts.forEach(part => {
        const cleanPart = part.replace(/-/g, ' ');
        if (cleanPart.toLowerCase().includes(searchTerm)) {
          suggestions.add(cleanPart);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }
}

// Singleton instance
let contentIndexerInstance = null;

export const getContentIndexer = () => {
  if (!contentIndexerInstance) {
    contentIndexerInstance = new ContentIndexer();
  }
  return contentIndexerInstance;
};

// Export for build-time usage
export default ContentIndexer; 