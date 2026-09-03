import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fleet Partner Onboarding Application',
  description: 'Register your logistics company or fleet of delivery vehicles with HIILLA.',
};

export default function FleetOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
