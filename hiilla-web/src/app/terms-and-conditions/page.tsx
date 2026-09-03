import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions governing the use of the HIILLA Transit Services platform and delivery ecosystem.',
};

export default function TermsAndConditionsPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 840 }}>
        <h1 style={{ marginBottom: 24, textAlign: 'center' }}>Terms &amp; Conditions</h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 40, fontSize: '0.9rem' }}>
          Last updated: January 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: '1.02rem', lineHeight: 1.8 }}>
          <p>
            Welcome to <strong>HIILLA TRANSIT SERVICES</strong>. By accessing our platform, website, or mobile application, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h3>1. Platform Scope &amp; Role</h3>
          <p>
            HIILLA provides a digital marketplace and dispatch infrastructure connecting customers requesting courier and delivery fulfillment with independent third-party dispatch riders and fleet operators.
          </p>

          <h3>2. User Accounts &amp; Verification</h3>
          <p>
            Users, riders, and fleet admins must provide accurate, current, and complete registration information. All accounts are subject to identity verification, phone OTP verification, and background safety reviews.
          </p>

          <h3>3. Pricing, Bidding &amp; Payments</h3>
          <p>
            Delivery fares are determined based on distance, time, and dynamic dispatch bidding. All digital wallet top-ups, debit card payments, and driver disbursements are processed securely in Nigerian Naira (₦).
          </p>

          <h3>4. Prohibited Items</h3>
          <p>
            Users are strictly prohibited from dispatching hazardous materials, illegal substances, unregistered firearms, flammable chemicals, or contraband under the laws of the Federal Republic of Nigeria.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            HIILLA strives for the highest standard of service reliability and parcel safety, providing support and resolution channels for all verified delivery disputes.
          </p>
        </div>
      </div>
    </section>
  );
}
