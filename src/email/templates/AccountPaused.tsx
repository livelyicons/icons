import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../components/Layout';

interface AccountPausedProps {
  userName: string;
}

export function AccountPaused({ userName }: AccountPausedProps) {
  return (
    <EmailLayout preview="Update your payment to restore access">
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Your Lively Icons Pro account has been paused
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, after multiple payment attempts, we were unable to
        process your subscription renewal.
      </Text>

      <Section
        className="my-6 rounded-lg p-6"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
      >
        <Text className="text-sm font-semibold m-0 mb-2" style={{ color: '#ffffff' }}>
          What this means
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • Your account has been downgraded to the Free plan
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • Your icons and data are still safely stored
        </Text>
        <Text className="text-sm m-0" style={{ color: '#888888' }}>
          • Update your payment method to restore Pro access instantly
        </Text>
      </Section>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        We&apos;d love to have you back. Update your payment method and your
        Pro features will be restored immediately.
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
          Update Payment
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default AccountPaused;
