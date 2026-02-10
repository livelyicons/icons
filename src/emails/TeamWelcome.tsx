import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface TeamWelcomeEmailProps {
  userName: string;
  teamName: string;
  teamSlug: string;
  role: string;
}

export default function TeamWelcomeEmail({
  userName,
  teamName,
  teamSlug,
  role,
}: TeamWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {teamName} on Lively Icons!</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Welcome to {teamName}!</Text>
            <Text style={text}>
              Hi {userName},
            </Text>
            <Text style={text}>
              You&apos;ve joined <strong>{teamName}</strong> as a <strong>{role}</strong>.
              You now have access to the team&apos;s shared icon library, collections, and style templates.
            </Text>
            <Button style={button} href={`https://livelyicons.com/team/${teamSlug}`}>
              Open Team Dashboard
            </Button>
            <Hr style={hr} />
            <Text style={footer}>
              Lively Icons — Beautiful animated icons for modern interfaces.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: '#0a0a0a', fontFamily: 'system-ui, sans-serif' };
const container = { maxWidth: '560px', margin: '0 auto', padding: '40px 20px' };
const section = { backgroundColor: '#141414', borderRadius: '16px', padding: '32px', border: '1px solid #222' };
const heading = { fontSize: '24px', fontWeight: '700', color: '#ffffff', margin: '0 0 16px' };
const text = { fontSize: '15px', lineHeight: '24px', color: '#a0a0a0', margin: '0 0 16px' };
const button = {
  backgroundColor: '#00ff88',
  color: '#000000',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
};
const hr = { borderColor: '#222', margin: '24px 0' };
const footer = { fontSize: '13px', color: '#555', margin: '0' };
