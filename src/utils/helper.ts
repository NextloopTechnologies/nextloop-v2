import { StaticImageData } from 'next/image';

export const getStaticImageData = (url: string): StaticImageData =>
  url as unknown as StaticImageData;

export const toTitleCase = (text = ''): string => {
  if (typeof text !== 'string' || !text.trim()) {
    return '';
  }

  return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};
