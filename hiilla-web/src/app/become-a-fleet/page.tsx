import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Become A Fleet Partner',
  description: 'Manage multiple riders, track live dispatch operations, and receive weekly payouts with transparent analytics on HIILLA.',
};

export default function BecomeAFleetPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="section text-center" style={{ paddingBottom: 24 }}>
        <div className="container">
          <h1>Become A Fleet Partner</h1>
          <p style={{ marginTop: 12, fontSize: '1.1rem' }}>
            Scale your delivery business with centralized fleet management and automated payouts.
          </p>
        </div>
      </section>

      {/* ── Core Value Cards ── */}
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="container">
          <div className="card-grid">
            <div className="card">
              <h5>Free your riders</h5>
              <p>
                You’re the boss. Let all riders connected to the HIILLA platform take delivery requests across the city while you watch operations happen live from your console dashboard.
              </p>
            </div>
            <div className="card">
              <h5>We pay weekly</h5>
              <p>
                Fleet owners on HIILLA get weekly settlements and detailed reports directly to their bank accounts, providing steady cash flow and complete financial clarity.
              </p>
            </div>
            <div className="card">
              <h5>Simple analytics</h5>
              <p>
                A clean platform with real-time analytics to see what drivers are doing, tracking active vs. offline status, trips fulfilled, and gross revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section section-light text-center">
        <div className="container">
          <h2>Onboard As Fleet</h2>
          <p style={{ margin: '20px 0 32px', fontSize: '1.1rem' }}>
            Grow your dispatch fleet with HIILLA. Get started today.
          </p>
          <Link href="/fleet-onboarding" className="btn btn-primary">
            Onboard As Fleet
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 840 }}>
          <h4 style={{ color: 'var(--accent-primary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
            Fleet Management
          </h4>
          <h2 style={{ marginBottom: 20 }}>How It Works</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            Connect your riders to the HIILLA platform, track deliveries in real-time from your web dashboard, and get paid weekly to your registered account with transparent commission breakdowns and automated invoices.
          </p>
        </div>
      </section>

      {/* ── Requirements, Rewards & Assurance ── */}
      <section className="section section-light">
        <div className="container">
          <div className="card-grid">
            <div className="card">
              <h5>Requirements</h5>
              <p>Each rider must possess a valid rider’s license, commercially roadworthy bike/vehicle, and pass verified onboarding screening.</p>
            </div>
            <div className="card">
              <h5>Rewards</h5>
              <p>Scale your fleet volume to unlock tiered commission discounts and priority dispatch matching across high-demand Lagos corridors.</p>
            </div>
            <div className="card">
              <h5>Assurance</h5>
              <p>24/7 dedicated fleet support, trip insurance coverage, and customer identity verification for secure and seamless fulfillment.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
