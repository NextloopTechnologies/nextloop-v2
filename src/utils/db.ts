/* eslint-disable no-useless-catch */
import supabaseClient from './client';
import { AppliedJob, EnquiryType, OfferApplicationType } from '../types';

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

// onsubmit of form click and pass customer id to special offer page
export const createOfferApplications = async (values: OfferApplicationType) => {
  try {
    const { error, data } = await supabaseClient
      .from('offer_applications')
      .insert(values)
      .select();

    if (!error)
      return { success: true, msgText: 'Created!', data, status: 201 };
    return { success: false, msgText: 'Failed to create!', status: 500 };
  } catch (error) {
    throw error;
  }
};

// onsubmit of form click call this and show data for special offers page
export const getAllOffers = async () => {
  try {
    const { data, error } = await supabaseClient.from('offers').select();
    if (!error) return { success: true, data, status: 201 };
    return { success: false, msgText: 'Not Found', status: 500 };
  } catch (error) {
    throw error;
  }
};

//onclick take offer id and customer id and update
export const updateOffer = async (id: number, values: OfferApplicationType) => {
  try {
    const { error, data } = await supabaseClient
      .from('offer_applications')
      .update(values)
      .eq('id', id)
      .select();

    if (!error)
      return { success: true, msgText: 'Created!', data, status: 201 };
    return { success: false, msgText: 'Failed to create!', status: 500 };
  } catch (error) {
    throw error;
  }
};
