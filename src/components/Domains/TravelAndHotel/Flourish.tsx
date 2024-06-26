import type { NextPage } from "next";
import SliderItems from "./slider-items";


import { EnrollForWebsiteBg } from '../../../../assets'
import PolygonInner from "../../.././../assets/travelandhotel/PolygonInner.png"

import PolygonOuter from "../../.././../assets/travelandhotel/polygonOuter.png"

import travelIcon from "../../.././../assets/travelandhotel/travelIcon.png"

import dynamicIcon from "../../.././../assets/travelandhotel/dynamicIcon.png"

import paymentIcon from "../../.././../assets/travelandhotel/paymentIcon.png"
import pictureIcon from "../../.././../assets/travelandhotel/pictureIcon.png"
import supportIcon from "../../.././../assets/travelandhotel/supportIcon.png"
import languageIcon from "../../.././../assets/travelandhotel/languageIcon.png"
import Image from "next/image";

export type FlourishType = {
  className?: string;
};

const Flourish: NextPage<FlourishType> = ({ className = "" }) => (
  // <section
  //   className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[138px] box-border max-w-full text-center text-66xl text-white mq900:pb-[58px] mq900:box-border mq1275:pb-[90px] mq1275:box-border mq450:pb-[38px] mq450:box-border ${className}`}
  // >
  //   <div className="h-[1570px] flex-1 items-center justify-center relative bg-[#010103] overflow-hidden max-w-full z-[6]">
  // <section
  //   className=""
  // >
  <div className="h-[1570px] relative bg-[#010103]">
    <h1 className='text-white text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center py-14'>
      flourish your <span className='text-orange-500'>travel & hotel</span> business with nextloop technologies
    </h1>
    {/* <div className="absolute top-[0px] left-[0px] w-full h-full text-lg text-black"> */}
    <div className="absolute top-[0px] left-[0px] w-full h-full">
      <Image
        className="absolute top-[396px] left-[0px] w-[1920px] h-[1174px] object-cover z-[1]"
        alt="main bg"
        src={EnrollForWebsiteBg} />

      <SliderItems
        indicators={PolygonOuter}
        dots={PolygonInner}
        dynamicContent="Dynamic content"
        descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
        propLeft="360px"
        uchartLine={dynamicIcon} />

      <SliderItems
        indicators={PolygonOuter}
        dots={PolygonInner}
        dynamicContent="payment gateway integration"
        descp="We can integrate a suitable payment gateway to your website visitor can directly make the payment from your website."
        propLeft="735px"
        uchartLine={paymentIcon} />

      <SliderItems
        indicators={PolygonOuter}
        dots={PolygonInner}
        dynamicContent="make your site picture perfect"
        descp="Inventory make all the difference between showing is better. A great website features easy to book inventories globally."
        uchartLine={pictureIcon}
        propTop="756px"
        propLeft="180px"
        propHeight="32px"
        propMaxHeight="32px"
        propTop1="165px"
        propTop2="57px"
        propOverflow="unset" />

      <SliderItems
        indicators={PolygonOuter}
        dots={PolygonInner}
        dynamicContent="multi language support"
        descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
        uchartLine={languageIcon}
        propTop="756px"
        propLeft="920px"
        propHeight="32px"
        propMaxHeight="32px"
        propTop1="165px"
        propTop2="57px"
        propOverflow="unset" />

      <SliderItems
        indicators={PolygonOuter}
        dots={PolygonInner}
        dynamicContent="travel & hotel website design"
        descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
        uchartLine={travelIcon}
        propTop="1047px"
        propLeft="360px"
        propHeight="45px"
        propMaxHeight="unset"
        propTop1="167px"
        propTop2="57px"
        propOverflow="hidden" />

      <SliderItems
        indicators={PolygonOuter}
        dots={PolygonInner}
        dynamicContent="support"
        descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
        uchartLine={supportIcon}
        propTop="1047px"
        propLeft="738px"
        propHeight="32px"
        propMaxHeight="unset"
        propTop1="152px"
        propTop2="53px"
        propOverflow="hidden" />

      {/* Working Code */}
      {/* 
        <SliderItems
          indicators={PolygonOuter}
          dots={PolygonInner}
          dynamicContent="Dynamic content"
          descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
          propLeft="360px"
          uchartLine={dynamicIcon} />

        <SliderItems
          indicators={PolygonOuter}
          dots={PolygonInner}
          dynamicContent="payment gateway integration"
          descp="We can integrate a suitable payment gateway to your website visitor can directly make the payment from your website."
          propLeft="735px"
          uchartLine={paymentIcon} />

        <SliderItems
          indicators={PolygonOuter}
          dots={PolygonInner}
          dynamicContent="make your site picture perfect"
          descp="Inventory make all the difference between showing is better. A great website features easy to book inventories globally."
          uchartLine={pictureIcon}
          propTop="756px"
          propLeft="180px"
          propHeight="32px"
          propMaxHeight="32px"
          propTop1="165px"
          propTop2="57px"
          propOverflow="unset" />

        <SliderItems
          indicators={PolygonOuter}
          dots={PolygonInner}
          dynamicContent="multi language support"
          descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
          uchartLine={languageIcon}
          propTop="756px"
          propLeft="920px"
          propHeight="32px"
          propMaxHeight="32px"
          propTop1="165px"
          propTop2="57px"
          propOverflow="unset" />

        <SliderItems
          indicators={PolygonOuter}
          dots={PolygonInner}
          dynamicContent="travel & hotel website design"
          descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
          uchartLine={travelIcon}
          propTop="1047px"
          propLeft="360px"
          propHeight="45px"
          propMaxHeight="unset"
          propTop1="167px"
          propTop2="57px"
          propOverflow="hidden" />

        <SliderItems
          indicators={PolygonOuter}
          dots={PolygonInner}
          dynamicContent="support"
          descp="It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors."
          uchartLine={supportIcon}
          propTop="1047px"
          propLeft="738px"
          propHeight="32px"
          propMaxHeight="unset"
          propTop1="152px"
          propTop2="53px"
          propOverflow="hidden" /> */}



      {/* <div className="absolute top-[466px] left-[738px] w-[362px] h-[362px]">
          <Image
            className="absolute top-[0px] left-[0px] rounded w-full h-full z-[4]"
            alt=""
            src={PolygonOuter}
          />
          <div className="absolute w-[calc(100%_-_18px)] top-[9px] right-[9px] left-[9px] h-[344px]">
            <Image
              className="absolute top-[0px] left-[0px] rounded w-full h-full z-[5]"
              alt=""
              src={PolygonInner}
            />
            <b className="absolute top-[117px] left-[38px] leading-[20px] uppercase inline-block w-[268px] h-11 z-[6]">
              payment gateway integration
            </b>
            <div className="absolute top-[167px] left-[38px] text-base leading-[22px] text-gray-400 inline-block w-[268px] h-[97px] z-[6]">
              <p className="m-0">
                <span className="capitalize">{`we `}</span>
                <span className="lowercase">
                  can integrate a suitable payment gateway to your website
                  visitor
                </span>
              </p>
              <p className="m-0 lowercase"> can directly make the payment</p>
              <p className="m-0 lowercase">from your website.</p>
            </div>
            <Image
              className="absolute top-[53px] left-[148px] w-12 h-12 overflow-hidden z-[6]"
              loading="lazy"
              alt=""
              src={paymentIcon}
            />
          </div>
        </div> */}


      {/* <div className="absolute top-[756px] left-[180px] w-[362px] h-[362px]">
          <Image
            className="absolute top-[0px] left-[0px] rounded w-full h-full z-[5]"
            alt=""
            src={PolygonOuter}
          />
          <div className="absolute w-[calc(100%_-_18px)] top-[9px] right-[9px] left-[9px] h-[344px]">
            <Image
              className="absolute top-[0px] left-[0px] rounded w-full h-full z-[6]"
              alt=""
              src={PolygonInner}
            />
            <b className="absolute top-[117px] left-[86px] leading-[20px] uppercase inline-block w-[172px] h-8 max-h-[32px] z-[7]">
              make your site picture perfect
            </b>
            <div className="absolute top-[165px] left-[38px] text-base leading-[22px] text-gray-400 inline-block w-[268px] h-[102px] z-[7]">
              <span className="capitalize">{`inventory `}</span>
              <span className="lowercase">
                make all the difference between showing is bett
              </span>
              <span className="capitalize">{`er. A `}</span>
              <span className="lowercase">
                great website features easy to book inventories globally.
              </span>
            </div>
            <Image
              className="absolute top-[53px] left-[148px] w-12 h-12 overflow-hidden z-[7]"
              alt=""
              src={pictureIcon}
            />
          </div>
        </div> */}
    </div>
  </div>
  // </section>
);

export default Flourish;

