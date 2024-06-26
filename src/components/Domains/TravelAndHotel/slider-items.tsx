import type { NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import { useMemo, type CSSProperties } from "react";

export type SliderItemsType = {
  className?: string;
  indicators?: StaticImageData;
  dots?: StaticImageData;
  dynamicContent?: string;
  descp: string;
  uchartLine?: StaticImageData;

  /** Style props */
  propTop?: CSSProperties["top"];
  propLeft?: CSSProperties["left"];
  propHeight?: CSSProperties["height"];
  propMaxHeight?: CSSProperties["maxHeight"];
  propTop1?: CSSProperties["top"];
  propTop2?: CSSProperties["top"];
  propOverflow?: CSSProperties["overflow"];
};

const SliderItems: NextPage<SliderItemsType> = ({
  className = "",
  indicators,
  dots,
  dynamicContent,
  descp,
  uchartLine,
  propTop,
  propLeft,
  propHeight,
  propMaxHeight,
  propTop1,
  propTop2,
  propOverflow,
}) => {
  const sliderItemsStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop,
      left: propLeft,
    };
  }, [propTop, propLeft]);

  const dynamicContentStyle: CSSProperties = useMemo(() => {
    return {
      height: propHeight,
      maxHeight: propMaxHeight,
    };
  }, [propHeight, propMaxHeight]);

  const itsGoodToContainerStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop1,
    };
  }, [propTop1]);

  const uchartLineIconStyle: CSSProperties = useMemo(() => {
    return {
      top: propTop2,
      overflow: propOverflow,
    };
  }, [propTop2, propOverflow]);

  return (
    <div
      className={`absolute top-[466px] left-[611px] w-[362px] h-[362px] text-center ${className}`}
      style={sliderItemsStyle}
    >
      <Image
        className="absolute top-[0px] left-[0px] rounded w-full h-full z-[2]"
        alt="Indicators-image"
        src={indicators!}
      />
      <div className="absolute w-[calc(100%_-_18px)] top-[9px] right-[9px] left-[9px] h-[344px]">
        <Image
          className="absolute top-[0px] left-[0px] rounded w-full h-full z-[3]"
          alt="Dots-image"
          src={dots!}
        />
        <Image
          className="absolute top-[52px] left-[148px] w-12 h-12 overflow-hidden z-[4]"
          loading="lazy"
          alt="chartline-image"
          src={uchartLine!}
        // style={uchartLineIconStyle}
        />
        <div className="relative top-[117px] z-[4] p-4">
          <h3 className="leading-none font-bold text-lg uppercase mb-3">
            {dynamicContent}
          </h3>
          <p className="leading-[22px] text-[#1D1D1D]">
            {descp}
          </p>
        </div>
        {/* <h3 className="relative top-[117px] flex items-center justify-center leading-none font-bold text-lg uppercase inline-block z-[4]">
          {dynamicContent}
        </h3>
        <p className="relative top-[117px] flex items-center justify-center leading-[22px] text-[#1D1D1D] z-[4]">
          {descp}
        </p> */}
        {/* <b
          className="absolute top-[117px] left-[86px] leading-[18px] uppercase inline-block w-[172px] h-8 z-[4]"
          style={dynamicContentStyle}
        >
          {dynamicContent}
        </b> */}
        {/* <div
          className="absolute top-[152px] left-[38px] text-base leading-[22px] text-[#1D1D1D] inline-block w-[268px] h-[122px] z-[4]"
          style={itsGoodToContainerStyle}
        >
          <span className="capitalize">{`It’s `}</span>
          <span className="lowercase">
            good to have an admin panel based on tour and travel packaging, in a
            dynamic content website you can show personalized content to your
            website visitors.
          </span>
        </div> */}

      </div>
    </div>
  );
};

export default SliderItems;

