import Head from 'next/head';
import React from 'react';

import { fintechAssets } from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import FAQ from '../../../components/Domains/FAQ';
import Benefits from '../../../components/Domains/Fintech/Benefits';
import WebDesignCompany from '../../../components/Domains/Fintech/WebDesignCompany';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyChooseUs from '../../../components/Domains/WhyChooseUs';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ, IWhyChooseUs } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question: 'How do fintech applications protect sensitive financial data?',
    answer:
      'Fintech platforms enforce multi-layered security frameworks to safeguard user assets and privacy. They connect to traditional banking infrastructures using secure APIs (Application Programming Interfaces), which act as protected bridges for data transmission without exposing core credentials. Additionally, these apps implement advanced end-to-end encryption protocols to scramble data during transit and storage, combined with biometric authentication (such as fingerprint or facial recognition) to block unauthorized device access. ',
  },
  {
    id: 2,
    question:
      'In what ways is artificial intelligence revolutionizing financial technology? ',
    answer:
      'Artificial Intelligence (AI) and Machine Learning (ML) are driving massive efficiency gains across the financial ecosystem. These technologies instantly evaluate risk parameters for real-time credit scoring, execute microsecond decisions in algorithmic trading, and power automated advisors that deliver highly tailored wealth management strategies. Furthermore, AI models constantly analyze transaction patterns to identify anomalous behavior, stopping fraudulent activity before it impacts the consumer. ',
  },
  {
    id: 3,
    question: 'What are the core sectors within the fintech landscape? ',
    answer:
      'The financial technology industry is diversified across several highly specialized verticals, including:\n\n- Digital Payments & Neobanking: Frictionless consumer transactions, peer-to-peer transfers, and mobile-first banking.\n- WealthTech: Automated investment portfolios, robo-advisory algorithms, and retail trading platforms.\n- InsurTech: Data-driven risk assessment, automated claims processing, and personalized insurance policies.\n- RegTech: Streamlined regulatory compliance management, anti-money laundering (AML) monitoring, and identity verification.\n- Alternative Lending: Peer-to-peer (P2P) lending networks and decentralized credit underwriting tools.\n- Crypto & Blockchain: Distributed ledger technology, digital asset management, and decentralized financial (DeFi) architectures. ',
  },
];

const whyChooseContent: IWhyChooseUs[] = [
  {
    title: 'WHAT IS FINTECH WEB DESIGN',
    descp:
      "Fintech web design is the specialised practice of designing and developing websites for companies that deliver financial services through technology. It's a discipline that goes well beyond aesthetics. A fintech website has to do several things at once: communicate credibility, provide a frictionless user experience, meet strict security and compliance standards, and convert visitors into customers — in a sector where those visitors are especially cautious about trust. In practice, that means bringing together user interface design, visual design, information architecture, content strategy, and full-stack web development — all working in concert. Get any one of these elements wrong, and the entire experience suffers. Get them right, and your website becomes one of your strongest business assets. ",
    image: getStaticImageData(fintechAssets.whyChooseUsImg1),
  },
  {
    title: 'Why Hire a Fintech Web Design Company?',
    descp:
      "The fintech industry is technically complex, heavily regulated, and intensely competitive. Your website needs to reflect all of that — while still feeling intuitive and approachable to the end user. That's a difficult balance to strike, and it's one that generic website-building tools simply aren't equipped to handle. While it might be tempting to use a low-cost platform to get online quickly, these tools rarely deliver the security architecture, compliance features, or performance standards that financial technology companies require. A fintech website isn't just a marketing asset — it's a direct extension of your product. It needs to be built accordingly. ",
    image: getStaticImageData(fintechAssets.whyChooseUsImg2),
  },
];

const Fintech: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          Fintech App & Software Development Company | Nextloop Technologies
        </title>
        <meta
          name='description'
          content='Partner with Nextloop for custom banking & financial software development services. Contact our team today to hire fintech software developers.'
        />
      </Head>
      <Layout>
        <div className='overflow-hidden'>
          <div>
            <CustomPageHero
              image={getStaticImageData(fintechAssets.fintechBg)}
              titleChildren={
                <h1
                  className={`text-white ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold text-center w-full md:max-w-[1500px]`}
                >
                  Building the Future of Finance:{' '}
                  <span className='text-orange-500'>
                    {' '}
                    Why Your Business Needs the Right Fintech Software Partner.
                    Hire fintech Developers
                  </span>
                </h1>
              }
              subtitle=''
              opacity='opacity-10'
              title=''
            />
            <WhyBuild
              image={getStaticImageData(fintechAssets.whyBuildImg)}
              title='Why Build a Custom Software Solution '
              colouredTitle=' for the Fintech Industry?'
              infoAndImgClassname='items-center'
              informationSection={
                <div
                  className={`mx-5 md:mx-10 lg:mx-0 md:max-w-[600px] ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} px-10 gap-4`}
                >
                  <p
                    className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
                  >
                    The fintech industry isn't slowing down — and neither are
                    customer expectations. Today's users begin every financial
                    journey online, which means your website is often the first
                    impression your brand makes. Getting it right isn't
                    optional.
                  </p>
                  <p
                    className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
                  >
                    As digital banking and financial services become the norm,
                    fintech companies face a straightforward reality: a
                    well-designed, high-performing website builds trust, while a
                    poor one erodes it. Intuitive navigation, clear information
                    architecture, and frictionless access to key features all
                    signal to users that your platform is reliable and worth
                    their confidence.
                  </p>
                  <p
                    className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
                  >
                    Web design also directly impacts how discoverable your
                    business is. A site built with SEO best practices ranks
                    higher in search results — putting your brand in front of
                    the right audience at exactly the right moment in their
                    decision-making process.
                  </p>
                  <p
                    className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
                  >
                    The smartest way to achieve all of this is to Hire Fintech
                    Developer talent that understands both the technical demands
                    and the unique compliance and UX standards of financial
                    services. Generic solutions rarely hold up in this space. A
                    custom-built fintech platform gives you the flexibility to
                    differentiate, the performance to compete, and the
                    credibility to convert.
                  </p>
                  <p
                    className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop}`}
                  >
                    In a sector where trust is everything, your website needs to
                    earn it — fast.
                  </p>
                </div>
              }
            />
            <WhyChooseUs whyChooseContent={whyChooseContent} />
            <Benefits />
            <WebDesignCompany />
            {/* <ClientReviews /> */}
            <FAQ faqsContent={faqsContent} />
            <CustomRequestQuote title='ready to grow your fintech business with new website' />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Fintech;
