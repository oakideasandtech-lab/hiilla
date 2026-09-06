'use client';

import React, { useEffect } from 'react';
import { RECAPTCHA_SITE_KEY } from '@/lib/constants';

interface GoogleReCaptchaProps {
  action?: string;
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render?: any;
    };
  }
}

/**
 * Execute reCAPTCHA v3 to obtain verification token
 */
export async function executeRecaptcha(action: string = 'submit'): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  return new Promise((resolve) => {
    const checkAndExecute = () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        const grecaptcha = window.grecaptcha;
        grecaptcha.ready(async () => {
          try {
            const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
            resolve(token);
          } catch (err) {
            console.warn('reCAPTCHA execution error:', err);
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    };

    if (window.grecaptcha) {
      checkAndExecute();
    } else {
      // Wait briefly for script to finish initializing if just mounted
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.grecaptcha) {
          clearInterval(interval);
          checkAndExecute();
        } else if (attempts > 20) {
          clearInterval(interval);
          resolve(null);
        }
      }, 100);
    }
  });
}

export default function GoogleReCaptchaBadge() {
  useEffect(() => {
    const scriptId = 'google-recaptcha-v3-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: 14, lineHeight: 1.5 }}>
      This site is protected by reCAPTCHA and the Google{' '}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#059669', textDecoration: 'underline' }}
      >
        Privacy Policy
      </a>{' '}
      and{' '}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#059669', textDecoration: 'underline' }}
      >
        Terms of Service
      </a>{' '}
      apply.
    </p>
  );
}
