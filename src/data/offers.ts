import {
  staticAssests
} from '../../assets';

export interface Offer {
  icon: string;
  title: string;
  description: string;
}

export const offers: Offer[] = [
  {
    icon: staticAssests.general.offerIconCustomSoftwareDevelopment,
    title: 'Custom Software Development',
    description: 'Free On Development For 6 Months',
  },
  {
    icon: staticAssests.general.offerIconCustomSoftwareDevelopment,
    title: 'Custom Software Development',
    description: '10% Off On Development Fee',
  },
  {
    icon: staticAssests.general.offerIconProductSubscription,
    title: 'Product Subscription',
    description: '10% Off On All Products',
  },
  {
    icon: staticAssests.general.offerIconStaffAugmentation,
    title: 'Staff Augmentation',
    description:
      '20% Off On Staff Augmentation For First Month. Up to 10 Developers',
  },
  {
    icon: staticAssests.general.offerIconStaffAugmentation,
    title: 'Staff Augmentation',
    description:
      '25% Off On Staff Augmentation For First Month Up to 5 Developers',
  },
  {
    icon: staticAssests.general.offerIconDigitalMarketing,
    title: 'Digital Marketing',
    description: 'Free Logo Design On Any New Subscription Plan',
  },
  {
    icon: staticAssests.general.offerIconDigitalMarketing,
    title: 'Digital Marketing',
    description: '20% Off On Website Development For Our Old Clients',
  },
];
