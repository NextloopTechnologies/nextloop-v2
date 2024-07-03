import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';

import Layout from '../components/Layout/Layout';
import PageHero from '../components/PageHero';
import aboutBg from '../../assets/about-us-hero.png';
import cert1 from '../../assets/certificates/1.png';
import cert2 from '../../assets/certificates/2.png';
import cert3 from '../../assets/certificates/3.png';
import cert4 from '../../assets/certificates/4.png';
import bulb from '../../assets/lightbulb.svg';
import arrow from '../../assets/right-arrow.svg';

const arr = [
  {
    title: 'our mission',
    sub: "At Next Loop Technologies, our mission is simple yet profound - to be the catalyst for your success. We're passionate about partnering with businesses like yours to bridge the gap between idea and execution. Our team of skilled developers, designers, and strategists bring their expertise and dedication to every project, ensuring a seamless and collaborative experience. Every project is an opportunity to make a meaningful impact, to transform challenges into triumphs, and to forge partnerships built on trust and collaboration.",
  },
  {
    title: 'our vision',
    sub: 'Our vision is to be the trusted ally of businesses worldwide, guiding them through the complexities of the digital landscape with clarity, confidence, and compassion. We aspire to be at the forefront of technological innovation, driving positive change and shaping a future where possibilities are limitless.',
  },
  {
    title: 'our values',
    sub: "Our values are the cornerstone of everything we do. Integrity, transparency, and empathy guide our interactions, both internally and externally. We believe in fostering a culture of collaboration, where diversity thrives and ideas are valued. We pour our hearts into making a real difference, and anything short of exceptional won't do.",
  },
];

const journeyArr = [
  {
    title: 'Inception',
    sub: 'our team of four engineers has come together from a variety of professions, including tech, administration, sales, and management, with the goal of assisting individuals in solving their challenges. Due to the pressing demand for digitalization in society and our proficiency in the field, we began developing mobile and web applications for nearby suppliers, and from there the whole idea was formed.',
  },
  {
    title: 'Extension',
    sub: 'Possessing all the necessary components for both digitization and humanitarian work, they began contacting various companies with their high-caliber offerings and, in just four months, secured our first project abroad',
  },
  {
    title: 'Progression',
    sub: ' In just eight months, through perseverance and hard work, we expanded to a team of fifteen driven employees and moved into an office. This was a significant turning point in our self-funded journey, and it gave us hope that we still had a long way to go. It will take months for the team to reach its full potential.',
  },
  {
    title: 'Transformation',
    sub: ' We will have 40 members by 2024 and be expanding quickly, all the while assisting numerous businesses. We have six domains in which we are experts. With every project, we redefine possibilities because we are committed to risk-taking experimentation. We believe in innovation. developing innovative technologies that will influence IT in the future.',
  },
];

const certificateCardArr = [
  {
    img: cert1,
    title: 'iso certificate',
    sub: 'If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us.',
  },
  {
    img: cert2,
    title: 'iso certificate',
    sub: 'If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us.',
  },
  {
    img: cert3,
    title: 'cmmi level 3',
    sub: 'If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us.',
  },
  {
    img: cert4,
    title: 'startup india',
    sub: 'If you are looking for a complete business solution at a one place in combination with distinctive designs, that is what you can expect from us.',
  },
];

const AboutUsHome = () => {
  return (
    <Layout>
      <PageHero
        image={aboutBg}
        title='us'
        coloredTitle='about'
        subtitle='Next Loop Technologies was founded in 2020, driven by enthusiasm and the desire to make a difference. What started off as a tiny concept has developed into something more significant, a journey requiring commitment and a strong drive for success. Our goal has always been the same: to support companies in realizing their aspirations and succeeding in the digital sphere.'
      />
      <WhyUs />
      <Journey />
      <AboutUsInAboutUs />
      <Certificates />
    </Layout>
  );
};

const WhyUs = () => (
  <div className='min-h-screen flex flex-col justify-center items-center text-center gap-12 p-8 lg:p-0'>
    <h2 className='font-medium text-2xl uppercase mt-5'>Why us</h2>
    <p className='font-bold xl:text-6xl md:text-5xl text-3xl  2xl:w-[30%] xl:w-[60%] w-full'>
      CURIOUS ABOUT HOW WE MANAGE TO MAKE ALL THIS{' '}
      <span className='text-orange-500'>POSSIBLE?</span>
    </p>

    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full sm:w-[80%] place-items-center gap-12 p-10'>
      {arr.map((t, i) => (
        <Card {...t} key={i} />
      ))}
    </div>
  </div>
);

const Journey = () => {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-[#010103] text-white flex flex-col justify-center items-center text-center gap-24 p-8'>
      <h2 className='font-medium text-2xl uppercase'>ourjourney</h2>
      <div className='grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 w-full place-items-center gap-12 xl:px-16'>
        {journeyArr.map((t, i) => (
          <JourneyCard {...t} key={i} odd={i % 2 !== 0} />
        ))}
      </div>
      <div className='flex justify-center w-full'>
        <button
          onClick={() => router.push('#footer')}
          className='bg-transparent border border-white text-white px-5 py-3 rounded-full'
        >
          Request quote &#10230;
        </button>
      </div>
    </div>
  );
};

const Certificates = () => (
  <div className='min-h-screen aboutUsPageBackgroundImage flex flex-col gap-24 items-center justify-center text-white p-8 lg:p-0'>
    <h2 className='font-medium text-2xl uppercase'>certificates</h2>
    <p className='font-bold xl:text-7xl md:text-5xl text-3xl'>
      COMMITMENT TO<span className='text-orange-500'> EXCELLENCE</span>
    </p>
    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 w-full place-items-center gap-16 sm:px-6'>
      {certificateCardArr.map((c, i) => (
        <CertificateCard {...c} key={i} />
      ))}
    </div>
  </div>
);

const CertificateCard: React.FC<{
  img: StaticImageData;
  title: string;
  sub: string;
}> = ({ img, sub, title }) => (
  <div className='bg-white flex flex-col gap-4 p-4 sm:p-4 text-black items-center w-[180px] sm:w-72 h-full text-center justify-between'>
    <div className='h-2/3'>
      <Image src={img} alt='certificate' height={200} width={200} />
    </div>
    <p className='uppercase text-[12px] sm:text-xl font-medium'>{title}</p>
    <p className=''>{sub}</p>
  </div>
);

const AboutUsInAboutUs = () => (
  <div className='flex flex-col min-h-screen bg-white justify-center items-center xl:p-24 p-8 md:p-0 gap-24'>
    <div className='flex flex-col w-full gap-8'>
      <h2 className='font-medium text-2xl uppercase'>aboutus</h2>
      <span className='font-bold xl:text-7xl md:text-5xl text-3xl uppercase hidden lg:block'>
        we are a group of goal <br />
        <span className='text-orange-500'>developers.</span>
      </span>
      <span className='font-bold xl:text-7xl md:text-5xl text-3xl uppercase  lg:hidden'>
        we are a group of goal
        <span className='text-orange-500'> developers.</span>
      </span>
    </div>
    <div className='flex xl:w-[45%] md:w-[80%] w-full'>
      <p className='lg:text-4xl text-2xl lowercase'>
        Tech enthusiasts, who create{' '}
        <span className='text-orange-500'>great solutions.</span> We pride
        ourselves in delivering exceptional services AND EXPERIENCES WITH A
        FAST, HIGHLY <span className='text-orange-500'>DISCIPLINED TEAM</span>.
        wE WISH TO HELP OUR CLIENTS WITH CONTINUOUS INNOVATION AND PROGRESS BY
        BUILDING STRONG AND LASTING
        <span className='text-orange-500'> PARTNERSHIPS.</span>
      </p>
    </div>
    <div className='flex flex-col gap-8 xl:w-[45%] md:w-[80%] w-full'>
      <p className=''>
        Founded in 2020 with a vision of driving the loop towards new age
        technologies. Next loop has evolved into a thriving enterprise where
        unique minds shape innovative experiences for millions of users.
      </p>
      <p className=''>
        Born in the heart of the India Indore area, our outreach is global. We
        are a strong team of researchers, developers and experts of the digital
        world. Through a progressive and disciplined method our team creates
        digital transformation solutions with lasting impact.Partner with us to
        be in an endless loop of innovation and tech.
      </p>
    </div>
  </div>
);

const Card: React.FC<{ title: string; sub: string }> = ({ title, sub }) => {
  return (
    <div className='p-4 border-[2px] border-orange-400  h-[420px] sm:h-[320px] w-full relative'>
      <div className='w-full h-full absolute bottom-6 left-6'>
        <div
          style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
          className='bg-white rounded-[2px] flex flex-col gap-2 max-w-md py-10 px-4 h-[420px] sm:h-[320px]'
        >
          <div className='flex gap-2 items-center'>
            <div className=''>
              <Image src={arrow} alt='arrow' />
            </div>
            <span className='font-medium text-xl uppercase'>{title}</span>
          </div>
          <span className='text-left text-[12px]'>{sub}</span>
        </div>
      </div>
    </div>
  );
};

const JourneyCard: React.FC<{ title: string; sub: string; odd: boolean }> = ({
  sub,
  title,
  odd,
}) => {
  return (
    <div className='xl:w-[450px] xl:h-[450px] flex flex-col items-center relative'>
      {!odd ? <SmallOrangeTop /> : <BigOrangeTop />}
      <div className='absolute flex flex-col xl:w-[550px] md:w-[500px] w-full items-center gap-4 md:px-24 mt-12'>
        <Image src={bulb} alt='bulb' />
        <h1 className='text-xl font-bold'>{title}</h1>
        <span className='px-12 text-[10px]'>{sub}</span>
      </div>
    </div>
  );
};

const BigOrangeTop = () => (
  <>
    <svg
      width='343'
      height='259'
      viewBox='0 0 343 259'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M26.4759 251.722C12.3833 226.399 5.1659 197.827 5.54149 168.849C5.91707 139.871 13.8726 111.496 28.6168 86.546C43.3609 61.5963 64.38 40.9414 89.5835 26.6354C114.787 12.3295 143.297 4.871 172.277 5.00184C201.257 5.13268 229.698 12.8482 254.772 27.3812C279.845 41.9141 300.677 62.758 315.195 87.8398C329.713 112.922 337.412 141.367 337.526 170.348C337.64 199.328 330.165 227.833 315.844 253.028'
        stroke='white'
        strokeWidth='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
    <svg
      width='287'
      height='85'
      viewBox='0 0 287 85'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M278.622 10.1303C262.773 31.0256 242.279 47.9456 218.761 59.5514C195.242 71.1572 169.346 77.1302 143.12 76.9978C116.895 76.8655 91.0596 70.6314 67.6597 58.7888C44.2598 46.9462 23.9371 29.8202 8.29991 8.76602'
        stroke='#FA8145'
        strokeWidth='16'
        strokeLinecap='round'
      />
    </svg>
  </>
);

const SmallOrangeTop = () => (
  <>
    <svg
      width='287'
      height='85'
      viewBox='0 0 287 85'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M278.622 74.8697C262.773 53.9744 242.279 37.0544 218.761 25.4486C195.242 13.8428 169.346 7.86977 143.12 8.00213C116.895 8.13449 91.0596 14.3686 67.6597 26.2112C44.2598 38.0537 23.9371 55.1797 8.29991 76.2339'
        stroke='#FA8145'
        strokeWidth='16'
        strokeLinecap='round'
      />
    </svg>
    <svg
      width='343'
      height='259'
      viewBox='0 0 343 259'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M26.4759 7.27826C12.3833 32.6017 5.1659 61.1733 5.54149 90.1515C5.91707 119.13 13.8726 147.505 28.6168 172.454C43.3609 197.404 64.38 218.059 89.5835 232.365C114.787 246.671 143.297 254.129 172.277 253.998C201.257 253.868 229.698 246.152 254.772 231.619C279.845 217.086 300.677 196.242 315.195 171.16C329.713 146.079 337.412 117.633 337.526 88.6527C337.64 59.6723 330.165 31.167 315.844 5.97184'
        stroke='white'
        strokeWidth='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  </>
);

export default AboutUsHome;
