/**
 * Static icon components for React Server Components (RSC)
 *
 * These components work without "use client" directive and render
 * as pure SVG elements with zero client-side JavaScript.
 *
 * For CSS-based animations, use the animationClass prop along with
 * the CSS animation utilities from 'motionicon/css'.
 *
 * @example
 * ```tsx
 * // Server Component (no "use client" needed)
 * import { StaticHeart, StaticStar } from 'motionicon/static';
 *
 * export default function ServerComponent() {
 *   return (
 *     <div>
 *       <StaticHeart size={24} className="text-red-500" />
 *       <StaticStar animationClass="motionicon-pulse" />
 *     </div>
 *   );
 * }
 * ```
 */

// Types
export type { StaticIconProps, StaticIconComponent } from './types';

// Factory functions
export { createStaticIcon, withStatic } from './create-static-icon';
export type { IconPathData } from './create-static-icon';

// Static icon components
export {
  // Core
  StaticCheck,
  StaticX,
  StaticPlus,
  StaticMinus,
  // Navigation
  StaticArrowLeft,
  StaticArrowRight,
  StaticChevronDown,
  StaticChevronUp,
  StaticMenu,
  StaticHome,
  // Communication
  StaticMail,
  StaticBell,
  StaticMessageCircle,
  StaticPhone,
  // Status
  StaticCheckCircle,
  StaticXCircle,
  StaticAlertCircle,
  StaticInfo,
  StaticHelpCircle,
  // Action
  StaticSearch,
  StaticSettings,
  StaticEdit,
  StaticTrash,
  StaticDownload,
  StaticUpload,
  StaticCopy,
  StaticShare,
  // Media
  StaticHeart,
  StaticStar,
  StaticThumbsUp,
  StaticThumbsDown,
  StaticEye,
  StaticEyeOff,
  // User
  StaticUser,
  StaticUsers,
  StaticLock,
  // Loading/Progress
  StaticLoader,
  StaticRefresh,
  StaticClock,
  StaticCalendar
} from './icons';
