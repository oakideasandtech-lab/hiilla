import Image from 'next/image';
import Link from 'next/link';
import AppBadges from '@/components/AppBadges';
import { STATS, YOUTUBE_EMBED } from '@/lib/constants';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
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
          <div className={styles.heroBadges}>
            <AppBadges theme="light" />
          </div>
        </div>
      </section>

      {/* ── App Screen Preview Showcase ── */}
      <section className="section">
        <div className="container">
          <div className={styles.screenCards}>
            <div className={styles.screenCard}>
              <div className={styles.screenImageWrap}>
                <Image
                  src="/assets/app-screen-1.jpg"
                  alt="HIILLA app delivery setup screen"
                  width={319}
                  height={690}
                  className={styles.screenImg}
                />
              </div>
              <p className={styles.screenCaption}>
                Set your delivery location, get connected to available dispatch rider instantly.
              </p>
            </div>

            <div className={styles.screenCard}>
              <div className={styles.screenImageWrap}>
                <Image
                  src="/assets/app-screen-2.jpg"
                  alt="HIILLA app delivery in progress screen"
                  width={319}
                  height={690}
                  className={styles.screenImg}
                />
              </div>
              <p className={styles.screenCaption}>
                Delivery starts immediately the rider arrives and receives the package.
              </p>
            </div>

            <div className={styles.screenCard}>
              <div className={styles.screenImageWrap}>
                <Image
                  src="/assets/app-screen-3.jpg"
                  alt="HIILLA app payment options screen"
                  width={319}
                  height={690}
                  className={styles.screenImg}
                />
              </div>
              <p className={styles.screenCaption}>
                However you like to pay? HIILLA is always available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Metric Section ── */}
      <section className="section section-light">
        <div className="container text-center">
          <h2 style={{ marginBottom: 48 }}>
            <strong>Delivery is what we do best.</strong>
          </h2>
          <div className={styles.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.statBox}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── More Than Just An App ── */}
      <section className="section">
        <div className="container text-center">
          <h2>
            <strong>More Than Just an App</strong>
          </h2>
          <p style={{ maxWidth: 740, margin: '24px auto 0', fontSize: '1.1rem', lineHeight: 1.8 }}>
            We are connecting individuals or businesses in need of every day delivery service with the best local dispatch drivers at the best prices. When you deliver with HIILLA, we do our best to make the delivery as seamless and secure as possible.
          </p>
        </div>
      </section>

      {/* ── Business Feature Grid ── */}
      <section className="section section-light">
        <div className="container">
          <div className={styles.featureGrid}>
            <div className={styles.featureMedia}>
              <Image
                src="/assets/business-delivery.jpg"
                alt="HIILLA delivery rider on duty"
                width={560}
                height={400}
                className={styles.featureImg}
              />
            </div>
            <div className={styles.featureBody}>
              <h4>
                <strong>Delivery tailored for every business – onboard, set up orders, and trust ‘HIILLA Go’ to deliver.</strong>
              </h4>
              <ul className={styles.featureList}>
                <li>Our Riders are always around the corner so you won’t be kept waiting on your next delivery.</li>
                <li>Relax with the assurance that your parcel is not only safe but it is our number one priority.</li>
                <li>Our Riders will navigate the best routes to ensure your delivery gets to the destination in time.</li>
                <li>No matter the distance, we are cost-efficient and professional.</li>
                <li>Our Riders accept cashless transactions alongside many other payment options available in-app.</li>
              </ul>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>
                Download <strong>HIILLA XBid</strong> to make your delivery:
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <AppBadges theme="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How-to Video Showcase ── */}
      <section className="section section-dark">
        <div className="container text-center">
          <h3 style={{ marginBottom: 40, color: '#FFFFFF' }}>
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

      {/* ── Final Call to Action ── */}
      <section className={styles.ctaBanner}>
        <div className="container text-center">
          <h2 className={styles.ctaTitle}>
            Let us take on your<br />next delivery.
          </h2>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/become-a-rider" className="btn btn-primary">
              Become a Dispatch
            </Link>
            <Link href="/become-a-fleet" className="btn btn-light">
              Become a Fleet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
