import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

import { EnquiryType } from '../../types';
import { createInquiryForm } from '../../utils/db';

const ConsultBookForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    if (!name || !email.includes('@')) {
      setStatus('err');
      return;
    }

    const payload: EnquiryType = {
      fullname: name,
      email,
      contact: '',
      subject: 'ai-business-consultancy',
      message: [
        `Company: ${String(data.get('company') || '—')}`,
        `Size: ${String(data.get('size') || '—')}`,
        `Stage: ${String(data.get('stage') || '—')}`,
        String(data.get('msg') || ''),
      ]
        .filter(Boolean)
        .join('\n'),
    };

    setBusy(true);
    setStatus('idle');
    try {
      const { success } = await createInquiryForm(payload);
      setStatus(success ? 'ok' : 'err');
      if (success) form.reset();
    } catch {
      setStatus('err');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <h3>Book Your Free AI Readiness Audit</h3>
      <p className='note'>
        Takes less than a minute. We reply within one business day.
      </p>
      <div className='two'>
        <label>
          Full name
          <input name='name' required autoComplete='name' />
        </label>
        <label>
          Work email
          <input type='email' name='email' required autoComplete='email' />
        </label>
      </div>
      <div className='two'>
        <label>
          Company
          <input name='company' autoComplete='organization' />
        </label>
        <label>
          Company size
          <select name='size' defaultValue=''>
            <option value=''>Select</option>
            <option>1 to 50</option>
            <option>51 to 200</option>
            <option>201 to 1,000</option>
            <option>1,000+</option>
          </select>
        </label>
      </div>
      <label>
        Where are you with AI today?
        <select name='stage' id='stage' defaultValue=''>
          <option value=''>Select</option>
          <option value='exploring'>Just exploring</option>
          <option value='planning'>Planning a first project</option>
          <option value='pilot'>Running a pilot</option>
          <option value='scaling'>Scaling AI across teams</option>
          <option value='sample'>I&apos;d like a sample blueprint first</option>
        </select>
      </label>
      <label>
        What would you most like AI to fix?{' '}
        <span style={{ color: 'var(--m)', fontWeight: 400 }}>(optional)</span>
        <textarea
          name='msg'
          placeholder='e.g. Our finance team spends 20 hours a week entering invoices into SAP'
        />
      </label>
      <button className='btn' type='submit' disabled={busy}>
        {busy ? 'Sending…' : 'Book Your Free AI Readiness Audit'}
      </button>
      {status === 'ok' && (
        <p className='ok' role='status' style={{ display: 'block' }}>
          Thanks. A senior engineer will email you within one business day to
          schedule your call.
        </p>
      )}
      {status === 'err' && (
        <p className='ok' role='status' style={{ display: 'block' }}>
          Please check your name and work email and try again.
        </p>
      )}
      <p className='fine'>
        No spam, no obligation. See our{' '}
        <Link href='/privacy/'>Privacy Policy</Link>.
      </p>
    </form>
  );
};

export default ConsultBookForm;
