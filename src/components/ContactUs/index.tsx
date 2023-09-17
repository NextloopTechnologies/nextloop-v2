import Image from 'next/image';
import React, { FC } from 'react';

import { ContactArrow, ContactUs as ContactImage } from '../../../assets';

const ContactUs: FC = () => {
  return (
    <>
      <div className='image-container relative'>
        <Image
          src={ContactImage}
          width={150}
          height={150}
          alt="image"
          className='rotating-image'
        />
        <Image
          src={ContactArrow}
          width={40}
          height={40}
          alt="image"
          className=' absolute top-14 left-14'
        />
      </div>
    </>
  );
};

export default ContactUs;
