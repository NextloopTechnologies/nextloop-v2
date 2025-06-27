/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import privacyBg from '../../../assets/blogs.png';
import PrivacyPolicy from '../../components/PrivacyPolicy';

const PrivacyPage = () => {
  return (
    <Layout>
      <Head>
        <title>Nextloop Technologies | Privacy Policy</title>
        <meta
          name='description'
          content='Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.'
        />
      </Head>
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
