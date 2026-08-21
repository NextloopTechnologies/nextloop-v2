import { StaticImageData } from 'next/image';

export const getStaticImageData = (url: string): StaticImageData =>
  url as unknown as StaticImageData;

export const toTitleCase = (text: string = '') =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
