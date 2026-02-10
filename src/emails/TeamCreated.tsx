import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface TeamCreatedProps {
  userName: string;
  teamName: string;
  teamSlug: string;
}

export function TeamCreated({
  userName = 'Team Admin',
  teamName = 'My Team',
  teamSlug = 'my-team',
}: TeamCreatedProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://livelyicons.com';

  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Team Created!</Text>
            <Text style={paragraph}>Hi {userName},</Text>
            <Text style={paragraph}>
              Your team <strong>{teamName}</strong> has been created. Here&apos;s how to get started:
            </Text>

            <Text style={stepHeading}>1. Invite your team</Text>
            <Text style={paragraph}>
              Go to{' '}
              <Link href={`${baseUrl}/team/${teamSlug}/members`} style={link}>
                Members
              </Link>{' '}
              to invite colleagues. Each person will receive an email with a join link.
            </Text>

            <Text style={stepHeading}>2. Generate icons together</Text>
            <Text style={paragraph}>
              Team members can generate icons using your shared token pool from the{' '}
              <Link href={`${baseUrl}/playground`} style={link}>
                Playground
              </Link>
              . Select your team from the context switcher before generating.
            </Text>

            <Text style={stepHeading}>3. Share collections</Text>
            <Text style={paragraph}>
              Create collections to organize your icons and share them publicly with embed support.
            </Text>

            <Text style={stepHeading}>4. Connect Slack (optional)</Text>
            <Text style={paragraph}>
              Configure a Slack webhook in{' '}
              <Link href={`${baseUrl}/team/${teamSlug}/settings`} style={link}>
                Settings
              </Link>{' '}
              to get notified when team members generate new icons.
            </Text>

            <Hr style={hr} />
            <Text style={footer}>
              LivelyIcons — AI-Powered Animated Icon Generation
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#0a0a0a', fontFamily: 'system-ui, sans-serif' };
const container = { maxWidth: '560px', margin: '0 auto', padding: '40px 20px' };
const section = { backgroundColor: '#18181b', borderRadius: '12px', padding: '32px', border: '1px solid #27272a' };
const heading = { fontSize: '20px', fontWeight: '600' as const, color: '#ffffff', marginBottom: '16px' };
const stepHeading = { fontSize: '14px', fontWeight: '600' as const, color: '#22c55e', marginBottom: '4px' };
const paragraph = { fontSize: '14px', lineHeight: '1.6', color: '#a1a1aa', marginBottom: '12px' };
const link = { color: '#22c55e', textDecoration: 'underline' };
const hr = { borderColor: '#27272a', margin: '24px 0' };
const footer = { fontSize: '12px', color: '#52525b', textAlign: 'center' as const };
