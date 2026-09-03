import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'HIILLA Transit Services Privacy Policy and Data Handling Terms.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 840 }}>
        <h1 style={{ marginBottom: 24, textAlign: 'center' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: 40, fontSize: '0.9rem' }}>
          Last updated: January 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: '1.02rem', lineHeight: 1.8 }}>
          <p>
            At <strong>HIILLA TRANSIT SERVICES</strong> (&quot;HIILLA&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we respect your privacy and are committed to protecting the personal data you share with us when using our mobile application, web portal, and logistics dispatch platform.
          </p>

          <h3>1. Information We Collect</h3>
          <p>
            We collect personal information necessary to deliver our services, including:
          </p>
          <ul style={{ marginLeft: 24 }}>
            <li>Identity and Contact Data: Full name, phone number, email address, physical address.</li>
            <li>Location Data: Precise GPS coordinates when booking, tracking, or fulfilling delivery orders.</li>
            <li>Financial Data: Transaction history, wallet balances, payment provider verification tokens.</li>
            <li>Device & Telemetry: Device model, operating system, push notification tokens, and connection IP.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>
            We use your data to match orders with available dispatch riders, facilitate real-time telemetry tracking, process cashless wallet transactions, verify driver and fleet compliance, and provide customer support.
          </p>

          <h3>3. Data Security & Storage</h3>
          <p>
            We implement enterprise-grade technical safeguards including TLS encryption in transit and secure database rules to protect your personal information against unauthorized access, loss, or destruction.
          </p>

          <h3>4. Contact Our Data Protection Team</h3>
          <p>
            If you have questions regarding this Privacy Policy or wish to exercise data access/deletion rights, contact us at <strong>support@hiilla.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
