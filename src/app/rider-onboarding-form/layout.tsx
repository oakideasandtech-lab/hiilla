import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rider & Dispatch Onboarding | HIILLA',
  description:
    'Join HIILLA Transit Services as a registered dispatch rider or delivery driver. Complete your onboarding form to start earning across Lagos.',
};

export default function RiderOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
