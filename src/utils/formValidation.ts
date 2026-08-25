import { isValidPhoneNumber } from 'libphonenumber-js';

export const nameRegex = /^[a-zA-Z\s'-]+$/;
export const strictNameRegex = /^[a-zA-Z\s'-]{1,20}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateName = (name: string): string => {
  if (!name.trim()) return 'First name is required.';
  if (!nameRegex.test(name.trim())) return 'Please enter a valid name';
  return '';
};

export const validateLastName = (name: string): string => {
  if (!name.trim()) return 'Last name is required.';
  if (!nameRegex.test(name.trim())) return 'Please enter a valid last name.';
  return '';
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) return 'Email is required.';
  if (!emailRegex.test(email.trim()))
    return 'Please enter a valid email address.';
  return '';
};
export const validateLinkedIn = (url: string): string => {
  if (!url.trim()) return 'LinkedIn URL is required.';
  const regex = /^https:\/\/(www\.)?linkedin\.com\/in\/.+$/;
  if (!regex.test(url.trim()))
    return 'Please enter a valid LinkedIn profile URL.';
  return '';
};

export const validatePhone = (
  phone: string,
  countryCode: string,
  countryIso: string
): string => {
  if (phone.trim()) {
    const fullNumber = `+${countryCode}${phone.trim()}`;
    if (!isValidPhoneNumber(fullNumber, countryIso as any)) {
      return 'Please enter a valid phone number for selected country.';
    }
  }
  return '';
};
