import { contentSource } from './index';
import type { AppliedJob, EnquiryType, OfferApplicationType } from '../../types';

/**
 * The write half of the content seam.
 *
 * Every one of these previously ran **in the browser**, inserting straight into
 * Supabase with the anon key. That is why the anon key had to be public, and
 * why RLS being `FOR ALL TO public USING (true)` was load-bearing rather than
 * an oversight: the site could not function without it. It also meant the popup
 * form's reCAPTCHA was decorative — the token was checked client-side and never
 * sent anywhere, so anything that skipped the UI and posted directly was
 * unaffected by it.
 *
 * These now run server-side only, behind `/api/forms/[kind]`, and follow the
 * same `CONTENT_SOURCE` flag as the reads so one switch moves the whole site.
 *
 * Return shape is deliberately unchanged (`{ success, msgText, status }`) so
 * the components calling them did not have to be rewritten around a new
 * contract at the same time as everything else.
 */

export interface WriteResult {
  success: boolean;
  msgText: string;
  status: number;
  data?: unknown;
}

const ok = (data?: unknown): WriteResult => ({
  success: true,
  msgText: 'Created!',
  status: 201,
  data,
});

const failed = (msgText = 'Failed to create!'): WriteResult => ({
  success: false,
  msgText,
  status: 500,
});

/**
 * Server-only. Importing the Supabase client here would be harmless, but
 * importing Payload's config is not — it drags the admin dependency tree into
 * whatever bundle references it, so both readers stay behind a dynamic import.
 */
const supabase = async () => (await import('../../utils/client')).default;

const payloadClient = async () => {
  const [{ getPayload }, config] = await Promise.all([
    import('payload'),
    import('@payload-config').then((m) => m.default),
  ]);
  return getPayload({ config });
};

// ---------------------------------------------------------------------------
// Enquiries — the contact form
// ---------------------------------------------------------------------------

export const createEnquiry = async (values: EnquiryType): Promise<WriteResult> => {
  if (contentSource === 'payload') {
    const payload = await payloadClient();
    const doc = await payload.create({
      collection: 'enquiries',
      data: {
        fullname: values.fullname,
        email: values.email,
        contact: values.contact,
        subject: values.subject,
        message: values.message,
      },
    });
    return ok({ id: doc.id });
  }

  const client = await supabase();
  const { error } = await client.from('enquiry').insert(values);
  return error ? failed() : ok();
};

// ---------------------------------------------------------------------------
// Applied jobs — the careers form
// ---------------------------------------------------------------------------

export const createAppliedJob = async (values: AppliedJob): Promise<WriteResult> => {
  if (contentSource === 'payload') {
    const payload = await payloadClient();
    const doc = await payload.create({
      collection: 'applied-jobs',
      data: {
        fullname: values.fullname,
        email: values.email,
        phone: values.phone,
        ...(values.job_id ? { job: values.job_id } : {}),
        experience: values.experience || '0-1',
        linkedinUrl: values.linkedin_url,
        githubUrl: values.github_url,
        coverLetter: values.cover_letter,
        // The upload host is still external, so the URL is all we have. Kept in
        // the legacy field rather than pretending it is a Payload upload.
        legacyResumeUrl: values.resume_url,
      },
    });
    return ok({ id: doc.id });
  }

  const client = await supabase();
  const { error } = await client.from('applied_jobs').insert(values);
  return error ? failed() : ok();
};

// ---------------------------------------------------------------------------
// Offer applications — created on /get-offer/, updated on /specialoffers/
// ---------------------------------------------------------------------------

export const createOfferApplication = async (
  values: OfferApplicationType
): Promise<WriteResult> => {
  if (contentSource === 'payload') {
    const payload = await payloadClient();
    const doc = await payload.create({
      collection: 'offer-applications',
      data: {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        companyName: values.company_name,
        ...(values.offer_id ? { offer: values.offer_id } : {}),
      },
    });
    // The client round-trips this id back when the visitor picks an offer.
    return ok([{ id: doc.id }]);
  }

  const client = await supabase();
  const { error, data } = await client.from('offer_applications').insert(values).select();
  return error ? failed() : ok(data);
};

export const selectOffer = async (
  id: number,
  values: OfferApplicationType
): Promise<WriteResult> => {
  if (contentSource === 'payload') {
    const payload = await payloadClient();
    const doc = await payload.update({
      collection: 'offer-applications',
      id,
      data: {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        ...(values.offer_id ? { offer: values.offer_id } : {}),
      },
    });
    return ok([{ id: doc.id }]);
  }

  const client = await supabase();
  const { error, data } = await client
    .from('offer_applications')
    .update(values)
    .eq('id', id)
    .select();
  return error ? failed() : ok(data);
};

// ---------------------------------------------------------------------------
// Popup submissions
// ---------------------------------------------------------------------------

export interface PopupSubmission {
  name: string;
  email: string;
  service: string;
  phone?: string;
  country?: string;
}

export const createPopupSubmission = async (
  values: PopupSubmission
): Promise<WriteResult> => {
  if (contentSource === 'payload') {
    const payload = await payloadClient();
    const doc = await payload.create({
      collection: 'popup-submissions',
      data: {
        name: values.name,
        email: values.email,
        service: values.service,
        phone: values.phone,
        country: values.country,
      },
    });
    return ok({ id: doc.id });
  }

  const client = await supabase();
  const { error } = await client.from('popup_form').insert([values]);
  return error ? failed() : ok();
};
