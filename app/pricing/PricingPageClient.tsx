'use client';

import { useState } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Free',
    description: 'Try AI icon generation',
    monthlyPrice: 0,
    annualPrice: 0,
    tokens: '5 lifetime tokens',
    features: [
      '5 one-time generation tokens',
      'Basic styles (line, solid, outline)',
      'SVG export',
      '20 icon library slots',
      'Community support',
    ],
    cta: 'Get Started',
    highlighted: false,
    priceIdKey: null,
  },
  {
    name: 'Pro',
    description: 'For individual creators',
    monthlyPrice: 19,
    annualPrice: 190,
    tokens: '500 tokens/month',
    features: [
      '500 monthly generation tokens',
      'All 7 icon styles',
      'All export formats (React, Vue, SVG, HTML)',
      'Unlimited icon library',
      'Token rollover (up to 1,000)',
      'Priority generation queue',
      'Custom animations',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
    priceIdKey: {
      monthly: 'NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID',
      annual: 'NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID',
    },
  },
  {
    name: 'Team',
    description: 'For design teams',
    monthlyPrice: 49,
    annualPrice: 490,
    tokens: '2,000 tokens/month',
    features: [
      '2,000 monthly generation tokens',
      'Everything in Pro',
      'Up to 5 team seats',
      'Shared icon collections',
      'Token rollover (up to 5,000)',
      'Batch generation (up to 20)',
      'CDN-hosted icons (500)',
      'Priority support',
    ],
    cta: 'Start Team Trial',
    highlighted: false,
    priceIdKey: {
      monthly: 'NEXT_PUBLIC_STRIPE_TEAM_MONTHLY_PRICE_ID',
      annual: 'NEXT_PUBLIC_STRIPE_TEAM_ANNUAL_PRICE_ID',
    },
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions',
    monthlyPrice: null,
    annualPrice: null,
    tokens: 'Unlimited tokens',
    features: [
      'Unlimited generation tokens',
      'Everything in Team',
      'Unlimited seats',
      'Custom AI model training',
      'Brand style enforcement',
      'SSO / SAML',
      'SLA & dedicated support',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    highlighted: false,
    priceIdKey: null,
  },
] as const;

const TOKEN_PACKS = [
  { name: 'Small', tokens: 50, price: 5 },
  { name: 'Medium', tokens: 200, price: 15 },
  { name: 'Large', tokens: 500, price: 35 },
];

const FAQ = [
  {
    q: 'What is a token?',
    a: 'Each AI icon generation costs 1 token. Refining an existing icon costs 0.5 tokens. Exporting in any format is free.',
  },
  {
    q: 'Do unused tokens roll over?',
    a: 'Pro tokens roll over for 1 month (max 1,000 banked). Team tokens roll over for 3 months (max 5,000 banked). Top-up tokens never expire.',
  },
  {
    q: 'Can I upgrade or downgrade anytime?',
    a: 'Yes. Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your current billing period.',
  },
  {
    q: 'What icon styles are available?',
    a: 'Free users get line, solid, and outline. Pro and Team users get all 7 styles: line, solid, outline, duotone, pixel art, isometric, and hand-drawn.',
  },
  {
    q: 'What export formats are supported?',
    a: 'Free users can export SVG. Paid users get React TSX (with Motion animations), Vue SFC, static SVG, and vanilla HTML/CSS.',
  },
  {
    q: 'Is there a free trial?',
    a: "The Free plan gives you 5 lifetime tokens to try the service. No credit card required. If you upgrade, you'll get your full monthly allocation immediately.",
  },
];

export function PricingPageClient() {
  const { isSignedIn } = useUser();
  const [annual, setAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (priceIdKey: { monthly: string; annual: string } | null) => {
    if (!priceIdKey) return;

    const envKey = annual ? priceIdKey.annual : priceIdKey.monthly;
    const priceId = getEnvVar(envKey);
    if (!priceId) return;

    setLoadingPlan(envKey);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleTopUp = async (packIndex: number) => {
    setLoadingPlan(`topup-${packIndex}`);
    try {
      const res = await fetch('/api/stripe/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packIndex }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Top-up error:', err);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            Lively Icons
          </Link>
          <Link
            href="/playground"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Playground
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Generate custom icons with{' '}
            <span className="text-[#00ff88]">AI</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Describe any icon and get a production-ready animated SVG in seconds.
            Start free, scale with your team.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              annual ? 'bg-[#00ff88]' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                annual ? 'translate-x-6' : ''
              }`}
            />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-white/40'}`}>
            Annual{' '}
            <span className="text-[#00ff88] text-xs font-medium">Save ~17%</span>
          </span>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 ${
                plan.highlighted
                  ? 'bg-[#00ff88]/5 border-2 border-[#00ff88]/40'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00ff88] text-black text-xs font-semibold">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-sm text-white/50 mb-4">{plan.description}</p>

              <div className="mb-4">
                {plan.monthlyPrice !== null ? (
                  <>
                    <span className="text-3xl font-bold">
                      ${annual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                    </span>
                    <span className="text-white/40 text-sm">/month</span>
                    {annual && plan.annualPrice > 0 && (
                      <p className="text-xs text-white/30 mt-1">
                        ${plan.annualPrice}/year billed annually
                      </p>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold">Custom</span>
                )}
              </div>

              <p className="text-sm text-[#00ff88] mb-6">{plan.tokens}</p>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-white/70">
                    <svg
                      className="w-4 h-4 text-[#00ff88] mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.name === 'Free' ? (
                isSignedIn ? (
                  <Link
                    href="/playground?tab=ai-generate"
                    className="block w-full py-2.5 rounded-lg border border-white/20 text-center text-sm font-medium text-white hover:bg-white/5 transition-colors"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <SignInButton mode="modal">
                    <button className="w-full py-2.5 rounded-lg border border-white/20 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                      {plan.cta}
                    </button>
                  </SignInButton>
                )
              ) : plan.name === 'Enterprise' ? (
                <a
                  href="mailto:sales@livelyicons.com"
                  className="block w-full py-2.5 rounded-lg border border-white/20 text-center text-sm font-medium text-white hover:bg-white/5 transition-colors"
                >
                  {plan.cta}
                </a>
              ) : isSignedIn ? (
                <button
                  onClick={() => handleCheckout(plan.priceIdKey)}
                  disabled={loadingPlan !== null}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 ${
                    plan.highlighted
                      ? 'bg-[#00ff88] text-black hover:bg-[#00ff88]/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {loadingPlan ? 'Redirecting...' : plan.cta}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      plan.highlighted
                        ? 'bg-[#00ff88] text-black hover:bg-[#00ff88]/90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Sign in to Subscribe
                  </button>
                </SignInButton>
              )}
            </div>
          ))}
        </div>

        {/* Token Top-Up Section */}
        <section id="topup" className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Need More Tokens?</h2>
            <p className="text-white/50">
              Buy token packs anytime. Top-up tokens never expire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {TOKEN_PACKS.map((pack, index) => (
              <div
                key={pack.name}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center"
              >
                <h3 className="font-medium mb-1">{pack.name} Pack</h3>
                <p className="text-2xl font-bold mb-1">{pack.tokens} tokens</p>
                <p className="text-white/40 text-sm mb-4">${pack.price} one-time</p>
                <p className="text-xs text-white/30 mb-4">
                  ${(pack.price / pack.tokens).toFixed(2)}/token
                </p>
                {isSignedIn ? (
                  <button
                    onClick={() => handleTopUp(index)}
                    disabled={loadingPlan !== null}
                    className="w-full py-2 rounded-lg bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                    {loadingPlan === `topup-${index}` ? 'Redirecting...' : 'Buy Now'}
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button className="w-full py-2 rounded-lg bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                      Sign in to Buy
                    </button>
                  </SignInButton>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="font-medium mb-2">{item.q}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-white/30">
          <Link href="/" className="hover:text-white/50">
            Lively Icons
          </Link>
          {' · '}
          <Link href="/playground" className="hover:text-white/50">
            Playground
          </Link>
          {' · '}
          <Link href="/pricing" className="hover:text-white/50">
            Pricing
          </Link>
        </div>
      </footer>
    </div>
  );
}

function getEnvVar(key: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return (process.env as Record<string, string | undefined>)[key];
}
