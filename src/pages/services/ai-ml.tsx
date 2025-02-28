import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ServicePage from './BaseServicePages';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const AIMLSolutions = () => {
  return <ServicePage {...servicesSubPagesData?.aimlSolutions} />;
};

export default AIMLSolutions;
