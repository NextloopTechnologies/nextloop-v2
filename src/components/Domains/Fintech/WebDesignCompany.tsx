import React from 'react';

import SuccessSolutionCard from '../SuccessSolutionCard';
import { fintechAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const successSolutionContent = [
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg1),
    title: 'Industry Knowledge And Research Capabilities',
    descp:
      'Fintech operates under a distinct set of rules — both regulatory and reputational. Your website needs to reflect sector standards, address user concerns, and comply with relevant financial regulations from the moment it goes live. Look for a partner with genuine fintech experience, not just general digital expertise. They should understand YMYL (Your Money or Your Life) guidelines, know which security features are non-negotiable — advanced encryption, multi-factor authentication, robust data backup — and have built products in regulated environments before. That depth of experience shortens your risk window considerably.',
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg2),
    title: 'Clear Branding',
    descp:
      "In financial services, branding is trust made visible. Your website should communicate your company's values, tone, and positioning clearly and consistently across every page — from your homepage to your terms and conditions. A specialist fintech web design company will work with you to develop a visual identity and content style that speaks directly to your target audience. Consistency isn't just about aesthetics — it signals to users that your organisation is professional, reliable, and serious about the experience it delivers.",
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg3),
    title: 'Optimised Structure',
    descp:
      "If users can't find what they're looking for quickly, they leave. In fintech, that usually means they go to a competitor. A well-structured website ensures your most important content is always within easy reach. Good structure means clear visual hierarchy, intuitive navigation, and strategic placement of your value proposition and calls to action. Your key messages and conversion points should be prominent, ideally above the fold, and logically positioned relative to the user's journey. Optimised structure also directly affects how search engines crawl and rank your pages — making it both a UX and an SEO priority. ",
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg4),
    title: 'User-Friendly Web Design',
    descp:
      "Fintech websites often deal with complex subject matter. The design challenge is making that complexity feel manageable — presenting dense information in a way that's clear, accessible, and easy to act on. User-friendly design in fintech means clean layouts, readable typography, fully responsive behaviour across all devices, and onboarding or booking flows that remove friction rather than add it. The best fintech design companies validate every design decision against real user behaviour — so the final product reflects how your actual users navigate, not just how your design team imagined they would. ",
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg5),
    title: 'Tools And Calculators',
    descp:
      'Interactive tools — mortgage calculators, investment projections, currency converters, loan estimators — are among the most effective features a fintech website can offer. They add genuine utility for the user, increase time spent on site, and create natural entry points into your product or service. A strong fintech design partner will help you identify which tools make sense for your audience, build custom solutions that integrate cleanly into your site, and continue to test and optimise those tools as your offering evolves. ',
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg6),
    title: 'Interesting And Relevant Content',
    descp:
      "Content does more work on a fintech website than on most others. It builds credibility, educates cautious users, supports SEO, and creates the kind of trust that design alone can't establish. Effective fintech content explains complex concepts in plain language, addresses the questions your users are actually asking, and demonstrates that your company understands their financial situation. It also needs to be built for search — targeting the keywords and topics your audience actively looks for, so your site attracts qualified traffic rather than just volume. In a sector where users are handling their money, the right content can be the deciding factor between a visitor who bounces and one who converts. ",
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg7),
    title: 'Trust',
    descp:
      "Trust is the currency of fintech. Users are being asked to share sensitive financial information — often with a brand they've only just discovered. Your website needs to make that leap of faith as small as possible. That means prominently featuring social proof: client testimonials, partner logos, industry accreditations, case studies, and security certifications. It also means building a credible backlink profile, which signals to search engines — and to users — that your brand is recognised and respected in the space. Websites that rank on page one aren't just more visible. They're perceived as more trustworthy. That perception is worth investing in. ",
  },
  {
    image: getStaticImageData(fintechAssets.fintechWebDesignImg8),
    title: 'Managing The User Journey',
    descp:
      'Fintech websites rarely convert on the first visit. Users research, compare, hesitate, and return. Your website needs to be designed with that entire journey in mind — not just the final conversion moment. That means varied, well-placed calls to action that serve users at different stages: links to educational content for those still researching, options to speak to your team for those closer to a decision, and free trials or demos for those ready to experience your product firsthand. A well-managed user journey, supported by SEO-friendly page structure and intuitive navigation, builds the familiarity and confidence that — in fintech — ultimately drives the decision to trust you with their money. ',
  },
];

const WebDesignCompany: React.FC = () => {
  return (
    <div className='py-[100px]'>
      <div className='flex flex-col text-center items-center'>
        <h1
          className={`text-black font-bold text-center ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} px-10`}
        >
          What to Look for in a{' '}
          <span className='text-orange-500'>Fintech Web Design Company</span>
        </h1>
        <p
          className={`md:mx-2 mx-10 mt-10 ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} xl:mx-[150px]`}
        >
          Not all web design agencies are equipped to handle fintech. The stakes
          are higher, the compliance requirements are stricter, and the margin
          for error is smaller. Your website is often the first place a
          potential customer encounters your brand — and their first impression
          will determine whether they stay to learn more or head straight to a
          competitor. Here's what to prioritise when choosing a design partner.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-[50px] md:px-20 px-10'>
        {successSolutionContent?.map(
          ({ descp, image, title }, index: number) => (
            <SuccessSolutionCard
              key={index}
              descp={descp}
              image={image}
              title={title}
            />
          )
        )}
      </div>
    </div>
  );
};

export default WebDesignCompany;
