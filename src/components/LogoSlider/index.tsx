import Image, { StaticImageData } from "next/image";

import styles from "./LogoSlider.module.css";

interface LogoSlideProps {
  logos?: StaticImageData[];
}

const LogoSlide = ({ logos = [] }: LogoSlideProps) => {
  if (!logos.length) return null;

  return (
    <div className="w-full overflow-hidden py-2 sm:py-3 md:py-3">
      <div className={styles.marquee}>
        {[...logos, ...logos].map((src, index) => (
          <div
            key={index}
            className=" relative flex-shrink-0 h-[50px] w-[100px] sm:h-[40px] sm:w-[60px] md:h-[70px] md:w-[120px] lg:h-[90px] lg:w-[150px] "
          >
            <Image
              src={src}
              alt={`logo-${index}`}
              fill
              className="object-contain"
              priority={index < logos.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSlide;
