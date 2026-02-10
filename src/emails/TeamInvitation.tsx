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

interface TeamInvitationEmailProps {
  inviterName: string;
  teamName: string;
  role: string;
  acceptUrl: string;
  expiresIn: string;
}

export default function TeamInvitationEmail({
  inviterName,
  teamName,
  role,
  acceptUrl,
  expiresIn,
}: TeamInvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{inviterName} invited you to join {teamName} on Lively Icons</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>You&apos;re invited to join a team</Text>
            <Text style={text}>
              <strong>{inviterName}</strong> has invited you to join <strong>{teamName}</strong> as
              a <strong>{role}</strong> on Lively Icons.
            </Text>
            <Text style={text}>
              As a team member, you&apos;ll have access to shared icon libraries, collections, and
              style templates.
            </Text>
            <Button style={button} href={acceptUrl}>
              Accept Invitation
            </Button>
            <Text style={smallText}>
              This invitation expires in {expiresIn}. If you don&apos;t have a Lively Icons account,
              you&apos;ll be prompted to create one first.
            </Text>
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
const smallText = { fontSize: '13px', lineHeight: '20px', color: '#666', margin: '16px 0 0' };
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
