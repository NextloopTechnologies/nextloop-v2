import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ServicePage from './BaseServicePages';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const CloudServices = () => {
  return <ServicePage {...servicesSubPagesData?.cloudServices} />;
};

export default CloudServices;
