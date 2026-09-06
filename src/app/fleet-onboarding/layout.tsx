import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fleet Partner Onboarding | HIILLA',
  description:
    'Register your logistics company or bike fleet with HIILLA. Access the corporate dispatch console and scale your delivery operations in Lagos.',
};

export default function FleetOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
