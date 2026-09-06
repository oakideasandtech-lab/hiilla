import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Become A Rider',
  description: 'Set your own schedule, make more at every turn, and let the app lead the way. Become a dispatch rider with HIILLA Transit Services.',
};

export default function BecomeARiderPage() {
  return (
    <>
      {/* ── Page Header ── */}
      <section className="section text-center" style={{ paddingBottom: 24 }}>
        <div className="container">
          <h1>Become A Rider</h1>
          <p style={{ marginTop: 12, fontSize: '1.1rem' }}>
            Earn competitive rates on every trip with total flexibility across Lagos.
          </p>
        </div>
      </section>

      {/* ── Core Value Cards ── */}
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="container">
          <div className="card-grid">
            <div className="card">
              <h5>Set your own schedule</h5>
              <p>
                You can take delivery with HIILLA Transit Services anytime, day or night, 365 days a year. With HIILLA, it is always up to you, so it never interferes with the important things in your life.
              </p>
            </div>
            <div className="card">
              <h5>Make more at every turn</h5>
              <p>
                Trip fares are not fixed, with HIILLA, it is true value for time and distance. Here, Drivers make more.
              </p>
            </div>
            <div className="card">
              <h5>Let the app lead the way</h5>
              <p>
                Just tap and go. You’ll get turn-by-turn directions, tools to help you make more, and 24/7 support—all available right there in the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section section-light text-center">
        <div className="container">
          <h2>Start Onboarding</h2>
          <p style={{ margin: '20px 0 32px', fontSize: '1.1rem' }}>
            Ready to hit the road? Begin your journey with HIILLA today.
          </p>
          <Link href="/rider-onboarding-form" className="btn btn-primary">
            Start Onboarding
          </Link>
        </div>
      </section>

      {/* ── About the Rider App ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 840 }}>
          <h4 style={{ color: 'var(--accent-primary)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
            About the App
          </h4>
          <h2 style={{ marginBottom: 20 }}>Designed just for Riders</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
            When you want to make money, just open the app and you’ll start to receive delivery requests. You’ll get information about your Customer and directions to their location and destination. When the delivery is completed, you’ll receive another nearby request. And if you’re ready to get off the road, you can “GO OFFLINE” at any time.
          </p>
        </div>
      </section>

      {/* ── Rewards, Requirements & Safety ── */}
      <section className="section section-light">
        <div className="container">
          <div className="card-grid">
            <div className="card">
              <h5>Rewards</h5>
              <p>You’re in the Driver’s seat. So reward yourself with extra-cash by making 10 deliveries daily.</p>
            </div>
            <div className="card">
              <h5>Requirements</h5>
              <p>Know you’re ready to hit the road. Whether you’re driving your own car or a commercially-licensed vehicle, you must meet the minimum requirements and complete a safety screening online.</p>
            </div>
            <div className="card">
              <h5>Safety</h5>
              <p>When you deliver with HIILLA Transit Services, you get 24/7 Driver support and insurance coverage. And all deliveries are verified with personal information and phone number.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
