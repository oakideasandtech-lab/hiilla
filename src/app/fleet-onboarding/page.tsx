'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APP_URL } from '@/lib/constants';

export default function FleetOnboardingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 40 }}>
          <h1>Fleet Partner Onboarding</h1>
          <p style={{ fontSize: '1.1rem', marginTop: 12 }}>
            Register your logistics company or multi-bike fleet to start managing and earning on HIILLA.
          </p>
        </div>

        <div className="form-panel">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  margin: '0 auto 20px',
                }}
              >
                ✓
              </div>
              <h2>Fleet Application Received!</h2>
              <p style={{ margin: '16px 0 28px', lineHeight: 1.7 }}>
                Our corporate fleet partnerships team will contact you within 24 hours to finalize your dispatch admin portal setup.
              </p>
              <Link href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open Web Console
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Company &amp; Fleet Details</h3>

              <div className="form-field">
                <label htmlFor="company-name">Registered Company Name *</label>
                <input type="text" id="company-name" required placeholder="Express Logistics Nigeria Ltd" />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-person">Primary Contact Person *</label>
                  <input type="text" id="contact-person" required placeholder="Chidi Okeke" />
                </div>
                <div className="form-field">
                  <label htmlFor="fleet-size">Fleet Size (Active Vehicles) *</label>
                  <input type="number" id="fleet-size" min="1" required placeholder="5" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" required placeholder="+234 801 234 5678" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Official Business Email *</label>
                  <input type="email" id="email" required placeholder="fleet@yourcompany.com" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="head-office">Office Address (Lagos)</label>
                <input type="text" id="head-office" placeholder="12 Ikorodu Road, Maryland, Lagos" />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
                Submit Fleet Partnership Application
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
