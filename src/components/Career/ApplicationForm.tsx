'use client';

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { AppliedJob } from '../../types';
import { AppliedJobDefaultFormValues } from '../../utils/constant';
import { createAppliedJob } from '../../utils/db';
import { uploadResume } from '../../utils/uploadApi';

const ApplicationForm: React.FC<{ jobId: number }> = ({ jobId }) => {
  const [initialValues, setInitialValues] = useState<AppliedJob>(
    AppliedJobDefaultFormValues
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isError, setIsError] = useState<string>('');
  const resumeFileInputRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInitialValues({ ...initialValues, [name]: value });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formData.append('file', e.target.files[0])
      formData.append('folder', 'AdminNextloop/Resumes')

      try {
        setIsUploading(true);
        const response = await uploadResume(formData);

        if (response.data && Object.keys(response.data).length) {
          const { fileId, url } = response.data;
          setInitialValues((prevValues) => ({
            ...prevValues,
            resume_id: fileId,
            resume_url: url,
          }));
        }
      } catch (error) {
        setIsError('Failed to upload resume. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const payload: AppliedJob = { ...initialValues, job_id: jobId };

      const { success } = await createAppliedJob(payload);

      if (!success)
        return setIsError(
          'We are currently facing some technical issue, Try later!'
        );

      setFeedback('Thankyou for applying!');
      setInitialValues(AppliedJobDefaultFormValues);

      if (resumeFileInputRef.current) {
        resumeFileInputRef.current.value = '';
      }
    } catch (error) {
      setIsError('Server Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='md:max-w-[50%] w-full flex flex-col space-y-6 '
    >
      <h2 className='text-2xl text-orange-500 font-bold mb-4'>
        Submit Your Application
      </h2>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          <span className='text-red-500'>*</span> Name:
          <input
            type='text'
            name='fullname'
            value={initialValues.fullname}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={100}
            className='mt-1 p-3 form-input'
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          <span className='text-red-500'>*</span> Email:
          <input
            type='email'
            name='email'
            value={initialValues.email}
            onChange={handleChange}
            required
            className='mt-1 p-3 form-input'
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          <span className='text-red-500'>*</span> Phone:
          <input
            type='tel'
            name='phone'
            value={initialValues.phone}
            onChange={handleChange}
            pattern='[6-9]{1}[0-9]{9}'
            title='Must be 10 digits and start between 6-9'
            className='mt-1 p-3 form-input'
            maxLength={10}
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          <span className='text-red-500'>*</span> Resume:
          <input
            type='file'
            name='resume'
            accept='.pdf'
            onChange={handleFileChange}
            required
            ref={resumeFileInputRef}
            className='mt-1 block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          <span className='text-red-500'>*</span> LinkedIn:
          <input
            type='text'
            name='linkedin_url'
            value={initialValues.linkedin_url}
            onChange={handleChange}
            required
            className='mt-1 p-3 form-input'
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          Cover Letter:
          <textarea
            name='cover_letter'
            value={initialValues.cover_letter}
            onChange={handleChange}
            className='mt-1 p-3 form-input'
            minLength={3}
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          Github:
          <input
            type='text'
            name='github_url'
            value={initialValues.github_url}
            onChange={handleChange}
            className='mt-1 p-3 form-input'
          />
        </label>
      </div>
      <div className='mb-4'>
        <label className='form-label mb-2'>
          <span className='text-red-500'>*</span> Experience:
          <select
            name='experience'
            value={initialValues.experience}
            onChange={handleChange}
            required
            className='mt-1 p-3 form-input'
          >
            <option value='0-1'>0-1 years</option>
            <option value='1-3'>1-3 years</option>
            <option value='3-5'>3-5 years</option>
            <option value='5+'>5+ years</option>
          </select>
        </label>
      </div>
      <button
        type='submit'
        disabled={isLoading || isUploading}
        className={`w-full py-2 px-4 rounded-md ${
          isLoading || isUploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-white transition duration-200'
        }`}
      >
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </button>
      {feedback ? (
        <p className='mt-4 text-green-500'>{feedback}</p>
      ) : (
        <p className='mt-4 text-red-500'>{isError}</p>
      )}
    </form>
  );
};

export default ApplicationForm;
