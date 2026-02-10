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

interface UpgradeConfirmationEmailProps {
  userName: string;
  planName: string;
  monthlyTokens: number;
}

export default function UpgradeConfirmationEmail({
  userName,
  planName,
  monthlyTokens,
}: UpgradeConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`You've upgraded to ${planName} — ${monthlyTokens} tokens/month!`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Upgrade Confirmed</Text>
            <Text style={text}>
              Hi {userName},
            </Text>
            <Text style={text}>
              You're now on the <strong>{planName}</strong> plan with{' '}
              <strong>{monthlyTokens} tokens per month</strong>. Your tokens are ready to use
              immediately.
            </Text>
            <Text style={text}>
              Here's what you've unlocked:
            </Text>
            <Text style={listItem}>Unlimited icon library storage</Text>
            <Text style={listItem}>Priority generation queue</Text>
            <Text style={listItem}>All export formats (React, Vue, SVG, HTML)</Text>
            <Text style={listItem}>Token rollover between months</Text>
            <Button style={button} href="https://livelyicons.com/playground?tab=ai-generate">
              Start Generating
            </Button>
            <Hr style={hr} />
            <Text style={footer}>
              Manage your subscription anytime from{' '}
              <a href="https://livelyicons.com/playground" style={{ color: '#00ff88' }}>
                your dashboard
              </a>.
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
const listItem = { fontSize: '14px', color: '#a0a0a0', margin: '0 0 8px', paddingLeft: '16px' };
const button = {
  backgroundColor: '#00ff88',
  color: '#000000',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '8px',
};
const hr = { borderColor: '#222', margin: '24px 0' };
const footer = { fontSize: '13px', color: '#555', margin: '0' };
