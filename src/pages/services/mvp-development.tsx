import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ServicePage from './BaseServicePages';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const MvpDevelopment = () => {
  return <ServicePage {...servicesSubPagesData?.mvpDevelopment} />;
};

export default MvpDevelopment;
