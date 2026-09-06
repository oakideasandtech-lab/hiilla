'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RECAPTCHA_SITE_KEY } from '@/lib/constants';

interface GoogleReCaptchaProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
}

declare global {
  interface Window {
    grecaptcha?: any;
    onRecaptchaLoadCallback?: () => void;
  }
}

export default function GoogleReCaptcha({
  siteKey = RECAPTCHA_SITE_KEY,
  onVerify,
  onExpire,
  onError,
  theme = 'light',
}: GoogleReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists in document
    const scriptId = 'google-recaptcha-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const renderWidget = () => {
      if (window.grecaptcha && window.grecaptcha.render && containerRef.current) {
        // Prevent duplicate rendering
        if (widgetIdRef.current !== null) {
          try {
            window.grecaptcha.reset(widgetIdRef.current);
          } catch (e) {
            // Widget might not exist anymore
          }
          return;
        }

        try {
          const id = window.grecaptcha.render(containerRef.current, {
            sitekey: siteKey,
            theme: theme,
            callback: (token: string) => {
              onVerify(token);
            },
            'expired-callback': () => {
              if (onExpire) onExpire();
            },
            'error-callback': () => {
              if (onError) onError();
            },
          });
          widgetIdRef.current = id;
          setIsLoaded(true);
        } catch (err) {
          console.warn('reCAPTCHA render error:', err);
        }
      }
    };

    if (!script) {
      window.onRecaptchaLoadCallback = () => {
        renderWidget();
      };

      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      if (window.grecaptcha && window.grecaptcha.render) {
        renderWidget();
      } else {
        const prevCallback = window.onRecaptchaLoadCallback;
        window.onRecaptchaLoadCallback = () => {
          if (prevCallback) prevCallback();
          renderWidget();
        };
      }
    }

    return () => {
      // Cleanup if necessary
    };
  }, [siteKey, onVerify, onExpire, onError, theme]);

  return (
    <div style={{ margin: '16px 0', minHeight: 78, display: 'flex', justifyContent: 'flex-start' }}>
      <div ref={containerRef} />
    </div>
  );
}
