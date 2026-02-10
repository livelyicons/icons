import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../components/Layout';

interface ProAccessWarningProps {
  userName: string;
}

export function ProAccessWarning({ userName }: ProAccessWarningProps) {
  return (
    <EmailLayout preview="Update your payment to avoid service interruption">
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Your Pro access will be paused in 7 days
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, we&apos;ve been unable to process your payment after
        multiple attempts.
      </Text>

      <Section
        className="my-6 rounded-lg p-6"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
      >
        <Text className="text-sm font-semibold m-0 mb-2" style={{ color: '#ffffff' }}>
          What happens next
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • In 7 days, your account will be downgraded to the Free plan
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • You&apos;ll lose access to Pro features including unlimited generation
        </Text>
        <Text className="text-sm m-0" style={{ color: '#888888' }}>
          • Your existing icons and data will be preserved
        </Text>
      </Section>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Update your payment method now to keep uninterrupted access to all
        Pro features.
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

export default ProAccessWarning;
