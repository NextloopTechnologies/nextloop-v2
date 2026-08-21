import Head from 'next/head';

import { eventAssets } from '../../../../assets';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
// import ClientReviews from '../../../components/Domains/ClientReviews';
import CustomRequestQuote from '../../../components/Domains/CustomRequestQuote';
import DesignYourEvents from '../../../components/Domains/DesignYourEvents';
import EventManagementSolution from '../../../components/Domains/EventManagementSolution';
import FAQ from '../../../components/Domains/FAQ';
import WhyBuild from '../../../components/Domains/WhyBuild';
import WhyWorkWithUs from '../../../components/Domains/WhyWorkWithUs';
import Layout from '../../../components/Layout/Layout';
import palette from '../../../styles/pallette';
import { IFAQ } from '../../../types';
import { getStaticImageData } from '../../../utils/helper';

const benefits = [
  {
    id: 1,
    title: 'One Source of Truth :',
    info: ' Guest lists, vendor contracts, seating maps, budgets, and communication logs — all in one place, accessible to your whole team. No conflicting versions. No chasing the latest headcount through an email thread.',
  },
  {
    id: 2,
    title: 'Automation That Saves Real Time :',
    info: 'Confirmation emails, reminders, waitlist updates, ticket delivery — handled automatically. Your team focuses on the event, not the admin behind it.',
  },
  {
    id: 3,
    title: 'Real-Time Reporting :',
    info: "Tickets sold, revenue tracked, guests checked in — all visible the moment you need them. Make decisions on the spot, not after someone's finished running a report.",
  },
  {
    id: 4,
    title: 'Communication Without the Gaps :',
    info: 'Attendees, vendors, speakers, staff — everyone gets the right information at the right time, automatically. No manual follow-ups. No missed messages.',
  },
  {
    id: 5,
    title: 'Software That Fits Your Event :',
    info: 'A festival runs differently from a conference. A gala has different needs than a product launch. Our event management software is shaped around your event, your audience, and your requirements — not the other way around.',
  },
];

const faqsContent: IFAQ[] = [
  {
    id: 1,
    question:
      'What makes custom event management software worth building instead of just using an off-the-shelf platform?',
    answer:
      'Off-the-shelf event management tools work well for straightforward events with standard requirements. But organisations that run events regularly — or that have specific operational needs, complex ticketing structures, or integrated vendor and attendee management requirements — consistently find that generic platforms create as many problems as they solve. Custom software eliminates the compromises. Your registration flow works the way your process works. Your reporting shows the metrics your team actually uses. Your communication tools reflect your brand. Over time, a custom platform built for your operation delivers better attendee experiences, lower administrative overhead, and more reliable data than any off-the-shelf alternative. ',
  },
  {
    id: 2,
    question:
      'Does your wedding planner software work for independent planners as well as larger agencies? ',
    answer:
      "Yes, and the platform scales accordingly. An independent wedding planner managing a handful of weddings per year needs clean client portals, organised timelines, and reliable vendor communication tools. A larger agency managing dozens of weddings simultaneously needs all of that plus multi-client dashboards, team permissions, consolidated reporting, and workflow templates that can be applied across engagements. We scope the build around your actual operation size and complexity, so you're not paying for infrastructure you don't need or finding yourself limited by a platform that can't keep up with your growth. ",
  },
  {
    id: 3,
    question:
      'Can the platform handle both in-person and virtual attendance for the same event? ',
    answer:
      'Hybrid events are something we build for specifically, not as an add-on. In-person attendees and virtual participants can access the same event content through different interfaces — physical check-in and seating for those on site, live streaming, interactive Q&A, and digital networking tools for those joining remotely. Both experiences are managed through the same backend, giving your team a single operational view of the whole event rather than two separate systems running in parallel. ',
  },
];

const Events = () => {
  return (
    <>
      <Head>
        <title>
          Build the Best Event Management Software using our Event Management
          Tools
        </title>
        <meta
          name='description'
          content='At Nextloop Technologies, we build custom wedding planner software, secure banquet event order software and tailored event management software for non-profits.'
        />
      </Head>
      <Layout>
        <CustomPageHero
          image={getStaticImageData(eventAssets.eventsBg)}
          titleChildren={
            <h1
              className={`text-white ${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop}  font-bold text-center w-full md:max-w-[1306px]`}
            >
              Custom Event Management Software{' '}
              <span className='text-orange-500'>& Website Development</span>
            </h1>
          }
          customSubtitleClassname={`xl:w-[51%] ${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop}`}
          subtitle=''
          opacity='opacity-90'
          title=''
        />
        <WhyBuild
          image={getStaticImageData(eventAssets.WhyBuildEventManagement)}
          title='Why Build a Custom Software Solution for'
          colouredTitle='Event Management'
          informationSection={
            <div className={`mx-14 md:mx-10 lg:mx-0 md:max-w-[600px] `}>
              <p
                className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} font-normal gap-5`}
              >
                Planning an event like a seminar for 50 people or a wedding for
                500 people is really hard. You have to deal with a lot of things
                at the time like finding vendors, getting people to sign up
                setting up seats selling tickets keeping track of money and
                making reports. If one thing goes wrong, it can affect
                everything that is connected to it.
              </p>
              <p
                className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} font-normal`}
              >
                There are tools there but they are not very good for this kind
                of thing. Some websites can sell tickets. That is about it. They
                do not do much else. What people who plan events really need is
                software that can help with every part of the event from sending
                out the first invitation to saying goodbye to the last guest.
              </p>
              <h3
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}  my-2 font-semibold`}
              >
                The Benefits of Event Management Software
              </h3>

              <ul
                className={`${palette.fontSize.descriptionMid.mobile} md:${palette.fontSize.descriptionMid.desktop} list-disc mt-2`}
              >
                {benefits.map((benefit) => (
                  <div key={benefit.id} className='font-medium'>
                    {benefit.title}{' '}
                    <span className='font-normal'>{benefit.info}</span>
                  </div>
                ))}
              </ul>
            </div>
          }
        />
        <WhyWorkWithUs />
        <EventManagementSolution />
        {/* <ClientReviews /> */}
        <DesignYourEvents />
        <FAQ faqsContent={faqsContent} />
        <CustomRequestQuote title='Your Complete Event Management Platform' />
      </Layout>
    </>
  );
};

export default Events;
