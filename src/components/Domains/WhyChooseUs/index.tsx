import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { IWhyChooseUs } from '../../../types';

interface WhyChooseUsProps {
  whyChooseContent: IWhyChooseUs[];
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
 whyChooseContent
}) => {
  return (
    <div className="min-h-screen flex bg-[#1D1D1D0D] py-[96px]">
      <div className="w-full max-w-[1479px] mx-auto">
        <h1 className="text-3xl md:text-8xl uppercase font-bold text-center mb-[80px]">
          Why Choose Us
        </h1>
        <div className="relative flex flex-col items-center pl-[150px]">
          <div className="absolute left-[13%] bg-[#FA8145] pl-[515px] text-white flex flex-col justify-center h-[480px]">
            <div className="absolute -left-[8%] w-[47%] top-[20%] transform -translate-y-[12%]">
              <Image
                src={whyChooseContent?.[0]?.image as StaticImageData}
                alt="why-choose-us"
                className="object-fill"
              />
            </div>
            <h1 className="text-[50px] leading-none font-bold uppercase mb-5">
              {whyChooseContent?.[0]?.title}
            </h1>
            <span className="text-lg">
              {whyChooseContent?.[0]?.descp}
            </span>
          </div>
        </div>
        
        <div className="relative flex flex-col items-center pl-[150px] py-[600px]">
          <div className="absolute right-[13%] bg-[#1D1D1D] pl-[80px] pr-[520px] text-white flex flex-col justify-center h-[480px]">
            <div className="absolute -right-[8%] w-[47%] top-[20%] transform -translate-y-[12%]">
              <Image
                src={whyChooseContent?.[1]?.image as StaticImageData}
                alt="why-choose-us"
                className="object-fill"
              />
            </div>
            <h1 className="text-[50px] leading-none font-bold uppercase mb-5">
              {whyChooseContent?.[1]?.title}
            </h1>
            <span className="text-lg">
              {whyChooseContent?.[1]?.descp}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs

