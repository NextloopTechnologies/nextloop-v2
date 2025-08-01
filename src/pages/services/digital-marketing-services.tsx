import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ServicePage from './BaseServicePages';
import { servicesSubPagesData } from '../../utils/staticTextImgData';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';

interface BlogData {
  id: number;
  title: string;
  descp: string;
  image: any;
}

const initialData = {
  ...servicesSubPagesData.digitalMarketingServices,
  blogData: [] as BlogData[],
};

const DigitalMarketingServices: React.FC = () => {
  const [pageData, setPageData] = useState(initialData);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const latestBlogs = await fetchLatestBlogs(3);
        if (latestBlogs?.length > 0) {
          setPageData((prev) => ({
            ...prev,
            blogData: latestBlogs,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch latest blogs:', error);
      }
    };

    loadBlogs();
  }, []);

  return <ServicePage {...pageData} />;
};

export default DigitalMarketingServices;
