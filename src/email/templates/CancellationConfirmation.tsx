import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../components/Layout';

interface CancellationConfirmationProps {
  userName: string;
  accessEndDate: string;
}

export function CancellationConfirmation({
  userName,
  accessEndDate,
}: CancellationConfirmationProps) {
  return (
    <EmailLayout preview={`Your access continues until ${accessEndDate}`}>
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Your subscription has been canceled
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, your Lively Icons Pro subscription has been canceled
        as requested.
      </Text>

      <Section
        className="my-6 rounded-lg p-6"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
      >
        <Text className="text-sm font-semibold m-0 mb-2" style={{ color: '#ffffff' }}>
          What you need to know
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • Pro features remain active until{' '}
          <strong style={{ color: '#ffffff' }}>{accessEndDate}</strong>
        </Text>
        <Text className="text-sm m-0 mb-1" style={{ color: '#888888' }}>
          • After that, your account will switch to the Free plan
        </Text>
        <Text className="text-sm m-0" style={{ color: '#888888' }}>
          • Your icons and data will be preserved
        </Text>
      </Section>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Changed your mind? You can reactivate your subscription at any time
        before {accessEndDate} to keep your Pro access.
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
          Reactivate
        </Button>
      </Section>
    </EmailLayout>
  );
}

export default CancellationConfirmation;
