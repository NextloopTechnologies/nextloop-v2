import React from 'react';

import SuccessSolutionCard from '../SuccessSolutionCard';
import { fintechAssets } from '../../../../assets';
import { getStaticImageData } from '../../../utils/helper';

const successSolutionContent = [
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg1),
    title: "Industry Knowledge And Research Capabilities",
    descp: "Fintech is a unique industry. Therefore, your website must be built according to sector standards, client needs, and company requirements. To do this, it's crucial you hire a web design team with industry-relevant experience and in-depth research capabilities. Your website will likely need security features, including advanced encryption, authentication, and data backup capacities. In addition, as part of the YMYL(your money, your life), fintech businesses must adhere to various regulations."
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg2),
    title: "Clear Branding",
    descp: "Your website should reflect your brand's identity and values with a consistent style that aligns with your company's messaging and tone. A dedicated fintech website design company will work with you to create consistent and impactful branding throughout your various web pages."
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg3),
    title: "Optimised Structure",
    descp: "It's critical that every potential and existing customer can quickly find what they need from your website. People will leave your site and likely head to a competitor's if it's too challenging to find information. You can avoid losing your audience by optimising your design and structure.Web designers can ensure your website has a clear visual hierarchy, with essential information prominently displayed and less important information de-emphasised. This often means your value proposition and CTA (call to action) points are highlighted and displayed close to the top of the page."
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg4),
    title: "User-Friendly Web Design",
    descp: "Our comprehensive solution caters to the needs of nutritionists and fitness trainers, facilitating a seamless integration of nutrition plans, workout schedules, and client interactions. This case study highlights our journey in creating an all-encompassing wellness tool, showcasing our technical expertise, ethical commitment, and dedication to delivering user-centric solutions."
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg5),
    title: "Tools And Calculators",
    descp: "It is common for fintech websites to include tools or calculators. These can improve user experience and increase the time that they spend on your site. When it comes to implementing tools and calculators on your site, fintech web design companies can help in several ways. Fintech web design companies can help your site implement tools and calculators by understanding your needs, designing and developing custom solutions, integrating them seamlessly, and testing and optimising to ensure they work effectively."
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg6),
    title: "Interesting And Relevant Content",
    descp: "The right content can help establish your company's credibility, which is especially important considering that fintech websites deal with people's money. Engaging and relevant content can help build trust with users, who may be hesitant to trust a new or unknown financial service.Fintech is a complex industry that can be challenging for users to understand. By providing exciting content, fintech websites can help engage users and educate them about the benefits and workings of their services. With so many websites vying for users' attention, content can attract traffic to your fintech site, particularly by retargeting time and industry-relevant keywords and topics for SEO (search engine optimisation)."
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg7),
    title: "Trust",
    descp: "Working with people's and businesses' money means fintech companies must establish trust. To do this, you must prominently feature social proof and have a professional site look. You'll also need to gain backlinks, which are links on other sites that connect back to your site. These show search engines that you are a reputable source and help you rank better on SERPs (search engine results pages). As well as increasing visibility, better rankings increase trust since people view websites on the first pages of search results as reliable industry leaders."
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg8),
    title: "Managing The User Journey",
    descp: "Some websites focus primarily on sales. However, since fintech companies need to build trust in order to achieve sales, you must engage users from their very first visit. SEO-friendly web design will make your website more visible and attract more traffic Beyond this, varied CTA (call to action) points can provide better visitor engagement. CTAs can lead to more than just customers making a purchase. They can include links to more information, offers to speak to your sales team or options for a free version or trial of your fintech services or products."
  }
];

const WebDesignCompany: React.FC = () => {
  return (
    <div className='bg-[#1D1D1D0D] py-[100px]'>
      <div className="flex flex-col text-center items-center">
        <h1 className='text-black text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center'>
          things to look for in a fintech{' '}
          <span className='text-orange-500'>web design company</span>
        </h1>
        <p className='text-sm md:text-lg xl:mx-[150px] mx-2 mt-10 '>
          With so many web design companies around, how do you decide which is the best fit for your fintech company?<br />
          Your website is an essential part of your online presence. It is the first place that most customers will see, and their first impression of your site will influence whether or
          not they stick around to learn more. Clearly, an excellent website is a must. But discerning which company will provide these results is more challenging.
          To help, we've compiled a list of the most important elements of fintech web design.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-[50px] p-5">
        {successSolutionContent?.map(({ descp, image, title }, index: number) => (
          <SuccessSolutionCard
            key={index}
            descp={descp}
            image={image}
            title={title}
          />
        ))}
      </div>
    </div>
  )
}

export default WebDesignCompany;