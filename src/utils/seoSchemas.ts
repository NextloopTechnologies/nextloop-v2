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

const pageSpecificSchemas: Record<PageSchemaKey, Record<string, unknown>> = {
  home: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.nextlooptechnologies.com/#organization',
        name: 'Nextloop Technologies',
        legalName: 'Nextloop Technologies Pvt. Ltd.',
        url: 'https://www.nextlooptechnologies.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.nextlooptechnologies.com/_next/static/media/NextLoopColoredLogo.526d6d62.jpeg',
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
        '@id': 'https://www.nextlooptechnologies.com/#website',
        url: 'https://www.nextlooptechnologies.com/',
        name: 'Nextloop Technologies',
        publisher: {
          '@id': 'https://www.nextlooptechnologies.com/#organization',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.nextlooptechnologies.com/#webpage',
        url: 'https://www.nextlooptechnologies.com/',
        name: 'IT Staff Augmentation | Custom Software Solutions | AI Remote Teams',
        description:
          'Leading IT outsourcing company in Indore & USA. We provide custom software development, staff augmentation & dedicated developers for AI, SaaS & MVP development.',
        isPartOf: { '@id': 'https://www.nextlooptechnologies.com/#website' },
        about: { '@id': 'https://www.nextlooptechnologies.com/#organization' },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://www.nextlooptechnologies.com/_next/static/media/who-we-are.5d2431a8.jpeg',
        },
        breadcrumb: {
          '@id': 'https://www.nextlooptechnologies.com/#breadcrumb',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.nextlooptechnologies.com/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.nextlooptechnologies.com/',
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.nextlooptechnologies.com/#professionalservice',
        name: 'Nextloop Technologies',
        image:
          'https://www.nextlooptechnologies.com/_next/static/media/who-we-are.5d2431a8.jpeg',
        url: 'https://www.nextlooptechnologies.com/',
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
              url: 'https://www.nextlooptechnologies.com/services/custom-software-development/',
              serviceType: 'Custom Software Development',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
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
              url: 'https://www.nextlooptechnologies.com/services/it-staff-augmentation/',
              serviceType: 'IT Staff Augmentation',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
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
              url: 'https://www.nextlooptechnologies.com/services/web-development/',
              serviceType: 'Web Development',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
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
              url: 'https://www.nextlooptechnologies.com/services/mvp-development/',
              serviceType: 'MVP Development',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
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
              url: 'https://www.nextlooptechnologies.com/services/cloud-computing-solutions/',
              serviceType: 'Cloud Computing',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
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
              url: 'https://www.nextlooptechnologies.com/services/mobile-app-development/',
              serviceType: 'Mobile App Development',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
              },
              areaServed: ['IN', 'US'],
            },
          },
          {
            '@type': 'ListItem',
            position: 7,
            item: {
              '@type': 'Service',
              name: 'UI/UX Design & Development',
              url: 'https://www.nextlooptechnologies.com/services/ui-ux-development/',
              serviceType: 'UI/UX Design',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
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
              url: 'https://www.nextlooptechnologies.com/services/ai-ml/',
              serviceType: 'AI/ML Development',
              provider: {
                '@id': 'https://www.nextlooptechnologies.com/#organization',
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
      '@id': 'https://www.nextlooptechnologies.com/#organization',
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
      url: 'https://www.nextlooptechnologies.com/',
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
        '@id':
          'https://www.nextlooptechnologies.com/services/custom-software-development/#webpage',
        url: 'https://www.nextlooptechnologies.com/services/custom-software-development/',
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
              item: 'https://www.nextlooptechnologies.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://www.nextlooptechnologies.com/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Custom Software Development',
              item: 'https://www.nextlooptechnologies.com/services/custom-software-development/',
            },
          ],
        },
      },
      {
        '@type': 'Service',
        name: 'Custom Software Development',
        serviceType: 'Software Engineering',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/',
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
        '@id':
          'https://www.nextlooptechnologies.com/services/it-staff-augmentation/#webpage',
        url: 'https://www.nextlooptechnologies.com/services/it-staff-augmentation/',
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
              item: 'https://www.nextlooptechnologies.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://www.nextlooptechnologies.com/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Staff Augmentation',
              item: 'https://www.nextlooptechnologies.com/services/it-staff-augmentation/',
            },
          ],
        },
      },
      {
        '@type': 'Service',
        name: 'IT Staff Augmentation',
        serviceType: 'Technical Staffing & Team Augmentation',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/',
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
        '@id':
          'https://www.nextlooptechnologies.com/services/ai-machine-learning/#webpage',
        url: 'https://www.nextlooptechnologies.com/services/ai-machine-learning/',
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
              item: 'https://www.nextlooptechnologies.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://www.nextlooptechnologies.com/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'AI & ML Solutions',
              item: 'https://www.nextlooptechnologies.com/services/ai-machine-learning/',
            },
          ],
        },
      },
      {
        '@type': 'Service',
        name: 'AI & Machine Learning Solutions',
        serviceType: 'Artificial Intelligence Engineering',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/',
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
        '@id':
          'https://www.nextlooptechnologies.com/services/web-app-development/#webpage',
        url: 'https://www.nextlooptechnologies.com/services/web-app-development/',
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
              item: 'https://www.nextlooptechnologies.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://www.nextlooptechnologies.com/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Web App Development',
              item: 'https://www.nextlooptechnologies.com/services/web-app-development/',
            },
          ],
        },
      },
      {
        '@type': 'Service',
        name: 'Web Application Development',
        serviceType: 'Web Engineering',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/',
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
        '@id':
          'https://www.nextlooptechnologies.com/services/mobile-app-development/#webpage',
        url: 'https://www.nextlooptechnologies.com/services/mobile-app-development/',
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
              item: 'https://www.nextlooptechnologies.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://www.nextlooptechnologies.com/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Mobile App Development',
              item: 'https://www.nextlooptechnologies.com/services/mobile-app-development/',
            },
          ],
        },
      },
      {
        '@type': 'Service',
        name: 'Mobile App Development',
        serviceType: 'Mobile Software Development',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/',
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
        '@id':
          'https://www.nextlooptechnologies.com/services/cloud-devops/#webpage',
        url: 'https://www.nextlooptechnologies.com/services/cloud-devops/',
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
              item: 'https://www.nextlooptechnologies.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://www.nextlooptechnologies.com/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Cloud & DevOps',
              item: 'https://www.nextlooptechnologies.com/services/cloud-devops/',
            },
          ],
        },
      },
      {
        '@type': 'Service',
        name: 'Cloud & DevOps Infrastructure Consulting',
        serviceType: 'Cloud Management Operations',
        provider: {
          '@type': 'Organization',
          name: 'Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/',
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
    image:
      'https://www.nextlooptechnologies.com/images/case-studies/brewpod.jpg',
    author: {
      '@type': 'Organization',
      name: 'Nextloop Technologies',
      url: 'https://www.nextlooptechnologies.com/',
    },
    about: [
      { '@type': 'Thing', name: 'Software Architecture' },
      { '@type': 'Thing', name: 'MVP Product Launch' },
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Nextloop Technologies',
      logo: 'https://www.nextlooptechnologies.com/images/logo.png',
    },
  },
  careers: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers at Nextloop Technologies',
    description:
      'Explore remote-friendly tech opportunities and join our software delivery sprints.',
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
              sameAs: 'https://www.nextlooptechnologies.com/',
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
