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

interface TokenBalanceLowEmailProps {
  userName: string;
  tokensRemaining: number;
  refreshDate: string;
}

export default function TokenBalanceLowEmail({
  userName,
  tokensRemaining,
  refreshDate,
}: TokenBalanceLowEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`You have ${tokensRemaining} tokens remaining`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Low Token Balance</Text>
            <Text style={text}>
              Hi {userName},
            </Text>
            <Text style={text}>
              You have <strong>{tokensRemaining} tokens</strong> remaining. Your tokens will
              refresh on <strong>{refreshDate}</strong>.
            </Text>
            <Text style={text}>
              Need more tokens now? Top up your balance instantly:
            </Text>
            <Button style={button} href="https://livelyicons.com/pricing#topup">
              Buy Token Pack
            </Button>
            <Hr style={hr} />
            <Text style={footer}>
              Token packs start at $5 for 50 tokens and never expire.
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
const heading = { fontSize: '24px', fontWeight: '700', color: '#ffaa00', margin: '0 0 16px' };
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
