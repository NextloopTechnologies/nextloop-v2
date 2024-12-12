import dynamic from 'next/dynamic';
import Link from 'next/link';

const Layout = dynamic(() => import('../components/Layout/Layout'), {
  ssr: false,
});

export default function Custom404() {
  return (
    <>
      <Layout>
        <div className='flex flex-col items-center justify-center h-screen text-center bg-gray-100'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            404 - Page Not Found
          </h1>
          <p className='text-lg text-gray-600 mb-8'>
            Oops! The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className='flex flex-col space-y-4'>
            <Link
              href='/'
              className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700'
            >
              Back to Home
            </Link>
            <Link
              href='/about-us'
              className='px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300'
            >
              About Us
            </Link>
            <Link
              href='/blog'
              className='px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300'
            >
              Blog
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
