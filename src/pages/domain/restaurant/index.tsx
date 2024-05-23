import React from 'react';
import Layout from '../../../components/Layout/Layout';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import WhyBuild from '../../../components/Domains/WhyBuild';
import restaurantBg from '../../../../assets/restaurantBg.png';
import WhyBuildRestaurant from '../../../../assets/whyBuildRestaurant.png';
import FAQ from '../../../components/Domains/FAQ';
import { IFAQ, IWhyChooseUs } from '../../../types';
import toolsIcon1 from "../../../../assets/restaurantToolsIcon-1.png";
import toolsIcon2 from "../../../../assets/restaurantToolsIcon-2.png";
import toolsIcon3 from "../../../../assets/restaurantToolsIcon-3.png";
import ToolBox from '../../../components/Domains/Restaurant/ToolBox';
import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import WhyChooseUs from '../../../components/Domains/WhyChooseUs';
import whyChooseUsImg from "../../../../assets/whyChooseUs1.png";

const benefits = [
  {
    id: 1,
    solution: 'Error-free administration and finance.',
   
  },
  {
    id: 2,
    solution: 'Shortened response time.',
   
  },
  {
    id: 3,
    solution: 'Improved Customer engagement.',
    
  },
  {
    id: 4,
    solution: 'Comprehensive human resource management.',
  }
];

const faqsContent: IFAQ[] = [
  {
    "id": 1,
    "question": "How can I take my restaurant online?",
    "answer": "Nextloop delivers all the features you need to get your own restaurant online and ready to serve. From online ordering to search engine optimization, we’ve got you covered. Start with the restaurant website builder, then serve your customers online. If you're looking for a tasteful name for your food business."
  },
  {
    "id": 2,
    "question": "What is an online food ordering system?",
    "answer": "Nextloop delivers all the features you need to get your own restaurant online and ready to serve. From online ordering to search engine optimization, we’ve got you covered. Start with the restaurant website builder, then serve your customers online. If you're looking for a tasteful name for your food business."
  },
  {
    "id": 3,
    "question": "What does a restaurant website need?",
    "answer": "Nextloop delivers all the features you need to get your own restaurant online and ready to serve. From online ordering to search engine optimization, we’ve got you covered. Start with the restaurant website builder, then serve your customers online. If you're looking for a tasteful name for your food business."
  }
];

const whyChooseContent: IWhyChooseUs[] = [
  {
    title: "Accept payments from anywhere with POS integrations",
    descp: "Streamline your operations by syncing menus and orders with advanced point of sale solutions—right on your dashboard.",
    image: whyChooseUsImg
  },
  {
    title: "Up your service with real-time data",
    descp: "Use analytics to get to know your customers and increase sales, then tailor their online experience to fit their needs.",
    image: whyChooseUsImg
  }
]

const Restaurant: React.FC = () => {
  return (
    <Layout>
      <CustomPageHero
        image={restaurantBg}
        titleChildren={
          <h1 className='text-white text-8xl uppercase font-bold text-center max-w-[1306px]'>
            Your{' '}
            <span className='text-orange-500'>restaurant</span>
            {', '}served online
          </h1>
        }
        subtitle='Grow your business and deliver the online experience your customers expect with this all-in-one business solution.'
        opacity='opacity-10'
        title=''
      />

      <WhyBuild
        image={WhyBuildRestaurant}
        colouredTitle='restaurant'
        informationSection={
          <div className='max-w-[737px]'>
            <p className='text-lg font-normal gap-5 mt-[100px]' >
              One of the most significant industries in many nations, the cafe 
              and restaurant sector is constantly expanding. But in order to handle 
              multitasking effectively, technology must be used across the board. 
              Due to this, we shall examine the benefits of an ERP for restaurants and 
              the related industry in this piece. Some of the main benefits of custom 
              ERP solutions for restaurants are:
            </p>

            <ul className='list-disc text-lg pl-10 mt-8'>
              {benefits.map((benefit) => (
                <li key={benefit.id} className='font-medium'>
                  <span className='font-normal'>{benefit.solution}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <WhyChooseUs whyChooseContent={whyChooseContent} />

      {/* ADD ONLINE ORDERING COMPONENT HERE */}

      <div className='min-h-screen flex flex-col items-center justify-center text-center py-[112px] mx-auto gap-[109px]'>
        <h1 className='font-bold text-3xl uppercase md:text-6xl lg:text-7xl xl:text-8xl sm:text-4xl w-full mb-[25px]'>
         The tools you need to grow your{' '}
         <span className='text-orange-500'>business</span>
        </h1>
        <div className="container flex flex-col items-center mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[75px] mt-[45px]">
            <ToolBox 
              icons={toolsIcon1} 
              height={62} 
              width={62}
              title='Expand your reach'
              descp='Serve more customers with on-demand delivery integration.'
            />
            <ToolBox 
              icons={toolsIcon2} 
              title='Reward repeat customers'
              descp='Build a strong customer base with an easily customizable loyalty program.'
            />
            <ToolBox 
              icons={toolsIcon3} 
              title='Boost your visibility'
              descp='Get a suite of built-in marketing tools to grow and promote your business.'
            />
          </div>
        </div>
      </div>
      
      <ClientReviews />

      <FAQ faqsContent={faqsContent} />

      <CustomRequestQuote title='see what your restaurant website could look like' />

    </Layout>
  );
};

export default Restaurant;
