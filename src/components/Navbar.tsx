'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_LINKS, APP_URL } from '@/lib/constants';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image src="/assets/logo4.png" alt="HIILLA" width={160} height={38} priority />
        </Link>

        <button
          className={styles.toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h16v1.5H4zM4 15h16v1.5H4z" /></svg>
          )}
        </button>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`} aria-label="Main navigation">
          <ul className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={APP_URL} className={styles.ctaBtn} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Open App
          </Link>
        </nav>
      </div>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />}
    </header>
  );
}
