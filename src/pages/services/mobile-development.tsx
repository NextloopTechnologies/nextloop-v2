import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ServicePage from './BaseServicePages';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const MobileDevelopment = () => {
  return <ServicePage {...servicesSubPagesData?.mobileAppDevelopment} />;
};

export default MobileDevelopment;
