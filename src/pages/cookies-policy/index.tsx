import CookiePolicy from '../../components/CookiePolicy';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import Seo from '../../components/Seo';
import privacyBg from '../../../assets/blogs.png';

const CookiePage = () => {
  return (
    <Layout>
      <Seo
        title='Cookie Policy | Nextloop Technologies'
        description='Learn what cookies Nextloop uses, why we use them, and how to manage preferences. Read the policy or contact us for more detail.'
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Cookie Policy | Nextloop Technologies',
          url: 'https://www.nextlooptechnologies.com/cookies-policy/',
        }}
      />
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
