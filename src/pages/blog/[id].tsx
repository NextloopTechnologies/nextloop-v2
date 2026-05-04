/* eslint-disable @next/next/no-img-element */

import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { BlogType } from '../../types';
import supabaseClient from '../../utils/client';
import blogsBg from '../../../assets/blogs.png';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const MetaRow: React.FC<{ publishedAt?: string; readTime?: string }> = ({
  publishedAt,
}) => (
  <div className='flex flex-wrap items-center justify-center gap-4 mt-3 mb-5'>
    {publishedAt && (
      <span className='flex items-center gap-1.5 text-[#1B1B1B] text-xs font-medium'>
        <svg
          width={12}
          height={12}
          viewBox='0 0 24 24'
          fill='none'
          color='#FA8145'
          stroke='currentColor'
          strokeWidth={2}
        >
          <rect x='3' y='4' width='18' height='18' rx='2' />
          <line x1='16' y1='2' x2='16' y2='6' />
          <line x1='8' y1='2' x2='8' y2='6' />
          <line x1='3' y1='10' x2='21' y2='10' />
        </svg>
        Published on {publishedAt}
      </span>
    )}

    <span className='flex items-center gap-1.5 text-[#1B1B1B] text-xs font-medium'>
      <svg
        width={12}
        height={12}
        viewBox='0 0 24 24'
        fill='none '
        color='#FA8145'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
        <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      </svg>
      Reviewed by NextLoop Team
    </span>
  </div>
);

const TableOfContents: React.FC<{ items: TocItem[]; activeId: string }> = ({
  items,
  activeId,
}) => {
  if (items.length === 0) return null;

  return (
    <aside className='bg-white border-2 border-orange-500 rounded-lg overflow-hidden sticky top-6 w-56 shrink-0'>
      {/* Orange header */}
      <div className='bg-orange-500 text-white text-[0.7rem] font-bold tracking-widest uppercase px-3 py-2'>
        TABLES OF CONTENT
      </div>

      {/* Links */}
      <ul className='list-none m-0 px-2 py-2 flex flex-col gap-0.5'>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{ paddingLeft: `${6 + (item.level - 2) * 10}px` }}
              className={`flex items-start gap-1.5 py-1.5 pr-2 text-[0.73rem] leading-snug rounded no-underline transition-all duration-150
                ${activeId === item.id
                  ? 'font-semibold text-orange-500 bg-orange-100 border-l-2 border-orange-500'
                  : 'font-normal text-gray-600 border-l-2 border-transparent hover:text-orange-500 hover:bg-orange-100'
                }`}
            >
              <svg
                className='mt-0.5 shrink-0'
                width={9}
                height={9}
                viewBox='0 0 24 24'
                fill='none'
                stroke={activeId === item.id ? '#2563eb' : '#9ca3af'}
                strokeWidth={2.5}
              >
                <polyline points='9 18 15 12 9 6' />
              </svg>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

interface BlogIDProps {
  data?: BlogType;
  error?: string;
}

const BlogID: React.FC<BlogIDProps> = ({ data, error }) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [processedHtml, setProcessedHtml] = useState('');

  useEffect(() => {
    if (!data?.descp) return;

    const div = document.createElement('div');
    div.innerHTML = data.descp;
    const items: TocItem[] = [];

    div.querySelectorAll('h1,h2,h3,h4').forEach((el, i) => {
      const id = `toc-heading-${i}`;
      el.id = id;
      items.push({
        id,
        text: el.textContent ?? '',
        level: parseInt(el.tagName.substring(1)),
      });
    });

    setTocItems(items);
    setProcessedHtml(div.innerHTML);
  }, [data?.descp]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
          );
          setActiveId(topMost.target.id);
        } else {
          setActiveId('');
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (error) {
    return (
      <Layout>
        <div className='min-h-[60vh] flex items-center justify-center text-xl text-gray-500'>
          {error}
        </div>
      </Layout>
    );
  }

  if (!data) return null;

  const publishedAt = data.created_at
    ? new Date(data.created_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : undefined;

  return (
    <Layout>
      <PageHero
        image={blogsBg}
        title='blogs'
        subtitle='If you are looking for a complete business solution at a one place in
          combination with distinctive designs, that is what you can expect from
          us. To stimulate the growth of your company, we focus on various
          services, although we do not limit ourselves to this. We keep learning
          and stay ourselves up to date with current market trends.'
      />
      <div className='bg-white min-h-screen pb-16'>
        <div className='max-w-4xl mx-auto px-4 pt-8 text-center'>
          <h1 className='text-2xl md:text-3xl lg:text-[2rem] font-extrabold leading-tight text-gray-900'>
            {data.title}
          </h1>
          <MetaRow publishedAt={publishedAt} />
        </div>

        {data.image?.[0]?.url && (
          <div className='max-w-7xl mx-auto px-4 mb-6'>
            <div className=' overflow-hidden shadow-md'>
              <div className='w-full h-[400px] relative'>
                <Image
                  src={data.image[0].url}
                  alt={data.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 1200px'
                  priority
                />
              </div>
            </div>
          </div>
        )}

        <div className='max-w-7xl mx-auto px-4 flex gap-5 items-start'>
          {tocItems.length > 0 && (
            <div className='hidden md:block'>
              <TableOfContents items={tocItems} activeId={activeId} />
            </div>
          )}

          <div className='flex-1 min-w-0'>
            <div className='ql-snow'>
              <div
                className='ql-editor !p-0 prose prose-sm md:prose-base max-w-none
               prose-headings:text-gray-900
               prose-h2:border-b prose-h2:pb-1
               prose-h3:text-blue-700
               prose-a:text-blue-600
               prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50
               prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
               prose-pre:bg-slate-800 prose-pre:text-gray-100
               prose-img:rounded-lg prose-img:shadow-md'
                dangerouslySetInnerHTML={{
                  __html: processedHtml || data.descp,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogID;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data, error } = await supabaseClient
    .from('blogs')
    .select('*')
    .filter('id', 'eq', params?.id)
    .single();

  if (error) {
    return { props: { error: error.message } };
  }

  return {
    props: {
      data: data ?? null,
    },
  };
};
