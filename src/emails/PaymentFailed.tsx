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

interface PaymentFailedEmailProps {
  userName: string;
  planName: string;
  retryDate: string;
}

export default function PaymentFailedEmail({
  userName,
  planName,
  retryDate,
}: PaymentFailedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Action needed: Payment failed for your {planName} plan</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Payment Failed</Text>
            <Text style={text}>
              Hi {userName},
            </Text>
            <Text style={text}>
              We were unable to process your payment for the <strong>{planName}</strong> plan.
              Your account remains active, but we'll retry the payment on{' '}
              <strong>{retryDate}</strong>.
            </Text>
            <Text style={text}>
              To avoid any interruption, please update your payment method:
            </Text>
            <Button style={button} href="https://livelyicons.com/api/stripe/portal">
              Update Payment Method
            </Button>
            <Hr style={hr} />
            <Text style={footer}>
              If your payment continues to fail, your account will be downgraded to the Free
              plan after 3 retry attempts.
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
const heading = { fontSize: '24px', fontWeight: '700', color: '#ff4444', margin: '0 0 16px' };
const text = { fontSize: '15px', lineHeight: '24px', color: '#a0a0a0', margin: '0 0 16px' };
const button = {
  backgroundColor: '#ff4444',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block',
};
const hr = { borderColor: '#222', margin: '24px 0' };
const footer = { fontSize: '13px', color: '#555', margin: '0' };
