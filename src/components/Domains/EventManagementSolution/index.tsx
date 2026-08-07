import Image, { StaticImageData } from 'next/image';

import { eventAssets } from '../../../../assets';
import palette from '../../../styles/pallette';
import { getStaticImageData } from '../../../utils/helper';

const data = [
  {
    id: 1,
    title: 'Create your event website',
    subTitle:
      'Unlimited event listings are available. Your event website can support languages. You can choose from event layouts and calendars. ',
    description:
      'Build an event website that works hard. List events and present your schedule in a layout that fits your audience. They can view it as a calendar, a grid or a full event page. ',
    image: getStaticImageData(eventAssets.EventManagement1),
  },
  {
    id: 2,
    title: 'Make an interactive seating map',
    description:
      'Design a floor plan. Guests can. Buy seats directly. Configure rows, tables or standing areas. Apply pricing to each section. Choose from over 1000 templates. These templates are for conferences, concerts, sports events, weddings, parties and more. You can also host events with our live streaming solution. ',
    image: getStaticImageData(eventAssets.EventManagement2),
  },
  {
    id: 3,
    title: 'Sell tickets and membership plans',
    subTitle:
      'Create ticket types. Price them as you like. Add membership plans. Set capacity limits. Include a ticket policy.',
    description:
      'The platform handles ticket types and flexible pricing. It also handles membership plans and subscriptions. Online payment processing is secure. The platform collects tax automatically on ticket sales. You can track sales and revenue in time. ',
    image: getStaticImageData(eventAssets.EventManagement3),
  },
  {
    id: 4,
    title: 'Promote your events',
    subTitle:
      'Use email marketing. Create coupon and promo codes. Integrate with Google and Facebook. ',
    description:
      'Sell tickets with marketing tools. Schedule email. Generate coupon codes. Publish posts on Facebook and Instagram. All this can be done from the dashboard. ',
    image: getStaticImageData(eventAssets.EventManagement4),
  },
  {
    id: 5,
    title: 'Build a community around your event',
    subTitle: 'Create a members area. Have a live event feed and a forum. ',
    description:
      'Great events build lasting connections. Give attendees a space to engage before during and, after the event. They can discuss on a forum. They can view a content feed. They can also set up a profile in the members area. ',
    image: getStaticImageData(eventAssets.EventManagement5),
  },
  {
    id: 6,
    title: 'Track and manage attendance',
    subTitle:
      'Manage your guest list. Use guest and waitlists. Send automated email confirmation. ',
    description:
      'Stay on top of your attendee list. Collect guest information and preferences. Set your capacity. Open a waitlist when needed. Automated emails handle confirmation and reminders. ',
    image: getStaticImageData(eventAssets.EventManagement6),
  },
  {
    id: 7,
    title: 'Manage the day of your event with our website',
    subTitle: 'Use a ticketing app. Process walk-in ticket sales. ',
    description:
      'When the event starts everything needs to run. Check in guests and scan tickets. Manage your guest list on your phone. Keep the energy going with a live event discussion feed. ',
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
      className={`absolute h-[450px] w-[450px] top-6 ${
        position === POSITION.LEFT ? '-right-[224px]' : '-left-[224px]'
      } object-contain`}
      alt='image'
      height={300}
      width={300}
    />
    <Image
      src={eventAssets.GrayEllipse}
      className={`absolute w-24 h-24 ${
        position === POSITION.LEFT ? 'left-16' : 'right-16'
      } top-10`}
      alt='ellipse'
      height={300}
      width={300}
    />
    <Image
      src={eventAssets.GrayEllipse}
      className={`absolute w-16 h-16 ${
        position === POSITION.LEFT ? 'left-80' : 'right-80'
      } top-32`}
      alt='ellipse'
      height={300}
      width={300}
    />
    <Image
      src={eventAssets.GrayEllipse}
      className={`absolute w-24 h-24 ${
        position === POSITION.LEFT ? 'left-16' : 'right-16'
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
    className={`flex flex-col mx-10 md:flex-row items-center ${
      position === POSITION.LEFT
        ? 'md:justify-between md:flex-row-reverse'
        : 'md:justify-between'
    }`}
  >
    <div
      className={`flex flex-col gap-5 w-full md:w-[600px] ${
        position === POSITION.LEFT ? 'md:w-[400px] text-right' : 'md:ml-5'
      }`}
    >
      <h2
        className={`${palette.fontSize.subtitleLarge.mobile} md:${
          palette.fontSize.subtitleLarge.desktop
        } uppercase font-extrabold ${
          position === POSITION.LEFT
            ? 'md:ml-[250px] text-left'
            : 'md:ml-0 w-[60%]'
        }`}
      >
        {title}
      </h2>
      {subTitle && (
        <h3
          className={`${palette.fontSize.subtitle.mobile} md:${
            palette.fontSize.description.desktop
          } max-w-xs ${
            position === POSITION.LEFT ? 'md:ml-[250px] text-left' : 'md:ml-0'
          }`}
        >
          {subTitle}
        </h3>
      )}
      {description && (
        <p
          className={`${palette.fontSize.description.mobile} md:${
            palette.fontSize.description.desktop
          } max-w-xs ${
            position === POSITION.LEFT ? 'md:ml-[250px] text-left' : 'md:ml-0'
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
        className={`font-bold text-center ${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} w-full`}
      >
        Your complete{' '}
        <span className='text-orange-500'>event management solution</span>
      </h1>

      <div className='flex flex-col gap-12 mt-7 mb-10'>
        {data.map(({ description, id, image, subTitle, title }, index) => (
          <EventIdeaRow
            key={id}
            description={description}
            image={image}
            subTitle={subTitle}
            title={title}
            position={index % 2 === 0 ? POSITION.RIGHT : POSITION.LEFT}
          />
        ))}
      </div>
    </div>
  );
};

export default EventManagementSolution;
