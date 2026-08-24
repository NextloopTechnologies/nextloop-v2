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
import {
  ContactFormData,
  ContactFormErrors,
  EnquiryType,
  OptionType,
} from '../../types';
import { createInquiryForm } from '../../utils/db';
import {
  validateEmail,
  validateLastName,
  validateName,
  validatePhone,
} from '../../utils/formValidation';

const ContactForm: FC = () => {
  const [countryCode, setCountryCode] = useState('91');
  const [countryIso, setCountryIso] = useState<string>('IN');
  const [subject, setSubject] = useState<OptionType | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    subject: null,
    message: null,
  });

  const location =
    '101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia, Indore, Madhya Pradesh 452001';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let error: string | null = null;

    if (name === 'firstName') error = validateName(value) || null;
    else if (name === 'lastName') error = validateLastName(value) || null;
    else if (name === 'email') error = validateEmail(value) || null;
    else if (name === 'message')
      error = !value.trim() ? 'Message is required.' : null;

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    });
    setErrors({
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      subject: null,
      message: null,
    });
    setSubject(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');

    // Validate all fields on submit
    const newErrors: ContactFormErrors = {
      firstName: validateName(formData.firstName) || null,
      lastName: validateLastName(formData.lastName) || null,
      email: validateEmail(formData.email) || null,
      phoneNumber:
        validatePhone(formData.phoneNumber, countryCode, countryIso) || null,
      subject: !subject
        ? 'Please select a subject, this field is required.'
        : null,
      message: !formData.message.trim() ? 'Message is required.' : null,
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload: EnquiryType = {
        fullname: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phoneNumber.trim()
          ? `+${countryCode}${formData.phoneNumber.trim()}`
          : '',
        subject: subject?.value || 'development',
        message: formData.message,
      };

      const { success } = await createInquiryForm(payload);

      if (success) {
        setSuccessMessage('Your message has been sent successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        resetForm();
      } else {
        setErrors((prev) => ({
          ...prev,
          message: 'Something went wrong. Please try again.',
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        message: 'An error occurred while submitting the form.',
      }));
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
                  {/* First Name */}
                  <div className='w-full'>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      placeholder='First name *'
                      className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                    />
                    {errors.firstName && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  {/* Last Name */}
                  <div className='w-full'>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      placeholder='Last name *'
                      className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                    />
                    {errors.lastName && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className='relative'>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    className='border-b border-gray-400 w-full h-10 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                    placeholder='Email Address *'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className='relative'>
                  <PhoneInput
                    country='in'
                    value={`${countryCode}${formData.phoneNumber}`}
                    onChange={(
                      value,
                      data: { dialCode: string; countryCode: string }
                    ) => {
                      const dialCode = data?.dialCode || '';
                      const iso = data?.countryCode?.toUpperCase() || 'IN';
                      setCountryCode(dialCode);
                      setCountryIso(iso);
                      const actualNumber = value.slice(dialCode.length);
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: actualNumber,
                      }));
                      const phoneError = actualNumber
                        ? validatePhone(actualNumber, dialCode, iso) || null
                        : null;
                      setErrors((prev) => ({
                        ...prev,
                        phoneNumber: phoneError,
                      }));
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
                  {errors.phoneNumber && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <CustomDropdown
                    selected={subject}
                    onChange={(option) => {
                      setSubject(option);
                      setErrors((prev) => ({ ...prev, subject: null }));
                    }}
                  />
                  {errors.subject && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className='relative'>
                  <div className='mb-2 text-gray-400'>Message *</div>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder=''
                    className='border border-gray-400 w-full h-32 bg-transparent focus:outline-none focus:border-gray-600 transition-all duration-300'
                  />
                  {errors.message && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.message}
                    </p>
                  )}
                </div>

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
