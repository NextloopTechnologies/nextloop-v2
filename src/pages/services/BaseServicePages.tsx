import Head from 'next/head';
import React from 'react';

import BlogSection from '../../components/BlogSection';
import FAQ from '../../components/Domains/FAQ';
import IconTextBoxZebra from '../../components/IconTextBoxZebra';
import IconTitleDescription from '../../components/IconTitleDescription';
import Layout from '../../components/Layout/Layout';
import NotJustAPartner from '../../components/NotJustPartner';
import PageHero from '../../components/PageHero';
import { ProductCard } from '../../components/ProductCard';
import ScrollingProcess from '../../components/ScrollingProcess';
import ServicesProcess from '../../components/ServicesProcess';
import Slider from '../../components/Slider';
import StaffingIndustriesSection from '../../components/StaffingIndustriesSection';
import StaffingSecurity from '../../components/StaffingSecurity';
import StaffingTable from '../../components/StaffingTable';
import TechStack from '../../components/TechStackSection';
import TechTalent from '../../components/TechTalent';
import TrustedPartnersSection from '../../components/Trustedpartnerssection';
import { ServicePageProps } from '../../types';
import { getSchemaMarkup } from '../../utils/seoSchemas';

const ServicePage: React.FC<ServicePageProps> = ({
  schemaKey,
  metaData,
  heroImage,
  heroSectionData,
  expertiseData,
  processData,
  techStackData,
  whyChooseUsData,
  blogData = [],
  faqsContent = [],
  areaOfExpertiseData,
  staffingPartnerData,
  staffingIndustriesData,
  // ourProcessData,
  // teamMembersData,
  comparisonTableData,
  SecurityData,
  techTalentData,
  NotJustAPartnerData,
  serviceProcessData,
}) => {
  return (
    <Layout>
      <Head>
        <title>{String(metaData?.pageMetaTitle ?? 'Service Page')}</title>
        <meta
          name='description'
          content={metaData?.pageMetaDescription || 'Service Page Description'}
        />
        {schemaKey && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{ __html: getSchemaMarkup(schemaKey) }}
          />
        )}
      </Head>

      {heroImage && heroSectionData && (
        <PageHero
          image={heroImage}
          coloredTitle={heroSectionData.coloredTitle}
          title={heroSectionData.title}
          subtitle={heroSectionData.subtitle}
          opacity='opacity-80'
        />
      )}

      {expertiseData && <IconTextBoxZebra data={expertiseData} />}

      {processData && processData.items.length > 0 && (
        <ScrollingProcess processData={processData} />
      )}

      {staffingPartnerData && staffingPartnerData?.items?.length > 0 && (
        <TrustedPartnersSection data={staffingPartnerData} />
      )}

      {staffingIndustriesData && staffingIndustriesData?.items?.length > 0 && (
        <StaffingIndustriesSection industriesData={staffingIndustriesData} />
      )}

      {/* {teamMembersData && teamMembersData?.items?.length > 0 && <TeamMembers data={teamMembersData} />} */}

      {comparisonTableData && <StaffingTable data={comparisonTableData} />}
      {serviceProcessData && serviceProcessData.steps.length > 0 && (
        <ServicesProcess data={serviceProcessData} />
      )}

      {SecurityData && <StaffingSecurity data={SecurityData} />}
      {techTalentData && <TechTalent data={techTalentData} />}

      {techStackData && techStackData.items.length > 0 && (
        <TechStack techStackData={techStackData} />
      )}
      {NotJustAPartnerData && NotJustAPartnerData.items.length > 0 && (
        <NotJustAPartner data={NotJustAPartnerData} />
      )}

      {whyChooseUsData && whyChooseUsData.items.length > 0 && (
        <IconTitleDescription
          headingData={whyChooseUsData.headingData}
          data={whyChooseUsData.items}
        />
      )}

      {blogData.length > 0 && <BlogSection blogData={blogData} />}

      {areaOfExpertiseData && areaOfExpertiseData?.items?.length > 0 && (
        <Slider
          visibleItems={3}
          showArrows={true}
          swiperParams={{ spaceBetween: 40 }}
          header={
            <div className='p-14 flex flex-col items-center text-center'>
              <div className='text-black font-bold text-2xl md:text-3xl'>
                {areaOfExpertiseData.mainHeader}
              </div>
              <div className='font-semibold text-lg text-gray-600 mt-2'>
                {areaOfExpertiseData.mainDescription}
              </div>
            </div>
          }
          slides={areaOfExpertiseData.items.map((item, index) => (
            <ProductCard {...item} key={index} />
          ))}
        />
      )}

      {faqsContent.length > 0 && <FAQ faqsContent={faqsContent} />}
    </Layout>
  );
};

export default ServicePage;
