import { isValidPhoneNumber } from 'libphonenumber-js';
import Head from 'next/head';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { BiSolidPhoneCall } from 'react-icons/bi';
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';
import { ImLocation } from 'react-icons/im';
import { IoIosMail, IoMdMail } from 'react-icons/io';
import PhoneInput from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';

import CustomDropdown from '../../components/CustomDropdown';
import Layout from '../../components/Layout/Layout';
import palette from '../../styles/pallette';
import { EnquiryType } from '../../types';
import { createInquiryForm } from '../../utils/db';

interface OptionType {
  label: string;
  value: string;
}

const ContactForm: FC = () => {
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [countryIso, setCountryIso] = useState<string>('IN');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState<OptionType | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location =
    '101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia, Indore, Madhya Pradesh 452001';

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s'-]{1,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName.trim()) return 'First name is required.';
    if (!nameRegex.test(firstName.trim()))
      return 'First name should contain only letters and must be under 20 characters.';
    if (!lastName.trim()) return 'Last name is required.';
    if (!nameRegex.test(lastName.trim()))
      return 'Last name should contain only letters and must be under 20 characters.';
    if (!subject) return 'Subject is required.';
    if (!email.trim()) return 'Email is required.';
    if (!emailRegex.test(email.trim()))
      return 'Please enter a valid email address.';
    if (!message.trim()) return 'Message is required.';
    if (phone.trim()) {
      const fullNumber = `+${countryCode}${phone.trim()}`;
      if (!isValidPhoneNumber(fullNumber, countryIso as any))
        return 'Please enter a valid phone number for selected country.';
    }
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
        contact: phone.trim() ? `+${countryCode}${phone.trim()}` : '',
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
      } else setError('Something went wrong. Please try again.');
    } catch {
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <>
      <Head>
        <title>
          Contact Nextloop Technologies | Get in Touch for Custom IT Software
          Solutions
        </title>
        <meta
          name='description'
          content='Contact Nextloop Technologies for expert IT solutions, MVP & mobile development, UI/UX design, digital marketing, Staff augmentation & other customized solutions to grow your business'
        />
      </Head>
      <Layout headerColor='bg-white' showFooter={false}>
        <form
          onSubmit={handleSubmit}
          className='md:px-20 md:pb-5 md:pt-10 pb-24 bg-[#F4F4F4]'
        >
          <div
            id='footer'
            className='flex lg:flex-row flex-col items-center px-10 min-h-screen'
          >
            <div className='flex justify-center w-full text-black mt-6 md:mt-0 '>
              <div className='flex flex-col justify-start lg:w-2/3 gap-y-4 w-full md:mt-32'>
                <h2
                  className={`${palette.fontSize.heading2.mobile} md:text-3xl 2xl:text-4xl text-black uppercase font-bold text-center`}
                >
                  Get in Touch {'  '}
                  <span className='text-orange-500'>with Us!</span>
                </h2>
                <div className='w-full h-40 rounded-lg overflow-hidden'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.9360155863986!2d75.8852473!3d22.7282604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e39ac69c135d%3A0xe95bb5f20aa420ac!2sNextloop%20Technologies%20LLP!5e0!3m2!1sen!2sin!4v1653091257496!5m2!1sen!2sin'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    aria-label='Interactive Google Map'
                  ></iframe>
                </div>
                <div className='flex items-center'>
                  <div className='mr-4 bg-white w-6 h-6 rounded-full flex items-center justify-center'>
                    <IoIosMail className='w-5 h-5 text-black' />
                  </div>
                  <div
                    className={`flex ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
                  >
                    <a href='mailto:info@nextlooptechnologies.com'>
                      info@nextlooptechnologies.com
                    </a>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='mr-4 bg-white w-6 h-6 rounded-full flex items-center justify-center'>
                    <ImLocation className='w-5 h-4 text-black mx-1' />
                  </div>
                  <div
                    className={`flex ${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop}`}
                  >
                    <a
                      href={`https://www.google.com/maps?q=${encodeURIComponent(
                        location
                      )}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {location}
                    </a>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='mr-4 bg-white w-6 h-6 rounded-full flex items-center justify-center'>
                    <BiSolidPhoneCall className='w-5 h-4 text-black mx-1' />
                  </div>
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
                  <ul className='flex gap-7 mb-10 md:mb-5 flex-wrap justify-between'>
                    <li>
                      <Link
                        href='https://www.facebook.com/profile.php?id=61556914381569&mibextid=ZbWKwL'
                        passHref
                        className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'
                      >
                        <FaFacebookF size={24} className='text-white' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='https://g.co/kgs/7LnLSHN'
                        className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'
                      >
                        <FaGoogle size={24} className='text-white' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        aria-disabled
                        href='mailto:info@nextlooptechnologies.com'
                        aria-label='Send Email'
                        className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'
                      >
                        <IoMdMail size={24} className='text-white' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        aria-disabled
                        href='https://www.instagram.com/nextloop.technologies/'
                        className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'
                      >
                        <FaInstagram size={24} className='text-white' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='https://www.linkedin.com/company/nextloop-technologies-llp'
                        className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'
                      >
                        <FaLinkedinIn size={24} className='text-white' />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='https://x.com/Nextloop_'
                        className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'
                      >
                        <FaXTwitter size={24} className='text-white' />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='flex gap-x-10 justify-end w-full text-black md:pl-10 bg-white p-10 rounded-3xl shadow-2xl md:mt-20'>
              <div className='flex flex-col gap-y-4  w-full'>
                <div className='relative flex space-x-4'>
                  <div className='w-full'>
                    <input
                      type='text'
                      value={firstName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFirstName(value);
                        const nameRegex = /^[a-zA-Z\s'-]+$/;
                        if (!value.trim())
                          setFirstNameError('First name is required.');
                        else if (!nameRegex.test(value.trim()))
                          setFirstNameError('Please enter a valid name');
                        else setFirstNameError('');
                      }}
                      placeholder='First name *'
                      pattern='.*\S.*'
                      className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                    />
                    {firstNameError && (
                      <p className='text-red-500 text-xs mt-1'>
                        {firstNameError}
                      </p>
                    )}
                  </div>
                  <div className='w-full'>
                    <input
                      type='text'
                      value={lastName}
                      onChange={(e) => {
                        const value = e.target.value;
                        setLastName(value);
                        const nameRegex = /^[a-zA-Z\s'-]+$/;
                        if (!value.trim())
                          setLastNameError('Last name is required.');
                        else if (!nameRegex.test(value.trim()))
                          setLastNameError('Please enter a valid last name.');
                        else setLastNameError('');
                      }}
                      placeholder='Last name *'
                      pattern='.*\S.*'
                      className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                    />
                    {lastNameError && (
                      <p className='text-red-500 text-xs mt-1'>
                        {lastNameError}
                      </p>
                    )}
                  </div>
                </div>
                <div className='relative'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!value.trim()) setEmailError('Email is required.');
                      else if (!emailRegex.test(value.trim()))
                        setEmailError('Please enter a valid email address.');
                      else setEmailError('');
                    }}
                    className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                    placeholder='Email Address *'
                  />
                  {emailError && (
                    <p className='text-red-500 text-xs mt-1'>{emailError}</p>
                  )}
                </div>

                <div className='relative'>
                  <PhoneInput
                    country='in'
                    value={`${countryCode}${phone}`}
                    onChange={(
                      value,
                      data: { dialCode: string; countryCode: string }
                    ) => {
                      const dialCode = data?.dialCode || '';
                      const iso = data?.countryCode?.toUpperCase() || 'IN';
                      setCountryCode(dialCode);
                      setCountryIso(iso);
                      const actualNumber = value.slice(dialCode.length);
                      setPhone(actualNumber);
                      if (!actualNumber) {
                        setPhoneError('');
                      } else {
                        const fullNumber = `+${value}`;
                        const valid = isValidPhoneNumber(
                          fullNumber,
                          iso as any
                        );
                        setPhoneError(
                          valid
                            ? ''
                            : 'Please enter a valid phone number for selected country.'
                        );
                      }
                    }}
                    inputStyle={{
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid #9ca3af',
                      borderRadius: '0',
                      backgroundColor: 'transparent',
                      height: '40px',
                    }}
                    buttonStyle={{
                      border: 'none',
                      borderBottom: '1px solid #9ca3af',
                      backgroundColor: 'transparent',
                      borderRadius: '0',
                    }}
                    containerStyle={{ width: '100%' }}
                    placeholder='Phone Number (Optional)'
                  />
                  {phoneError && (
                    <p className='text-red-500 text-xs mt-1'>{phoneError}</p>
                  )}
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
                    className='border border-gray-400 w-full h-32 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                  />
                </div>
                {error && <div className='text-red-500'>{error}</div>}
                {successMessage && (
                  <div className='text-green-500'>{successMessage}</div>
                )}
                <button
                  type='submit'
                  className='flex justify-center items-center py-4 bg-orange-500 text-white rounded-full font-medium cursor-pointer'
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default ContactForm;
