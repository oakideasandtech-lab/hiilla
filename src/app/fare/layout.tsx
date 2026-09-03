import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delivery Fare Estimates',
  description: 'Enter your pickup and drop-off locations to get an estimated delivery fare across Lagos with HIILLA.',
};

export default function FareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
