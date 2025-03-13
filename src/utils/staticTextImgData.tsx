import {
  Code,
  Lightbulb,
  PenTool,
  Rocket,
  Search,
  Settings,
} from 'lucide-react';

import { StepProps } from '../components/DiamondGridBoxes';
import { IFAQ } from '../types';
import blogImg from '../../assets/blog/blogImg.png';
import carouselImg from '../../assets/carouselImg.png';
import buildingIcon from '../../assets/services/buildingIcon.png';
import desktopCloud from '../../assets/services/desktopCloud.png';
import documentIcon from '../../assets/services/documentIcon.png';
import eyeIcon from '../../assets/services/eyeIcon.png';
import fileIcon from '../../assets/services/fileIcon.png';
import mapMarkerPlusIcon from '../../assets/services/mapMarkerPlusIcon.png';
import pathFinderIcon from '../../assets/services/pathFinderIcon.png';
import servicesWebdevelopmentHero from '../../assets/services/servicesWebdevelopmentHero.png';
import mahoutIcon from '../../assets/techstackIcons/aiml/mahoutIcon.png';
import openCvIcon from '../../assets/techstackIcons/aiml/openCvIcon.png';
import pytorchIcon from '../../assets/techstackIcons/aiml/pytorchIcon.png';
import sparkIcon from '../../assets/techstackIcons/aiml/sparkIcon.png';
import tensorFlowIcon from '../../assets/techstackIcons/aiml/tensorFlowIcon.png';
import ethereumIcon from '../../assets/techstackIcons/blockchain/ethereumIcon.png';
import etherjsIcon from '../../assets/techstackIcons/blockchain/etherjsIcon.png';
import fabricIcon from '../../assets/techstackIcons/blockchain/fabricIcon.png';
import solanaIcon from '../../assets/techstackIcons/blockchain/solanaIcon.png';
import solidityIcon from '../../assets/techstackIcons/blockchain/solidityIcon.png';
import web3Icon from '../../assets/techstackIcons/blockchain/web3Icon.png';
import amazonWebServicesIcon from '../../assets/techstackIcons/cloud/amazonWebServicesIcon.png';
import digitalOceanIcon from '../../assets/techstackIcons/cloud/digitalOceanIcon.png';
import googleCloudIcon from '../../assets/techstackIcons/cloud/googleCloudIcon.png';
import ibmCloudIcon from '../../assets/techstackIcons/cloud/ibmCloudIcon.png';
import msAzureIcon from '../../assets/techstackIcons/cloud/msAzureIcon.png';
import salesForceIcon from '../../assets/techstackIcons/cloud/salesForceIcon.png';
import AngularIcon from '../../assets/techstackIcons/frontend/AngularIcon.png';
import Html5Icon from '../../assets/techstackIcons/frontend/Html5Icon.png';
import ReactIcon from '../../assets/techstackIcons/frontend/ReactIcon.png';
import StencilIcon from '../../assets/techstackIcons/frontend/StencilIcon.png';
import SvelteIcon from '../../assets/techstackIcons/frontend/SvelteIcon.png';
import VueIcon from '../../assets/techstackIcons/frontend/VueIcon.png';
import androidIcon from '../../assets/techstackIcons/mobile/androidIcon.png';
import flutterIcon from '../../assets/techstackIcons/mobile/flutterIcon.png';
import ionicIcon from '../../assets/techstackIcons/mobile/ionicIcon.png';
import iosIcon from '../../assets/techstackIcons/mobile/iosIcon.png';
import objcIcon from '../../assets/techstackIcons/mobile/objcIcon.png';
import reactNativeIcon from '../../assets/techstackIcons/mobile/reactNativeIcon.png';
import golangIcon from '../../assets/techstackIcons/open-source/golangIcon.png';
import javaIcon from '../../assets/techstackIcons/open-source/javaIcon.png';
import nodeIcon from '../../assets/techstackIcons/open-source/nodeIcon.png';
import phpIcon from '../../assets/techstackIcons/open-source/phpIcon.png';
import pythonIcon from '../../assets/techstackIcons/open-source/pythonIcon.png';
import rubyIcon from '../../assets/techstackIcons/open-source/rubyIcon.png';
import drupalIcon from '../../assets/techstackIcons/others/drupalIcon.png';
import googleAnalyticsIcon from '../../assets/techstackIcons/others/googleAnalyticsIcon.png';
import salesforceIcon from '../../assets/techstackIcons/others/salesforceIcon.png';
import sapIcon from '../../assets/techstackIcons/others/sapIcon.png';
import uiPathIcon from '../../assets/techstackIcons/others/uiPathIcon.png';
import vrarIcon from '../../assets/techstackIcons/others/vrarIcon.png';
import AIIcon from '../../assets/techstackIcons/uiux/AIIcon.png';
import figmaIcon from '../../assets/techstackIcons/uiux/figmaIcon.png';
import PSIcon from '../../assets/techstackIcons/uiux/PSIcon.png';
import seekIcon from '../../assets/techstackIcons/uiux/seekIcon.png';
import webflowIcon from '../../assets/techstackIcons/uiux/webflowIcon.png';
import XDIcon from '../../assets/techstackIcons/uiux/XDIcon.png';

export const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'What web development services does Nextloop Technologies offer?',
    answer:
      'We offer full-stack web development, including front-end design, back-end development, e-commerce solutions, and custom web applications.',
  },
  {
    id: 2,
    question: 'How long does it take to develop a website?',
    answer:
      'The development time depends on the complexity of the project, but we always strive for efficient and timely delivery.',
  },
  {
    id: 3,
    question: 'Do you provide ongoing support after the website is launched?',
    answer:
      'Yes, we offer continuous support and maintenance to ensure your website stays updated and functional.',
  },
  {
    id: 4,
    question: 'Will my website be mobile-friendly?',
    answer:
      'Absolutely! We create responsive websites that work seamlessly across all devices.',
  },
  {
    id: 5,
    question: 'What technologies do you use for web development?',
    answer:
      'We use a wide range of technologies including JavaScript (React, Node.js), Java, Python, and many more to ensure the best solution for your business.',
  },
];

export const expertiseData = [
  {
    id: 1,
    title: 'Enterprise Software Development',
    description:
      'Build powerful, scalable, and secure systems that manage business-critical operations.',
    image: fileIcon,
    dark: true,
  },
  {
    id: 2,
    title: 'Web Applications',
    description:
      'Develop dynamic, responsive, and feature-rich web applications that are accessible across devices and platforms.',
    image: documentIcon,
    dark: false,
  },
  {
    id: 3,
    title: 'Mobile Applications',
    description:
      'Create intuitive and engaging mobile apps for Android and iOS to meet the needs of your mobile-first users.',
    image: buildingIcon,
    dark: false,
  },
  {
    id: 4,
    title: 'Cloud Solutions',
    description:
      'Modernize your infrastructure with cloud-based solutions for enhanced flexibility, security, and scalability.',
    image: desktopCloud,
    dark: true,
  },
  {
    id: 5,
    title: 'API Integrations',
    description:
      'Seamlessly integrate your software with third-party applications and services, enhancing functionality and improving workflows.',
    image: fileIcon,
    dark: true,
  },
  {
    id: 6,
    title: 'Software Maintenance and Support',
    description:
      'Ensure your systems remain efficient with ongoing maintenance, updates, and troubleshooting services.',
    image: documentIcon,
    dark: false,
  },
];

export const blogData = [
  {
    id: 1,
    title: 'Industry Knowledge and Research Capabilities',
    description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
    image: blogImg,
  },
  {
    id: 2,
    title: 'Industry Knowledge and Research Capabilities',
    description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
    image: blogImg,
  },
  {
    id: 3,
    title: 'Industry Knowledge and Research Capabilities',
    description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
    image: blogImg,
  },
];

export const servicesWhyChooseUsData = [
  {
    id: 1,
    title: 'Expertise',
    descp: ' Experienced developers who use cutting-edge technologies.',
    icon: mapMarkerPlusIcon,
  },
  {
    id: 2,
    title: 'Custom Solutions',
    descp: 'Tailored websites to meet your specific business needs.',
    icon: pathFinderIcon,
  },
  {
    id: 3,
    title: 'Scalable Designs',
    descp: 'Websites that grow with your business.',
    icon: eyeIcon,
  },
  {
    id: 4,
    title: 'Responsive Support',
    descp: 'Reliable support to ensure your site performs optimally.',
    icon: mapMarkerPlusIcon,
  },
  {
    id: 5,
    title: 'SEO-Friendly',
    descp:
      'We ensure your website is search-engine optimized for better visibility.',
    icon: pathFinderIcon,
  },
  {
    id: 6,
    title: 'On-time Delivery',
    descp: 'Projects completed on schedule with quality results.',
    icon: eyeIcon,
  },
];

export const servicesAreaOfExpertiseData = {
  mainHeader: 'OUR AREAS OF EXPERTISE',
  mainDescription:
    "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
  items: [
    {
      image: carouselImg,
      title: 'E-COMMERCE WEBSITE.',
      description: 'Start selling immediately, without limits.',
      link: '/expertise/ecommerce',
    },
    {
      image: carouselImg,
      title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
      description: '',
      link: '/expertise/event',
    },
    {
      image: carouselImg,
      title: 'FINTECH WEBSITE DESIGN',
      description: '',
      link: '/expertise/fintech',
    },
    {
      image: carouselImg,
      title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
      description: 'Transforming patient care.',
      link: '/expertise/healthcare',
    },
  ],
};

export const topStepsWebDevelopment: StepProps[] = [
  {
    icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
    title: 'Planning & Consultation',
    description: 'We discuss your goals and understand your business needs.',
    color: 'border-orange-500',
  },
  {
    icon: <PenTool className='text-orange-500 w-7 h-7' />,
    title: 'Design & Prototyping',
    description:
      'We create intuitive wireframes and prototypes for user-friendly interfaces.',
    color: 'border-orange-500',
  },
  {
    icon: <Code className='text-orange-500 w-7 h-7' />,
    title: 'Development',
    description:
      'Our team writes clean code, developing the website using the latest technologies.',
    color: 'border-orange-500',
  },
];

export const bottomStepsWebDevelopment: StepProps[] = [
  {
    icon: <Search className='text-gray-600 w-7 h-7' />,
    title: 'Testing',
    description:
      'Comprehensive testing ensures smooth functionality and cross-platform compatibility.',
    color: 'border-gray-500',
  },
  {
    icon: <Rocket className='text-gray-600 w-7 h-7' />,
    title: 'Launch & Support',
    description:
      'We launch the site and provide ongoing maintenance to keep it running smoothly.',
    color: 'border-gray-500',
  },
  {
    icon: <Rocket className='text-gray-600 w-7 h-7' />,
    title: 'Launch & Support',
    description:
      'We launch the site and provide ongoing maintenance to keep it running smoothly.',
    color: 'border-gray-500',
  },
  {
    icon: <Rocket className='text-gray-600 w-7 h-7' />,
    title: 'Launch & Support',
    description:
      'We launch the site and provide ongoing maintenance to keep it running smoothly.',
    color: 'border-gray-500',
  },
];

export const servicesSubPagesData = {
  customSoftwareDevelopment: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'CUSTOM SOFTWARE ',
      title: 'DEVELOPMENT',
      subtitle:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR EXPERTISE IN',
        heading: 'CUSTOM SOFTWARE DEVELOPMENT',
        description:
          'We bring extensive experience across a wide range of industries. Our custom solutions include:',
      },
      items: [
        {
          id: 1,
          title: 'Enterprise Software Development',
          description:
            'Build powerful, scalable, and secure systems that manage business-critical operations.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'Web Applications',
          description:
            'Develop dynamic, responsive, and feature-rich web applications that are accessible across devices and platforms.',
          image: documentIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'Mobile Applications',
          description:
            'Create intuitive and engaging mobile apps for Android and iOS to meet the needs of your mobile-first users.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'Cloud Solutions',
          description:
            'Modernize your infrastructure with cloud-based solutions for enhanced flexibility, security, and scalability.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 5,
          title: 'API Integrations',
          description:
            'Seamlessly integrate your software with third-party applications and services, enhancing functionality and improving workflows.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 6,
          title: 'Software Maintenance and Support',
          description:
            'Ensure your systems remain efficient with ongoing maintenance, updates, and troubleshooting services.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Planning & Consultation',
        description:
          'We discuss your goals and understand your business needs.',
        color: 'border-orange-500',
      },
      {
        icon: <PenTool className='text-orange-500 w-7 h-7' />,
        title: 'Design & Prototyping',
        description:
          'We create intuitive wireframes and prototypes for user-friendly interfaces.',
        color: 'border-orange-500',
      },
      {
        icon: <Code className='text-orange-500 w-7 h-7' />,
        title: 'Development',
        description:
          'Our team writes clean code, developing the website using the latest technologies.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Testing',
        description:
          'Comprehensive testing ensures smooth functionality and cross-platform compatibility.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Support',
        description:
          'We launch the site and provide ongoing maintenance to keep it running smoothly.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Support',
        description:
          'We launch the site and provide ongoing maintenance to keep it running smoothly.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Support',
        description:
          'We launch the site and provide ongoing maintenance to keep it running smoothly.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'Expertise',
        descp: ' Experienced developers who use cutting-edge technologies.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'Custom Solutions',
        descp: 'Tailored websites to meet your specific business needs.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'Scalable Designs',
        descp: 'Websites that grow with your business.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'Responsive Support',
        descp: 'Reliable support to ensure your site performs optimally.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'SEO-Friendly',
        descp:
          'We ensure your website is search-engine optimized for better visibility.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: 'On-time Delivery',
        descp: 'Projects completed on schedule with quality results.',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],
    faqsContent: [
      {
        id: 1,
        question: 'What is custom software development?',
        answer:
          'Custom software development involves creating software solutions specifically tailored to your business requirements, ensuring that it fits perfectly with your unique processes and needs.',
      },
      {
        id: 2,
        question: 'How long does it take to develop custom software?',
        answer:
          'The timeline depends on the complexity of your project. Typically, it ranges from a few weeks to several months. We provide a detailed timeline and keep you updated on progress.',
      },
      {
        id: 3,
        question: 'How much does custom software development cost?',
        answer:
          'Pricing depends on the scope and complexity of the project. We offer transparent pricing and work with you to develop a solution that fits your budget.',
      },
      {
        id: 4,
        question: 'Will I own the software?',
        answer:
          'Yes! You will retain full ownership of the custom software developed for your business.',
      },
    ],
    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
  },
  webDevelopment: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'WEB ',
      title: 'DEVELOPMENT',
      subtitle:
        'At Nextloop Technologies, we specialize in delivering customized web development services that help businesses build user-friendly, scalable, and secure web applications. Our team of expert developers ensures your website is fast, responsive, and optimized for all devices. From front-end design to back-end architecture, we create solutions that drive growth and deliver measurable results.',
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR ',
        heading: 'EXPERTISE',
        description:
          ' We bring extensive experience across a wide range of industries. Our custom solutions include:',
      },
      items: [
        {
          id: 1,
          title: 'Custom Web Development:',
          description:
            'We build tailor-made websites and web applications that align with your business goals and user needs.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'Front-End & Back-End Development:',
          description:
            'Delivering responsive, fast, and dynamic websites with strong back-end architecture.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'Web Performance & SEO Optimization:',
          description:
            'Ensuring fast load times, mobile-friendliness, and SEO best practices for better search rankings.',
          image: fileIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'E-Commerce Development:',
          description:
            'Create high-performing, secure, and scalable online stores with seamless shopping experiences.',
          image: documentIcon,
          dark: true,
        },
        {
          id: 5,
          title: 'CMS Development:',
          description:
            'Develop and customize CMS platforms like WordPress, Shopify, and Magento for easy content management.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 6,
          title: 'Web Security & Maintenance:',
          description:
            'Implementing advanced security measures and providing ongoing support to keep your website safe and up to date.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Planning & Consultation',
        description:
          'We discuss your goals and understand your business needs.',
        color: 'border-orange-500',
      },
      {
        icon: <PenTool className='text-orange-500 w-7 h-7' />,
        title: 'Design & Prototyping',
        description:
          'We create intuitive wireframes and prototypes for user-friendly interfaces.',
        color: 'border-orange-500',
      },
      {
        icon: <Code className='text-orange-500 w-7 h-7' />,
        title: 'Development',
        description:
          'Our team writes clean code, developing the website using the latest technologies.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Testing',
        description:
          'Comprehensive testing ensures smooth functionality and cross-platform compatibility.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Support',
        description:
          'We launch the site and provide ongoing maintenance to keep it running smoothly.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Support',
        description:
          'We launch the site and provide ongoing maintenance to keep it running smoothly.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Support',
        description:
          'We launch the site and provide ongoing maintenance to keep it running smoothly.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'Expertise',
        descp: ' Experienced developers who use cutting-edge technologies.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'Custom Solutions',
        descp: 'Tailored websites to meet your specific business needs.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'Scalable Designs',
        descp: 'Websites that grow with your business.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'Responsive Support',
        descp: 'Reliable support to ensure your site performs optimally.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'SEO-Friendly',
        descp:
          'We ensure your website is search-engine optimized for better visibility.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: 'On-time Delivery',
        descp: 'Projects completed on schedule with quality results.',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],
    faqsContent: [
      {
        id: 1,
        question:
          'What web development services does Nextloop Technologies offer?',
        answer:
          'We offer full-stack web development, including front-end design, back-end development, e-commerce solutions, and custom web applications.',
      },
      {
        id: 2,
        question: 'How long does it take to develop a website?',
        answer:
          'The development time depends on the complexity of the project, but we always strive for efficient and timely delivery.',
      },
      {
        id: 3,
        question:
          'Do you provide ongoing support after the website is launched?',
        answer:
          'Yes, we offer continuous support and maintenance to ensure your website stays updated and functional.',
      },
      {
        id: 4,
        question: 'Will my website be mobile-friendly?',
        answer:
          'Absolutely! We create responsive websites that work seamlessly across all devices.',
      },
      {
        id: 5,
        question: 'What technologies do you use for web development?',
        answer:
          'We use a wide range of technologies including JavaScript (React, Node.js), Java, Python, and many more to ensure the best solution for your business.',
      },
    ],
    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
  },
  cloudServices: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'CLOUD ',
      title: 'SERVICES',
      subtitle:
        "At NextLoop Technologies, we offer comprehensive cloud services that empower your business to scale, innovate, and thrive. Whether you're migrating to the cloud, optimizing your cloud infrastructure, or developing cloud-based applications, we provide end-to-end solutions tailored to your unique needs.",
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR EXPERTISE IN ',
        heading: 'CLOUD SERVICES',
        description:
          'We specialize in delivering high-performance, scalable, and secure cloud solutions across industries. With NextLoop Technologies, you can rely on our expertise to drive growth and efficiency in your business.',
      },
      items: [
        {
          id: 1,
          title: 'CLOUD MIGRATION',
          description:
            'Smooth and secure migration of your business to the cloud, with minimal disruption and downtime.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'CLOUD INFRASTRUCTURE MANAGEMENT:',
          description:
            'Build, deploy, and scale robust, cloud-native applications that drive business innovation and efficiency.',
          image: documentIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'CLOUD APPLICATION DEVELOPMENT:',
          description:
            'Build, deploy, and scale robust, cloud-native applications that drive business innovation and efficiency.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'CLOUD SECURITY:',
          description:
            'Modernize your infrastructure with cloud-based solutions for enhanced flexibility, security, and scalability.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 5,
          title: 'DEVOPS & AUTOMATION:',
          description:
            'Automate workflows and streamline development to accelerate deployment and enhance operational efficiency.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 6,
          title: 'CLOUD COST OPTIMIZATION:',
          description:
            'Maximize efficiency and reduce cloud expenses with our cost optimization strategies, ensuring you get the best value from your cloud investments.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Consultation',
        description:
          'We understand your needs to create a tailored cloud strategy.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'Design',
        description:
          'We craft secure and scalable cloud solutions for your business.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Migration',
        description: 'We seamlessly move your data and apps to the cloud.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Deployment',
        description:
          'Your cloud solution is deployed and optimized for performance.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Support',
        description:
          'We provide ongoing support and maintenance for smooth operations.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'TAILORED SOLUTIONS',
        descp: 'Experienced developers who use cutting-edge technologies.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'EXPERT TEAM',
        descp:
          'Our certified cloud engineers deliver secure, scalable solutions.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'SEAMLESS MIGRATION',
        descp: 'We ensure a smooth, hassle-free transition to the cloud.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'SCALABLE & FLEXIBLE',
        descp: 'Cloud solutions that grow with your business.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'TOP SECURITY',
        descp:
          'We prioritize data protection with industry-leading security measures.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: '24/7 SUPPORT',
        descp:
          'Continuous support and monitoring to keep everything running smoothly.',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],

    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
    faqsContent: [
      {
        id: 1,
        question: 'What is cloud computing?',
        answer:
          'Cloud computing allows businesses to store, manage, and process data over the internet, rather than on physical servers. It offers flexibility, scalability, and cost-efficiency by enabling access to resources on-demand.',
      },
      {
        id: 2,
        question: 'How can cloud services benefit my business?',
        answer:
          'Cloud services help improve scalability, reduce IT costs, enhance collaboration, and provide secure data storage. They allow businesses to focus on innovation while we manage your infrastructure.',
      },
      {
        id: 3,
        question: 'What types of cloud services do you offer?',
        answer:
          'We offer cloud migration, cloud infrastructure management, cloud application development, cloud security, and DevOps automation, all tailored to your specific business needs.',
      },
      {
        id: 4,
        question: 'Is my data safe in the cloud?',
        answer:
          "Yes! We prioritize your data's security by implementing advanced security measures, encryption, and compliance with industry standards to ensure your data is protected.",
      },
      {
        id: 5,
        question: 'How long does it take to migrate to the cloud?',
        answer:
          'The migration timeline depends on your current infrastructure and the complexity of your systems. We work closely with you to create a plan and ensure a smooth, timely transition with minimal disruption.',
      },
    ],
  },
  mobileAppDevelopment: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'MOBILE APP ',
      title: 'DEVLOPMENT',
      subtitle:
        'We specialize in crafting intuitive, user-friendly, and high-performing mobile apps that drive business growth. Whether you need a custom app for iOS, Android, or both, we deliver tailored solutions that enhance user experience and meet your business objectives.',
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR EXPERTISE IN ',
        heading: 'MOBILE APP DEVELOPMENT',
        description:
          'We specialize in delivering high-performance, scalable, and secure cloud solutions across industries. With NextLoop Technologies, you can rely on our expertise to drive growth and efficiency in your business.',
      },
      items: [
        {
          id: 1,
          title: 'CUSTOM MOBILE APPS:',
          description:
            'Smooth and secure migration of your business to the cloud, with minimal disruption and downtime.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'CLOUD INFRASTRUCTURE MANAGEMENT:',
          description:
            'From concept to deployment, we design and develop custom apps tailored to your business needs.',
          image: documentIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'UI/UX DESIGN:',
          description:
            'We create engaging and intuitive designs that provide an excellent user experience, ensuring your app stands out.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'CLOUD INTEGRATION::',
          description:
            'We integrate your mobile app with existing systems and APIs for seamless functionality and smooth operations.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 5,
          title: 'APP MAINTENANCE & SUPPORT:',
          description:
            'We offer ongoing maintenance and support to ensure your app stays updated and performs optimally.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 6,
          title: 'APP PERFORMANCE & OPTIMIZATION:',
          description:
            'We ensure your app runs smoothly with fast loading times, efficient resource usage, and minimal crashes.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Consultation & Discovery',
        description:
          'We understand your business goals and define app features to fit your needs.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'UI/UX Design',
        description:
          'We design intuitive, engaging interfaces that reflect your brand.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'App Development',
        description:
          'Our developers build secure, fast, and responsive apps using the latest technologies.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Testing & Quality Assurance',
        description:
          'We rigorously test your app to ensure it works smoothly across all devices.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Deployment',
        description:
          'We deploy your app to Google Play and Apple App stores after testing.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Marketing & ASO',
        description:
          'Enhancing visibility with SEO-friendly descriptions, keywords, and user engagement strategies.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Maintenance & Support',
        description:
          'We provide ongoing support to keep your app updated and functional.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'TAILORED SOLUTIONS FOR YOUR BUSINESS',
        descp:
          'We create custom apps that align with your unique business goals.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'EXPERT DEVELOPERS',
        descp:
          'Our skilled team builds secure, high-performing apps with the latest technologies.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'END-TO-END SERVICES',
        descp:
          'We manage the entire app process, from idea to deployment and support.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'FOCUS ON USER EXPERIENCE',
        descp:
          'We design apps that are intuitive and user-friendly for seamless experiences.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'SCALABLE SOLUTIONS',
        descp:
          'Our apps grow with your business, whether you’re a startup or an enterprise.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: 'AGILE DEVELOPMENT PROCESS',
        descp:
          'We use agile methods for flexible, fast development that adapts to your needs.',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],

    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
    faqsContent: [
      {
        id: 1,
        question: 'What types of mobile apps do you develop?',
        answer:
          'We specialize in custom mobile apps for both iOS and Android, including native, hybrid, and cross-platform solutions.',
      },
      {
        id: 2,
        question: 'HOW LONG DOES IT TAKE TO DEVELOP A MOBILE APP?',
        answer:
          'The timeline depends on the complexity and features of your app. Typically, development can take a few weeks to a few months.',
      },
      {
        id: 3,
        question: 'WILL MY APP BE ON BOTH GOOGLE PLAY AND THE APPLE APP STORE?',
        answer:
          'Yes, we ensure your app is deployed to both platforms after thorough testing and quality assurance.',
      },
      {
        id: 4,
        question: 'DO YOU PROVIDE POST-LAUNCH SUPPORT FOR MY MOBILE-APP',
        answer:
          'Yes, we offer ongoing maintenance and support to ensure your app stays updated and performs optimally.',
      },
    ],
  },
  aimlSolutions: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'AI & ML ',
      title: 'SOLUTIONS',
      subtitle:
        "At Nextloop Technologies, we help businesses harness the power of Artificial Intelligence (AI) and Machine Learning (ML) to drive automation, enhance decision-making, and unlock new growth opportunities. Whether you're looking to improve customer experience, optimize operations, or gain deeper insights from data, our AI/ML solutions are designed to deliver real value.",
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR EXPERTISE IN ',
        heading: 'AI & ML SOLUTIONS',
        description:
          'We bring years of experience in developing mobile applications that are scalable, secure, and designed for seamless user experiences. Our team works with the latest tools, technologies, and trends to build apps that exceed expectations.',
      },
      items: [
        {
          id: 1,
          title: 'AI STRATEGY AND ROADMAP CONSULTING:',
          description:
            'We help businesses define a clear AI strategy and create a roadmap to implement AI-driven solutions effectively.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'AI-DRIVEN MOBILE AND WEB APPLICATION DEVELOPMENT:',
          description:
            'We build intelligent mobile and web applications that leverage AI for automation, personalization, and enhanced user experiences.',
          image: documentIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'CUSTOM AI SOLUTIONS DEVELOPMENT:',
          description:
            'Custom AI Solutions Development - We develop tailor-made AI solutions designed to solve unique business challenges and drive innovation.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'Generative AI Integration Services:',
          description:
            ' We integrate powerful generative AI models into applications to enable content creation, automation, and intelligent decision-making.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 5,
          title: 'AI-powered Copilot and Virtual Assistant Development:',
          description:
            'We build AI-powered copilots and virtual assistants to improve efficiency, automate tasks, and enhance customer engagement.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 6,
          title: 'Natural Language Processing (NLP) Solutions: ',
          description:
            'We create NLP-powered solutions that enable applications to understand, process, and respond to human language naturally.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Understanding Your Needs',
        description: 'We analyze your business challenges and objectives.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'Data Collection & Processing',
        description: 'Cleaning and preparing data for AI models.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'Model Development & Training',
        description: 'Creating AI solutions customized to your requirements.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Testing & Quality Assurance',
        description:
          'We rigorously test your app to ensure it works smoothly across all devices.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Deployment',
        description:
          'We deploy your app to Google Play and Apple App stores after testing.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Marketing & ASO',
        description:
          'Enhancing visibility with SEO-friendly descriptions, keywords, and user engagement strategies.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Maintenance & Support',
        description:
          'We provide ongoing support to keep your app updated and functional.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'TAILORED SOLUTIONS FOR YOUR BUSINESS',
        descp:
          'We create custom apps that align with your unique business goals.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'EXPERT DEVELOPERS',
        descp:
          'Our skilled team builds secure, high-performing apps with the latest technologies.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'END-TO-END SERVICES',
        descp:
          'We manage the entire app process, from idea to deployment and support.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'FOCUS ON USER EXPERIENCE',
        descp:
          'We design apps that are intuitive and user-friendly for seamless experiences.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'SCALABLE SOLUTIONS',
        descp:
          'Our apps grow with your business, whether you’re a startup or an enterprise.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: 'AGILE DEVELOPMENT PROCESS',
        descp:
          'We use agile methods for flexible, fast development that adapts to your needs.',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],

    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
    faqsContent: [
      {
        id: 1,
        question: 'What is the difference between AI and ML?',
        answer:
          'AI (Artificial Intelligence) is the broader concept of machines simulating human intelligence, while ML (Machine Learning) is a subset of AI that enables machines to learn from data and improve performance over time without explicit programming.',
      },
      {
        id: 2,
        question: 'How can AI/ML help my business?',
        answer:
          'AI/ML can automate tasks, improve decision-making, analyze large data sets, enhance customer experiences, detect fraud, and optimize business operations. It helps companies save time, reduce costs, and gain a competitive edge.',
      },
      {
        id: 3,
        question: 'Do I need a lot of data to implement AI/ML?',
        answer:
          'Not necessarily. While large datasets can improve AI accuracy, we can also work with small or medium-sized data using techniques like transfer learning and data augmentation to build effective AI models.',
      },
      {
        id: 4,
        question:
          'How long does it take to develop and implement an AI/ML solution?',
        answer:
          'The timeline depends on the complexity of the project, the amount of data, and the business objectives. Some AI solutions can be developed in a few weeks, while more advanced systems may take several months.',
      },
      {
        id: 5,
        question: 'Is AI safe to use, and how do you ensure data security?',
        answer:
          'Yes, AI is safe when developed responsibly. At Nextlop Technologies, we prioritize data privacy, compliance, and security by using encryption, anonymization, and strict access controls to protect your information.',
      },
    ],
  },
  ecommerceDevelopment: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'E-COMMERCE ',
      title: 'DEVELOPMENT SERVICES',
      subtitle:
        'E-commerce development is the process of creating, designing, and optimizing online stores that allow businesses to sell products or services digitally. It involves everything from website development, payment gateway integration, product management, security implementation, and user experience (UX) optimization. We specialize in building powerful and scalable E-commerce solutions that help businesses sell online effortlessly. Whether you need a simple online store or a complex multi-vendor marketplace, we create fast, secure, and user-friendly E-commerce platforms tailored to your needs.',
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR EXPERTISE IN ',
        heading: 'E-COMMERCE DEVELOPMENT',
        description:
          'We bring years of experience in developing mobile applications that are scalable, secure, and designed for seamless user experiences. Our team works with the latest tools, technologies, and trends to build apps that exceed expectations.',
      },
      items: [
        {
          id: 1,
          title: 'Custom E-commerce Websites:',
          description: 'Tailor-made online stores for your unique business.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'Shopify, WooCommerce & Magento Development:',
          description: 'Platform-based E-commerce solutions.',
          image: documentIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'Multi-Vendor Marketplaces:',
          description: 'Enable multiple sellers to sell on your platform.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'Mobile Commerce (M-commerce):',
          description: 'Seamless shopping experiences on mobile devices.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 5,
          title: 'E-commerce Integration:',
          description: 'Payment gateways, shipping APIs, CRM, and more.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 6,
          title: 'E-commerce SEO & Performance Optimization:  ',
          description: 'Improve speed, ranking, and conversions.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Consultation & Planning',
        description:
          'We understand your needs to create a tailored cloud strategy.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'Design & Development',
        description: 'Creating a visually appealing and user-friendly website.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Integration & Testing',
        description:
          'Adding payment gateways, security, and ensuring smooth functionality.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & Deployment',
        description: 'Making your online store live and ready for customers.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Support & Optimization',
        description: 'Ongoing improvements, SEO, and performance upgrades.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'Custom & Scalable Solutions',
        descp: 'Built for startups, small businesses, and enterprises.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'SEO & Mobile Optimized',
        descp: 'Drive traffic and ensure a seamless mobile experience.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'Secure & Reliable',
        descp: 'High security, fast performance, and smooth transactions.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'Easy Management',
        descp: 'User-friendly admin panel for hassle-free store management.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'End-to-End Support',
        descp: 'From development to maintenance and growth.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: 'Proven Success & Innovation',
        descp:
          'Leverage AI and analytics to understand customer behavior and optimize sales strategies.',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],

    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
    faqsContent: [
      {
        id: 1,
        question: 'Which E-commerce platform is best for my business?',
        answer:
          'It depends on your needs! We offer solutions on Shopify, WooCommerce, Magento, and custom-built platforms.',
      },
      {
        id: 2,
        question: 'How long does it take to develop an E-commerce website?',
        answer:
          'A basic online store can be built in a few weeks, while advanced custom solutions may take longer.',
      },
      {
        id: 3,
        question: 'Can I integrate payment gateways and third-party tools?',
        answer:
          'Yes, we integrate PayPal, Stripe, Razorpay, and other payment gateways, along with CRM, inventory, and analytics tools.',
      },
      {
        id: 4,
        question: 'Do you offer mobile-friendly E-commerce solutions?',
        answer:
          'Absolutely! We ensure your store is fully responsive and optimized for mobile devices.',
      },
      {
        id: 5,
        question: 'What happens after the website is launched?',
        answer:
          'We offer ongoing support, maintenance, updates, and marketing services to help your store grow.',
      },
    ],
  },
  digitalMarketingServices: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'DIGITAL MARKETING ',
      title: 'SERVICES',
      subtitle:
        'Digital marketing is the promotion of products, services, or brands using online channels like search engines, social media, email, and websites. It helps businesses reach their target audience, increase brand awareness, and drive sales. In today’s digital world, having a strong online presence is essential for business success. We provide expert digital marketing solutions that help you grow your brand, attract customers, and increase revenue. From SEO to social media marketing, we use data-driven strategies to boost your business online.',
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR EXPERTISE IN ',
        heading: 'DIGITAL MARKETING',
        description:
          'We bring years of experience in developing mobile applications that are scalable, secure, and designed for seamless user experiences. Our team works with the latest tools, technologies, and trends to build apps that exceed expectations.',
      },
      items: [
        {
          id: 1,
          title: 'Search Engine Optimization (SEO):',
          description: 'Improve your website’s ranking on Google.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'Pay-Per-Click (PPC) Advertising:',
          description: 'Get instant traffic with targeted ads.',
          image: documentIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'Social Media Marketing (SMM):',
          description:
            'Grow your brand on Facebook, Instagram, LinkedIn & more.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'Content Marketing:',
          description:
            'Engage customers with valuable blogs, videos, and articles.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 5,
          title: 'Email Marketing:',
          description: 'Reach your audience with personalized email campaigns.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 6,
          title: ' Conversion Rate Optimization (CRO):  ',
          description: 'Turn visitors into loyal customers.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Understanding Your Business',
        description: 'We analyze your goals and audience.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'Strategy Development',
        description: 'We create a custom marketing plan for your brand.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Implementation',
        description: 'We execute the strategy using advanced tools.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Monitoring & Optimization',
        description: 'We track performance and improve results.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Reporting & Growth',
        description: 'You get regular updates and reports on progress.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'Experienced Team',
        descp: 'Our digital marketing experts have years of experience.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'Customized Solutions',
        descp: 'We create strategies that fit your unique business needs.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'Data-Driven Approach',
        descp: 'We use analytics and insights to maximize results.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'Transparent Reporting',
        descp: 'Get clear and detailed reports on your campaign’s performance.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'Proven Results',
        descp: 'We have helped businesses grow and succeed online.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: 'Continuous Optimization',
        descp:
          'We analyze, test, and refine strategies to ensure sustained growth and maximum ROI.',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],

    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
    faqsContent: [
      {
        id: 1,
        question:
          'How long does it take to see results from digital marketing?',
        answer:
          'SEO takes 3-6 months, while PPC and social media ads can deliver instant results.',
      },
      {
        id: 2,
        question: 'Can you help my small business with digital marketing?',
        answer:
          'Yes! We work with businesses of all sizes and create strategies that fit your budget.',
      },
      {
        id: 3,
        question: 'Do you provide monthly reports?',
        answer:
          'Absolutely! We provide detailed reports so you can track your progress.',
      },
      {
        id: 4,
        question: 'How do I get started?',
        answer:
          'Contact us today, and we’ll create a customized digital marketing plan for your business!',
      },
    ],
  },
  mvpDevelopment: {
    metaData: {
      pageMetaTitle: 'NextLoop Technologies | Custom Software Development',
      pageMetaDescription:
        'NextLoop Technologies, specialize in creating custom software solutions that are built to solve your unique business challenges. Our team of skilled developers and designers work collaboratively to develop software that enhances your efficiency, productivity, and overall business performance.',
    },
    heroImage: servicesWebdevelopmentHero,
    heroSectionData: {
      coloredTitle: 'MVP ',
      title: 'DEVELOPMENT',
      subtitle:
        'Digital marketing is the promotion of products, services, or brands using online channels like search engines, social media, email, and websites. It helps businesses reach their target audience, increase brand awareness, and drive sales. In today’s digital world, having a strong online presence is essential for business success. We provide expert digital marketing solutions that help you grow your brand, attract customers, and increase revenue. From SEO to social media marketing, we use data-driven strategies to boost your business online.',
    },
    expertiseData: {
      headingData: {
        coloredHeading: 'OUR EXPERTISE IN ',
        heading: 'MVP DEVELOPMENT',
        description:
          'We bring years of experience in developing mobile applications that are scalable, secure, and designed for seamless user experiences. Our team works with the latest tools, technologies, and trends to build apps that exceed expectations.',
      },
      items: [
        {
          id: 1,
          title: 'MVP Strategy & Consulting:',
          description: 'Defining the core features of your MVP.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 2,
          title: 'UI/UX Design:',
          description: 'Creating a user-friendly and engaging design.',
          image: documentIcon,
          dark: false,
        },
        {
          id: 3,
          title: 'Rapid Prototyping:',
          description: 'Building fast prototypes to test ideas.',
          image: buildingIcon,
          dark: false,
        },
        {
          id: 4,
          title: 'Custom Web & Mobile App Development:',
          description: 'Developing scalable MVPs.',
          image: desktopCloud,
          dark: true,
        },
        {
          id: 5,
          title: 'Agile Development:',
          description: 'Iterative development with quick feedback cycles.',
          image: fileIcon,
          dark: true,
        },
        {
          id: 6,
          title: 'MVP Testing & Validation: ',
          description: 'Ensuring your MVP is market-ready.',
          image: documentIcon,
          dark: false,
        },
      ],
    },
    topSteps: [
      {
        icon: <Lightbulb className='text-orange-500 w-7 h-7' />,
        title: 'Idea & Market Research',
        description: 'Understanding your vision and target audience.',
        color: 'border-orange-500',
      },
      {
        icon: <Settings className='text-orange-500 w-7 h-7' />,
        title: 'Defining Core Features',
        description: 'Selecting essential features for the MVP.',
        color: 'border-orange-500',
      },
    ],
    bottomSteps: [
      {
        icon: <Search className='text-gray-600 w-7 h-7' />,
        title: 'Design & Prototyping',
        description: 'Creating wireframes and UI/UX designs.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Development & Testing',
        description: 'Building and testing the MVP.',
        color: 'border-gray-500',
      },
      {
        icon: <Rocket className='text-gray-600 w-7 h-7' />,
        title: 'Launch & User Feedback',
        description: 'Releasing the MVP and collecting feedback.',
        color: 'border-gray-500',
      },
    ],
    techStackData: [
      {
        title: 'FRONTEND',
        items: [
          { name: 'AngularJS', image: AngularIcon.src },
          { name: 'React', image: ReactIcon.src },
          { name: 'Vue.js', image: VueIcon.src },
          { name: 'HTML5', image: Html5Icon.src },
          { name: 'Stencil', image: StencilIcon.src },
          { name: 'Svelte', image: SvelteIcon.src },
        ],
      },
      {
        title: 'MOBILE',
        items: [
          { name: 'AngularJS', image: androidIcon.src },
          { name: 'React', image: iosIcon.src },
          { name: 'Vue.js', image: ionicIcon.src },
          { name: 'HTML5', image: reactNativeIcon.src },
          { name: 'Stencil', image: objcIcon.src },
          { name: 'Svelte', image: flutterIcon.src },
        ],
      },
      {
        title: 'OPEN SOURCE',
        items: [
          { name: 'AngularJS', image: javaIcon.src },
          { name: 'React', image: nodeIcon.src },
          { name: 'Vue.js', image: phpIcon.src },
          { name: 'HTML5', image: pythonIcon.src },
          { name: 'Stencil', image: rubyIcon.src },
          { name: 'Svelte', image: golangIcon.src },
        ],
      },
      {
        title: 'UI/UX',
        items: [
          { name: 'AngularJS', image: XDIcon.src },
          { name: 'React', image: PSIcon.src },
          { name: 'Vue.js', image: figmaIcon.src },
          { name: 'HTML5', image: AIIcon.src },
          { name: 'Stencil', image: seekIcon.src },
          { name: 'Svelte', image: webflowIcon.src },
        ],
      },
      {
        title: 'CLOUD',
        items: [
          { name: 'AngularJS', image: amazonWebServicesIcon.src },
          { name: 'React', image: msAzureIcon.src },
          { name: 'Vue.js', image: googleCloudIcon.src },
          { name: 'HTML5', image: salesForceIcon.src },
          { name: 'Stencil', image: ibmCloudIcon.src },
          { name: 'Svelte', image: digitalOceanIcon.src },
        ],
      },
      {
        title: 'BLOCKCHAIN',
        items: [
          { name: 'AngularJS', image: solidityIcon.src },
          { name: 'React', image: web3Icon.src },
          { name: 'Vue.js', image: etherjsIcon.src },
          { name: 'HTML5', image: ethereumIcon.src },
          { name: 'Stencil', image: fabricIcon.src },
          { name: 'Svelte', image: solanaIcon.src },
        ],
      },
      {
        title: 'OTHERS',
        items: [
          { name: 'AngularJS', image: uiPathIcon.src },
          { name: 'React', image: drupalIcon.src },
          { name: 'Vue.js', image: sapIcon.src },
          { name: 'HTML5', image: googleAnalyticsIcon.src },
          { name: 'Stencil', image: vrarIcon.src },
          { name: 'Svelte', image: salesforceIcon.src },
        ],
      },
      {
        title: 'AI & ML',
        items: [
          { name: 'AngularJS', image: pythonIcon.src },
          { name: 'React', image: tensorFlowIcon.src },
          { name: 'Vue.js', image: openCvIcon.src },
          { name: 'HTML5', image: pytorchIcon.src },
          { name: 'Stencil', image: sparkIcon.src },
          { name: 'Svelte', image: mahoutIcon.src },
        ],
      },
    ],
    whyChooseUsData: [
      {
        id: 1,
        title: 'Expert MVP Developers',
        descp: 'Skilled in building high-quality MVPs.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 2,
        title: 'Fast & Cost-Effective',
        descp: 'Launch your product quickly without overspending.',
        icon: pathFinderIcon,
      },
      {
        id: 3,
        title: 'Agile Approach',
        descp: 'Continuous improvements based on user feedback.',
        icon: eyeIcon,
      },
      {
        id: 4,
        title: 'Scalable Solutions',
        descp: 'Easily expand your MVP into a full product.',
        icon: mapMarkerPlusIcon,
      },
      {
        id: 5,
        title: 'Transparent Process',
        descp: 'Clear communication and progress tracking.',
        icon: pathFinderIcon,
      },
      {
        id: 6,
        title: 'Market Validation Focus',
        descp: 'We help you test ideas, gather real user insights',
        icon: eyeIcon,
      },
    ],
    blogData: [
      {
        id: 1,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 2,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
      {
        id: 3,
        title: 'Industry Knowledge and Research Capabilities',
        description: `Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities.`,
        image: blogImg,
      },
    ],

    areaOfExpertiseData: {
      mainHeader: 'OUR AREAS OF EXPERTISE',
      mainDescription:
        "At NextLoop, we specialize in developing custom software solutions for various industries. Here's a look at the sectors where we excel.",
      items: [
        {
          image: carouselImg,
          title: 'E-COMMERCE WEBSITE.',
          description: 'Start selling immediately, without limits.',
          link: '/expertise/ecommerce',
        },
        {
          image: carouselImg,
          title: 'CREATE A PROFESSIONAL EVENT WEBSITE',
          description: '',
          link: '/expertise/event',
        },
        {
          image: carouselImg,
          title: 'FINTECH WEBSITE DESIGN',
          description: '',
          link: '/expertise/fintech',
        },
        {
          image: carouselImg,
          title: 'HEALTHCARE SOFTWARE DEVELOPMENT',
          description: 'Transforming patient care.',
          link: '/expertise/healthcare',
        },
      ],
    },
    faqsContent: [
      {
        id: 1,
        question: 'How long does it take to develop an MVP?',
        answer: 'It depends on the complexity, but most MVPs take 2-6 months.',
      },
      {
        id: 2,
        question: 'Can you help refine my MVP idea?',
        answer:
          ' Yes! We provide consulting to define the best features for your MVP.',
      },
      {
        id: 3,
        question: 'What technologies do you use for MVP development?',
        answer:
          ' We use modern tech stacks like React, Node.js, Python, Flutter, and more.',
      },
      {
        id: 4,
        question: 'What happens after the MVP launch?',
        answer:
          'We help you analyze user feedback, improve features, and scale your product.',
      },
    ],
  },
};
