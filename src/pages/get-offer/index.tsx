import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { createOfferApplications } from '../../utils/db';
import { offerPageBg, offersLogo } from '../../../assets';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company_name?: string;
}

const OffersPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createOfferApplications({
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        company_name: formData.company_name,
      });

      if (response.success && response.data?.[0]?.id) {
        const applicationDetailString = JSON.stringify(response.data[0]);
        router.push(
          `/get-offer/specialoffers?application_detail=${encodeURIComponent(
            applicationDetailString
          )}`
        );
      } else {
        setError('Failed to process your request. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative min-h-screen flex flex-col'>
      <div className='absolute inset-0'>
        <div
          className='w-full h-1/2 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${offerPageBg.src})` }}
        />
        <div className='w-full h-1/2 bg-white' />
      </div>

      <div className='relative z-10 flex-1 flex flex-col'>
        <div className='p-4 md:p-6 lg:p-8'>
          <Image
            src={offersLogo.src}
            alt='Offers Logo'
            fill
            className='w-24 md:w-32 h-auto'
          />
        </div>

        <div className='flex-1 flex items-center'>
          <div className='w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='bg-white rounded-lg shadow-lg py-6 px-4 sm:py-8 sm:px-8 md:py-10 md:px-12 lg:px-24'>
              <h2 className='text-center text-[#173F5F] text-xl sm:text-2xl font-bold mb-1'>
                Unlock Exclusive Offers with
              </h2>
              <h2 className='text-center text-[#173F5F] text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>
                Nextloop Technologies!
              </h2>

              {error && (
                <p className='text-red-500 text-sm text-center mb-4'>{error}</p>
              )}

              <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Name'
                  required
                  className='w-full px-4 py-2 sm:py-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email Address'
                    required
                    className='w-full px-4 py-2 sm:py-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Phone'
                    required
                    className='w-full px-4 py-2 sm:py-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>

                <input
                  type='text'
                  name='company_name'
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder='Company Name (Optional)'
                  className='w-full px-4 py-2 sm:py-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <div className='flex justify-center mt-6'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full sm:w-2/3 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-2xl transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {loading ? 'Processing...' : 'Submit and Unlock Your Offer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
