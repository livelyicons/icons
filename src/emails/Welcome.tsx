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

interface WelcomeEmailProps {
  userName: string;
  freeTokens: number;
}

export default function WelcomeEmail({ userName, freeTokens }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Lively Icons — your free tokens are ready!</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Welcome to Lively Icons</Text>
            <Text style={text}>
              Hi {userName},
            </Text>
            <Text style={text}>
              Thanks for signing up! You have <strong>{freeTokens} free tokens</strong> to
              start generating custom animated icons with AI.
            </Text>
            <Text style={text}>
              Head to the playground to create your first icon:
            </Text>
            <Button style={button} href="https://livelyicons.com/playground?tab=ai-generate">
              Open Playground
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
