import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import servicesBg from '../../../assets/servicesBg.png';

const cards: { title: string; desc: string; link: string }[] = [
  {
    title: 'Custom Software Development',
    desc: 'We ditch the one-size-fits-all approach. Instead, we design custom software solutions that perfectly fit your business needs. This means your software can grow with you, helps you work smarter not harder, and runs smoothly to keep you ahead of the game.',
    link: '/services/custom-software-development',
  },
  {
    title: 'Web Development',
    desc: 'We craft innovative web solutions that go beyond just a website. We design intuitive interfaces and seamless user experiences to not only enhance your online presence but also drive real business growth.  Imagine a website that captivates visitors and compels them to take action!',
    link: '/services/web-development',
  },
  {
    title: 'MVP Development',
    desc: 'Have a brilliant idea for an app or website but unsure where to start? We specialize in rapid prototyping and development of Minimum Viable Products (MVPs). This allows you to test your concept with real users quickly, validate your idea, and get to market faster.',
    link: '/services/mvp-development',
  },
  {
    title: 'Cloud Services (DevOps, AWS, GCP, Azure)',
    desc: 'The cloud holds immense potential for your business. Our expert cloud architects can help you unlock that potential. We offer comprehensive cloud services including secure migration, cost-optimization strategies, and cutting-edge DevOps solutions to ensure maximum scalability, reliability, and agility for your cloud infrastructure.',
    link: '/services/cloud-services',
  },
  {
    title: 'Mobile Development',
    desc: "Everyone's glued to their phones these days.  Reach your audience exactly where they are with our custom-built mobile applications. Whether you need a native Android or iOS app, or a cross-platform solution with Flutter, we have the expertise to create engaging mobile experiences that will keep your users coming back for more.",
    link: '/services/mobile-development',
  },
  {
    title: 'UI/UX Development',
    desc: 'Need to bolster your development team with top-tier talent? Look no further! We can provide you with highly skilled and experienced developers dedicated to bringing your vision to life.  Think of it as seamlessly extending your in-house team with the perfect expertise you need.',
    link: '/services/ui-ux-development',
  },
  {
    title: 'Hire Dedicated Team',
    desc: 'Need to bolster your development team with top-tier talent? Look no further! We can provide you with highly skilled and experienced developers dedicated to bringing your vision to life.  Think of it as seamlessly extending your in-house team with the perfect expertise you need.',
    link: '/services/hire-dedicated-team',
  },
  {
    title: 'E-commerce Development',
    desc: "Turn your online store into a sales powerhouse! We offer end-to-end e-commerce development solutions, from building a secure and user-friendly platform to integrating robust payment gateways and implementing effective marketing strategies. We'll help you transform your online store into a thriving e-commerce empire.",
    link: '/services/e-commerce-development',
  },
  {
    title: 'AI/ML',
    desc: 'Artificial Intelligence (AI) and Machine Learning (ML) are revolutionizing businesses. We can help you unlock the power of these technologies to gain valuable insights from your data, automate repetitive tasks, and drive innovation across your organization.',
    link: '/services/ai-ml',
  },
  {
    title: 'Quality Assurance',
    desc: 'We offer complete Quality Assurance (QA) solutions to guarantee that your systems and software are up to par. Our exacting methodology, which emphasizes accuracy, efficiency, and dependability, enables you to produce flawless products that go above and beyond.',
    link: '/services/quality-assurance',
  },
  {
    title: 'Technical Support',
    desc: "Peace of mind is priceless. Our reliable technical support services ensure that your website or application runs smoothly, uninterrupted. We'll be there to promptly address any technical issues that may arise, keeping your online presence running optimally.",
    link: '/services/technical-support',
  },
  {
    title: 'Digital Marketing Services',
    desc: "Take your brand to the next level with Nextloop's data-driven digital marketing solutions. Through SEO, advertisements, and social media interaction, we combine strategy, technology, and creativity to increase traffic, lead generation, and conversions.",
    link: '/services/digital-marketing-services',
  },
];

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>
          {' '}
          Enterprise Software, Cloud, AI & Digital Services | Nextloop{' '}
        </title>
        <meta
          name='description'
          content='Unlock scalable IT services with Nextloop: software development, app engineering, cloud, AI/ML, digital marketing, e-comm dev, tech consulting & many more'
        />
      </Head>
      <PageHero
        image={servicesBg}
        title='services'
        subtitle='Nextloop Technologies is your premier destination for comprehensive business solutions. With a diverse range of services under one roof, we are your go-to partner for all your technology needs. From custom software development to technical support and everything in between, Nextloop is committed to delivering excellence at every step of your journey.'
        opacity='opacity-80'
      />
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 xl:p-24 md:p-8 p-4 place-items-center'>
        {cards.map((card, idx) => (
          <Link href={card.link} key={idx}>
            <div className='flex flex-col items-center justify-center text-center gap-8 shadow-md md:h-[580px] px-8 py-8 md:py-0 bg-white text-black hover:bg-[#1D1D1D] hover:text-white transition-all duration-200 ease-in-out'>
              <Image
                src={`/services/${idx}.png`}
                alt={`service-${idx}`}
                height={140}
                width={140}
              />
              <h2 className='font-medium lg:text-4xl text-2xl w-4/5'>
                {card.title}
              </h2>
              <p className=''>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Services;
