import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { ContactUs as ContactImage } from '../../../assets';

const ContactUs: FC = () => {
  const router = useRouter();
  return (
    <>
      <div
        className='image-container relative'
        onClick={() => router.push('#footer')}
      >
        <Image
          src={ContactImage}
          width={150}
          height={150}
          alt='image'
          className='rotating-image'
        />
        <MoveRight className='object-cover text-orange-500 absolute top-14 left-14' size={40} />
      </div>
    </>
  );
};

export default ContactUs;
