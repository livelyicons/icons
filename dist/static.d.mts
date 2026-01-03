import * as react from 'react';

/**
 * Type definitions for static (RSC-compatible) icons
 */
/**
 * Props for static icon components
 *
 * These icons render as pure SVG elements without any client-side
 * JavaScript, making them compatible with React Server Components.
 */
interface StaticIconProps {
    /**
     * Size of the icon in pixels
     * @default 24
     */
    size?: number;
    /**
     * Stroke width for SVG paths
     * @default 2
     */
    strokeWidth?: number;
    /**
     * Additional CSS classes to apply to the icon
     */
    className?: string;
    /**
     * CSS animation class to apply (for CSS-only animations)
     * @example 'motionicon-scale', 'motionicon-bounce'
     */
    animationClass?: string;
    /**
     * Accessible label for the icon
     * When provided, sets role="img" and aria-label
     * When omitted, icon is treated as decorative with aria-hidden="true"
     */
    'aria-label'?: string;
    /**
     * Custom color for the icon stroke
     * @default 'currentColor'
     */
    color?: string;
    /**
     * Additional SVG attributes to pass through
     */
    style?: React.CSSProperties;
}
/**
 * Static icon component type
 */
type StaticIconComponent = React.FC<StaticIconProps>;

/**
 * Factory function to create static (RSC-compatible) icon components
 *
 * Static icons are pure SVG components with zero client-side JavaScript.
 * They can be used in React Server Components without "use client".
 */

/**
 * SVG path data for creating static icons
 */
interface IconPathData {
    /**
     * SVG path elements (d attribute values or element definitions)
     */
    paths: react.ReactNode;
    /**
     * Optional viewBox (defaults to "0 0 24 24")
     */
    viewBox?: string;
}
/**
 * Create a static icon component from SVG path data
 *
 * The resulting component is RSC-compatible and can be used
 * in Server Components without any client-side JavaScript.
 *
 * @param name - Display name for the component
 * @param pathData - SVG path data
 * @returns A static icon component
 *
 * @example
 * ```tsx
 * const StaticCheckIcon = createStaticIcon('StaticCheck', {
 *   paths: (
 *     <>
 *       <polyline points="20 6 9 17 4 12" />
 *     </>
 *   )
 * });
 *
 * // Use in a Server Component (no "use client" needed)
 * export default function Page() {
 *   return <StaticCheckIcon size={32} className="text-green-500" />;
 * }
 * ```
 */
declare function createStaticIcon(name: string, pathData: IconPathData): react.FC<StaticIconProps>;
/**
 * Higher-order function to create a static version of an animated icon
 *
 * This is useful for creating static variants of existing icons
 * while maintaining the same SVG structure.
 *
 * @param AnimatedIcon - The animated icon component to create a static version of
 * @param name - Display name for the static component
 * @returns A static icon component with the same SVG content
 */
declare function withStatic<P extends StaticIconProps>(StaticIconComponent: react.FC<P>, name: string): react.FC<StaticIconProps>;

declare const StaticCheck: react.FC<StaticIconProps>;
declare const StaticX: react.FC<StaticIconProps>;
declare const StaticPlus: react.FC<StaticIconProps>;
declare const StaticMinus: react.FC<StaticIconProps>;
declare const StaticArrowLeft: react.FC<StaticIconProps>;
declare const StaticArrowRight: react.FC<StaticIconProps>;
declare const StaticChevronDown: react.FC<StaticIconProps>;
declare const StaticChevronUp: react.FC<StaticIconProps>;
declare const StaticMenu: react.FC<StaticIconProps>;
declare const StaticHome: react.FC<StaticIconProps>;
declare const StaticMail: react.FC<StaticIconProps>;
declare const StaticBell: react.FC<StaticIconProps>;
declare const StaticMessageCircle: react.FC<StaticIconProps>;
declare const StaticPhone: react.FC<StaticIconProps>;
declare const StaticCheckCircle: react.FC<StaticIconProps>;
declare const StaticXCircle: react.FC<StaticIconProps>;
declare const StaticAlertCircle: react.FC<StaticIconProps>;
declare const StaticInfo: react.FC<StaticIconProps>;
declare const StaticHelpCircle: react.FC<StaticIconProps>;
declare const StaticSearch: react.FC<StaticIconProps>;
declare const StaticSettings: react.FC<StaticIconProps>;
declare const StaticEdit: react.FC<StaticIconProps>;
declare const StaticTrash: react.FC<StaticIconProps>;
declare const StaticDownload: react.FC<StaticIconProps>;
declare const StaticUpload: react.FC<StaticIconProps>;
declare const StaticCopy: react.FC<StaticIconProps>;
declare const StaticShare: react.FC<StaticIconProps>;
declare const StaticHeart: react.FC<StaticIconProps>;
declare const StaticStar: react.FC<StaticIconProps>;
declare const StaticThumbsUp: react.FC<StaticIconProps>;
declare const StaticThumbsDown: react.FC<StaticIconProps>;
declare const StaticEye: react.FC<StaticIconProps>;
declare const StaticEyeOff: react.FC<StaticIconProps>;
declare const StaticUser: react.FC<StaticIconProps>;
declare const StaticUsers: react.FC<StaticIconProps>;
declare const StaticLock: react.FC<StaticIconProps>;
declare const StaticLoader: react.FC<StaticIconProps>;
declare const StaticRefresh: react.FC<StaticIconProps>;
declare const StaticClock: react.FC<StaticIconProps>;
declare const StaticCalendar: react.FC<StaticIconProps>;

export { type IconPathData, StaticAlertCircle, StaticArrowLeft, StaticArrowRight, StaticBell, StaticCalendar, StaticCheck, StaticCheckCircle, StaticChevronDown, StaticChevronUp, StaticClock, StaticCopy, StaticDownload, StaticEdit, StaticEye, StaticEyeOff, StaticHeart, StaticHelpCircle, StaticHome, type StaticIconComponent, type StaticIconProps, StaticInfo, StaticLoader, StaticLock, StaticMail, StaticMenu, StaticMessageCircle, StaticMinus, StaticPhone, StaticPlus, StaticRefresh, StaticSearch, StaticSettings, StaticShare, StaticStar, StaticThumbsDown, StaticThumbsUp, StaticTrash, StaticUpload, StaticUser, StaticUsers, StaticX, StaticXCircle, createStaticIcon, withStatic };
