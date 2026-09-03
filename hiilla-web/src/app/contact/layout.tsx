import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Send us a message! Contact HIILLA Transit Services for delivery, dispatch, fleet, or business inquiries in Lagos, Nigeria.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
