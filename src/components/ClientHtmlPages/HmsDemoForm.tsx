import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

import { EnquiryType } from '../../types';
import { createInquiryForm } from '../../utils/db';

const HmsDemoForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const hospital = String(data.get('hospital') || '').trim();
    const city = String(data.get('city') || '').trim();
    const role = String(data.get('role') || '').trim();
    const mobile = String(data.get('mobile') || '')
      .replace(/\D/g, '')
      .slice(-10);
    const email = String(data.get('email') || '').trim();

    if (!name || !hospital || !city || !role || !/^[6-9]\d{9}$/.test(mobile)) {
      setStatus('err');
      return;
    }

    const payload: EnquiryType = {
      fullname: name,
      email: email || `${mobile}@demo.nextlooptechnologies.com`,
      contact: mobile,
      subject: 'hospital-management-software-demo',
      message: [
        `Hospital: ${hospital}`,
        `City: ${city}`,
        `Role: ${role}`,
        `Beds: ${String(data.get('beds') || '—')}`,
        `Preferred time: ${String(data.get('time') || '—')}`,
        `Source: ${String(data.get('source') || '—')}`,
        `Mobile: ${mobile}`,
      ].join('\n'),
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
    <form onSubmit={onSubmit} noValidate>
      <h3>Your details</h3>
      <div className='two'>
        <label>
          Name
          <input name='name' autoComplete='name' required />
        </label>
        <label>
          Hospital name
          <input name='hospital' autoComplete='organization' required />
        </label>
      </div>
      <div className='two'>
        <label>
          City
          <input
            name='city'
            autoComplete='address-level2'
            placeholder='e.g. Indore'
            required
          />
        </label>
        <label>
          Your role
          <select name='role' required defaultValue=''>
            <option value=''>Select</option>
            <option>Owner</option>
            <option>Medical director</option>
            <option>Administrator</option>
            <option>Billing head</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <fieldset className='beds'>
        <legend>Number of beds</legend>
        <label>
          <input type='radio' name='beds' value='under-30' />
          <span>Under 30</span>
        </label>
        <label>
          <input type='radio' name='beds' value='30-50' />
          <span>30-50</span>
        </label>
        <label>
          <input type='radio' name='beds' value='51-100' />
          <span>51-100</span>
        </label>
        <label>
          <input type='radio' name='beds' value='over-100' />
          <span>Over 100</span>
        </label>
      </fieldset>
      <div className='two'>
        <label>
          Mobile
          <input
            type='tel'
            name='mobile'
            inputMode='numeric'
            autoComplete='tel'
            placeholder='10-digit mobile'
            required
          />
        </label>
        <label>
          Email <span className='opt'>(optional)</span>
          <input type='email' name='email' autoComplete='email' />
        </label>
      </div>
      <div className='two'>
        <label>
          Preferred time
          <select name='time' defaultValue='Morning (10 am - 1 pm)'>
            <option>Morning (10 am - 1 pm)</option>
            <option>Afternoon (2 pm - 5 pm)</option>
            <option>Evening (5 pm - 7 pm)</option>
          </select>
        </label>
        <label>
          How did you hear about us? <span className='opt'>(optional)</span>
          <select name='source' defaultValue=''>
            <option value=''>Select</option>
            <option>Google search</option>
            <option>ChatGPT or another AI tool</option>
            <option>Another hospital</option>
            <option>LinkedIn</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      {status === 'err' && (
        <p className='err' role='alert' style={{ display: 'block' }}>
          Please fill in your name, hospital, city, role and a 10-digit mobile
          number.
        </p>
      )}
      <button className='btn' type='submit' disabled={busy}>
        {busy ? 'Sending…' : 'Book a free demo'}
      </button>
      <p className='consent'>
        We will use these details only to contact you about a demo. See our{' '}
        <Link href='/privacy/'>privacy notice</Link>. You can ask us to delete
        them at any time.
      </p>
      {status === 'ok' && (
        <p className='thanks' role='status' style={{ display: 'block' }}>
          Thank you. Our team will call you soon.
        </p>
      )}
    </form>
  );
};

export default HmsDemoForm;
