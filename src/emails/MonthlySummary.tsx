import {
  Button,
  Heading,
  Hr,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { EmailLayout, APP_URL } from '../email/components/Layout';

interface TeamStats {
  teamName: string;
  teamGenerations: number;
  teamTokensUsed: number;
  mostActiveMember: string | null;
}

interface MonthlySummaryProps {
  userName: string;
  month: string;
  totalGenerations: number;
  totalExports: number;
  mostUsedStyle: string | null;
  tokensUsed: number;
  tokensRemaining: number;
  planType: string;
  teamStats?: TeamStats[];
}

export function MonthlySummary({
  userName,
  month,
  totalGenerations,
  totalExports,
  mostUsedStyle,
  tokensUsed,
  tokensRemaining,
  planType,
  teamStats,
}: MonthlySummaryProps) {
  return (
    <EmailLayout preview={`Your ${month} icon generation summary`}>
      <Heading
        className="text-2xl font-bold mb-4"
        style={{ color: '#ffffff' }}
      >
        Your {month} Summary
      </Heading>

      <Text className="text-base leading-6" style={{ color: '#ffffff' }}>
        Hey {userName}, here&apos;s a quick look at what you created last month.
      </Text>

      <Section
        className="my-6 rounded-lg p-6"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
      >
        <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <Text className="text-sm m-0" style={{ color: '#888888' }}>
                  Icons Generated
                </Text>
                <Text className="text-2xl font-bold m-0" style={{ color: '#00ff88' }}>
                  {totalGenerations}
                </Text>
              </td>
              <td style={{ padding: '8px 0' }}>
                <Text className="text-sm m-0" style={{ color: '#888888' }}>
                  Exports
                </Text>
                <Text className="text-2xl font-bold m-0" style={{ color: '#00ff88' }}>
                  {totalExports}
                </Text>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}>
                <Text className="text-sm m-0" style={{ color: '#888888' }}>
                  Tokens Used
                </Text>
                <Text className="text-2xl font-bold m-0" style={{ color: '#ffffff' }}>
                  {tokensUsed}
                </Text>
              </td>
              <td style={{ padding: '8px 0' }}>
                <Text className="text-sm m-0" style={{ color: '#888888' }}>
                  Tokens Remaining
                </Text>
                <Text className="text-2xl font-bold m-0" style={{ color: '#ffffff' }}>
                  {tokensRemaining}
                </Text>
              </td>
            </tr>
          </tbody>
        </table>

        {mostUsedStyle && (
          <>
            <Hr style={{ borderColor: '#333', margin: '12px 0' }} />
            <Text className="text-sm m-0" style={{ color: '#888888' }}>
              Most Used Style
            </Text>
            <Text className="text-lg font-semibold m-0" style={{ color: '#ffffff', textTransform: 'capitalize' }}>
              {mostUsedStyle}
            </Text>
          </>
        )}
      </Section>

      {teamStats && teamStats.length > 0 && teamStats.map((ts) => (
        <Section
          key={ts.teamName}
          className="my-6 rounded-lg p-6"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
        >
          <Text className="text-sm font-semibold m-0 mb-3" style={{ color: '#22c55e' }}>
            Team: {ts.teamName}
          </Text>
          <table cellPadding={0} cellSpacing={0} style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ padding: '4px 0' }}>
                  <Text className="text-sm m-0" style={{ color: '#888888' }}>Team Generations</Text>
                  <Text className="text-xl font-bold m-0" style={{ color: '#ffffff' }}>{ts.teamGenerations}</Text>
                </td>
                <td style={{ padding: '4px 0' }}>
                  <Text className="text-sm m-0" style={{ color: '#888888' }}>Team Tokens Used</Text>
                  <Text className="text-xl font-bold m-0" style={{ color: '#ffffff' }}>{ts.teamTokensUsed}</Text>
                </td>
              </tr>
            </tbody>
          </table>
          {ts.mostActiveMember && (
            <>
              <Hr style={{ borderColor: '#333', margin: '8px 0' }} />
              <Text className="text-sm m-0" style={{ color: '#888888' }}>Most Active Member</Text>
              <Text className="text-base font-semibold m-0" style={{ color: '#ffffff' }}>{ts.mostActiveMember}</Text>
            </>
          )}
        </Section>
      ))}

      <Section className="my-8 text-center">
        <Button
          href={`${APP_URL}/playground?tab=ai-generate`}
          className="rounded-lg px-6 py-3 text-sm font-semibold no-underline"
          style={{
            backgroundColor: '#00ff88',
            color: '#0a0a0a',
          }}
        >
          Generate More Icons
        </Button>
      </Section>

      <Text className="text-sm" style={{ color: '#888888' }}>
        You&apos;re on the <strong style={{ color: '#ffffff', textTransform: 'capitalize' }}>{planType}</strong> plan.
        {planType === 'pro' && ' Need more tokens? Upgrade to Team for 2,000 monthly tokens.'}
      </Text>
    </EmailLayout>
  );
}

export default MonthlySummary;
