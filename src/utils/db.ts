import { AppliedJob, EnquiryType, OfferApplicationType } from '../types';

/**
 * Client-side form submission.
 *
 * These used to insert straight into Supabase from the browser with the anon
 * key. They now post to `/api/forms/[kind]`, which validates, verifies the
 * captcha and writes server-side through the content seam.
 *
 * The return shape is unchanged on purpose — `{ success, msgText, status }` —
 * so the four components calling these did not need rewriting around a new
 * contract at the same time as the rest of the cutover.
 */

export interface SubmitResult<T = unknown> {
  success: boolean;
  msgText?: string;
  status?: number;
  data?: T;
}

const post = async <T = unknown>(kind: string, body: unknown): Promise<SubmitResult<T>> => {
  try {
    // The trailing slash matters: `trailingSlash: true` in next.config.mjs
    // applies to API routes too, so posting to /api/forms/x answers 308 and
    // costs every submission an extra round trip.
    const res = await fetch(`/api/forms/${kind}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = (await res.json()) as SubmitResult<T>;
    return { ...json, success: res.ok && json.success !== false };
  } catch (error) {
    console.error('SUBMIT_ERROR', error);
    return { success: false, msgText: 'Network error. Please try again.', status: 0 };
  }
};

export const createAppliedJob = (values: AppliedJob) => post('application', values);

export const createInquiryForm = (values: EnquiryType) => post('enquiry', values);

/** The created row's id is echoed back so /get-offer/ can carry it forward. */
export const createOfferApplications = (values: OfferApplicationType) =>
  post<{ id: number }[]>('offer', values);

export const updateOffer = (id: number, values: OfferApplicationType) =>
  post('offer-select', { ...values, id });

export const submitPopupForm = (values: {
  name: string;
  email: string;
  service: string;
  phone?: string;
  country?: string;
  captchaToken: string | null;
}) => post('popup', values);
