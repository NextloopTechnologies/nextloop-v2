import Image, { StaticImageData } from "next/image";

import HexagonGrid from "./HexagonGrid";
import { dynamicIcon, EnrollForWebsiteBg, languageIcon, paymentIcon, pictureIcon, supportIcon, travelIcon } from '../../../../assets'

const content: { title: string; descp: string; icon: StaticImageData }[] = [
  {
    title: "Dynamic content",
    descp: "It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors.",
    icon: dynamicIcon
  },
  {
    title: "payment gateway integration",
    descp: "We can integrate a suitable payment gateway to your website visitor can directly make the payment from your website.",
    icon: paymentIcon
  },
  {
    title: "make your site picture perfect",
    descp: "Inventory make all the difference between showing is better. A great website features easy to book inventories globally.",
    icon: pictureIcon
  },
  {
    title: "multi language support",
    descp: "It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors.",
    icon: languageIcon
  },
  {
    title: "travel & hotel website design",
    descp: "It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors.",
    icon: travelIcon
  },
  {
    title: "support",
    descp: "It’s good to have an admin panel based on tour and travel packaging, in a dynamic content website you can show personalized content to your website visitors.",
    icon: supportIcon
  }
]

const FlourishBusiness = () => (
  <div className="h-full relative bg-[#010103]">
    <h1 className='text-white text-3xl md:text-5xl lg:text-7xl xl:text-[85px] uppercase font-bold text-center py-14'>
      flourish your <span className='text-orange-500'>travel & hotel</span> business with nextloop technologies
    </h1>
    <div className="relative w-full h-full py-10">
      <Image
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        alt="main bg"
        src={EnrollForWebsiteBg} />
      <div className="relative flex flex-col justify-center items-center z-[2] gap-y-6 py-3 px-2 lg:flex-row lg:gap-10 olg:gap-6 olg:py-24">
        {content.slice(0, 2).map(({ title, descp, icon }, idx) => (
          <HexagonGrid
            key={idx}
            title={title}
            descp={descp}
            icon={icon}
          />
        ))}
      </div>
      <div className="relative flex flex-col justify-center items-center gap-y-6 py-3 px-2 z-[2] olg:py-0 lg:flex-row lg:gap-10 olg:-top-[163px] olg:gap-[400px]">
        {content.slice(2, 4).map(({ title, descp, icon }, idx) => (
          <HexagonGrid
            key={idx}
            title={title}
            descp={descp}
            icon={icon}
          />
        ))}
      </div>
      <div className="relative flex flex-col justify-center items-center gap-y-6 py-3 px-2 pb-4 z-[2] olg:py-0 lg:flex-row lg:gap-10 olg:-top-[230px] olg:gap-6">
        {content.slice(4, 6).map(({ title, descp, icon }, idx) => (
          <HexagonGrid
            key={idx}
            title={title}
            descp={descp}
            icon={icon}
          />
        ))}
      </div>
    </div>
  </div>
);

export default FlourishBusiness;

