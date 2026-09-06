'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { APP_LINKS } from '@/lib/constants';
import { fetchCarTypes, submitUserSignup, CarTypeItem } from '@/lib/api';
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

export default function RiderOnboardingPage() {
  const [carTypes, setCarTypes] = useState<CarTypeItem[]>([]);
  const [loadingCarTypes, setLoadingCarTypes] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Photo state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPG, PNG).');
      return;
    }

    try {
      setUploadingImage(true);
      const dataUrl = await compressImage(file);
      setProfileImage(dataUrl);
      setErrorMessage(null);
    } catch (err) {
      console.error('Image compression error:', err);
      setErrorMessage('Unable to process the selected photo. Please try another image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileImage) {
      setErrorMessage('Please upload a rider profile photo for verification.');
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
    const token = await executeRecaptcha('rider_signup');

    const result = await submitUserSignup(
      'driver',
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.phone,
        email: formData.email,
        password: formData.password,
        profile_image: profileImage,
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
                Your rider profile and credentials have been submitted for admin vetting. Once our verification team reviews and approves your account, you will be able to log in and start receiving delivery orders.
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
              <h3 style={{ fontSize: 18, marginBottom: 20 }}>Rider Profile &amp; Photo</h3>

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

              {/* Profile Photo Upload */}
              <div className="form-field" style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                  Rider Profile Picture / Photo *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      backgroundColor: '#F3F4F6',
                      border: '2px dashed #D1D5DB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={profileImage}
                        alt="Rider preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: 32, color: '#9CA3AF' }}>👤</span>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-outline"
                        style={{ padding: '8px 16px', fontSize: 14 }}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                      >
                        {uploadingImage ? 'Processing...' : profileImage ? 'Change Photo' : 'Upload Photo'}
                      </button>
                      {profileImage && (
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
                          onClick={handleRemoveImage}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
                      Clear headshot of the rider (JPG/PNG, max 5MB).
                    </p>
                  </div>
                </div>
              </div>

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

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="password">App Login Password *</label>
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
                {isSubmitting ? 'Submitting Application...' : 'Submit Rider Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
