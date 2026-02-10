import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../components/Layout';

interface UpgradeConfirmationProps {
  userName: string;
  planName: string;
  tokensBalance: number;
}

export function UpgradeConfirmation({
  userName,
  planName,
  tokensBalance,
}: UpgradeConfirmationProps) {
  return (
    <EmailLayout preview="Your Pro plan is active">
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Welcome to Lively Icons Pro!
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, your upgrade to the{' '}
        <strong style={{ color: '#00ff88' }}>{planName}</strong> plan is confirmed
        and active.
      </Text>

      <Section
        className="my-6 rounded-lg p-6"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
      >
        <Text className="text-sm m-0 mb-2" style={{ color: '#888888' }}>
          Plan details
        </Text>
        <Text className="text-base font-semibold m-0 mb-1" style={{ color: '#ffffff' }}>
          {planName}
        </Text>
        <Text className="text-sm m-0" style={{ color: '#888888' }}>
          Token balance:{' '}
          <strong style={{ color: '#00ff88' }}>{tokensBalance} tokens</strong>
        </Text>
      </Section>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        You now have access to unlimited icon generation, custom templates, CDN
        hosting, and priority support.
      </Text>

      <Section className="my-8 text-center">
        <Button
          href={`${APP_URL}/playground?tab=ai-generate`}
          className="rounded-lg px-6 py-3 text-sm font-semibold no-underline"
          style={{
            backgroundColor: '#00ff88',
            color: '#0a0a0a',
          }}
        >
          Open Generator
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default UpgradeConfirmation;
