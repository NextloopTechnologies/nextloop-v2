import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ServicePage from './BaseServicePages';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const CustomSoftwareDevelopment = () => {
  return <ServicePage {...servicesSubPagesData?.customSoftwareDevelopment} />;
};

export default CustomSoftwareDevelopment;
