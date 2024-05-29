import React from 'react';
import Layout from '../../../components/Layout/Layout';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import fintechBg from "../../../../assets/fintech/mainBg.png"
import whyChooseUsImg1 from "../../../../assets/fintech/whyChooseUs1.png";
import whyChooseUsImg2 from "../../../../assets/fintech/whyChooseUs2.png";
import whyBuildImg from "../../../../assets/whyChooseUs1.png";
import WhyBuild from '../../../components/Domains/WhyBuild';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import ClientReviews from '../../../components/Domains/ClientReviews';
import FAQ from '../../../components/Domains/FAQ';
import { IFAQ, IWhyChooseUs } from '../../../types';
import WhyChooseUs from '../../../components/Domains/WhyChooseUs';
import WebDesignCompany from '../../../components/Domains/Fintech/WebDesignCompany';
import Benefits from '../../../components/Domains/Fintech/Benefits';

const faqsContent: IFAQ[] = [
  {
    "id": 1,
    "question": "HOW MUCH DOES WEB DESIGN FOR FINTECH COMPANIES COST?",
    "answer": "Fintech businesses frequently shell out over £7,000 for a straightforward lead-generating website. But Web Choice also offers a longer-term solution that generates money from excellent inbound leads, typically costing around £10,000."
  },
  {
    "id": 2,
    "question": "How LONG DOES WEB DESIGN FOR FINTECH COMPANIES TAKE?",
    "answer": "Fintech businesses frequently shell out over £7,000 for a straightforward lead-generating website. But Web Choice also offers a longer-term solution that generates money from excellent inbound leads, typically costing around £10,000."
  },
  {
    "id": 3,
    "question": "WHAT PAGES SHOULD A FINTECH WEBSITE HAVE?",
    "answer": "Fintech businesses frequently shell out over £7,000 for a straightforward lead-generating website. But Web Choice also offers a longer-term solution that generates money from excellent inbound leads, typically costing around £10,000."
  }
];

const whyChooseContent: IWhyChooseUs[] = [
  {
    title: "WHAT IS FINTECH WEB DESIGN",
    descp: "Fintech web design refers to the creation and maintenance of websites for companies that offer financial services using technology. The design of these websites plays a crucial role in attracting and retaining customers, as it directly impacts their overall experience with the brand.The main goal of fintech web design is to provide users with a seamless and secure experience while interacting with financial services online. It involves user interface design, visual design, information architecture, content creation, and web development.",
    image: whyChooseUsImg1
  },
  {
    title: "Why Hire a Fintech Web Design Company?",
    descp: "The fintech industry is known for being complex and highly competitive. So you'll need a website that captures and keeps your audience's attention to stand out to your target audience.While it's possible, and often cheaper, to design your own website using online tools, this is not the best route for most fintech businesses. Notably, website design tools will rarely provide the level of security and compliance that most financial technology companies require.",
    image: whyChooseUsImg2
  }
];

const Fintech: React.FC = () => {
  return (
    <Layout>
      <CustomPageHero 
        image={fintechBg}
        titleChildren={
          <h1 className='text-white text-8xl uppercase font-bold text-center max-w-[1306px]'>
            <span className='text-orange-500'>fintech</span><br/>
            {' '}website design
          </h1>
        }
        subtitle=''
        opacity='opacity-10'
        title=''
      />

      <WhyBuild
        image={whyBuildImg}
        colouredTitle='fintech industry'
        informationSection={
          <div className='max-w-[737px] flex flex-col justify-center pr-14'>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              The fintech industry is booming. Today, most people begin their research and 
              purchase journeys online, so you need a website that meets the expectations of 
              your potential customers.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              With the increasing popularity of digital banking and financial services, it's 
              more important than ever for fintech companies to get their web design right.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              A well-designed fintech website can enhance the user experience by providing 
              intuitive navigation, clear and concise information, and easy access to essential 
              tools and features. It can also help establish trust with users by conveying a 
              professional and reliable image of the company.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              On the other hand, a poorly designed website can frustrate users, cause confusion, 
              and ultimately drive them away from your brand.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              In addition to user experience, web design affects a company's search engine optimisation 
              (SEO) and overall online visibility. A website optimised for search engines will rank higher 
              in search results, making it easier for potential customers to find and engage with the brand.
            </p>
            <p className=' text-sm md:text-lg mx-5 md:mx-0'>
              Fintech web design is critical to any financial services company's online presence. Investing 
              in professional and user-friendly web design can help your business stand out from the competition
              , build trust
            </p>
          </div>
        }
      />

      <WhyChooseUs whyChooseContent={whyChooseContent}/> 

      <Benefits />

      <WebDesignCompany />

      <ClientReviews />

      <FAQ faqsContent={faqsContent}/>

      <CustomRequestQuote title='ready to grow your fintech business with new website'/> 

    </Layout>
  )
}

export default Fintech;