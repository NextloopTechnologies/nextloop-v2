import React, { useEffect, useState } from 'react';

import ServicePage from './BaseServicePages';
import { BlogData } from '../../types';
import { fetchLatestBlogs } from '../../utils/fetchBlogdata';
import { servicesSubPagesData } from '../../utils/staticTextImgData';

const initialData = {
  ...servicesSubPagesData.webDevelopment,
  blogData: [] as BlogData[],
  schemaKey: 'service-web-app' as const,
};

const WebDevelopment: React.FC = () => {
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

export default WebDevelopment;
