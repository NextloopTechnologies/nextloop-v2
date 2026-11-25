/* eslint-disable @next/next/no-img-element */
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import Seo from '../../components/Seo';
import privacyBg from '../../../assets/blogs.png';

const PrivacyPage = () => {
  return (
    <Layout>
      <Seo
        title='Privacy Policy | Nextloop Technologies'
        description='How Nextloop collects, uses and protects personal data when you visit our site or use our services. Read the policy or contact us with questions.'
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy | Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/privacy/',
        }}
      />
      <PageHero
        image={privacyBg}
        title='privacy policy'
        subtitle='Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.'
      />
      <PrivacyPolicy />
    </Layout>
  );
};

export default PrivacyPage;
