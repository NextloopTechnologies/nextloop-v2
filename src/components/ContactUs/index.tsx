import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { staticAssests } from '../../../assets';
// import { ContactArrow, ContactUs as ContactImage } from '../../../assets';


const ContactUs: FC = () => {
  const router = useRouter();
  return (
    <>
      <div
        className='image-container relative'
        onClick={() => router.push('#footer')}
      >
        <Image
          src={staticAssests.general.contactUs}
          width={150}
          height={150}
          alt='image'
          className='rotating-image'
        />
        <Image
          src={staticAssests.general.contactArrow}
          width={40}
          height={40}
          alt='image'
          className=' absolute top-14 left-14'
        />
      </div>
    </>
  );
};

export default ContactUs;
