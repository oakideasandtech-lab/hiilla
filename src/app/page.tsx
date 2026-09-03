import Image from 'next/image';
import Link from 'next/link';
import AppBadges from '@/components/AppBadges';
import { YOUTUBE_EMBED } from '@/lib/constants';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* ── 1. Centered Hero Section (Natural Photo + Transparent Overlay) ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The fast, easy and,<br />
            affordable way<br />
            to deliver.
          </h1>

          <p className={styles.heroLead}>
            Download <strong>HIILLA XBid</strong>
          </p>

          <span className={styles.downloadArrow}>↓</span>

          <div className={styles.heroBadges}>
            <AppBadges theme="dark" />
          </div>

          <div className={styles.heroTrustPills}>
            <span className={styles.trustPill}>⏱️ 15-30 Mins Avg Pickup</span>
            <span className={styles.trustDot}>•</span>
            <span className={styles.trustPill}>🛡️ 100% Insured Delivery</span>
            <span className={styles.trustDot}>•</span>
            <span className={styles.trustPill}>📍 Live GPS Tracking</span>
          </div>
        </div>
      </section>

      {/* ── 2. App Screenshots Showcase ── */}
      <section className="section">
        <div className="container">
          <div className={styles.appGrid}>
            <div className={styles.appCard}>
              <div className={styles.screenFrame}>
                <Image
                  src="/assets/app-screen-1.jpg"
                  alt="Set delivery location"
                  width={319}
                  height={690}
                  className={styles.screenImg}
                />
              </div>
              <p className={styles.screenCaption}>
                Set your delivery location, get connected to available dispatch rider instantly.
              </p>
            </div>

            <div className={styles.appCard}>
              <div className={styles.screenFrame}>
                <Image
                  src="/assets/app-screen-2.jpg"
                  alt="Delivery in progress"
                  width={319}
                  height={690}
                  className={styles.screenImg}
                />
              </div>
              <p className={styles.screenCaption}>
                Delivery starts immediately the rider arrives and receives the package.
              </p>
            </div>

            <div className={styles.appCard}>
              <div className={styles.screenFrame}>
                <Image
                  src="/assets/app-screen-3.jpg"
                  alt="Payment options"
                  width={319}
                  height={690}
                  className={styles.screenImg}
                />
              </div>
              <p className={styles.screenCaption}>
                However you like to pay? HIILLA is always available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Metric Stats Bar ── */}
      <section className="section section-subtle">
        <div className="container text-center">
          <h2 style={{ marginBottom: 44 }}>
            <strong>Delivery is what we do best.</strong>
          </h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>50k+</h3>
              <p className={styles.statLabel}>Deliveries</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>1</h3>
              <p className={styles.statLabel}>Operating city (Lagos)</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statNumber}>400+</h3>
              <p className={styles.statLabel}>Riders and Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. More Than Just An App ── */}
      <section className="section">
        <div className="container text-center" style={{ maxWidth: 780 }}>
          <h2 style={{ marginBottom: 20 }}>
            <strong>More Than Just an App</strong>
          </h2>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8 }}>
            We are connecting individuals or businesses in need of every day delivery service with the best local dispatch drivers at the best prices. When you deliver with HIILLA, we do our best to make the delivery as seamless and secure as possible.
          </p>
        </div>
      </section>

      {/* ── 5. Business Delivery Feature ── */}
      <section className="section section-subtle">
        <div className="container">
          <div className={styles.featureGrid}>
            <div className={styles.featureMedia}>
              <Image
                src="/assets/business-delivery.jpg"
                alt="HIILLA delivery rider"
                width={560}
                height={400}
                className={styles.featureImg}
              />
            </div>
            <div className={styles.featureBody}>
              <h3>
                <strong>Delivery tailored for every business – onboard, set up orders, and trust ‘HIILLA Go’ to deliver.</strong>
              </h3>
              <ul className={styles.featureList}>
                <li>Our Riders are always around the corner so you won’t be kept waiting on your next delivery.</li>
                <li>Relax with the assurance that your parcel is not only safe but it is our number one priority.</li>
                <li>Our Riders will navigate the best routes to ensure your delivery gets to the destination in time.</li>
                <li>No matter the distance, we are cost-efficient and professional.</li>
                <li>Our Riders accept cashless transactions alongside many other payment options available in-app.</li>
              </ul>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: 16 }}>
                Download <strong>HIILLA XBid</strong> to make your delivery:
              </p>
              <div className={styles.featureBadges}>
                <AppBadges theme="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. How-To Video ── */}
      <section className="section section-dark">
        <div className="container text-center">
          <h3 style={{ marginBottom: 36, color: '#FFFFFF' }}>
            <strong>How to videos</strong>
          </h3>
          <div className={styles.videoWrapper}>
            <iframe
              title="Apply Coupon on HIILLAGo App"
              src={YOUTUBE_EMBED}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── 7. Call To Action ── */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>
            Let us take on your<br />next delivery.
          </h2>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/become-a-rider" className="btn btn-primary">
              Become A Dispatch
            </Link>
            <Link href="/become-a-fleet" className="btn btn-white">
              Become A Fleet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
