'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { APP_LINKS, APP_URL } from '@/lib/constants';
import { fetchCarTypes, submitUserSignup, CarTypeItem } from '@/lib/api';
import GoogleReCaptchaBadge, { executeRecaptcha } from '@/components/GoogleReCaptcha';

export default function RiderOnboardingPage() {
  const [carTypes, setCarTypes] = useState<CarTypeItem[]>([]);
  const [loadingCarTypes, setLoadingCarTypes] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    carType: '',
    plate: '',
    license: '',
    area: 'mainland',
  });

  useEffect(() => {
    async function loadVehicleTypes() {
      try {
        const types = await fetchCarTypes();
        setCarTypes(types);
        if (types.length > 0) {
          setFormData((prev) => ({ ...prev, carType: types[0].name }));
        }
      } catch (err) {
        console.error('Failed to load cartypes:', err);
      } finally {
        setLoadingCarTypes(false);
      }
    }
    loadVehicleTypes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Get reCAPTCHA v3 verification token
    const token = await executeRecaptcha('rider_signup');

    const result = await submitUserSignup(
      'driver',
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.phone,
        email: formData.email,
        password: formData.password,
        carType: formData.carType || (carTypes[0]?.name ?? 'BIKE'),
        vehicleNumber: formData.plate,
        licenseNumber: formData.license,
        operatingHub:
          formData.area === 'island'
            ? 'Lagos Island (Lekki, VI, Ikoyi)'
            : formData.area === 'all'
            ? 'All Lagos Zones'
            : 'Lagos Mainland (Ikeja, Yaba, Surulere)',
      },
      token || undefined
    );

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || 'Failed to complete signup. Please check your information.');
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 40 }}>
          <h1>Rider &amp; Dispatch Onboarding</h1>
          <p style={{ fontSize: '1.1rem', marginTop: 12 }}>
            Register your delivery vehicle or dispatch bike to join the HIILLA network and start earning across Lagos.
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
              <h2>Application Received!</h2>
              <p style={{ margin: '16px 0 28px', lineHeight: 1.7 }}>
                Your rider application has been submitted to the HIILLA Driver registry. Once our verification team reviews and approves your account, you can log directly into the Driver App.
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={APP_LINKS.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download on Google Play
                </a>
                <a
                  href={APP_LINKS.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Download on App Store
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Rider Account Details</h3>

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

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Tunde"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Balogun"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="phone">Mobile Phone (WhatsApp) *</label>
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
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="tunde@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password">App Login Password *</label>
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

              <h3 style={{ fontSize: 18, margin: '24px 0 16px' }}>Vehicle &amp; License Information</h3>

              <div className="form-field">
                <label htmlFor="carType">Vehicle / Bike Category *</label>
                <select
                  id="carType"
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  disabled={loadingCarTypes}
                >
                  {carTypes.length > 0 ? (
                    carTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name} {type.extra_info ? `(${type.extra_info})` : ''}
                      </option>
                    ))
                  ) : (
                    <option value="BIKE">BIKE (Motorcycle / Dispatch Bike)</option>
                  )}
                </select>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="plate">Vehicle Plate Number *</label>
                  <input
                    type="text"
                    id="plate"
                    name="plate"
                    required
                    placeholder="AAA-123XY"
                    value={formData.plate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="license">Rider’s License Number *</label>
                  <input
                    type="text"
                    id="license"
                    name="license"
                    required
                    placeholder="RDL-XXXX-XXXX"
                    value={formData.license}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="area">Preferred Operating Hub (Lagos)</label>
                <select id="area" name="area" value={formData.area} onChange={handleChange}>
                  <option value="mainland">Lagos Mainland (Ikeja, Yaba, Surulere, Maryland)</option>
                  <option value="island">Lagos Island (Lekki, Victoria Island, Ikoyi, Ajah)</option>
                  <option value="all">All Lagos Zones</option>
                </select>
              </div>

              <GoogleReCaptchaBadge />

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 16 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering Rider Account...' : 'Submit Rider Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
