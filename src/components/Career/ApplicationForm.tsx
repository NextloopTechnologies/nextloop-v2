"use client"

import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { uploadResume } from '../../utils/uploadApi'
import { createAppliedJob } from '../../utils/db'
import { AppliedJob } from '../../types'
import { AppliedJobDefaultFormValues } from '../../utils/constant'

const ApplicationForm: React.FC<{ jobId: number }> = ({
  jobId
}) => {
  const [initialValues, setInitialValues] = useState<AppliedJob>(AppliedJobDefaultFormValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [isError, setIsError] = useState<string>('');
  const resumeFileInputRef = useRef<HTMLInputElement>(null)
  const formData = new FormData();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInitialValues({ ...initialValues, [name]: value });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formData.append('file', e.target.files[0])
      const response = await uploadResume(formData);
      if (response.success) {
        initialValues.resume_id = response.data?.fileId!
        initialValues.resume_url = response.data?.url!
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload: AppliedJob = { ...initialValues, job_id: jobId }
    const { success } = await createAppliedJob(payload);

    if (success) setFeedback("Thankyou for applying!")
    else setIsError('We are currently facing some technical issue, Try later!')

    setInitialValues(AppliedJobDefaultFormValues)
    if (resumeFileInputRef.current) {
      resumeFileInputRef.current.value = ''
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[50%] w-full flex flex-col space-y-6  p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl text-orange-500 font-bold mb-4">Submit Your Application</h2>
      <div className="mb-4">
        <label className="block text-black-700 mb-2">
          Name:
          <input
            type="text"
            name="fullname"
            value={initialValues.fullname}
            onChange={handleChange}
            required
            className="mt-1 p-3 block w-full border border-black-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black-700 mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={initialValues.email}
            onChange={handleChange}
            required
            className="mt-1 p-3 block w-full border border-black-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black-700 mb-2">
          Phone:
          <input
            type="text"
            name="phone"
            value={initialValues.phone}
            onChange={handleChange}
            required
            className="mt-1 p-3 block w-full border border-black-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black-700 mb-2">
          Resume:
          <input
            type="file"
            name="resume"
            accept='.pdf'
            onChange={handleFileChange}
            required
            ref={resumeFileInputRef}
            className="mt-1 block w-full text-sm text-black-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black-700 mb-2">
          Cover Letter:
          <textarea
            name="cover_letter"
            value={initialValues.cover_letter}
            onChange={handleChange}
            required
            className="mt-1 p-3 block w-full border border-black-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black-700 mb-2">
          Github:
          <input
            type="text"
            name="github_url"
            value={initialValues.github_url}
            onChange={handleChange}
            className="mt-1 p-3 block w-full border border-black-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-black-700 mb-2">
          LinkedIn:
          <input
            type="text"
            name="linkedin_url"
            value={initialValues.linkedin_url}
            onChange={handleChange}
            className="mt-1 p-3 block w-full border border-black-700 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
      >
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </button>
      {feedback ? (
        <p className="mt-4 text-green-500">
          {feedback}
        </p>
      ) : (
        <p className="mt-4 text-red-500">
          {isError}
        </p>
      )}
    </form>
  )
}

export default ApplicationForm