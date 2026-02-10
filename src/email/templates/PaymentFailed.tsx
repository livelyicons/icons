import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../components/Layout';

interface PaymentFailedProps {
  userName: string;
}

export function PaymentFailed({ userName }: PaymentFailedProps) {
  return (
    <EmailLayout preview="Please update your payment method">
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Action required: Payment failed
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, we were unable to process your latest payment for
        Lively Icons Pro.
      </Text>

      <Section
        className="my-6 rounded-lg p-6"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
      >
        <Text className="text-sm font-semibold m-0 mb-2" style={{ color: '#ffffff' }}>
          What happens next?
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • We&apos;ll retry the payment in a few days
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • Your Pro features remain active during the retry period
        </Text>
        <Text className="text-sm m-0" style={{ color: '#888888' }}>
          • If payment continues to fail, your account will be downgraded
        </Text>
      </Section>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Please update your payment method to avoid any interruption to your
        service.
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
          Update Payment Method
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default PaymentFailed;
