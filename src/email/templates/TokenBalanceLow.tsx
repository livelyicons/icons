import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../components/Layout';

interface TokenBalanceLowProps {
  userName: string;
  tokensRemaining: number;
  refreshDate: string;
}

export function TokenBalanceLow({
  userName,
  tokensRemaining,
  refreshDate,
}: TokenBalanceLowProps) {
  return (
    <EmailLayout preview={`You have ${tokensRemaining} tokens remaining`}>
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Running low on tokens
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, you have{' '}
        <strong style={{ color: '#00ff88' }}>
          {tokensRemaining} token{tokensRemaining === 1 ? '' : 's'}
        </strong>{' '}
        remaining. Your tokens will refresh on{' '}
        <strong style={{ color: '#ffffff' }}>{refreshDate}</strong>.
      </Text>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Need more tokens before then? You can purchase a top-up pack or
        upgrade your plan for a higher monthly allowance.
      </Text>

      <Section className="my-8 text-center">
        <Button
          href={`${APP_URL}/settings/billing`}
          className="rounded-lg px-6 py-3 text-sm font-semibold no-underline"
          style={{
            backgroundColor: '#00ff88',
            color: '#0a0a0a',
          }}
        >
          Buy More Tokens
        </Button>
      </Section>

      <Section className="text-center">
        <Button
          href={`${APP_URL}/pricing`}
          className="rounded-lg px-6 py-3 text-sm font-semibold no-underline"
          style={{
            backgroundColor: 'transparent',
            color: '#00ff88',
            border: '1px solid #00ff88',
          }}
        >
          Manage Plan
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default TokenBalanceLow;
