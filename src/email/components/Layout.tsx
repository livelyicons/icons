import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://livelyicons.com';

const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        brand: '#00ff88',
        dark: '#0a0a0a',
        muted: '#888888',
      },
    },
  },
};

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind config={tailwindConfig}>
        <Body className="bg-dark font-sans" style={{ backgroundColor: '#0a0a0a' }}>
          <Container className="mx-auto max-w-[560px] px-4 py-8">
            <Section className="mb-8">
              <Text
                className="text-2xl font-bold m-0"
                style={{ color: '#00ff88' }}
              >
                LivelyIcons
              </Text>
            </Section>

            {children}

            <Hr className="my-8" style={{ borderColor: '#333' }} />
            <Section>
              <Text className="text-xs m-0" style={{ color: '#888888' }}>
                © 2026 LivelyIcons. All rights reserved.
              </Text>
              <Link
                href={`${APP_URL}/settings/notifications`}
                className="text-xs underline"
                style={{ color: '#888888' }}
              >
                Unsubscribe
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export { APP_URL };
