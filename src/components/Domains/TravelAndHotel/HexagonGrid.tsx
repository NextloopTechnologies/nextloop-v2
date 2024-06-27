import type { NextPage } from "next";
import Image, { StaticImageData } from "next/image";

import { PolygonInner, PolygonOuter } from "../../../../assets";

export type HexagonGridType = {
  title: string;
  descp: string;
  icon: StaticImageData;
};

const HexagonGrid: NextPage<HexagonGridType> = ({
  title,
  descp,
  icon
}) => {
  return (
    <div
      className="relative w-[362px] h-[362px] text-center"
    >
      <Image
        className="absolute top-[0px] left-[0px] rounded w-full h-full z-[2]"
        alt="Indicators-image"
        src={PolygonOuter}
      />
      <div className="absolute w-[calc(100%_-_18px)] top-[9px] right-[9px] left-[9px] h-[344px]">
        <Image
          className="absolute top-[0px] left-[0px] rounded w-full h-full z-[3]"
          alt="Dots-image"
          src={PolygonInner}
        />
        <Image
          className="absolute top-[52px] left-[148px] w-12 h-12 overflow-hidden z-[4]"
          loading="lazy"
          alt="chartline-image"
          src={icon}
        />
        <div className="relative top-[117px] z-[4] p-4">
          <h3 className="leading-none font-bold text-lg uppercase mb-3">
            {title}
          </h3>
          <p className="leading-[22px] text-[#1D1D1D]">
            {descp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HexagonGrid;

