import { Variants } from 'framer-motion';

export const introHeaderVariants: Variants = {
  hide: {
    opacity: 0,
    x: -500,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2,
    },
  },
};

export const textVariants: Variants = {
  hide: {
    opacity: 0,
    x: -20,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      delay: 0.5,
    },
  },
};

export const imageVariants: Variants = {
  hide: {
    opacity: 0,
    y: 100, // Move the image from the bottom
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const inputFieldVariants = {
  focused: {
    borderBottomColor: 'gray-400',
  },
  unfocused: {
    borderBottomColor: 'transparent',
  },
};

export const introHeaderVariants2: Variants = {
  hide: {
    opacity: 0,
    x: 500,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2,
    },
  },
};

export const introRightHeaderVariants: Variants = {
  hide: {
    opacity: 0,
    x: 500,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 2,
    },
  },
};
