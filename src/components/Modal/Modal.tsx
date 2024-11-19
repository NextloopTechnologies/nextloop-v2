import React from 'react';

import { DBOffer } from '../../types';
import { offerIconSuccessTick } from '../../../assets';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOffer: DBOffer | null;
  onSelectOffer: () => void;
  loading?: boolean;
  error?: string | null;
  successMessage?: string | null;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedOffer,
  onSelectOffer,
  loading,
  error,
  successMessage,
}) => {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='fixed inset-0 bg-black transition-opacity duration-300 ease-in-out'
        style={{ opacity: isOpen ? 0.7 : 0 }}
        onClick={onClose}
      />

      <div
        className={`relative z-50 ${
          !successMessage ? 'bg-gradient-to-l from-[#13326C] to-[#0082B1]' : ''
        } text-white 
          p-4 sm:p-6 lg:p-8 rounded-lg w-full max-w-[90%] sm:max-w-[440px] lg:max-w-[520px] 
          transform transition-all duration-300 ease-in-out mx-auto`}
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        }}
      >
        {successMessage ? (
          <div className='flex flex-col items-center w-full py-10 bg-white p-4  rounded-lg'>
            <img
              src={offerIconSuccessTick.src}
              alt='Success Icon'
              className='mb-4 h-12 w-12'
            />
            <p className='text-lg mb-4 text-black'>{successMessage}</p>
            <button
              onClick={() => {
                onClose();
                window.location.href = '/';
              }}
              className='bg-[#13326C] text-white px-6 py-2 rounded-md font-semibold 
                hover:bg-opacity-90 transition-colors'
            >
              OK
            </button>
          </div>
        ) : (
          selectedOffer && (
            <div className='flex flex-col min-h-[280px]'>
              <div className='flex flex-col  flex-grow'>
                <div className='flex mb-2'>
                  <img
                    src={selectedOffer.icon.src}
                    alt={selectedOffer.title}
                    className='mr-2 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-contain'
                  />
                </div>
                <h2 className='text-xl sm:text-2xl font-bold mb-4'>
                  {selectedOffer.title}
                </h2>
                <div className='w-full h-0.5 bg-white mb-2'></div>
              </div>
              <div className='mt-auto'>
                <p className='text-base sm:text-lg mb-6 text-center'>
                  {selectedOffer.description}
                </p>

                <div className='text-xs sm:text-sm px-2 mb-4'>
                  <h3 className='font-bold'>Terms and Conditions</h3>
                  <ol className='list-decimal list-inside space-y-1'>
                    {selectedOffer?.['t&c_points']?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
                {error && (
                  <p className='text-red-300 text-sm mb-4 text-center'>
                    {error}
                  </p>
                )}
                <button
                  onClick={onSelectOffer}
                  disabled={loading}
                  className='w-full bg-white text-[#13326C] px-6 sm:px-8 py-2 rounded-md font-semibold 
                    hover:bg-opacity-90 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? 'Processing...' : 'Select Offer'}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
