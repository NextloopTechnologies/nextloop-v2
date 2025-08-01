import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';

import CustomDropdown from '../CustomDropdown';
import palette from '../../styles/pallette';
import { EnquiryType } from '../../types';
import { createInquiryForm } from '../../utils/db';
import { FACEBOOK, GOOGLE, INSTAGRAM, LINKIN, Mail } from '../../../assets';
import LocationIcon from '../../../assets/getInTouch/LocationIcon.png';
import MailIcon from '../../../assets/getInTouch/MailIcon.png';
import PhoneIcon from '../../../assets/getInTouch/PhoneIcon.png';
import TwitterIcon from '../../../assets/getInTouch/twitterIcon.png';

interface OptionType {
  label: string;
  value: string;
}

const PitchThought: FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState<OptionType | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location =
    '101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia, Indore, Madhya Pradesh 452001';
  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    if (!firstName) return 'First name is required.';
    if (!lastName) return 'Last name is required.';
    if (!subject) return 'Subject is required.';
    if (!email) return 'Email is required.';
    if (!message) return 'Message is required.';
    return '';
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload: EnquiryType = {
        fullname: `${firstName} ${lastName}`,
        email,
        contact: phone,
        subject: subject?.value || 'development',
        message,
      };
      const { success } = await createInquiryForm(payload);

      if (success) {
        setSuccessMessage('Your message has been sent successfully!');
        resetForm();
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
      else
        setError('Something went wrong. Please try again.');
    } catch {
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <>
      {/* <Head>
        <title>Nextloop Technologies | Let's Connect</title>
        <meta
          name='description'
          content='Get in touch with Nextloop Technologies for all your IT service needs. Our team is ready to assist you with innovative solutions and expert support.'
        />
      </Head> */}
      <form onSubmit={handleSubmit} className='md:px-20 md:pb-5 md:pt-10 pb-24'>
        <h2
          className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl text-white uppercase font-bold text-center p-10`}
        >
          Get in Touch {'  '}
          <span className='text-orange-500'>with Us!</span>
        </h2>
        <div
          id='footer'
          className='flex lg:flex-row flex-col items-center px-10'
        >
          <div className='flex gap-x-10 justify-end w-full text-white md:pl-10'>
            <div className='flex flex-col gap-y-4  w-full pb-5'>
              <div className='relative flex space-x-4'>
                <input
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='First name *'
                  className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                />
                <input
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Last name *'
                  className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                />
              </div>
              <div className='relative'>
                <input
                  type='text'
                  value={email}
                  onChange={handleEmailChange}
                  className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                  placeholder='Email Address *'
                />
              </div>
              <div className='relative'>
                <input
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Phone Number'
                  className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                />
              </div>
              <CustomDropdown
                selected={subject}
                onChange={(option) => setSubject(option)}
              />
              <div className='relative'>
                <div className='mb-2 text-gray-400'>Message *</div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder=''
                  className='border border-gray-400 w-full h-20 bg-transparent focus:outline-none focus:border-gray-400 transition-all duration-300'
                />
              </div>
              {error && <div className='text-red-500'>{error}</div>}
              {successMessage && (
                <div className='text-green-500'>{successMessage}</div>
              )}{' '}
              {/* Display success message */}
              <button
                type='submit'
                className='flex justify-center items-center py-4 bg-white text-black rounded-full font-medium cursor-pointer'
              >
                Submit Now
              </button>
            </div>
          </div>
          <div className='flex justify-center w-full text-white mt-6 md:mt-0'>
            <div className='flex flex-col justify-start lg:w-2/3 gap-y-5 w-full'>
              <div className='flex items-center'>
                <Image
                  src={MailIcon}
                  height={24}
                  width={24}
                  alt='inventory-card-icon'
                  className='mr-4'
                />
                <div
                  className={`flex ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
                >
                  <a href='mailto:info@nextlooptechnologies.com'>
                    info@nextlooptechnologies.com
                  </a>
                </div>
              </div>
              <div className='flex items-center'>
                <Image
                  src={LocationIcon}
                  height={24}
                  width={24}
                  alt='inventory-card-icon'
                  className='mr-4'
                />
                <div
                  className={`flex ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
                >
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(
                      location
                    )}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  // style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    {location}
                  </a>
                </div>
              </div>
              <div className='flex items-center'>
                <Image
                  src={PhoneIcon}
                  height={24}
                  width={24}
                  alt='inventory-card-icon'
                  className='mr-4'
                />
                <div
                  className={`flex gap-x-1 ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
                >
                  <a href='tel:+918103542991'>+918103542991</a>,
                  <a href='tel:+919893954683'>+919893954683</a>
                </div>
              </div>

              <div
                className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
              >
                Send us some details about your project, and feel free to ask
                questions about our process. Our consultants will be with you
                ASAP.
              </div>
              <div className='border-b border-orange-500 w-full border-t-4 mb-2 md:mb-0'></div>
              <div>
                <ul className='flex gap-x-7 mb-10 md:mb-5'>
                  <li>
                    <Link
                      href='https://www.facebook.com/profile.php?id=61556914381569&mibextid=ZbWKwL'
                      passHref
                    >
                      <Image
                        src={FACEBOOK}
                        alt='fb-icon'
                        className='w-14 h-14 object-contain'
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href='https://g.co/kgs/7LnLSHN'>
                      <Image
                        src={GOOGLE}
                        alt='google-icon'
                        className='w-14 h-14 object-contain'
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      aria-disabled
                      href='mailto:info@nextlooptechnologies.com'
                      aria-label='Send Email'
                    >
                      <Image
                        src={Mail}
                        alt='gmail-icon'
                        className='w-14 h-14 object-contain'
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      aria-disabled
                      href='https://www.instagram.com/nextloop.technologies/'
                    >
                      <Image
                        src={INSTAGRAM}
                        alt='instagram-icon'
                        className='w-14 h-14 object-contain'
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href='https://www.linkedin.com/company/nextloop-technologies-llp'>
                      <Image
                        src={LINKIN}
                        alt='x-icon'
                        className='w-14 h-14 object-contain'
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href='https://x.com/Nextloop_'>
                      <Image
                        src={TwitterIcon}
                        alt='insta-icon'
                        className='w-14 h-14 object-contain'
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div
        className={`flex flex-col text-center sm:flex-row sm:justify-between border-t border-gray-500 w-full p-5 text-white ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
      >
        <p>
          © {new Date().getFullYear()} Nextloop Technologies ― All Rights
          Reserved.
        </p>
        <p>
          <Link href={"/privacy"}>Privacy Policy</Link>
        </p>
      </div>
    </>
  );
};

export default PitchThought;
