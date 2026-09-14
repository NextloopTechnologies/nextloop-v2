import { StaticImageData } from 'next/image';

export const getStaticImageData = (url: string): StaticImageData =>
  url as unknown as StaticImageData;
