import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { FB, GMAIL, GOOGLE, YT, X, INSTAGRAM } from '../../../assets';

import palette from '../../styles/pallette';

const PitchThought: FC = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescription(e.target.value);
  };

  // const { isMobile } = useWindowSize();

  return (
    <>
      <div
        id='footer'
        className='flex lg:flex-row flex-col gap-x-32 items-center sm:h-screen  px-4'
      >
        <div className='flex justify-end w-full text-white'>
          <div className='flex flex-col justify-end lg:w-4/6 gap-y-20 w-full'>
            <div className='lg:text-right text-center'>
              <span className='flex lg:justify-end justify-center'>
                connect with us
              </span>
              <span
                className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-right`}
              >
                PITCH your <b className='text-orange-500'>thoughts</b> here
              </span>
            </div>

            <span
              className={`{${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}}`}
            >
              Send us some details about your project, and feel free to ask
              questions about our process. Our consultants will be with you
              ASAP.
            </span>
            <div>
              <ul className='flex gap-x-3 justify-end'>
                <li>
                  <Link
                    href='https://www.facebook.com/profile.php?id=61556914381569&mibextid=ZbWKwL'
                    passHref
                  >
                    <Image
                      src={FB}
                      alt='fb-icon'
                      className='w-4 h-5 object-contain'
                    />
                  </Link>
                </li>
                <li>
                  <Link aria-disabled href=''>
                    <Image
                      src={GMAIL}
                      alt='gmail-icon'
                      className='w-4 h-5 object-contain'
                    />
                  </Link>
                </li>
                <li>
                  <Link href='https://g.co/kgs/7LnLSHN'>
                    <Image
                      src={GOOGLE}
                      alt='google-icon'
                      className='w-4 h-5 object-contain'
                    />
                  </Link>
                </li>
                <li>
                  <Link aria-disabled href=''>
                    <Image
                      src={YT}
                      alt='yt-icon'
                      className='w-4 h-5 object-contain'
                    />
                  </Link>
                </li>
                <li>
                  <Link href='https://x.com/Nextloop_'>
                    <Image
                      src={X}
                      alt='x-icon'
                      className='w-4 h-5 object-contain'
                    />
                  </Link>
                </li>
                <li>
                  <Link href='https://www.instagram.com/nextloop_technologies?igsh=MXJ1dzBocGliajBqbg=='>
                    <Image
                      src={INSTAGRAM}
                      alt='insta-icon'
                      className='w-4 h-5 object-contain'
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex gap-x-10 justify-center w-full text-white'>
          <div className='flex flex-col lg:w-2/3 pt-20 gap-y-12 w-full'>
            <div className='relative'>
              <input
                type='text'
                value={description}
                onChange={handleDescriptionChange}
                className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                placeholder='Describe your idea'
              />
            </div>
            <div className='relative'>
              <input
                type='text'
                value={email}
                onChange={handleEmailChange}
                className='border-b border-gray-400 w-full  h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                placeholder='Your email'
              />
            </div>
            <a
              className='flex justify-center items-center py-4 bg-white text-black rounded-full font-medium cursor-pointer'
              href='mailto:info@nextlooptechnologies.com'
            >
              Send your idea!
            </a>
            <div
              className={`flex ${palette.fontSize.descriptionSmall.mobile} md:${palette.fontSize.descriptionSmall.desktop}`}
            >
              101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia,
              Indore, Madhya Pradesh 452001
            </div>
            <div className='flex text-xl'>info@nextlooptechnologies.com</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PitchThought;
