import {
  Button,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../components/Layout';

interface WelcomeProps {
  userName: string;
}

export function Welcome({ userName }: WelcomeProps) {
  return (
    <EmailLayout preview="Your AI icon generation journey starts here">
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Welcome to Lively Icons!
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, we&apos;re excited to have you on board!
      </Text>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Lively Icons lets you generate beautiful, animated icons using AI.
        Your account comes with <strong style={{ color: '#00ff88' }}>5 free generations</strong> to
        get you started.
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
          Start Generating
        </Button>
      </Section>

      <Text className="text-sm" style={{ color: '#888888' }}>
        Need help getting started? Check out our docs or reach out to support
        — we&apos;re always happy to help.
      </Text>
    </EmailLayout>
  );
}

export default Welcome;
