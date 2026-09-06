import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rider & Dispatch Onboarding Application',
  description: 'Join the HIILLA dispatch rider network and start earning across Lagos.',
};

export default function FleetOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
