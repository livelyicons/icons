import type { Metadata } from 'next';
import { PricingPageClient } from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Generate custom animated icons with AI. Free to start, Pro and Team plans for professionals.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
