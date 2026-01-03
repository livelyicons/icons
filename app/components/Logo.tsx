export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background gradient - deep forest */}
        <linearGradient id="logoBg" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
        {/* Vine gradient - fresh growth */}
        <linearGradient id="vineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        {/* Leaf gradient */}
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="32" height="32" rx="7" fill="url(#logoBg)" />

      {/* Main vine stem - curved L shape suggesting growth */}
      <path
        d="M10 24 C10 18, 10 14, 14 10 C16 8, 19 8, 22 9"
        stroke="url(#vineGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Small tendril curl */}
      <path
        d="M22 9 C23 7, 25 7, 25 9"
        stroke="url(#vineGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Primary leaf - unfurling at the top */}
      <path
        d="M18 11 C20 8, 24 9, 23 13 C22 15, 19 14, 18 11"
        fill="url(#leafGradient)"
      />

      {/* Secondary small leaf on stem */}
      <path
        d="M12 17 C10 15, 11 13, 14 14 C15 15, 14 17, 12 17"
        fill="url(#leafGradient)"
        opacity="0.8"
      />

      {/* Tiny bud/node - suggesting new growth */}
      <circle cx="10" cy="24" r="1.5" fill="#86efac" />

      {/* Highlight dot on main leaf */}
      <circle cx="20" cy="10.5" r="0.8" fill="white" opacity="0.6" />
    </svg>
  )
}

export function LogoWithText({ iconSize = 32 }: { iconSize?: number }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={iconSize} />
      <span className="font-display font-bold text-lg">
        <span className="text-leaf-bright">
          Lively
        </span>
        <span className="text-bone">Icons</span>
      </span>
    </div>
  )
}
