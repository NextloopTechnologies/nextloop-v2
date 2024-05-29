import Image, { StaticImageData } from 'next/image';
import React from 'react';

type ServiceBoxProps = {
  icon: StaticImageData;
  title: string;
  descp: string;
}

type ProductServicesProps = {
  title: React.ReactNode;
  data: ServiceBoxProps[];
}

const ServiceBox: React.FC<ServiceBoxProps> = ({
  title,
  descp,
  icon
}) => {
  return (
    <div 
      className="relative flex flex-col bg-white rounded-lg"
      style={{ boxShadow: '0px 1px 10px 1px #0000001A' }}
    >
      <div className='absolute left-[-70px] top-1/2 transform -translate-y-1/2'>
        <Image 
          src={icon} 
          height={110} 
          width={110} 
          quality={100}
          alt='tools-icon' 
        />
      </div>
      <div className="pl-14 py-8 mx-2">
        <h3 className="text-[#1D1D1D] text-xl font-medium mb-4 uppercase">{title}</h3>
        <p className="text-[#1D1D1D] mb-2">{descp}</p>
      </div>
    </div>
  )
}

const ProductServices: React.FC<ProductServicesProps> = ({
  title,
  data
}) => {
  return (
    <div className='bg-[#1D1D1D0D] py-[100px] px-[80px]'>
      <div className="mb-14">{ title }</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[85px]">
        {data?.map(({ descp, icon, title }, index: number) => (
          <ServiceBox
            key={index}
            descp={descp}
            icon={icon}
            title={title}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductServices;