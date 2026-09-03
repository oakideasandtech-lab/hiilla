'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AppBadges from '@/components/AppBadges';
import { STATS, YOUTUBE_EMBED, APP_URL } from '@/lib/constants';
import styles from './page.module.css';

export default function HomePage() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [estimate, setEstimate] = useState<number | null>(null);

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    const base = 1500;
    const randomized = Math.floor(Math.random() * 900) + 300;
    setEstimate(base + randomized);
  };

  return (
    <>
      {/* ── 1. Modern Hero Section ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>
            {/* Left Hero Content */}
            <div className={styles.heroContent}>
              <div className="badge-pill">
                <span>⚡</span>
                <span>#1 On-Demand Bike Dispatch in Lagos</span>
              </div>

              <h1 className={styles.heroHeadline}>
                The fast, easy &amp;<br />
                <span className={styles.highlightRed}>affordable way</span><br />
                to deliver.
              </h1>

              <p className={styles.heroSubtext}>
                Connect with 400+ vetted local dispatch riders in seconds. Instant pickup, real-time GPS telemetry, and seamless cashless payments anywhere in Lagos.
              </p>

              {/* App Badges */}
              <div className={styles.heroBadgesWrap}>
                <AppBadges theme="dark" />
              </div>

              {/* Trust Micro-Metrics */}
              <div className={styles.heroTrustBadges}>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>⏱️</span>
                  <span>15-30 Mins Avg Pickup</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>🛡️</span>
                  <span>100% Insured Delivery</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}>📍</span>
                  <span>Live Rider Tracking</span>
                </div>
              </div>
            </div>

            {/* Right Hero Quick Estimator Card */}
            <div className={styles.heroWidgetWrap}>
              <div className={styles.calcCard}>
                <div className={styles.calcHeader}>
                  <div className={styles.calcBadge}>
                    <span>🚀 Quick Fare Calculator</span>
                  </div>
                  <h3>Estimate Your Delivery</h3>
                  <p>Check instant dispatch pricing across Lagos</p>
                </div>

                <form onSubmit={handleQuickEstimate} className={styles.calcForm}>
                  <div className={styles.inputGroup}>
                    <label>Pickup Location</label>
                    <div className={styles.inputField}>
                      <span className={styles.fieldDotGreen} />
                      <input
                        type="text"
                        placeholder="e.g. Admiralty Way, Lekki Phase 1"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Drop-off Location</label>
                    <div className={styles.inputField}>
                      <span className={styles.fieldDotRed} />
                      <input
                        type="text"
                        placeholder="e.g. Allen Avenue, Ikeja"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Calculate Instant Fare
                  </button>
                </form>

                {estimate !== null && (
                  <div className={styles.calcResult}>
                    <span className={styles.resultLabel}>Estimated Trip Cost:</span>
                    <span className={styles.resultAmount}>₦{estimate.toLocaleString('en-US')}</span>
                    <Link
                      href={APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ width: '100%', marginTop: 12, padding: '10px 16px' }}
                    >
                      Book Delivery Now ↗
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Metric Counters Bar ── */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>50,000+</h3>
              <p className={styles.statLabel}>Parcels Delivered</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>400+</h3>
              <p className={styles.statLabel}>Verified Dispatch Riders</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>1</h3>
              <p className={styles.statLabel}>Mega Operating City (Lagos)</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>99.4%</h3>
              <p className={styles.statLabel}>On-Time Fulfillment Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. App Experience & Workflow Showcase ── */}
      <section className="section section-subtle">
        <div className="container">
          <div className="text-center" style={{ maxWidth: 700, margin: '0 auto 60px' }}>
            <div className="badge-pill">
              <span>📱</span>
              <span>Simple 3-Step Process</span>
            </div>
            <h2>Delivery Made Simple with HIILLA</h2>
            <p style={{ marginTop: 12, fontSize: '1.05rem' }}>
              Everything you need to send packages, track riders live, and manage deliveries effortlessly from your pocket.
            </p>
          </div>

          <div className={styles.appGrid}>
            {/* Step 1 */}
            <div className={styles.appStepCard}>
              <div className={styles.stepPill}>01. Set Locations</div>
              <div className={styles.screenFrame}>
                <Image
                  src="/assets/app-screen-1.jpg"
                  alt="Set delivery location"
                  width={319}
                  height={690}
                  className={styles.screenImage}
                />
              </div>
              <h4 className={styles.stepTitle}>Enter Pickup &amp; Drop-off</h4>
              <p className={styles.stepDesc}>
                Input locations, select parcel type, and get matched with the closest active dispatch rider in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className={styles.appStepCard}>
              <div className={styles.stepPill}>02. Live Tracking</div>
              <div className={styles.screenFrame}>
                <Image
                  src="/assets/app-screen-2.jpg"
                  alt="Delivery in progress"
                  width={319}
                  height={690}
                  className={styles.screenImage}
                />
              </div>
              <h4 className={styles.stepTitle}>Real-Time GPS Telemetry</h4>
              <p className={styles.stepDesc}>
                Track your rider’s live route on the map as they pick up and transport your package safely.
              </p>
            </div>

            {/* Step 3 */}
            <div className={styles.appStepCard}>
              <div className={styles.stepPill}>03. Cashless Pay</div>
              <div className={styles.screenFrame}>
                <Image
                  src="/assets/app-screen-3.jpg"
                  alt="Payment options"
                  width={319}
                  height={690}
                  className={styles.screenImage}
                />
              </div>
              <h4 className={styles.stepTitle}>Flexible In-App Payment</h4>
              <p className={styles.stepDesc}>
                Pay seamlessly with your digital wallet, bank transfer, or debit card upon fulfillment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Business & Merchant Solutions ── */}
      <section className="section">
        <div className="container">
          <div className={styles.businessGrid}>
            <div className={styles.businessMediaWrap}>
              <Image
                src="/assets/business-delivery.jpg"
                alt="Business delivery dispatch"
                width={580}
                height={420}
                className={styles.businessImg}
              />
              <div className={styles.mediaFloatCard}>
                <span className={styles.floatDot} />
                <div>
                  <strong>Enterprise Ready</strong>
                  <p>Bulk Dispatch &amp; Weekly Invoicing</p>
                </div>
              </div>
            </div>

            <div className={styles.businessContent}>
              <div className="badge-pill">
                <span>🏢</span>
                <span>For E-Commerce &amp; Merchants</span>
              </div>

              <h2>Delivery Tailored for Every Business</h2>
              <p className={styles.businessIntro}>
                Scale your order volume without the stress of hiring in-house dispatch. Trust HIILLA to handle logistics while you focus on growing sales.
              </p>

              <div className={styles.featurePillsList}>
                <div className={styles.featureItem}>
                  <div className={styles.checkCircle}>✓</div>
                  <div>
                    <strong>Riders Always On Demand:</strong>
                    <span> Never keep your customers waiting with multi-rider availability.</span>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.checkCircle}>✓</div>
                  <div>
                    <strong>Safe &amp; Insured Parcels:</strong>
                    <span> Verified identities and secure parcel handling guaranteed.</span>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.checkCircle}>✓</div>
                  <div>
                    <strong>Transparent Distance Pricing:</strong>
                    <span> True value for distance with zero hidden surcharges.</span>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.checkCircle}>✓</div>
                  <div>
                    <strong>Centralized Web Console:</strong>
                    <span> Book, track, and dispatch directly from desktop browsers.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Open Business Console ↗
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Opportunities Bento (Riders & Fleets) ── */}
      <section className="section section-subtle">
        <div className="container">
          <div className="text-center" style={{ maxWidth: 680, margin: '0 auto 52px' }}>
            <h2>Partner with HIILLA</h2>
            <p style={{ marginTop: 12, fontSize: '1.05rem' }}>
              Whether you are an independent dispatch rider or run a fleet of delivery bikes, HIILLA provides the orders, technology, and guaranteed payouts.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Rider Card */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoHeader}>
                <div className={styles.bentoIconWrap}>🛵</div>
                <div className={styles.bentoPill}>For Dispatch Riders</div>
              </div>
              <h3>Become a Dispatch Rider</h3>
              <p>
                Set your own working hours, receive non-stop delivery requests across Lagos, and maximize your daily earnings with dynamic trip bidding.
              </p>
              <ul className={styles.bentoList}>
                <li>Daily and weekly cash withdrawals</li>
                <li>Comprehensive 24/7 driver support &amp; trip insurance</li>
                <li>Turn-by-turn in-app GPS navigation</li>
              </ul>
              <Link href="/become-a-rider" className="btn btn-primary" style={{ width: '100%', marginTop: 24 }}>
                Join as a Rider
              </Link>
            </div>

            {/* Fleet Operator Card */}
            <div className={styles.bentoCard}>
              <div className={styles.bentoHeader}>
                <div className={styles.bentoIconWrap}>🏢</div>
                <div className={styles.bentoPill}>For Fleet Owners</div>
              </div>
              <h3>Become a Fleet Partner</h3>
              <p>
                Connect your bikes and riders to the HIILLA platform. Monitor live trips, track fuel efficiency, and receive consolidated weekly settlements.
              </p>
              <ul className={styles.bentoList}>
                <li>Live fleet telemetry &amp; rider status monitoring</li>
                <li>Automated commission split &amp; weekly direct deposits</li>
                <li>Tiered volume discounts for high-capacity operators</li>
              </ul>
              <Link href="/become-a-fleet" className="btn btn-secondary" style={{ width: '100%', marginTop: 24 }}>
                Onboard Your Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Video Walkthrough ── */}
      <section className="section section-dark">
        <div className="container text-center">
          <div className="badge-pill badge-pill-dark">
            <span>🎥</span>
            <span>Video Guide</span>
          </div>
          <h2 style={{ marginBottom: 12 }}>See HIILLA in Action</h2>
          <p style={{ maxWidth: 600, margin: '0 auto 40px' }}>
            Watch how easy it is to book deliveries, apply promo discounts, and manage orders with HIILLA.
          </p>

          <div className={styles.videoCard}>
            <iframe
              title="How to Use HIILLA Delivery App"
              src={YOUTUBE_EMBED}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── 7. Call To Action Banner ── */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>
            Ready to experience faster,<br />
            smarter deliveries in Lagos?
          </h2>
          <p className={styles.ctaSubtitle}>
            Download HIILLA XBid on your smartphone or access the web dispatch console now.
          </p>
          <div className={styles.ctaBadgesWrap}>
            <AppBadges theme="light" />
          </div>
        </div>
      </section>
    </>
  );
}
