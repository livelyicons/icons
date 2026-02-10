'use client';

import { SignIn } from '@clerk/nextjs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-6">
        <p className="text-silver text-sm text-center max-w-xs">
          Sign in to try AI generation (no credit card required)
        </p>
        <SignIn routing="hash" />
      </div>
    </div>
  );
}
