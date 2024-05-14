import { WhyBuildEventManagement } from '../../../../assets';
import eventsBg from '../../../../assets/eventsBg.png';
import CustomPageHero from '../../../components/CustomPageHero/CustomPageHero';
import WhyBuild from '../../../components/Domains/WhyBuild';
import Layout from '../../../components/Layout/Layout';

const benefits = [
  {
    id: 1,
    title: 'Centralized Data Management:',
    info: 'Easily access and manage all event-related data in one centralized location.',
  },
  {
    id: 2,
    title: 'Automated Workflows:',
    info: 'Save time and reduce manual tasks with automated workflows for tasks such as registration, ticketing, and communication.',
  },
  {
    id: 3,
    title: 'Customization:',
    info: 'Tailor the software to meet the specific needs and requirements of your organization.',
  },
  {
    id: 4,
    title: 'Real-Time Reporting:',
    info: 'Gain insights and track the success of your events with real-time reporting and analytics.',
  },
  {
    id: 5,
    title: 'Enhanced Communication:',
    info: 'Improve communication with attendees, vendors, and staff through integrated communication tools.',
  },
];

const Events = () => {
  return (
    <Layout>
      <CustomPageHero
        image={eventsBg}
        titleChildren={
          <h1 className='text-white text-8xl uppercase font-bold text-center max-w-[1306px]'>
            Create a professional{' '}
            <span className='text-orange-500'>event website</span>
          </h1>
        }
        subtitle='Create a website for online and in-person events, sell tickets or collect RSVPs, accept secure online payments, reach more guests with advanced marketing tools and manage the day of your event.'
        opacity='opacity-90'
        title=''
      />

      <WhyBuild
        image={WhyBuildEventManagement}
        colouredTitle='Event Management'
        informationSection={
          <div className='max-w-[737px]'>
            <p className='text-lg font-normal gap-5'>
              Event planning can be a complex and time-consuming process. From
              coordinating schedules and vendors to managing registrations and
              budgets, there are countless details to keep track of. This is
              where event management software comes in, offering a solution to
              streamline and simplify the planning process.
            </p>

            <h3 className='font-bold text-2xl uppercase my-5'>
              The Benefits of Event Management Software
            </h3>

            <p className='text-lg font-normal'>
              Event management software offers a wide range of benefits for
              businesses and organizations looking to streamline their event
              planning processes. Some key advantages include:
            </p>

            <ul className='list-disc text-lg pl-10'>
              {benefits.map((benefit) => (
                <li key={benefit.id} className='font-medium'>
                  {benefit.title}{' '}
                  <span className='font-normal'>{benefit.info}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />
    </Layout>
  );
};

export default Events;
