import Image from 'next/image';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

import { DBOffer } from '../../types';

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
  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        title: 'Success!',
        text: successMessage,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#13326C',
        customClass: {
          popup:
            'rounded-lg max-w-[60%] w-full sm:max-w-[440px] lg:max-w-[520px]',
          title: 'text-xl sm:text-2xl font-bold text-gray-800',
          confirmButton:
            'bg-[#13326C] text-white px-6 py-2 rounded-md font-semibold text-sm sm:text-base hover:bg-opacity-90 transition-colors',
          actions: 'mt-4',
          container: 'p-0',
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
          window.location.href = '/';
        }
      });
    }
  }, [successMessage, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='fixed inset-0 bg-black transition-opacity duration-300 ease-in-out'
        style={{ opacity: isOpen ? 0.7 : 0 }}
        onClick={!successMessage ? onClose : undefined}
      />

      <div
        className={`relative z-50 ${!successMessage ? 'bg-gradient-to-l from-[#13326C] to-[#0082B1]' : ''
          } text-white 
          p-4 sm:p-6 lg:p-8 rounded-lg w-full max-w-[62%] sm:max-w-[220px] lg:max-w-[520px] 
          transform transition-all duration-300 ease-in-out mx-auto`}
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
        }}
      >
        {selectedOffer && !successMessage && (
          <div className='flex flex-col'>
            <div className='flex flex-col flex-grow'>
              <div className='flex mb-2'>
                <Image
                  src={selectedOffer.icon.src}
                  alt={selectedOffer.title}
                  className='mr-2 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 object-contain'
                  fill
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
                <p className='text-red-300 text-sm mb-4 text-center'>{error}</p>
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
        )}
      </div>
    </div>
  );
};
