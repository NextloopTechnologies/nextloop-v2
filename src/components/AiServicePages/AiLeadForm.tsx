import React, { FormEvent, useState } from 'react';

import { EnquiryType } from '../../types';
import { createInquiryForm } from '../../utils/db';

type Props = {
  namePlaceholder?: string;
  emailPlaceholder?: string;
  companyPlaceholder?: string;
  selectLabel: string;
  selectOptions: string[];
  messagePlaceholder: string;
  submitLabel: string;
  subject: string;
};

const AiLeadForm: React.FC<Props> = ({
  namePlaceholder = 'Name',
  emailPlaceholder = 'Work email',
  companyPlaceholder = 'Company',
  selectLabel,
  selectOptions,
  messagePlaceholder,
  submitLabel,
  subject,
}) => {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const interest = String(data.get('interest') || '').trim();
    const details = String(data.get('details') || '').trim();

    if (!name || !email) {
      setStatus('err');
      return;
    }

    const payload: EnquiryType = {
      fullname: name,
      email,
      contact: '',
      subject,
      message: [
        `Company: ${company || '—'}`,
        `${selectLabel}: ${interest || '—'}`,
        details,
      ]
        .filter(Boolean)
        .join('\n'),
    };

    setBusy(true);
    setStatus('idle');
    try {
      const { success } = await createInquiryForm(payload);
      if (success) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className='leadform' onSubmit={onSubmit}>
      <input
        name='name'
        placeholder={namePlaceholder}
        aria-label={namePlaceholder}
        required
      />
      <input
        name='email'
        type='email'
        placeholder={emailPlaceholder}
        aria-label={emailPlaceholder}
        required
      />
      <input
        name='company'
        placeholder={companyPlaceholder}
        aria-label={companyPlaceholder}
      />
      <select name='interest' aria-label={selectLabel} defaultValue=''>
        <option value='' disabled>
          {selectLabel}
        </option>
        {selectOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <textarea
        name='details'
        placeholder={messagePlaceholder}
        aria-label={messagePlaceholder}
      />
      <button className='btn' type='submit' disabled={busy}>
        {busy ? 'Sending…' : submitLabel}
      </button>
      {status === 'ok' && (
        <p className='form-status ok'>
          Your message has been sent. We will get back to you shortly.
        </p>
      )}
      {status === 'err' && (
        <p className='form-status err'>
          Please check your details and try again.
        </p>
      )}
    </form>
  );
};

export default AiLeadForm;
