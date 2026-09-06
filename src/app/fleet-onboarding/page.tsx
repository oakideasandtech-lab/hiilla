'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { APP_URL } from '@/lib/constants';
import { submitUserSignup } from '@/lib/api';
import GoogleReCaptchaBadge, { executeRecaptcha } from '@/components/GoogleReCaptcha';

/**
 * Compress image to base64 Data URL for avatar/logo upload
 */
function compressImage(file: File, maxWidth = 500, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function FleetPartnerOnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Logo state
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    fleetSize: '5',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, SVG).');
      return;
    }

    try {
      setUploadingLogo(true);
      const dataUrl = await compressImage(file);
      setLogoImage(dataUrl);
      setErrorMessage(null);
    } catch (err) {
      console.error('Logo compression error:', err);
      setErrorMessage('Unable to process company logo. Please try another image.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleRemoveLogo = () => {
    setLogoImage(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!logoImage) {
      setErrorMessage('Please upload your company logo.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please retype the exact password.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Get reCAPTCHA v3 verification token
    const token = await executeRecaptcha('fleet_signup');

    const result = await submitUserSignup(
      'fleetadmin',
      {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        mobile: formData.phone,
        email: formData.email,
        password: formData.password,
        profile_image: logoImage,
        fleetSize: formData.fleetSize,
        address: formData.address,
      },
      token || undefined
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
                Your Fleet Partner profile has been registered for administrative approval. Once our corporate team verifies your organization details, your web dispatch console will be activated.
              </p>
              <Link href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Open Web Dispatch Console
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Company Branding &amp; Profile</h3>

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

              {/* Company Logo Upload */}
              <div className="form-field" style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                  Company Logo *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 12,
                      backgroundColor: '#F3F4F6',
                      border: '2px dashed #D1D5DB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {logoImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoImage}
                        alt="Company logo preview"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }}
                      />
                    ) : (
                      <span style={{ fontSize: 32, color: '#9CA3AF' }}>🏢</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={logoInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleLogoChange}
                    />
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-outline"
                        style={{ padding: '8px 16px', fontSize: 14 }}
                        onClick={() => logoInputRef.current?.click()}
                        disabled={uploadingLogo}
                      >
                        {uploadingLogo ? 'Processing...' : logoImage ? 'Change Logo' : 'Upload Logo'}
                      </button>
                      {logoImage && (
                        <button
                          type="button"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: 13,
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                          onClick={handleRemoveLogo}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
                      Square or horizontal logo (PNG/JPG, max 5MB).
                    </p>
                  </div>
                </div>
              </div>

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

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="password">Console Login Password *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      required
                      minLength={6}
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={handleChange}
                      style={{ paddingRight: 46 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 18,
                        color: '#6B7280',
                        padding: 4,
                      }}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minLength={6}
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={{ paddingRight: 46 }}
                    />
                  </div>
                </div>
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

              <GoogleReCaptchaBadge />

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 16 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Fleet Partnership Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
