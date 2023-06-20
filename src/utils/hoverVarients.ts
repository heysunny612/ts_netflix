import { Variants } from 'framer-motion';

export const imgVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: { delay: 0.3 },
    y: -10,
  },
};

export const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.3 },
  },
};
