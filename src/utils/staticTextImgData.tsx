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
