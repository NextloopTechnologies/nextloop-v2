/* eslint-disable @next/next/no-img-element */

import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaXTwitter } from 'react-icons/fa6';

import Layout from '../../components/Layout/Layout';
import { BlogType } from '../../types';
import supabaseClient from '../../utils/client';

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
    <aside className='bg-white border-2 border-orange-500 rounded-lg overflow-hidden  w-56 shrink-0'>
      {/* Orange header */}
      <div className='bg-orange-500 text-white text-[0.7rem] font-bold tracking-widest uppercase px-3 py-2'>
        TABLE OF CONTENTS
      </div>

      {/* Links */}
      <ul className='list-none m-0 px-2 py-2 flex flex-col gap-0.5  custom-scrollbar'>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{ paddingLeft: `${6 + (item.level - 2) * 10}px` }}
              className={`flex items-start gap-1.5 py-1.5 pr-2 text-[0.73rem] leading-snug rounded no-underline transition-all duration-150
                ${
                  activeId === item.id
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

const AuthorSection: React.FC<{ blog: BlogType }> = ({ blog }) => {
  if (!blog?.author || !blog.author.name) return null;
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog.title || 'Check out this blog!');

    let shareUrl = '';

    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
    }

    if (shareUrl) {
      // window.open(shareUrl, '_blank', 'width=600,height=400');
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className='flex flex-col gap-4 mt-6'>
      {/* The Author Card */}
      <div className='bg-[#f9f9f9] p-5 rounded-lg w-56 shrink-0'>
        <h3 className='text-orange-500 font-bold text-lg mb-4'>The Author</h3>

        <div className='flex justify-between items-start mb-4'>
          <div>
            <h4 className='font-bold text-black text-sm'>{blog.author.name}</h4>
            <p className='text-gray-500 italic text-xs'>
              {blog.author.designation}
            </p>
          </div>

          {blog.author.profile && (
            <a
              href={blog.author.profile}
              target='_blank'
              rel='noreferrer'
              className='bg-[#0a66c2] p-1 rounded inline-block'
            >
              <Linkedin size={16} color='white' />
            </a>
          )}
        </div>

        {blog.author.description && (
          <p className='text-gray-700 text-xs leading-relaxed'>
            {blog.author.description}
          </p>
        )}
      </div>

      {/* Share Article Card */}
      <div className='bg-[#f9f9f9] p-5 rounded-lg w-56 shrink-0'>
        <h3 className='text-orange-500 font-bold text-[1rem] mb-4'>
          Share this article:
        </h3>
        <div className='flex gap-3'>
          <button
            onClick={() => handleShare('facebook')}
            className='bg-[#333333] p-2 rounded-full hover:bg-orange-500 transition-colors'
          >
            <Facebook size={18} color='white' />
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            className='bg-[#333333] p-2 rounded-full hover:bg-orange-500 transition-colors'
          >
            <Linkedin size={18} color='white' />
          </button>

          <button
            onClick={() => handleShare('twitter')}
            className='bg-[#333333] p-2 rounded-full hover:bg-orange-500 transition-colors'
          >
            <FaXTwitter size={18} color='white' />
          </button>

          <a
            href='#'
            className='bg-[#333333] p-2 rounded-full hover:bg-orange-500 transition-colors'
          >
            <Instagram size={18} color='white' />
          </a>
        </div>
      </div>
    </div>
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
      <Layout headerColor='text-black'>
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
    <Layout headerColor='text-black'>
      <div className='bg-white min-h-screen pb-16  lg:mt-11'>
        <div className='max-w-4xl mx-auto px-4 pt-8 text-center'>
          {/* Category Badge */}
          {data.categories?.name && (
            <span className='inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4'>
              {data.categories.name}
            </span>
          )}
          <h1 className='text-2xl md:text-3xl lg:text-[2rem] font-extrabold leading-tight text-gray-900'>
            {data.title}
          </h1>
          <MetaRow publishedAt={publishedAt} />
        </div>

        {data.image?.[0]?.url && (
          <div className='max-w-7xl mx-auto px-4 mb-6'>
            <div className=' overflow-hidden shadow-md'>
              {/* <div className='w-full h-[400px] relative'> */}
              <div className='w-full aspect-video relative'>
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
          <div className='hidden md:flex flex-col gap-6  w-56 shrink-0'>
            {tocItems.length > 0 && (
              <TableOfContents items={tocItems} activeId={activeId} />
            )}
            {data && <AuthorSection blog={data} />}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='ql-snow'>
              <div
                className='ql-editor !p-0 prose prose-sm md:prose-base max-w-none
                [&_p]:!my-4
                prose-headings:mt-0
                prose-headings:mb-1
                [&_p:has(> br:only-child)]:hidden
                 prose-headings:text-gray-900
                 prose-a:text-blue-600
                 prose-a:no-underline
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
    .select('*,author(*), categories(*)')
    .eq('status', 'published')
    .filter('slug', 'eq', params?.slug)
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
