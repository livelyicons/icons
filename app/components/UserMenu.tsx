'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export function UserMenu() {
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-sm text-silver hover:text-electric transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
