/* eslint-disable no-useless-catch */
import supabaseClient from './client';
import { AppliedJob, EnquiryType } from '../types';

export const createAppliedJob = async (values: AppliedJob) => {
  try {
    const { error } = await supabaseClient.from('applied_jobs').insert(values);

    if (!error) return { success: true, msgText: 'Created!', status: 201 };
    return { success: false, msgText: 'Failed to create!', status: 500 };
  } catch (error) {
    throw error;
  }
};

export const createInquiryForm = async (values: EnquiryType) => {
  try {
    const { error } = await supabaseClient.from('enquiry').insert(values);

    if (!error) return { success: true, msgText: 'Created!', status: 201 };
    return { success: false, msgText: 'Failed to create!', status: 500 };
  } catch (error) {
    throw error;
  }
};
