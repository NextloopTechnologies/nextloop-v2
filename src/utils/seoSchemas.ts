export type PageSchemaKey =
  | 'home'
  | 'about'
  | 'services'
  | 'service-custom-software'
  | 'service-staff-augmentation'
  | 'service-ai-ml'
  | 'service-web-app'
  | 'service-mobile-app'
  | 'service-cloud-devops'
  | 'portfolio'
  | 'careers';

const normalizeSiteUrl = (value: string) => value.replace(/\/+$/, '');
const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nextlooptechnologies.com'
);
const withSiteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
const CURRENT_DATE = new Date().toISOString().slice(0, 10);

export const SEO_IMAGES = {
  logo: withSiteUrl('/images/logo.png'),
  organization: withSiteUrl('/images/who-we-are.jpg'),
  portfolio: withSiteUrl('/images/case-studies/brewpod.jpg'),
};

const pageSpecificSchemas: Record<PageSchemaKey, Record<string, unknown>> = {
  home: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': withSiteUrl('/#organization'),
        name: 'Nextloop Technologies',
        legalName: 'Nextloop Technologies Pvt. Ltd.',
        url: withSiteUrl('/'),
        logo: {
          '@type': 'ImageObject',
          url: SEO_IMAGES.logo,
          width: 400,
          height: 120,
        },
        image: {
          '@type': 'ImageObject',
          url: SEO_IMAGES.organization,
          width: 1200,
          height: 800,
        },
        email: 'info@nextlooptechnologies.com',
        foundingDate: '2020',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-6103542991',
            contactType: 'customer service',
            areaServed: ['IN', 'US'],
            availableLanguage: ['English', 'Hindi'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-9893954583',
            contactType: 'sales',
            areaServed: ['IN', 'US'],
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        sameAs: [
          'https://www.facebook.com/profile.php?id=61556914381569',
          'https://www.linkedin.com/company/nextloop-technologies-llp',
          'https://www.instagram.com/nextloop.technologies/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': withSiteUrl('/#website'),
        url: withSiteUrl('/'),
        name: 'Nextloop Technologies',
        publisher: {
          '@id': withSiteUrl('/#organization'),
        },
      },
      {
        '@type': 'WebPage',
        '@id': withSiteUrl('/#webpage'),
        url: withSiteUrl('/'),
        name: 'IT Staff Augmentation | Custom Software Solutions | AI Remote Teams',
        description:
          'Leading IT outsourcing company in Indore & USA. We provide custom software development, staff augmentation & dedicated developers for AI, SaaS & MVP development.',
        isPartOf: { '@id': withSiteUrl('/#website') },
        about: { '@id': withSiteUrl('/#organization') },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: SEO_IMAGES.organization,
        },
        breadcrumb: {
          '@id': withSiteUrl('/#breadcrumb'),
        },
        inLanguage: 'en',
        dateModified: CURRENT_DATE,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': withSiteUrl('/#breadcrumb'),
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: withSiteUrl('/'),
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': withSiteUrl('/#professionalservice'),
        name: 'Nextloop Technologies',
        image: {
          '@type': 'ImageObject',
          url: SEO_IMAGES.organization,
          width: 1200,
          height: 800,
        },
        url: withSiteUrl('/'),
        telephone: '+91-6103542991',
        email: 'info@nextlooptechnologies.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            '101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia',
          addressLocality: 'Indore',
          addressRegion: 'MP',
          postalCode: '452001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 22.7244,
          longitude: 75.8839,
        },
        areaServed: ['IN', 'US'],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '10:00',
            closes: '22:00',
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Our Services',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Service',
              name: 'Custom Software Development',
              url: withSiteUrl('/services/custom-software-development/'),
              serviceType: 'Custom Software Development',
              provider: {
                '@id': withSiteUrl('/#organization'),
              },
              areaServed: ['IN', 'US'],
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Service',
              name: 'IT Staff Augmentation',
              url: withSiteUrl('/services/it-staff-augmentation/'),
              serviceType: 'IT Staff Augmentation',
              provider: {
                '@id': withSiteUrl('/#organization'),
              },
              areaServed: ['IN', 'US'],
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Service',
              name: 'Web Development',
              url: withSiteUrl('/services/web-development/'),
              serviceType: 'Web Development',
              provider: {
                '@id': withSiteUrl('/#organization'),
              },
              areaServed: ['IN', 'US'],
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Service',
              name: 'MVP Development',
              url: withSiteUrl('/services/mvp-development/'),
              serviceType: 'MVP Development',
              provider: {
                '@id': withSiteUrl('/#organization'),
              },
              areaServed: ['IN', 'US'],
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Service',
              name: 'Cloud & DevOps',
              url: withSiteUrl('/services/cloud-computing-solutions/'),
              serviceType: 'Cloud Computing',
              provider: {
                '@id': withSiteUrl('/#organization'),
              },
              areaServed: ['IN', 'US'],
            },
          },
          {
            '@type': 'ListItem',
            position: 6,
            item: {
              '@type': 'Service',
              name: 'Mobile App Development',
              url: withSiteUrl('/services/mobile-app-development/'),
              serviceType: 'Mobile App Development',
              provider: {
                '@id': withSiteUrl('/#organization'),
              },
              areaServed: ['IN', 'US'],
            },
          },
          {
            '@type': 'ListItem',
            position: 8,
            item: {
              '@type': 'Service',
              name: 'AI & ML Solutions',
              url: withSiteUrl('/services/ai-ml/'),
              serviceType: 'AI/ML Development',
              provider: {
                '@id': withSiteUrl('/#organization'),
              },
              areaServed: ['IN', 'US'],
            },
          },
        ],
      },
    ],
  },
  about: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@id': withSiteUrl('/#organization'),
    },
    description:
      'Nextloop Technologies is an AI-native IT services and software development consulting partner delivering modern agile solutions across global markets.',
    knowsAbout: [
      'AI Agents',
      'Business Process Automation',
      'Cloud Computing Services',
      'Dedicated Remote Developer Operations',
    ],
  },
  services: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Custom Software Development',
    provider: {
      '@type': 'Organization',
      name: 'Nextloop Technologies',
      url: withSiteUrl('/'),
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global',
    },
    audience: {
      '@type': 'Audience',
      audienceType:
        'Startups, Healthcare Providers, and Global B2B Enterprises',
    },
    description:
      'End-to-end custom software solutions architecture, leveraging modern cloud ecosystems and AI automation to modernize legacy applications and build scalable platforms.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Development Delivery Sprints',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Discovery & Architecture Strategy',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Interactive Wireframing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agile Build & Backend Scalability',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'QA Testing & Secure Deployment',
          },
        },
      ],
    },
  },
  'service-custom-software': {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': withSiteUrl('/services/custom-software-development/#webpage'),
        url: withSiteUrl('/services/custom-software-development/'),
        name: 'Custom Software Development Services | Nextloop Technologies',
        description:
          'Tailored enterprise software architecture and full-stack development to build secure, highly scalable applications from scratch.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: withSiteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: withSiteUrl('/services/'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Custom Software Development',
              item: withSiteUrl('/services/custom-software-development/'),
            },
          ],
        },
        inLanguage: 'en',
        dateModified: CURRENT_DATE,
      },
      {
        '@type': 'Service',
        name: 'Custom Software Development',
        serviceType: 'Software Engineering',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: withSiteUrl('/'),
        },
        areaServed: { '@type': 'Country', name: 'Global' },
        audience: {
          '@type': 'Audience',
          audienceType: 'B2B Enterprises, Funded Startups, and Tech Founders',
        },
        description:
          'Architecting resilient digital systems using microservices, modern frontends, and custom integrations engineered to handle large concurrent workloads.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Software Delivery Workstreams',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Legacy Code Modernization & Migration',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Minimum Viable Product (MVP) Engineering',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Enterprise ERP & CRM Customizations',
              },
            },
          ],
        },
      },
    ],
  },
  'service-staff-augmentation': {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': withSiteUrl('/services/it-staff-augmentation/#webpage'),
        url: withSiteUrl('/services/it-staff-augmentation/'),
        name: 'IT Staff Augmentation & Dedicated Remote Developers | Nextloop Technologies',
        description:
          'Scale your engineering velocity overnight. Hire vetted full-time remote developers, QA specialists, and architects matching your exact tech stack.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: withSiteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: withSiteUrl('/services/'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Staff Augmentation',
              item: withSiteUrl('/services/it-staff-augmentation/'),
            },
          ],
        },
        inLanguage: 'en',
        dateModified: CURRENT_DATE,
      },
      {
        '@type': 'Service',
        name: 'IT Staff Augmentation',
        serviceType: 'Technical Staffing & Team Augmentation',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: withSiteUrl('/'),
        },
        description:
          'Vetted, high-performing engineering talent operating natively inside your timezone and communication loops, minimizing management overhead.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Resource Engagement Formats',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Dedicated Full-Time Developers (Monthly Retainer)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Hourly Technical Resource Outsourcing',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Managed Agile Hybrid Tech Teams',
              },
            },
          ],
        },
      },
    ],
  },
  'service-ai-ml': {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': withSiteUrl('/services/ai-machine-learning/#webpage'),
        url: withSiteUrl('/services/ai-machine-learning/'),
        name: 'Artificial Intelligence & Custom ML Model Development | Nextloop Technologies',
        description:
          'Deploy secure, enterprise-grade AI applications. Specializing in intelligent workflow automation, data modeling, and custom NLP deployment pipelines.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: withSiteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: withSiteUrl('/services/'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'AI & ML Solutions',
              item: withSiteUrl('/services/ai-machine-learning/'),
            },
          ],
        },
        inLanguage: 'en',
        dateModified: CURRENT_DATE,
      },
      {
        '@type': 'Service',
        name: 'AI & Machine Learning Solutions',
        serviceType: 'Artificial Intelligence Engineering',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: withSiteUrl('/'),
        },
        description:
          'Implementing data predictive features and machine learning training loops to transform messy raw corporate datasets into automated pipelines.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'AI Solution Matrix',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom LLM Fine-Tuning & Prompt Architecture',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Predictive Analytics & Forecasting Models',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Computer Vision & Visual Data Classification',
              },
            },
          ],
        },
      },
    ],
  },
  'service-web-app': {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': withSiteUrl('/services/web-app-development/#webpage'),
        url: withSiteUrl('/services/web-app-development/'),
        name: 'Responsive Web Application Development Company | Nextloop Technologies',
        description:
          'Engineered for speed, security, and user experience. Building fluid single-page applications (SPAs) and SaaS portals built to scale dynamically.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: withSiteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: withSiteUrl('/services/'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Web App Development',
              item: withSiteUrl('/services/web-app-development/'),
            },
          ],
        },
        inLanguage: 'en',
        dateModified: CURRENT_DATE,
      },
      {
        '@type': 'Service',
        name: 'Web Application Development',
        serviceType: 'Web Engineering',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: withSiteUrl('/'),
        },
        description:
          'Deploying cutting-edge frontend structures tied together with lightning-fast RESTful APIs and modern database configurations.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Delivery Models',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'SaaS Platform Production & Multitenancy Setup',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Progressive Web Apps (PWAs)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Corporate & Admin Dashboards',
              },
            },
          ],
        },
      },
    ],
  },
  'service-mobile-app': {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': withSiteUrl('/services/mobile-app-development/#webpage'),
        url: withSiteUrl('/services/mobile-app-development/'),
        name: 'iOS & Android Cross-Platform Mobile App Engineering | Nextloop Technologies',
        description:
          'Transforming creative ideas into elegant App Store and Google Play deployments. Specialized in native performance and zero-latency UI designs.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: withSiteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: withSiteUrl('/services/'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Mobile App Development',
              item: withSiteUrl('/services/mobile-app-development/'),
            },
          ],
        },
        inLanguage: 'en',
        dateModified: CURRENT_DATE,
      },
      {
        '@type': 'Service',
        name: 'Mobile App Development',
        serviceType: 'Mobile Software Development',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: withSiteUrl('/'),
        },
        description:
          'Crafting customer-facing custom mobile applications optimized for offline availability, fast payment operations, and lightweight installation sizes.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Mobile Engineering Capabilities',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Cross-Platform App Development (Flutter/React Native)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Native iOS (Swift) & Android (Kotlin) Architecture',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile App Optimization & Version Upgrades',
              },
            },
          ],
        },
      },
    ],
  },
  'service-cloud-devops': {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': withSiteUrl('/services/cloud-devops/#webpage'),
        url: withSiteUrl('/services/cloud-devops/'),
        name: 'Cloud Engineering, DevOps Automation & Infrastructure Setup | Nextloop Technologies',
        description:
          'Eliminate build downtime. Automate code pipelines, cut architecture cloud bills, and achieve secure, 99.99% high-availability application scaling setups.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: withSiteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: withSiteUrl('/services/'),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Cloud & DevOps',
              item: withSiteUrl('/services/cloud-devops/'),
            },
          ],
        },
        inLanguage: 'en',
        dateModified: CURRENT_DATE,
      },
      {
        '@type': 'Service',
        name: 'Cloud & DevOps Infrastructure Consulting',
        serviceType: 'Cloud Management Operations',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: withSiteUrl('/'),
        },
        description:
          'Constructing robust Infrastructure as Code (IaC) layouts using modern cloud container patterns to keep software highly available and secure.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Cloud Strategy Engagements',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Continuous Integration & Deployment (CI/CD) Structuring',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AWS, GCP & Azure Managed Cloud Migrations',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Kubernetes Container Orchestration & Security Hardening',
              },
            },
          ],
        },
      },
    ],
  },
  portfolio: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'BrewPod B2B Technology Case Study',
    description:
      'How Nextloop Technologies engineered a secure, high-performance platform turning an ambitious product idea into a successful market launch.',
    image: {
      '@type': 'ImageObject',
      url: SEO_IMAGES.portfolio,
      width: 1200,
      height: 800,
    },
    author: {
      '@type': 'Organization',
      name: 'Nextloop Technologies',
      url: withSiteUrl('/'),
    },
    about: [
      { '@type': 'Thing', name: 'Software Architecture' },
      { '@type': 'Thing', name: 'MVP Product Launch' },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Nextloop Technologies',
      logo: {
        '@type': 'ImageObject',
        url: SEO_IMAGES.logo,
      },
    },
  },
  careers: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers at Nextloop Technologies',
    description:
      'Explore remote-friendly tech opportunities and join our software delivery sprints.',
    url: withSiteUrl('/career/'),
    inLanguage: 'en',
    dateModified: CURRENT_DATE,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Open Positions',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'JobPosting',
            title: 'Business Development Executive / Intern',
            datePosted: '2026-05-15',
            validThrough: '2026-08-31',
            description:
              'Conduct deep market analysis, lead pipeline strategies, generate leads, and execute tech-stack solutions client pitches.',
            hiringOrganization: {
              '@type': 'Organization',
              name: 'Nextloop Technologies LLP',
              sameAs: withSiteUrl('/'),
            },
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Indore',
                addressRegion: 'Madhya Pradesh',
                addressCountry: 'IN',
              },
            },
            jobLocationType: 'TELECOMMUTE',
            employmentType: 'FULL_TIME',
          },
        },
      ],
    },
  },
};

export const getPageSchema = (page: PageSchemaKey) =>
  pageSpecificSchemas[page] ?? pageSpecificSchemas.home;

export const getSchemaMarkup = (page: PageSchemaKey) =>
  JSON.stringify(getPageSchema(page));
