import Image, { StaticImageData } from 'next/image';

import { eventAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const data = [
  {
    id: 1,
    title: 'Create your event website',
    subTitle:
      'Unlimited event listings | Multilingual capabilities | Event layouts and calendars',
    description:
      'Create a floor plan of your venue where guests can choose and purchase their seats. Customize it with rows, tables or standing room only and set different prices for each',
    image: getStaticImageData(eventAssets.EventManagement1),
  },
  {
    id: 2,
    title: 'Make an interactive seating map',
    description:
      'Choose from 900+ customizable templates designed to showcase any type of event from professional meetups, conferences, concerts, sports events, parties, weddings and more. With our fully integrated video streaming solution, Wix Live, you can host online events from anywhere.',
    image: getStaticImageData(eventAssets.EventManagement2),
  },
  {
    id: 3,
    title: 'Sell tickets and membership plans',
    subTitle:
      'Create unlimited ticket types and set prices. Offer membership plans set capacity and add a ticket policy. Accept online payments, charge tax on ticket sales and send printable tickets.',
    descriptionPoints: [
      'Unlimited Ticket Types',
      'Membership Plans and Subscriptions',
      'Secure Online Payment',
      'Tax Collection on Ticket Sales',
      'Sales and Revenue Tracking',
    ],
    image: getStaticImageData(eventAssets.EventManagement3),
  },
  {
    id: 4,
    title: 'Promote your events',
    subTitle:
      'Email marketing | Coupon and promo codes | Google and Facebook integrations',
    description:
      'Generate more ticket sales for your events using smart marketing tools. Drive traffic to your event website with scheduled email campaign, coupon offers designed social posts for Facebook and Instagram and more.',
    image: getStaticImageData(eventAssets.EventManagement4),
  },
  {
    id: 5,
    title: 'Build a community around your event',
    subTitle: 'Members Area | Live event feed | Forum',
    description:
      'Create a professional community and networking opportunities. Keep attendees connected and engaged with a blog, discussion forum and live, content feed he day of your event.  Add a Members area where attendees can create a profile and see who else is going.',
    image: getStaticImageData(eventAssets.EventManagement5),
  },
  {
    id: 6,
    title: 'Track and manage attendance',
    subTitle:
      'Editable guest and waitlists | Automated email confirmation | Customizable registration',
    description:
      'Track and manage your attendee list. Capture attendee information and preferences with custom forms. Set your guest capacity and open awaitlist. Trigger automated emails for ticket and RSVP confirmation, reminders and more.',
    image: getStaticImageData(eventAssets.EventManagement6),
  },
  {
    id: 7,
    title: 'Manage the day of your event with our website',
    subTitle: 'Mobile ticketing app | Walk-in ticket sales',
    description:
      'Smoothly manage your event onsite with the Wix Owner app. Run a clean door by checking in guests, scanning tickets, selling tickets at the door, managing your guest list and more. Open a live event discussion feed that you and your attendees can use to share and discuss content.',
    image: getStaticImageData(eventAssets.EventManagement7),
  },
];

export enum POSITION {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

type Props = {
  position: POSITION;
  image: StaticImageData;
};

type EventIdeaProps = {
  description?: string;
  image: StaticImageData;
  subTitle?: string;
  title: string;
  position: POSITION;
  descriptionPoints?: string[];
};

export const EllipsesGradientImageCard = ({ image, position }: Props) => (
  <div className='relative'>
    <Image
      src={image}
      className={`absolute h-[450px] w-[450px] top-6 ${position === POSITION.LEFT ? '-right-[224px]' : '-left-[224px]'
        } object-contain`}
      alt='image'
      height={300}
      width={300}
    />
    <Image
      src={eventAssets.GrayEllipse}
      className={`absolute w-24 h-24 ${position === POSITION.LEFT ? 'left-16' : 'right-16'
        } top-10`}
      alt='ellipse'
      height={300}
      width={300}
    />
    <Image
      src={eventAssets.GrayEllipse}
      className={`absolute w-16 h-16 ${position === POSITION.LEFT ? 'left-80' : 'right-80'
        } top-32`}
      alt='ellipse'
      height={300}
      width={300}
    />
    <Image
      src={eventAssets.GrayEllipse}
      className={`absolute w-24 h-24 ${position === POSITION.LEFT ? 'left-16' : 'right-16'
        } bottom-20`}
      alt='ellipse'
      height={300}
      width={300}
    />
    <Image
      src={
        position === POSITION.LEFT
          ? eventAssets.BlackRectangle
          : eventAssets.OrangeRectangle
      }
      className='md:w-[600px] h-[500px]'
      alt='BG'
      height={300}
      width={300}
    />
  </div>
);

export const EventIdeaRow = ({
  description,
  image,
  subTitle,
  title,
  position,
  descriptionPoints,
}: EventIdeaProps) => (
  <div
    className={`flex flex-col mx-10 md:flex-row items-center ${position === POSITION.LEFT
      ? 'md:justify-between md:flex-row-reverse'
      : 'md:justify-between'
      }`}
  >
    <div
      className={`flex flex-col gap-5 w-full md:w-[600px] ${position === POSITION.LEFT ? 'md:w-[400px] text-right' : 'md:ml-5'
        }`}
    >
      <h2
        className={`${palette.fontSize.subtitleLarge.mobile} md:${palette.fontSize.subtitleLarge.desktop
          } uppercase font-extrabold ${position === POSITION.LEFT
            ? 'md:ml-[250px] text-left'
            : 'md:ml-0 w-[60%]'
          }`}
      >
        {title}
      </h2>
      {subTitle && (
        <h3
          className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.description.desktop
            } max-w-xs ${position === POSITION.LEFT ? 'md:ml-[250px] text-left' : 'md:ml-0'
            }`}
        >
          {subTitle}
        </h3>
      )}
      {description && (
        <p
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop
            } max-w-xs ${position === POSITION.LEFT ? 'md:ml-[250px] text-left' : 'md:ml-0'
            }`}
        >
          {description}
        </p>
      )}
      {descriptionPoints && (
        <ul
          className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} list-disc pl-10 max-w-xs`}
        >
          {descriptionPoints.map((point, index) => (
            <li
              key={index}
              className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
            >
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className='hidden md:block'>
      <EllipsesGradientImageCard image={image} position={position} />
    </div>
  </div>
);

const EventManagementSolution = () => {
  return (
    <div className='flex flex-col'>
      <h1
        className={`uppercase font-bold text-center ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} w-full`}
      >
        Your complete event management{' '}
        <span className='text-orange-500'>solution</span>
      </h1>

      <div className='flex flex-col gap-12 mt-7 mb-10'>
        {data.map(
          (
            { description, id, image, subTitle, title, descriptionPoints },
            index
          ) => (
            <EventIdeaRow
              key={id}
              description={description}
              image={image}
              subTitle={subTitle}
              title={title}
              position={index % 2 === 0 ? POSITION.RIGHT : POSITION.LEFT}
              descriptionPoints={descriptionPoints}
            />
          )
        )}
      </div>
    </div>
  );
};

export default EventManagementSolution;
