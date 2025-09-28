import Head from 'next/head';

import CookiePolicy from '../../components/CookiePolicy';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import privacyBg from '../../../assets/blogs.png';

const CookiePage = () => {
  return (
    <Layout>
      <Head>
        <title>Nextloop Technologies | Cookie Policy</title>
        <meta
          name='description'
          content='Learn what cookies are, why we use them, the types we deploy, and how you can manage your cookie preferences to enhance your browsing experience.'
        />
      </Head>
      <PageHero
        image={privacyBg}
        title='Cookie Policy'
        subtitle='This Cookie Policy explains what cookies are, why we use them, the types we deploy, and how you can manage your preferences when using our website or services.'
      />
      <CookiePolicy />
    </Layout>
  );
};

export default CookiePage;
