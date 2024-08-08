"use client"
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import locationIcon from '../../../assets/location.svg';
import wallet from '../../../assets/wallet.svg';
import ApplicationForm from '../../components/Career/ApplicationForm';
import { Job } from '../../types';


const JobDetails: React.FC<{ job: Job }> = ({
  job: {
    id,
    title,
    location,
    created_at,
    descp,
    job_mode,
    job_type,
    package: money,
    responsibilities,
    qualifications,
    skills,
  },
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isApplyJobButtonDisable, setIsApplyJobButtonDisable] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleApplyClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsApplyJobButtonDisable(true);
    }
  }, [showForm, formRef.current]);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='xl:text-7xl md:text-5xl text-3xl font-bold'>{title}</h1>
        <p className='text-lg'>
          {location} | {dayjs(created_at).format('DD/MMM/YYYY')}
        </p>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>About the job</h2>
        <p className='text-lg'>{descp}</p>
      </div>
      <div className='flex justify-between items-start md:flex-row flex-col'>
        <div className='flex flex-col md:w-1/2 w-full gap-8 mb-12 md:mb-0'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Responsibilties</h2>
            <div className='text-lg'>
              <ul className='list-disc'>
                {responsibilities?.map((t, i) => (
                  <li className='ml-6' key={i}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Required Qualification</h2>
            <div className='text-lg'>
              <ul className='list-disc'>
                {qualifications?.map((t, i) => (
                  <li className='ml-6' key={i}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col gap-4 md:w-[70%]'>
            <h2 className='text-2xl font-bold'>Skills</h2>
            <div className='flex flex-wrap gap-4'>
              {skills?.map((s, i) => (
                <div
                  className='border text-orange-500 border-orange-500 rounded-3xl px-2 py-1'
                  key={i}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='md:w-fit w-full rounded-md shadow-md flex flex-col px-12 py-4 gap-4'>
          <div className='flex gap-2 items-center'>
            <div className=''>
              <Image src={locationIcon} alt='location' />
            </div>
            <p className='text-lg'>
              {location}, {job_mode} | {job_type}
            </p>
          </div>
          <div className='flex gap-2 items-center'>
            <div className=''>
              <Image src={wallet} alt='wallet' />
            </div>
            <p className='text-lg font-bold'>{money}</p>
          </div>
          <button
            className='flex rounded-3xl px-6 disabled:bg-gray-400 disabled:cursor-not-allowed bg-orange-500 text-white py-1 text-lg justify-center'
            onClick={handleApplyClick}
            disabled={isApplyJobButtonDisable}
          >
            Apply for this job
          </button>
        </div>
      </div>
      {showForm && (
        <div ref={formRef}>
          <ApplicationForm jobId={id} />
        </div>
      )}
    </div>
  );
};

export default JobDetails;