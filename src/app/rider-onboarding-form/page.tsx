'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APP_URL } from '@/lib/constants';
import { submitUserSignup } from '@/lib/api';
import GoogleReCaptcha from '@/components/GoogleReCaptcha';

export default function FleetPartnerOnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    password: '',
    fleetSize: '5',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setErrorMessage('Please complete the reCAPTCHA security verification.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitUserSignup(
      'fleetadmin',
      {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: formData.phone,
        email: formData.email,
        password: formData.password,
        fleetSize: formData.fleetSize,
        address: formData.address,
      },
      recaptchaToken
    );

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || 'Failed to complete fleet registration. Please check your details.');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 40 }}>
          <h1>Fleet Partner Onboarding</h1>
          <p style={{ fontSize: '1.1rem', marginTop: 12 }}>
            Register your logistics company or multi-bike fleet to start managing dispatch operations and receiving weekly payouts on HIILLA.
          </p>
        </div>

        <div className="form-panel">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 34,
                  margin: '0 auto 20px',
                }}
              >
                ✓
              </div>
              <h2>Fleet Application Received!</h2>
              <p style={{ margin: '16px 0 28px', lineHeight: 1.7 }}>
                Your Fleet Partner profile has been registered in the HIILLA Fleet registry. Our corporate onboarding team will review your organization details and activate your dispatch console access.
              </p>
              <Link href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open Web Dispatch Console
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Company &amp; Fleet Details</h3>

              {errorMessage && (
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #F87171',
                    color: '#991B1B',
                    padding: '12px 16px',
                    borderRadius: 8,
                    marginBottom: 20,
                    fontSize: 14,
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <div className="form-field">
                <label htmlFor="companyName">Registered Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="Express Logistics Nigeria Ltd"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contactPerson">Primary Contact Person (Full Name) *</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    required
                    placeholder="Chidi Okeke"
                    value={formData.contactPerson}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="fleetSize">Fleet Size (Active Delivery Bikes) *</label>
                  <input
                    type="number"
                    id="fleetSize"
                    name="fleetSize"
                    min="1"
                    required
                    placeholder="5"
                    value={formData.fleetSize}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="08012345678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Official Business Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="fleet@yourcompany.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password">Console Login Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="Create a secure password (min. 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="address">Office Address (Lagos)</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="12 Ikorodu Road, Maryland, Lagos"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <GoogleReCaptcha
                onVerify={(token) => setRecaptchaToken(token)}
                onExpire={() => setRecaptchaToken(null)}
              />

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 16 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Fleet Profile...' : 'Submit Fleet Partnership Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
