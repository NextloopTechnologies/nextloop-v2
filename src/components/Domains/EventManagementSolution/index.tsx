import Image, { StaticImageData } from 'next/image';

import {
  BlackRectangle,
  EventManagement1,
  EventManagement2,
  EventManagement3,
  EventManagement4,
  EventManagement5,
  EventManagement6,
  EventManagement7,
  GrayEllipse,
  OrangeRectangle,
} from '../../../../assets';

const data = [
  {
    id: 1,
    title: 'Create your event website',
    subTitle:
      'Unlimited event listings | Multilingual capabilities | Event layouts and calendars',
    description:
      'Create a floor plan of your venue where guests can choose and purchase their seats. Customize it with rows, tables or standing room only and set different prices for each',
    image: EventManagement1,
  },
  {
    id: 2,
    title: 'Make an interactive seating map',
    description:
      'Choose from 900+ customizable templates designed to showcase any type of event from professional meetups, conferences, concerts, sports events, parties, weddings and more. With our fully integrated video streaming solution, Wix Live, you can host online events from anywhere.',
    image: EventManagement2,
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
    image: EventManagement3,
  },
  {
    id: 4,
    title: 'Promote your events',
    subTitle:
      'Email marketing | Coupon and promo codes | Google and Facebook integrations',
    description:
      'Generate more ticket sales for your events using smart marketing tools. Drive traffic to your event website with scheduled email campaign, coupon offers designed social posts for Facebook and Instagram and more.',
    image: EventManagement4,
  },
  {
    id: 5,
    title: 'Build a community around your event',
    subTitle: 'Members Area | Live event feed | Forum',
    description:
      'Create a professional community and networking opportunities. Keep attendees connected and engaged with a blog, discussion forum and live, content feed he day of your event.  Add a Members area where attendees can create a profile and see who else is going.',
    image: EventManagement5,
  },
  {
    id: 6,
    title: 'Track and manage attendance',
    subTitle:
      'Editable guest and waitlists | Automated email confirmation | Customizable registration',
    description:
      'Track and manage your attendee list. Capture attendee information and preferences with custom forms. Set your guest capacity and open awaitlist. Trigger automated emails for ticket and RSVP confirmation, reminders and more.',
    image: EventManagement6,
  },
  {
    id: 7,
    title: 'Manage the day of your event with the our website',
    subTitle: 'Mobile ticketing app | Walk-in ticket sales',
    description:
      'Smoothly manage your event onsite with the Wix Owner app. Run a clean door by checking in guests, scanning tickets, selling tickets at the door, managing your guest list and more. Open a live event discussion feed that you and your attendees can use to share and discuss content.',
    image: EventManagement7,
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
      className={`absolute h-[450px] w-[450px] top-6 ${
        position === POSITION.LEFT ? '-right-[223px]' : '-left-[223px]'
      } object-contain`}
      alt='image'
    />
    <Image
      src={GrayEllipse}
      className={`absolute w-24 h-24 ${
        position === POSITION.LEFT ? 'left-16' : 'right-16'
      } top-10`}
      alt='ellipse'
    />
    <Image
      src={GrayEllipse}
      className={`absolute w-16 h-16 ${
        position === POSITION.LEFT ? 'left-80' : 'right-80'
      } top-32`}
      alt='ellipse'
    />
    <Image
      src={GrayEllipse}
      className={`absolute w-24 h-24 ${
        position === POSITION.LEFT ? 'left-16' : 'right-16'
      } bottom-20`}
      alt='ellipse'
    />
    <Image
      src={position === POSITION.LEFT ? BlackRectangle : OrangeRectangle}
      className='w-[600px] h-[500px]'
      alt='BG'
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
    className={`flex items-center justify-between ${
      position === POSITION.LEFT && 'flex-row-reverse'
    }`}
  >
    <div
      className={`flex flex-col gap-5 w-[550px] ${
        position === POSITION.LEFT ? 'mr-32' : 'ml-32'
      }`}
    >
      <h2 className='text-4xl uppercase font-bold'>{title}</h2>
      {subTitle && <h3 className='font-medium text-lg'>{subTitle}</h3>}
      {description && <p className='font-normal text-lg'>{description}</p>}
      {descriptionPoints && (
        <ul className='list-disc text-sm md:text-lg pl-10'>
          {descriptionPoints.map((point, index) => (
            <li key={index} className='font-normal text-lg'>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>

    <EllipsesGradientImageCard image={image} position={position} />
  </div>
);

const EventManagementSolution = () => {
  return (
    <div className='flex flex-col py-[122px] mx-auto'>
      <h1 className='text-3xl md:text-7xl uppercase max-w-[1058px] mx-auto font-bold text-center'>
        Your complete event management{' '}
        <span className='text-orange-500'>solution</span>
      </h1>

      <div className='flex flex-col gap-5 mt-14'>
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
