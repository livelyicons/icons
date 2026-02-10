import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface MemberRemovedProps {
  userName: string;
  teamName: string;
  removedBy: string;
}

export function MemberRemoved({
  userName = 'Team Member',
  teamName = 'My Team',
  removedBy = 'an admin',
}: MemberRemovedProps) {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>Removed from {teamName}</Text>
            <Text style={paragraph}>Hi {userName},</Text>
            <Text style={paragraph}>
              You have been removed from the team <strong>{teamName}</strong> by {removedBy}.
            </Text>
            <Text style={paragraph}>
              You no longer have access to the team&apos;s icon library, collections, or shared templates.
              Any icons you generated for the team remain in the team library.
            </Text>
            <Text style={paragraph}>
              Your personal icon library and any icons generated under your personal account are unaffected.
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
const paragraph = { fontSize: '14px', lineHeight: '1.6', color: '#a1a1aa', marginBottom: '12px' };
const hr = { borderColor: '#27272a', margin: '24px 0' };
const footer = { fontSize: '12px', color: '#52525b', textAlign: 'center' as const };
