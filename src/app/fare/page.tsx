'use client';

import { useState } from 'react';
import Link from 'next/link';
import { APP_URL } from '@/lib/constants';

export default function FareEstimatePage() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [deliveryType, setDeliveryType] = useState('same_day');
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;

    // Simulated base estimate algorithm based on standard delivery tiers
    const baseFare = deliveryType === 'instant' ? 2200 : 1400;
    const randomizedDistanceFactor = Math.floor(Math.random() * 800) + 400;
    setEstimate(baseFare + randomizedDistanceFactor);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 48 }}>
          <h1>Delivery Fare Estimates</h1>
          <p style={{ fontSize: '1.1rem', marginTop: 12 }}>
            Enter your pickup and drop-off locations to get an estimated delivery fare.
          </p>
        </div>

        <div className="form-panel">
          <form onSubmit={calculateEstimate}>
            <div className="form-field">
              <label htmlFor="pickup">Pickup Address *</label>
              <input
                type="text"
                id="pickup"
                placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="dropoff">Drop-off Address *</label>
              <input
                type="text"
                id="dropoff"
                placeholder="e.g. 42 Allen Avenue, Ikeja"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Delivery Speed</label>
              <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
                  <input
                    type="radio"
                    name="type"
                    value="same_day"
                    checked={deliveryType === 'same_day'}
                    onChange={() => setDeliveryType('same_day')}
                  />
                  Same Day Standard
                </label>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 500 }}>
                  <input
                    type="radio"
                    name="type"
                    value="instant"
                    checked={deliveryType === 'instant'}
                    onChange={() => setDeliveryType('instant')}
                  />
                  Instant Direct Dispatch
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
              Get Quote Estimate
            </button>
          </form>

          {estimate !== null && (
            <div
              style={{
                marginTop: 28,
                padding: '20px 24px',
                borderRadius: '12px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                textAlign: 'center',
              }}
            >
              <p style={{ color: '#065F46', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Estimated Trip Cost
              </p>
              <h2 style={{ color: '#059669', fontSize: '2.4rem', margin: '8px 0', fontWeight: 800 }}>
                ₦{estimate.toLocaleString('en-US')}
              </h2>
              <p style={{ color: '#047857', fontSize: '0.88rem' }}>
                Prices may vary slightly based on live traffic, item dimension, and route accessibility.
              </p>
              <Link
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 16 }}
              >
                Book Now on HIILLA App
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
