import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Error404Svg } from '../../assets/SvgExport';

const Layout = dynamic(() => import('../components/Layout/Layout'), {
  ssr: false,
});

export default function Custom404() {
  return (
    <>
      <Layout>
        <div className='flex flex-col items-center justify-center h-screen text-center bg-gray-400 py-16'>
          <Error404Svg />
          <h2 className='text-4xl font-bold text-white mb-4'>
            404 - Page Not Found
          </h2>
          <p className='text-lg text-white mb-8'>
            Oops! The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className='flex flex-col space-y-4'>
            <Link
              href='/'
              className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
