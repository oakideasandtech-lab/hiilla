'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APP_URL } from '@/lib/constants';

export default function RiderOnboardingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 40 }}>
          <h1>Rider Onboarding</h1>
          <p style={{ fontSize: '1.1rem', marginTop: 12 }}>
            Complete your onboarding application to start receiving delivery orders across Lagos.
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
              <h2>Application Submitted!</h2>
              <p style={{ margin: '16px 0 28px', lineHeight: 1.7 }}>
                Thank you for applying to join the HIILLA rider network. Our fleet verification officer will review your documents and contact you within 24 hours.
              </p>
              <Link href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Download Rider App
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Rider Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="first-name">First Name *</label>
                  <input type="text" id="first-name" required placeholder="Tunde" />
                </div>
                <div className="form-field">
                  <label htmlFor="last-name">Last Name *</label>
                  <input type="text" id="last-name" required placeholder="Balogun" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">Mobile Phone (WhatsApp) *</label>
                  <input type="tel" id="phone" required placeholder="+234 801 234 5678" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" required placeholder="tunde@example.com" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="vehicle-type">Vehicle / Bike Category *</label>
                <select id="vehicle-type" defaultValue="bike">
                  <option value="bike">Motorcycle (Dispatch Bike)</option>
                  <option value="tricycle">Tricycle (Keke)</option>
                  <option value="van">Mini Van / Delivery Bus</option>
                  <option value="car">Saloon Car</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="plate">Vehicle Plate Number *</label>
                  <input type="text" id="plate" required placeholder="AAA-123XY" />
                </div>
                <div className="form-field">
                  <label htmlFor="license">Rider’s License Number *</label>
                  <input type="text" id="license" required placeholder="RDL-XXXX-XXXX" />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="area">Preferred Operating Hub (Lagos)</label>
                <select id="area" defaultValue="mainland">
                  <option value="mainland">Lagos Mainland (Ikeja, Yaba, Surulere, Maryland)</option>
                  <option value="island">Lagos Island (Lekki, Victoria Island, Ikoyi, Ajah)</option>
                  <option value="all">All Lagos Zones</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
                Submit Onboarding Application
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
