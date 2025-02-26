'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import AngularIcon from '../../assets/techstackIcons/AngularIcon.png';
import Html5Icon from '../../assets/techstackIcons/Html5Icon.png';
import ReactIcon from '../../assets/techstackIcons/ReactIcon.png';
import StencilIcon from '../../assets/techstackIcons/StencilIcon.png';
import SvelteIcon from '../../assets/techstackIcons/SvelteIcon.png';
import VueIcon from '../../assets/techstackIcons/VueIcon.png';

interface TechItem {
  name: string;
  image: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techStackData: TechCategory[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'AngularJS', image: AngularIcon.src },
      { name: 'React', image: ReactIcon.src },
      { name: 'Vue.js', image: VueIcon.src },
      { name: 'HTML5', image: Html5Icon.src },
      { name: 'Stencil', image: StencilIcon.src },
      { name: 'Svelte', image: SvelteIcon.src },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', image: '/images/node.png' },
      { name: 'Django', image: '/images/django.png' },
      { name: 'Ruby on Rails', image: '/images/rails.png' },
      { name: 'Spring Boot', image: '/images/spring.png' },
    ],
  },
  {
    title: 'Database',
    items: [
      { name: 'PostgreSQL', image: '/images/postgresql.png' },
      { name: 'MongoDB', image: '/images/mongodb.png' },
      { name: 'MySQL', image: '/images/mysql.png' },
      { name: 'Firebase', image: '/images/firebase.png' },
    ],
  },
  {
    title: 'Version Control',
    items: [
      { name: 'Git', image: '/images/git.png' },
      { name: 'GitHub', image: '/images/github.png' },
      { name: 'GitLab', image: '/images/gitlab.png' },
      { name: 'Bitbucket', image: '/images/bitbucket.png' },
    ],
  },
];

const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Frontend');

  return (
    <section className='flex flex-col py-16 px-4 md:px-16 text-center bg-black text-white'>
      <h3 className='text-3xl md:text-4xl font-bold'>
        OUR <span className='text-orange-500'>TECHSTACK</span>
      </h3>
      <p className='text-gray-400 mt-4'>
        Founded in 2020 with a vision of driving the loop towards new age
        technologies.
      </p>
      <div className='flex justify-center mt-6 border-b border-gray-600'>
        {techStackData.map((category) => (
          <button
            key={category.title}
            className={`px-4 py-2 text-lg font-medium ${
              activeTab === category.title
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>
      <div className='flex flex-wrap justify-center gap-6 mt-10'>
        {techStackData
          .find((category) => category.title === activeTab)
          ?.items.map((item) => (
            <div
              key={item.name}
              className='p-6 bg-gray-500 rounded-lg shadow-md flex flex-col items-center'
            >
              <div className='w-16 h-16 relative'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                />
              </div>
              {/* <p className='mt-2 text-white font-medium'>{item.name}</p> */}
            </div>
          ))}
      </div>
    </section>
  );
};

export default TechStack;
