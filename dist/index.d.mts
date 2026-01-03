import * as react from 'react';
import react__default, { ReactNode } from 'react';
import { Variants, Transition, Variant, TargetAndTransition, VariantLabels } from 'motion/react';
export { cssAnimationClasses, cssKeyframes, cssStylesheet, getCssAnimationClasses, injectCssAnimations, motionTypeToCssClass, removeCssAnimations, triggerTypeToCssClass } from './css.mjs';
export { IconPathData, StaticAlertCircle, StaticArrowLeft, StaticArrowRight, StaticBell, StaticCalendar, StaticCheck, StaticCheckCircle, StaticChevronDown, StaticChevronUp, StaticClock, StaticCopy, StaticDownload, StaticEdit, StaticEye, StaticEyeOff, StaticHeart, StaticHelpCircle, StaticHome, StaticIconComponent, StaticIconProps, StaticInfo, StaticLoader, StaticLock, StaticMail, StaticMenu, StaticMessageCircle, StaticMinus, StaticPhone, StaticPlus, StaticRefresh, StaticSearch, StaticSettings, StaticShare, StaticStar, StaticThumbsDown, StaticThumbsUp, StaticTrash, StaticUpload, StaticUser, StaticUsers, StaticX, StaticXCircle, createStaticIcon, withStatic } from './static.mjs';

/**
 * Core type definitions for the MotionIcons library
 */

/**
 * Available motion/animation types for icons
 */
type MotionType = 'scale' | 'rotate' | 'translate' | 'shake' | 'pulse' | 'bounce' | 'draw' | 'spin' | 'none';
/**
 * Animation trigger modes
 */
type TriggerType = 'hover' | 'loop' | 'mount' | 'inView';
/**
 * Animation mode for icons
 */
type AnimationMode = 'motion' | 'css' | 'none';
/**
 * Custom motion preset interface for user-defined animations
 */
interface CustomMotionPresetConfig {
    /**
     * Animation variants (initial, hover, tap states)
     */
    variants: Variants;
    /**
     * Transition configuration
     */
    transition: Transition;
    /**
     * Custom preset name
     */
    name: string;
}
/**
 * Props for individual icon components
 */
interface IconProps {
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
     * Whether the icon should be animated
     * Overrides context and system preferences
     */
    animated?: boolean;
    /**
     * The type of motion/animation to apply
     * @default 'scale'
     */
    motionType?: MotionType;
    /**
     * When to trigger the animation
     * - 'hover': Animate on hover (default)
     * - 'loop': Continuous looping animation
     * - 'mount': Animate once on mount
     * - 'inView': Animate when scrolled into view
     * @default 'hover'
     */
    trigger?: TriggerType;
    /**
     * Animation mode
     * - 'motion': Use motion/react (default, requires motion dependency)
     * - 'css': Use CSS keyframe animations (no JS dependency)
     * - 'none': Static, no animations
     * @default 'motion'
     */
    animationMode?: AnimationMode;
    /**
     * Custom motion preset for user-defined animations
     * When provided, overrides motionType
     */
    motionPreset?: CustomMotionPresetConfig;
    /**
     * Accessible label for the icon
     * When provided, sets role="img" and aria-label
     * When omitted, icon is treated as decorative with aria-hidden="true"
     */
    'aria-label'?: string;
}
/**
 * Configuration for icon behavior and defaults
 */
interface IconConfig {
    /**
     * Global animation toggle
     * @default true
     */
    animated: boolean;
    /**
     * Default size for all icons in pixels
     * @default 24
     */
    defaultSize: number;
    /**
     * Default stroke width for all icons
     * @default 2
     */
    defaultStrokeWidth: number;
}
/**
 * Animation variants for Motion components
 * Re-export of Motion's Variants type for consistency
 */
type AnimationVariants = Variants;
/**
 * Transition configuration for animations
 */
interface TransitionConfig {
    /**
     * Duration of the animation in seconds
     */
    duration?: number;
    /**
     * Easing function
     */
    ease?: string | number[];
    /**
     * Type of animation (spring, tween, etc.)
     */
    type?: string;
    /**
     * Spring stiffness
     */
    stiffness?: number;
    /**
     * Spring damping
     */
    damping?: number;
    /**
     * Delay before animation starts
     */
    delay?: number;
}
/**
 * Complete animation preset definition
 */
interface AnimationPreset {
    /**
     * Initial state
     */
    initial?: Variant;
    /**
     * Hover state
     */
    hover?: Variant;
    /**
     * Tap state
     */
    tap?: Variant;
    /**
     * Exit state
     */
    exit?: Variant;
    /**
     * Transition configuration
     */
    transition?: TransitionConfig;
}

/**
 * Icon configuration context for global icon settings
 *
 * Provides default configuration for all icons in the component tree.
 * Individual icon props can override context values.
 */

/**
 * Props for IconProvider component
 */
interface IconProviderProps {
    /**
     * Child components
     */
    children: ReactNode;
    /**
     * Icon configuration to apply to all icons in the tree
     * Partial configuration will be merged with defaults
     */
    config?: Partial<IconConfig>;
}
/**
 * Provider component for icon configuration
 *
 * Wrap your app or component tree with this provider to set global icon defaults.
 * Configuration can be partially overridden at any level.
 *
 * @example
 * ```tsx
 * <IconProvider config={{ animated: false, defaultSize: 32 }}>
 *   <App />
 * </IconProvider>
 * ```
 */
declare function IconProvider({ children, config }: IconProviderProps): react__default.JSX.Element;
/**
 * Hook to access icon context configuration
 *
 * Returns the current icon configuration from context, or default config if not in a provider.
 * This hook is used internally by icon components and other hooks.
 *
 * @returns Current icon configuration
 *
 * @example
 * ```tsx
 * const config = useIconContext();
 * console.log(config.defaultSize); // 24
 * ```
 */
declare function useIconContext(): IconConfig;

/**
 * Hook for managing icon animation state and variants
 *
 * Handles the priority chain:
 * 1. Component prop (highest priority)
 * 2. Context configuration
 * 3. System preference (via useReducedMotion)
 *
 * When animations are disabled, returns null variants to prevent motion.
 */

/**
 * Animation props to spread onto motion components based on trigger mode
 */
interface AnimationProps {
    initial?: boolean | TargetAndTransition | VariantLabels;
    animate?: boolean | TargetAndTransition | VariantLabels;
    whileHover?: TargetAndTransition | VariantLabels;
    whileInView?: TargetAndTransition | VariantLabels;
    viewport?: {
        once?: boolean;
        amount?: number;
    };
    variants?: Variants;
    transition?: Transition;
}
/**
 * Return type for useIconAnimation hook
 */
interface UseIconAnimationReturn {
    /**
     * Whether animations should be active
     */
    isAnimated: boolean;
    /**
     * Get animation variants based on animation state
     * Returns undefined when animations are disabled
     */
    getVariants: (variants: AnimationVariants) => AnimationVariants | undefined;
    /**
     * Get transition configuration
     */
    transition: TransitionConfig | undefined;
    /**
     * Pre-built variants from the motion preset (based on motionType)
     */
    presetVariants: AnimationVariants | undefined;
    /**
     * Pre-built transition from the motion preset
     */
    presetTransition: Transition;
    /**
     * Animation props to spread onto the motion.svg component
     * Based on trigger mode (hover, loop, mount, inView)
     */
    animationProps: AnimationProps;
    /**
     * Animation props for internal path elements (for draw animation)
     */
    pathAnimationProps: AnimationProps;
    /**
     * Animation props for SVG wrapper when using draw animation
     * Needed to propagate hover/inView state to children
     */
    drawWrapperProps: AnimationProps;
}
/**
 * Hook to determine animation state and provide variant helpers
 *
 * Priority order (highest to lowest):
 * 1. Component animated prop
 * 2. Context animated setting
 * 3. System prefers-reduced-motion preference
 *
 * @param animated - Optional override from component props
 * @param motionType - Optional motion type to use preset variants
 * @returns Animation state and helper functions
 *
 * @example
 * ```tsx
 * // Using custom variants
 * const { isAnimated, getVariants } = useIconAnimation(props.animated);
 *
 * return (
 *   <motion.svg
 *     variants={getVariants({ hover: { scale: 1.2 } })}
 *     animate={isAnimated ? "hover" : undefined}
 *   />
 * );
 *
 * // Using preset motion type
 * const { isAnimated, presetVariants, presetTransition } = useIconAnimation(
 *   props.animated,
 *   props.motionType
 * );
 *
 * return (
 *   <motion.svg
 *     variants={presetVariants}
 *     transition={presetTransition}
 *     whileHover={isAnimated ? "hover" : undefined}
 *   />
 * );
 * ```
 */
declare function useIconAnimation(animated?: boolean, motionType?: MotionType, trigger?: TriggerType): UseIconAnimationReturn;

/**
 * Return type for useIconConfig hook
 */
interface UseIconConfigReturn {
    /**
     * Final computed size for the icon
     */
    size: number;
    /**
     * Final computed stroke width for the icon
     */
    strokeWidth: number;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Whether the icon should be animated
     */
    animated: boolean;
}
/**
 * Hook to merge icon props with context configuration
 *
 * Takes component props and merges them with context defaults.
 * Component props always take priority over context values.
 *
 * @param props - Icon component props
 * @returns Merged configuration with all values resolved
 *
 * @example
 * ```tsx
 * function MyIcon(props: IconProps) {
 *   const config = useIconConfig(props);
 *
 *   return (
 *     <svg
 *       width={config.size}
 *       height={config.size}
 *       strokeWidth={config.strokeWidth}
 *       className={config.className}
 *     />
 *   );
 * }
 * ```
 */
declare function useIconConfig(props: IconProps): UseIconConfigReturn;

/**
 * Auto-generated icon type definitions
 *
 * DO NOT EDIT MANUALLY - This file is generated by scripts/generate-types.ts
 * Run: pnpm run generate:types
 */
/**
 * Union type of all available icon names (PascalCase)
 *
 * Use this type for type-safe icon references:
 *
 * @example
 * ```tsx
 * import type { IconName } from 'motionicon';
 *
 * function IconButton({ icon }: { icon: IconName }) {
 *   // Type-safe icon name with autocomplete
 * }
 * ```
 */
type IconName = 'Accessibility' | 'Activity' | 'Airplay' | 'AlertCircle' | 'AlertOctagon' | 'AlertTriangle' | 'Anchor' | 'Apple' | 'Archive' | 'AreaChart' | 'ArrowDown' | 'ArrowDownLeft' | 'ArrowDownRight' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowUpLeft' | 'ArrowUpRight' | 'AtSign' | 'Award' | 'Baby' | 'Backpack' | 'BadgeCheck' | 'Ban' | 'Banana' | 'Bandage' | 'BarChart' | 'BarChart2' | 'Barcode' | 'Battery' | 'BatteryCharging' | 'BatteryLow' | 'Beer' | 'Bell' | 'Bike' | 'Bluetooth' | 'Bone' | 'Book' | 'BookMarked' | 'BookOpen' | 'Bookmark' | 'Brain' | 'Brush' | 'Building' | 'Building2' | 'Bus' | 'Calculator' | 'Calendar' | 'Camera' | 'Car' | 'CarFront' | 'Carrot' | 'Cast' | 'Castle' | 'Check' | 'CheckCircle' | 'ChefHat' | 'Cherry' | 'ChevronDown' | 'ChevronUp' | 'ChevronsDown' | 'ChevronsLeft' | 'ChevronsRight' | 'ChevronsUp' | 'Church' | 'Circle' | 'Clipboard' | 'ClipboardCheck' | 'ClipboardCopy' | 'ClipboardList' | 'Clock' | 'Cloud' | 'CloudDrizzle' | 'CloudLightning' | 'CloudRain' | 'CloudSnow' | 'CloudSun' | 'Code' | 'Code2' | 'Coffee' | 'Columns' | 'Command' | 'Compass' | 'Contact' | 'Contact2' | 'Cookie' | 'Copy' | 'CornerDownLeft' | 'CornerDownRight' | 'CornerUpLeft' | 'CornerUpRight' | 'Cpu' | 'CreditCard' | 'Crosshair' | 'Crown' | 'Cup' | 'Database' | 'Dice1' | 'Dice2' | 'Dice3' | 'Dice4' | 'Dice5' | 'Dice6' | 'Dna' | 'DollarSign' | 'Download' | 'Droplet' | 'Dumbbell' | 'Ear' | 'Edit' | 'Eraser' | 'Eye' | 'Eye2' | 'EyeOff' | 'Factory' | 'FastForward' | 'File' | 'FileCheck' | 'FileMinus' | 'FilePlus' | 'FileText' | 'FileX' | 'Files' | 'Film' | 'Filter' | 'Fingerprint' | 'Flame' | 'Folder' | 'FolderMinus' | 'FolderOpen' | 'FolderPlus' | 'Footprints' | 'Frown' | 'Fuel' | 'Gamepad2' | 'Gauge' | 'Gift' | 'Glasses' | 'Globe' | 'GraduationCap' | 'Grape' | 'Grid' | 'Hammer' | 'Hand' | 'HardDrive' | 'Hash' | 'Headphones' | 'Heart' | 'HeartPulse' | 'HelpCircle' | 'Highlighter' | 'Home' | 'Hospital' | 'IceCream' | 'Inbox' | 'Info' | 'Joystick' | 'Kanban' | 'Key' | 'KeyRound' | 'Keyboard' | 'Lamp' | 'LampDesk' | 'Landmark' | 'Laptop' | 'Layout' | 'LayoutGrid' | 'LayoutList' | 'Leaf' | 'Library' | 'Lightbulb' | 'LightbulbOff' | 'LineChart' | 'Link' | 'List' | 'Loader' | 'Lock' | 'LockOpen' | 'Mail' | 'Map' | 'MapPin' | 'Martini' | 'Maximize' | 'Maximize2' | 'Medal' | 'Meh' | 'Menu' | 'MessageCircle' | 'MessageSquare' | 'Mic' | 'MicOff' | 'Microscope' | 'Milestone' | 'Minimize' | 'Minimize2' | 'Minus' | 'Monitor' | 'Moon' | 'MoreHorizontal' | 'Mountain' | 'MountainSnow' | 'Mouse' | 'MoveHorizontal' | 'Music' | 'Navigation' | 'Navigation2' | 'Notebook' | 'NotebookPen' | 'Package' | 'Palette' | 'PanelLeft' | 'PanelRight' | 'Paperclip' | 'Parking' | 'Pause' | 'Pen' | 'PenTool' | 'Pencil' | 'Percent' | 'Phone' | 'PhoneCall' | 'PhoneIncoming' | 'PhoneMissed' | 'PhoneOff' | 'PhoneOutgoing' | 'PieChart' | 'Pill' | 'Pizza' | 'Plane' | 'PlaneLanding' | 'PlaneTakeoff' | 'Play' | 'Plus' | 'Presentation' | 'Printer' | 'Puzzle' | 'QrCode' | 'Radio' | 'Receipt' | 'Refresh' | 'Repeat' | 'Rewind' | 'Rocket' | 'Router' | 'Rows' | 'Rss' | 'Ruler' | 'Sailboat' | 'Sandwich' | 'Save' | 'Scan' | 'ScanLine' | 'School' | 'Screwdriver' | 'SdCard' | 'Search' | 'Send' | 'Send2' | 'Server' | 'Settings' | 'Share' | 'Shield' | 'ShieldAlert' | 'ShieldCheck' | 'ShieldOff' | 'Ship' | 'ShoppingBag' | 'ShoppingCart' | 'Shuffle' | 'Sidebar' | 'Signal' | 'SignalHigh' | 'SignalLow' | 'SignalZero' | 'SkipBack' | 'SkipForward' | 'Smartphone' | 'Smile' | 'Snowflake' | 'Speaker' | 'Square' | 'Star' | 'Stethoscope' | 'Store' | 'Sun' | 'Sunrise' | 'Sunset' | 'Sword' | 'Swords' | 'Syringe' | 'Table' | 'Table2' | 'Tablet' | 'Tag' | 'Tag2' | 'Tags' | 'Target' | 'Tent' | 'Terminal' | 'TestTube' | 'TestTubes' | 'Thermometer' | 'Thermometer2' | 'ThumbsDown' | 'ThumbsUp' | 'TrafficCone' | 'Train' | 'Trash' | 'Tree' | 'TrendingDown' | 'TrendingUp' | 'Triangle' | 'Trophy' | 'Truck' | 'Tv' | 'Umbrella' | 'Unlock' | 'Upload' | 'UsbDrive' | 'User' | 'UserCheck' | 'UserCog' | 'UserMinus' | 'UserPlus' | 'UserX' | 'Users' | 'Utensils' | 'UtensilsCrossed' | 'Video' | 'Video2' | 'VideoOff' | 'Voicemail' | 'Volume' | 'VolumeOff' | 'Wallet' | 'Wand' | 'Wand2' | 'Warehouse' | 'Watch' | 'Waves' | 'Webcam' | 'Wheelchair' | 'Wifi' | 'WifiOff' | 'Wind' | 'Wine' | 'Wrench' | 'X' | 'XCircle' | 'Zap';
/**
 * Union type of all available icon names (kebab-case)
 *
 * Useful for configuration objects or CLI tools
 */
type IconNameKebab = 'accessibility' | 'activity' | 'airplay' | 'alert-circle' | 'alert-octagon' | 'alert-triangle' | 'anchor' | 'apple' | 'archive' | 'area-chart' | 'arrow-down' | 'arrow-down-left' | 'arrow-down-right' | 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-up-left' | 'arrow-up-right' | 'at-sign' | 'award' | 'baby' | 'backpack' | 'badge-check' | 'ban' | 'banana' | 'bandage' | 'bar-chart' | 'bar-chart-2' | 'barcode' | 'battery' | 'battery-charging' | 'battery-low' | 'beer' | 'bell' | 'bike' | 'bluetooth' | 'bone' | 'book' | 'book-marked' | 'book-open' | 'bookmark' | 'brain' | 'brush' | 'building' | 'building2' | 'bus' | 'calculator' | 'calendar' | 'camera' | 'car' | 'car-front' | 'carrot' | 'cast' | 'castle' | 'check' | 'check-circle' | 'chef-hat' | 'cherry' | 'chevron-down' | 'chevron-up' | 'chevrons-down' | 'chevrons-left' | 'chevrons-right' | 'chevrons-up' | 'church' | 'circle' | 'clipboard' | 'clipboard-check' | 'clipboard-copy' | 'clipboard-list' | 'clock' | 'cloud' | 'cloud-drizzle' | 'cloud-lightning' | 'cloud-rain' | 'cloud-snow' | 'cloud-sun' | 'code' | 'code2' | 'coffee' | 'columns' | 'command' | 'compass' | 'contact' | 'contact2' | 'cookie' | 'copy' | 'corner-down-left' | 'corner-down-right' | 'corner-up-left' | 'corner-up-right' | 'cpu' | 'credit-card' | 'crosshair' | 'crown' | 'cup' | 'database' | 'dice-1' | 'dice-2' | 'dice-3' | 'dice-4' | 'dice-5' | 'dice-6' | 'dna' | 'dollar-sign' | 'download' | 'droplet' | 'dumbbell' | 'ear' | 'edit' | 'eraser' | 'eye' | 'eye-2' | 'eye-off' | 'factory' | 'fast-forward' | 'file' | 'file-check' | 'file-minus' | 'file-plus' | 'file-text' | 'file-x' | 'files' | 'film' | 'filter' | 'fingerprint' | 'flame' | 'folder' | 'folder-minus' | 'folder-open' | 'folder-plus' | 'footprints' | 'frown' | 'fuel' | 'gamepad-2' | 'gauge' | 'gift' | 'glasses' | 'globe' | 'graduation-cap' | 'grape' | 'grid' | 'hammer' | 'hand' | 'hard-drive' | 'hash' | 'headphones' | 'heart' | 'heart-pulse' | 'help-circle' | 'highlighter' | 'home' | 'hospital' | 'ice-cream' | 'inbox' | 'info' | 'joystick' | 'kanban' | 'key' | 'key-round' | 'keyboard' | 'lamp' | 'lamp-desk' | 'landmark' | 'laptop' | 'layout' | 'layout-grid' | 'layout-list' | 'leaf' | 'library' | 'lightbulb' | 'lightbulb-off' | 'line-chart' | 'link' | 'list' | 'loader' | 'lock' | 'lock-open' | 'mail' | 'map' | 'map-pin' | 'martini' | 'maximize' | 'maximize-2' | 'medal' | 'meh' | 'menu' | 'message-circle' | 'message-square' | 'mic' | 'mic-off' | 'microscope' | 'milestone' | 'minimize' | 'minimize-2' | 'minus' | 'monitor' | 'moon' | 'more-horizontal' | 'mountain' | 'mountain-snow' | 'mouse' | 'move-horizontal' | 'music' | 'navigation' | 'navigation-2' | 'notebook' | 'notebook-pen' | 'package' | 'palette' | 'panel-left' | 'panel-right' | 'paperclip' | 'parking' | 'pause' | 'pen' | 'pen-tool' | 'pencil' | 'percent' | 'phone' | 'phone-call' | 'phone-incoming' | 'phone-missed' | 'phone-off' | 'phone-outgoing' | 'pie-chart' | 'pill' | 'pizza' | 'plane' | 'plane-landing' | 'plane-takeoff' | 'play' | 'plus' | 'presentation' | 'printer' | 'puzzle' | 'qr-code' | 'radio' | 'receipt' | 'refresh' | 'repeat' | 'rewind' | 'rocket' | 'router' | 'rows' | 'rss' | 'ruler' | 'sailboat' | 'sandwich' | 'save' | 'scan' | 'scan-line' | 'school' | 'screwdriver' | 'sd-card' | 'search' | 'send' | 'send-2' | 'server' | 'settings' | 'share' | 'shield' | 'shield-alert' | 'shield-check' | 'shield-off' | 'ship' | 'shopping-bag' | 'shopping-cart' | 'shuffle' | 'sidebar' | 'signal' | 'signal-high' | 'signal-low' | 'signal-zero' | 'skip-back' | 'skip-forward' | 'smartphone' | 'smile' | 'snowflake' | 'speaker' | 'square' | 'star' | 'stethoscope' | 'store' | 'sun' | 'sunrise' | 'sunset' | 'sword' | 'swords' | 'syringe' | 'table' | 'table-2' | 'tablet' | 'tag' | 'tag2' | 'tags' | 'target' | 'tent' | 'terminal' | 'test-tube' | 'test-tubes' | 'thermometer' | 'thermometer-2' | 'thumbs-down' | 'thumbs-up' | 'traffic-cone' | 'train' | 'trash' | 'tree' | 'trending-down' | 'trending-up' | 'triangle' | 'trophy' | 'truck' | 'tv' | 'umbrella' | 'unlock' | 'upload' | 'usb-drive' | 'user' | 'user-check' | 'user-cog' | 'user-minus' | 'user-plus' | 'user-x' | 'users' | 'utensils' | 'utensils-crossed' | 'video' | 'video-2' | 'video-off' | 'voicemail' | 'volume' | 'volume-off' | 'wallet' | 'wand' | 'wand-2' | 'warehouse' | 'watch' | 'waves' | 'webcam' | 'wheelchair' | 'wifi' | 'wifi-off' | 'wind' | 'wine' | 'wrench' | 'x' | 'x-circle' | 'zap';
/**
 * Array of all icon names (PascalCase)
 *
 * @example
 * ```tsx
 * import { ICON_NAMES } from 'motionicon';
 *
 * // Iterate over all icons
 * ICON_NAMES.forEach(name => console.log(name));
 * ```
 */
declare const ICON_NAMES: readonly ["Accessibility", "Activity", "Airplay", "AlertCircle", "AlertOctagon", "AlertTriangle", "Anchor", "Apple", "Archive", "AreaChart", "ArrowDown", "ArrowDownLeft", "ArrowDownRight", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowUpLeft", "ArrowUpRight", "AtSign", "Award", "Baby", "Backpack", "BadgeCheck", "Ban", "Banana", "Bandage", "BarChart", "BarChart2", "Barcode", "Battery", "BatteryCharging", "BatteryLow", "Beer", "Bell", "Bike", "Bluetooth", "Bone", "Book", "BookMarked", "BookOpen", "Bookmark", "Brain", "Brush", "Building", "Building2", "Bus", "Calculator", "Calendar", "Camera", "Car", "CarFront", "Carrot", "Cast", "Castle", "Check", "CheckCircle", "ChefHat", "Cherry", "ChevronDown", "ChevronUp", "ChevronsDown", "ChevronsLeft", "ChevronsRight", "ChevronsUp", "Church", "Circle", "Clipboard", "ClipboardCheck", "ClipboardCopy", "ClipboardList", "Clock", "Cloud", "CloudDrizzle", "CloudLightning", "CloudRain", "CloudSnow", "CloudSun", "Code", "Code2", "Coffee", "Columns", "Command", "Compass", "Contact", "Contact2", "Cookie", "Copy", "CornerDownLeft", "CornerDownRight", "CornerUpLeft", "CornerUpRight", "Cpu", "CreditCard", "Crosshair", "Crown", "Cup", "Database", "Dice1", "Dice2", "Dice3", "Dice4", "Dice5", "Dice6", "Dna", "DollarSign", "Download", "Droplet", "Dumbbell", "Ear", "Edit", "Eraser", "Eye", "Eye2", "EyeOff", "Factory", "FastForward", "File", "FileCheck", "FileMinus", "FilePlus", "FileText", "FileX", "Files", "Film", "Filter", "Fingerprint", "Flame", "Folder", "FolderMinus", "FolderOpen", "FolderPlus", "Footprints", "Frown", "Fuel", "Gamepad2", "Gauge", "Gift", "Glasses", "Globe", "GraduationCap", "Grape", "Grid", "Hammer", "Hand", "HardDrive", "Hash", "Headphones", "Heart", "HeartPulse", "HelpCircle", "Highlighter", "Home", "Hospital", "IceCream", "Inbox", "Info", "Joystick", "Kanban", "Key", "KeyRound", "Keyboard", "Lamp", "LampDesk", "Landmark", "Laptop", "Layout", "LayoutGrid", "LayoutList", "Leaf", "Library", "Lightbulb", "LightbulbOff", "LineChart", "Link", "List", "Loader", "Lock", "LockOpen", "Mail", "Map", "MapPin", "Martini", "Maximize", "Maximize2", "Medal", "Meh", "Menu", "MessageCircle", "MessageSquare", "Mic", "MicOff", "Microscope", "Milestone", "Minimize", "Minimize2", "Minus", "Monitor", "Moon", "MoreHorizontal", "Mountain", "MountainSnow", "Mouse", "MoveHorizontal", "Music", "Navigation", "Navigation2", "Notebook", "NotebookPen", "Package", "Palette", "PanelLeft", "PanelRight", "Paperclip", "Parking", "Pause", "Pen", "PenTool", "Pencil", "Percent", "Phone", "PhoneCall", "PhoneIncoming", "PhoneMissed", "PhoneOff", "PhoneOutgoing", "PieChart", "Pill", "Pizza", "Plane", "PlaneLanding", "PlaneTakeoff", "Play", "Plus", "Presentation", "Printer", "Puzzle", "QrCode", "Radio", "Receipt", "Refresh", "Repeat", "Rewind", "Rocket", "Router", "Rows", "Rss", "Ruler", "Sailboat", "Sandwich", "Save", "Scan", "ScanLine", "School", "Screwdriver", "SdCard", "Search", "Send", "Send2", "Server", "Settings", "Share", "Shield", "ShieldAlert", "ShieldCheck", "ShieldOff", "Ship", "ShoppingBag", "ShoppingCart", "Shuffle", "Sidebar", "Signal", "SignalHigh", "SignalLow", "SignalZero", "SkipBack", "SkipForward", "Smartphone", "Smile", "Snowflake", "Speaker", "Square", "Star", "Stethoscope", "Store", "Sun", "Sunrise", "Sunset", "Sword", "Swords", "Syringe", "Table", "Table2", "Tablet", "Tag", "Tag2", "Tags", "Target", "Tent", "Terminal", "TestTube", "TestTubes", "Thermometer", "Thermometer2", "ThumbsDown", "ThumbsUp", "TrafficCone", "Train", "Trash", "Tree", "TrendingDown", "TrendingUp", "Triangle", "Trophy", "Truck", "Tv", "Umbrella", "Unlock", "Upload", "UsbDrive", "User", "UserCheck", "UserCog", "UserMinus", "UserPlus", "UserX", "Users", "Utensils", "UtensilsCrossed", "Video", "Video2", "VideoOff", "Voicemail", "Volume", "VolumeOff", "Wallet", "Wand", "Wand2", "Warehouse", "Watch", "Waves", "Webcam", "Wheelchair", "Wifi", "WifiOff", "Wind", "Wine", "Wrench", "X", "XCircle", "Zap"];
/**
 * Array of all icon names (kebab-case)
 */
declare const ICON_NAMES_KEBAB: readonly ["accessibility", "activity", "airplay", "alert-circle", "alert-octagon", "alert-triangle", "anchor", "apple", "archive", "area-chart", "arrow-down", "arrow-down-left", "arrow-down-right", "arrow-left", "arrow-right", "arrow-up", "arrow-up-left", "arrow-up-right", "at-sign", "award", "baby", "backpack", "badge-check", "ban", "banana", "bandage", "bar-chart", "bar-chart-2", "barcode", "battery", "battery-charging", "battery-low", "beer", "bell", "bike", "bluetooth", "bone", "book", "book-marked", "book-open", "bookmark", "brain", "brush", "building", "building2", "bus", "calculator", "calendar", "camera", "car", "car-front", "carrot", "cast", "castle", "check", "check-circle", "chef-hat", "cherry", "chevron-down", "chevron-up", "chevrons-down", "chevrons-left", "chevrons-right", "chevrons-up", "church", "circle", "clipboard", "clipboard-check", "clipboard-copy", "clipboard-list", "clock", "cloud", "cloud-drizzle", "cloud-lightning", "cloud-rain", "cloud-snow", "cloud-sun", "code", "code2", "coffee", "columns", "command", "compass", "contact", "contact2", "cookie", "copy", "corner-down-left", "corner-down-right", "corner-up-left", "corner-up-right", "cpu", "credit-card", "crosshair", "crown", "cup", "database", "dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6", "dna", "dollar-sign", "download", "droplet", "dumbbell", "ear", "edit", "eraser", "eye", "eye-2", "eye-off", "factory", "fast-forward", "file", "file-check", "file-minus", "file-plus", "file-text", "file-x", "files", "film", "filter", "fingerprint", "flame", "folder", "folder-minus", "folder-open", "folder-plus", "footprints", "frown", "fuel", "gamepad-2", "gauge", "gift", "glasses", "globe", "graduation-cap", "grape", "grid", "hammer", "hand", "hard-drive", "hash", "headphones", "heart", "heart-pulse", "help-circle", "highlighter", "home", "hospital", "ice-cream", "inbox", "info", "joystick", "kanban", "key", "key-round", "keyboard", "lamp", "lamp-desk", "landmark", "laptop", "layout", "layout-grid", "layout-list", "leaf", "library", "lightbulb", "lightbulb-off", "line-chart", "link", "list", "loader", "lock", "lock-open", "mail", "map", "map-pin", "martini", "maximize", "maximize-2", "medal", "meh", "menu", "message-circle", "message-square", "mic", "mic-off", "microscope", "milestone", "minimize", "minimize-2", "minus", "monitor", "moon", "more-horizontal", "mountain", "mountain-snow", "mouse", "move-horizontal", "music", "navigation", "navigation-2", "notebook", "notebook-pen", "package", "palette", "panel-left", "panel-right", "paperclip", "parking", "pause", "pen", "pen-tool", "pencil", "percent", "phone", "phone-call", "phone-incoming", "phone-missed", "phone-off", "phone-outgoing", "pie-chart", "pill", "pizza", "plane", "plane-landing", "plane-takeoff", "play", "plus", "presentation", "printer", "puzzle", "qr-code", "radio", "receipt", "refresh", "repeat", "rewind", "rocket", "router", "rows", "rss", "ruler", "sailboat", "sandwich", "save", "scan", "scan-line", "school", "screwdriver", "sd-card", "search", "send", "send-2", "server", "settings", "share", "shield", "shield-alert", "shield-check", "shield-off", "ship", "shopping-bag", "shopping-cart", "shuffle", "sidebar", "signal", "signal-high", "signal-low", "signal-zero", "skip-back", "skip-forward", "smartphone", "smile", "snowflake", "speaker", "square", "star", "stethoscope", "store", "sun", "sunrise", "sunset", "sword", "swords", "syringe", "table", "table-2", "tablet", "tag", "tag2", "tags", "target", "tent", "terminal", "test-tube", "test-tubes", "thermometer", "thermometer-2", "thumbs-down", "thumbs-up", "traffic-cone", "train", "trash", "tree", "trending-down", "trending-up", "triangle", "trophy", "truck", "tv", "umbrella", "unlock", "upload", "usb-drive", "user", "user-check", "user-cog", "user-minus", "user-plus", "user-x", "users", "utensils", "utensils-crossed", "video", "video-2", "video-off", "voicemail", "volume", "volume-off", "wallet", "wand", "wand-2", "warehouse", "watch", "waves", "webcam", "wheelchair", "wifi", "wifi-off", "wind", "wine", "wrench", "x", "x-circle", "zap"];
/**
 * Total number of icons in the library
 */
declare const ICON_COUNT: 350;
/**
 * Mapping from kebab-case to PascalCase names
 */
declare const ICON_NAME_MAP: Record<IconNameKebab, IconName>;
/**
 * Type guard to check if a string is a valid icon name
 */
declare function isIconName(name: string): name is IconName;
/**
 * Type guard to check if a string is a valid kebab-case icon name
 */
declare function isIconNameKebab(name: string): name is IconNameKebab;

/**
 * Predefined animation presets for MotionIcons
 *
 * These presets can be used to apply consistent animations across icons.
 * Each preset includes initial, hover, tap, and transition configurations.
 */

/**
 * Draw animation - animates SVG path drawing
 * Useful for line-based icons
 */
declare const draw: AnimationPreset;
/**
 * Rotate animation - rotates icon on hover
 * Great for refresh, settings, or circular icons
 */
declare const rotate: AnimationPreset;
/**
 * Pulse animation - scales icon on hover
 * Ideal for drawing attention to interactive elements
 */
declare const pulse: AnimationPreset;
/**
 * Bounce animation - vertical bounce effect
 * Perfect for upvote, arrow, or notification icons
 */
declare const bounce: AnimationPreset;
/**
 * Translate animation - horizontal slide effect
 * Useful for arrow or navigation icons
 */
declare const translate: AnimationPreset;
/**
 * Stagger animation - sequential animation for multiple elements
 * Ideal for icons with multiple paths or shapes
 */
declare const stagger: AnimationPreset;
/**
 * Shake animation - horizontal shake effect
 * Good for error states, notifications, or alert icons
 */
declare const shake: AnimationPreset;
/**
 * Spin animation - continuous rotation
 * Perfect for loading or refresh icons
 */
declare const spin: AnimationPreset;
/**
 * Fade animation - opacity transition
 * Subtle effect for any icon
 */
declare const fade: AnimationPreset;
/**
 * Pop animation - scale with slight rotation
 * Engaging effect for important actions
 */
declare const pop: AnimationPreset;
/**
 * Collection of all animation presets
 */
declare const animations: {
    readonly draw: AnimationPreset;
    readonly rotate: AnimationPreset;
    readonly pulse: AnimationPreset;
    readonly bounce: AnimationPreset;
    readonly translate: AnimationPreset;
    readonly stagger: AnimationPreset;
    readonly shake: AnimationPreset;
    readonly spin: AnimationPreset;
    readonly fade: AnimationPreset;
    readonly pop: AnimationPreset;
};
/**
 * Type helper for animation preset names
 */
type AnimationName = keyof typeof animations;

/**
 * Motion presets - predefined animation variants for each motion type
 */

interface MotionPreset {
    variants: Variants;
    transition: Transition;
}
declare const easeSmooth: Transition;
/**
 * All available motion presets
 */
declare const motionPresets: Record<MotionType, MotionPreset>;
/**
 * Get motion preset by type
 */
declare function getMotionPreset(type?: MotionType): MotionPreset;
/**
 * List of all available motion types for UI display
 */
declare const motionTypeList: {
    type: MotionType;
    label: string;
    description: string;
}[];

/**
 * Custom motion preset definition system
 *
 * Allows users to define their own animation configurations
 * beyond the 9 built-in motion types.
 */

/**
 * Animation property values that can be used in presets
 */
type AnimationValue = number | string | number[] | string[];
/**
 * Animation state object with common transform and style properties
 */
type AnimationState = {
    scale?: AnimationValue;
    scaleX?: AnimationValue;
    scaleY?: AnimationValue;
    rotate?: AnimationValue;
    rotateX?: AnimationValue;
    rotateY?: AnimationValue;
    rotateZ?: AnimationValue;
    x?: AnimationValue;
    y?: AnimationValue;
    opacity?: AnimationValue;
    pathLength?: AnimationValue;
    pathOffset?: AnimationValue;
    [key: string]: AnimationValue | undefined;
};
/**
 * Options for defining a custom motion preset
 */
interface CustomMotionPresetOptions {
    /**
     * Initial state (optional, defaults to empty object)
     */
    initial?: AnimationState;
    /**
     * Hover state - the animated state when triggered
     */
    hover: AnimationState;
    /**
     * Optional tap state for press interactions
     */
    tap?: AnimationState;
    /**
     * Transition configuration
     */
    transition?: Transition;
}
/**
 * Extended motion preset with custom name
 */
interface CustomMotionPreset extends MotionPreset {
    /**
     * Custom preset name for identification
     */
    name: string;
}
/**
 * Define a custom motion preset
 *
 * Creates a reusable animation configuration that can be passed to icon components.
 *
 * @param name - Unique name for the preset
 * @param options - Animation configuration
 * @returns A motion preset that can be used with icons
 *
 * @example
 * ```tsx
 * // Define a custom "wiggle" animation
 * const wiggle = defineMotionPreset('wiggle', {
 *   initial: { rotate: 0 },
 *   hover: { rotate: [0, -10, 10, -10, 10, 0] },
 *   transition: { duration: 0.5 }
 * });
 *
 * // Use with an icon
 * <Icon motionPreset={wiggle} />
 * ```
 */
declare function defineMotionPreset(name: string, options: CustomMotionPresetOptions): CustomMotionPreset;
/**
 * Compose multiple motion presets into one
 *
 * Combines multiple animation configurations to create complex animations.
 * Later presets override earlier ones for the same properties.
 *
 * @param presets - Array of motion presets to compose
 * @returns A combined motion preset
 *
 * @example
 * ```tsx
 * const scaleAndRotate = composeMotionPresets([
 *   defineMotionPreset('scale', { hover: { scale: 1.1 } }),
 *   defineMotionPreset('rotate', { hover: { rotate: 15 } })
 * ]);
 *
 * // Results in { hover: { scale: 1.1, rotate: 15 } }
 * ```
 */
declare function composeMotionPresets(presets: CustomMotionPreset[]): CustomMotionPreset;
/**
 * Extend an existing motion preset with additional properties
 *
 * @param basePreset - The preset to extend
 * @param overrides - Properties to add or override
 * @returns A new motion preset with the combined properties
 *
 * @example
 * ```tsx
 * import { motionPresets } from 'motionicon';
 *
 * const customScale = extendMotionPreset(
 *   { name: 'scale', ...motionPresets.scale },
 *   { hover: { scale: 1.3 }, transition: { duration: 0.5 } }
 * );
 * ```
 */
declare function extendMotionPreset(basePreset: CustomMotionPreset, overrides: Partial<CustomMotionPresetOptions>): CustomMotionPreset;
/**
 * Pre-built custom presets for common effects
 */
declare const customPresets: {
    /**
     * Wiggle animation - rotates back and forth
     */
    readonly wiggle: CustomMotionPreset;
    /**
     * Jello animation - elastic squish effect
     */
    readonly jello: CustomMotionPreset;
    /**
     * Rubberband animation - stretchy bounce
     */
    readonly rubberband: CustomMotionPreset;
    /**
     * Heartbeat animation - pulsing effect
     */
    readonly heartbeat: CustomMotionPreset;
    /**
     * Swing animation - pendulum effect
     */
    readonly swing: CustomMotionPreset;
    /**
     * Tada animation - attention-grabbing effect
     */
    readonly tada: CustomMotionPreset;
    /**
     * Float animation - gentle up and down motion
     */
    readonly float: CustomMotionPreset;
    /**
     * Glow animation - scale with opacity pulse
     */
    readonly glow: CustomMotionPreset;
};
type CustomPresetName = keyof typeof customPresets;

/**
 * Lazy-loaded motion components for bundle optimization
 *
 * This module provides lazy-loaded wrappers around motion/react
 * components to minimize bundle size for static icon usage.
 */

/**
 * Props for the LazyMotionIcon component
 */
interface LazyMotionIconProps {
    /**
     * Whether animations are enabled
     */
    animated: boolean;
    /**
     * Size of the icon
     */
    size: number;
    /**
     * Stroke width
     */
    strokeWidth: number;
    /**
     * CSS class name
     */
    className?: string;
    /**
     * Animation variants
     */
    variants?: Variants;
    /**
     * Transition configuration
     */
    transition?: Transition;
    /**
     * Initial animation state
     */
    initial?: string | boolean;
    /**
     * Animate on hover
     */
    whileHover?: string;
    /**
     * Animate while in view
     */
    whileInView?: string;
    /**
     * Continuous animation
     */
    animate?: string;
    /**
     * Viewport configuration for inView
     */
    viewport?: {
        once?: boolean;
        amount?: number;
    };
    /**
     * Accessible label
     */
    'aria-label'?: string;
    /**
     * Child SVG elements
     */
    children: react.ReactNode;
    /**
     * ViewBox for SVG
     */
    viewBox?: string;
}
/**
 * LazyMotionIcon - Smart icon wrapper that lazy-loads motion only when needed
 *
 * When animated=false, renders a static SVG with zero motion overhead.
 * When animated=true, lazy-loads the motion library on demand.
 *
 * @example
 * ```tsx
 * // Static usage - no motion loaded
 * <LazyMotionIcon animated={false} size={24} strokeWidth={2}>
 *   <path d="..." />
 * </LazyMotionIcon>
 *
 * // Animated usage - motion loaded on demand
 * <LazyMotionIcon
 *   animated={true}
 *   size={24}
 *   strokeWidth={2}
 *   variants={{ hover: { scale: 1.1 } }}
 *   whileHover="hover"
 * >
 *   <path d="..." />
 * </LazyMotionIcon>
 * ```
 */
declare function LazyMotionIcon({ animated, size, strokeWidth, className, variants, transition, initial, whileHover, whileInView, animate, viewport, 'aria-label': ariaLabel, children, viewBox }: LazyMotionIconProps): react.JSX.Element;
/**
 * LazyMotionPath - Lazy-loaded motion.path for draw animations
 */
interface LazyMotionPathProps {
    animated: boolean;
    d?: string;
    pathLength?: number;
    variants?: Variants;
    transition?: Transition;
    initial?: string | {
        pathLength?: number;
        opacity?: number;
    };
    animate?: string | {
        pathLength?: number | number[];
        opacity?: number | number[];
    };
    className?: string;
}
declare function LazyMotionPathElement({ animated, d, pathLength, variants, transition, initial, animate, className }: LazyMotionPathProps): react.JSX.Element;
/**
 * Check if motion library is already loaded
 */
declare function isMotionLoaded(): boolean;
/**
 * Preload motion library
 *
 * Call this to warm up the motion import for better perceived performance.
 * Useful when you know animations will be needed soon.
 */
declare function preloadMotion(): void;

/**
 * Utility functions for the MotionIcons library
 */
/**
 * Merges multiple class names into a single string
 * Filters out falsy values for conditional classes
 *
 * @param classes - Class names to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn('base-class', isActive && 'active', 'another-class')
 * // Returns: "base-class active another-class"
 * ```
 */
declare function cn(...classes: (string | undefined | null | false)[]): string;
/**
 * Merges two objects with deep property override
 * Later values override earlier ones
 *
 * @param base - Base configuration object
 * @param overrides - Override values
 * @returns Merged configuration
 *
 * @example
 * ```ts
 * mergeConfig({ size: 24, animated: true }, { size: 32 })
 * // Returns: { size: 32, animated: true }
 * ```
 */
declare function mergeConfig<T extends Record<string, unknown>>(base: T, overrides: Partial<T>): T;
/**
 * Determines if a value is defined (not null or undefined)
 *
 * @param value - Value to check
 * @returns True if value is defined
 */
declare function isDefined<T>(value: T | null | undefined): value is T;
/**
 * Creates a stable object reference from potentially undefined values
 * Returns the fallback if the value is undefined
 *
 * @param value - Value to check
 * @param fallback - Fallback value
 * @returns Value or fallback
 */
declare function withDefault<T>(value: T | undefined, fallback: T): T;

declare const Accessibility: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Award: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Baby: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bell: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Calendar: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Check: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clock: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contact: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contact2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Copy: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Download: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Edit: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eye: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const EyeOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Frown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HelpCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Home: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Inbox: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Info: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Loader: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lock: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mail: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Meh: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Menu: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessageCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Phone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Refresh: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Save: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Search: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Send: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Settings: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Share: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Smile: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Star: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ThumbsDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ThumbsUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trash: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Upload: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const User: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserCog: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserMinus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserPlus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserX: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Users: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const X: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const XCircle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cloud: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const File: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Filter: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Folder: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grid: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const List: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MoreHorizontal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bookmark: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Link: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MapPin: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Moon: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sun: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tag: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Zap: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Play: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pause: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Volume: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VolumeOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mic: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MicOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Camera: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Airplay: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cast: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FastForward: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Film: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Headphones: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Music: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Radio: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Repeat: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rewind: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shuffle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SkipBack: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SkipForward: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Speaker: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tv: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Video: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Code: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Code2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Terminal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Command: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Database: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Server: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HardDrive: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cpu: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wrench: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hammer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Screwdriver: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Palette: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Brush: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pencil: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudRain: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudSnow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudLightning: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudDrizzle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudSun: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sunrise: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sunset: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wind: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Thermometer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Droplet: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Umbrella: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Snowflake: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flame: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Leaf: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tree: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MoveHorizontal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Layout: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LayoutGrid: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LayoutList: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sidebar: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelLeft: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelRight: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Maximize: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minimize: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Maximize2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minimize2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Columns: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rows: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Square: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Circle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Triangle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AtSign: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hash: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessageSquare: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Send2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneCall: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneIncoming: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneOutgoing: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneMissed: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Voicemail: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Video2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VideoOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rss: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wifi: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WifiOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Unlock: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shield: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Key: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fingerprint: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scan: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ScanLine: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertTriangle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertOctagon: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ban: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldAlert: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LockOpen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const KeyRound: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShoppingCart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShoppingBag: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CreditCard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DollarSign: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Percent: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Receipt: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wallet: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gift: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Package: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Truck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Store: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Barcode: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const QrCode: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tag2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tags: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileText: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FilePlus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileMinus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileX: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Files: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderPlus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderMinus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderOpen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Archive: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clipboard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCheck: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardList: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCopy: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Paperclip: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Activity: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AreaChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BarChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BarChart2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gauge: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Kanban: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LineChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PieChart: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Presentation: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Signal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalHigh: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalLow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalZero: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Table: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Table2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrendingDown: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrendingUp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Laptop: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Monitor: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tablet: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Watch: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Printer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mouse: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Keyboard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Smartphone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gamepad2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Webcam: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Router: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UsbDrive: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SdCard: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Battery: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryCharging: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryLow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bluetooth: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HeartPulse: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stethoscope: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pill: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Syringe: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bandage: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Thermometer2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Microscope: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TestTube: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TestTubes: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dna: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Brain: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ear: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eye2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hand: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Footprints: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wheelchair: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GraduationCap: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Book: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BookOpen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BookMarked: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Library: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Notebook: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NotebookPen: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ruler: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PenTool: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Highlighter: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eraser: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Calculator: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Backpack: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lightbulb: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LightbulbOff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lamp: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LampDesk: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Glasses: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Building: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Building2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Factory: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Landmark: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Castle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Church: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hospital: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const School: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Warehouse: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tent: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mountain: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MountainSnow: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Waves: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Anchor: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Compass: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Map: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Globe: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trophy: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Medal: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Target: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crosshair: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice1: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice3: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice4: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice5: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice6: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Puzzle: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Joystick: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Swords: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sword: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wand: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wand2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dumbbell: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coffee: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cup: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wine: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Beer: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Martini: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pizza: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Apple: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cherry: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grape: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Banana: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Carrot: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sandwich: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Utensils: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UtensilsCrossed: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChefHat: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cookie: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const IceCream: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Car: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CarFront: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bus: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Train: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plane: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlaneTakeoff: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlaneLanding: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ship: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sailboat: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bike: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rocket: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fuel: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Parking: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrafficCone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Navigation: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Navigation2: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Milestone: ({ size, strokeWidth, className, animated, motionType, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

export { Accessibility, Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, Anchor, type AnimationMode, type AnimationName, type AnimationPreset, type AnimationVariants, Apple, Archive, AreaChart, ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, AtSign, Award, Baby, Backpack, BadgeCheck, Ban, Banana, Bandage, BarChart, BarChart2, Barcode, Battery, BatteryCharging, BatteryLow, Beer, Bell, Bike, Bluetooth, Bone, Book, BookMarked, BookOpen, Bookmark, Brain, Brush, Building, Building2, Bus, Calculator, Calendar, Camera, Car, CarFront, Carrot, Cast, Castle, Check, CheckCircle, ChefHat, Cherry, ChevronDown, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Church, Circle, Clipboard, ClipboardCheck, ClipboardCopy, ClipboardList, Clock, Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, CloudSun, Code, Code2, Coffee, Columns, Command, Compass, Contact, Contact2, Cookie, Copy, CornerDownLeft, CornerDownRight, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crosshair, Crown, Cup, type CustomMotionPreset, type CustomMotionPresetConfig, type CustomMotionPresetOptions, type CustomPresetName, Database, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dna, DollarSign, Download, Droplet, Dumbbell, Ear, Edit, Eraser, Eye, Eye2, EyeOff, Factory, FastForward, File, FileCheck, FileMinus, FilePlus, FileText, FileX, Files, Film, Filter, Fingerprint, Flame, Folder, FolderMinus, FolderOpen, FolderPlus, Footprints, Frown, Fuel, Gamepad2, Gauge, Gift, Glasses, Globe, GraduationCap, Grape, Grid, Hammer, Hand, HardDrive, Hash, Headphones, Heart, HeartPulse, HelpCircle, Highlighter, Home, Hospital, ICON_COUNT, ICON_NAMES, ICON_NAMES_KEBAB, ICON_NAME_MAP, IceCream, type IconConfig, type IconName, type IconNameKebab, type IconProps, IconProvider, type IconProviderProps, Inbox, Info, Joystick, Kanban, Key, KeyRound, Keyboard, Lamp, LampDesk, Landmark, Laptop, Layout, LayoutGrid, LayoutList, LazyMotionIcon, type LazyMotionIconProps, LazyMotionPathElement, type LazyMotionPathProps, Leaf, Library, Lightbulb, LightbulbOff, LineChart, Link, List, Loader, Lock, LockOpen, Mail, Map, MapPin, Martini, Maximize, Maximize2, Medal, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Microscope, Milestone, Minimize, Minimize2, Minus, Monitor, Moon, MoreHorizontal, type MotionPreset, type MotionType, Mountain, MountainSnow, Mouse, MoveHorizontal, Music, Navigation, Navigation2, Notebook, NotebookPen, Package, Palette, PanelLeft, PanelRight, Paperclip, Parking, Pause, Pen, PenTool, Pencil, Percent, Phone, PhoneCall, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, PieChart, Pill, Pizza, Plane, PlaneLanding, PlaneTakeoff, Play, Plus, Presentation, Printer, Puzzle, QrCode, Radio, Receipt, Refresh, Repeat, Rewind, Rocket, Router, Rows, Rss, Ruler, Sailboat, Sandwich, Save, Scan, ScanLine, School, Screwdriver, SdCard, Search, Send, Send2, Server, Settings, Share, Shield, ShieldAlert, ShieldCheck, ShieldOff, Ship, ShoppingBag, ShoppingCart, Shuffle, Sidebar, Signal, SignalHigh, SignalLow, SignalZero, SkipBack, SkipForward, Smartphone, Smile, Snowflake, Speaker, Square, Star, Stethoscope, Store, Sun, Sunrise, Sunset, Sword, Swords, Syringe, Table, Table2, Tablet, Tag, Tag2, Tags, Target, Tent, Terminal, TestTube, TestTubes, Thermometer, Thermometer2, ThumbsDown, ThumbsUp, TrafficCone, Train, type TransitionConfig, Trash, Tree, TrendingDown, TrendingUp, Triangle, type TriggerType, Trophy, Truck, Tv, Umbrella, Unlock, Upload, UsbDrive, type UseIconAnimationReturn, type UseIconConfigReturn, User, UserCheck, UserCog, UserMinus, UserPlus, UserX, Users, Utensils, UtensilsCrossed, Video, Video2, VideoOff, Voicemail, Volume, VolumeOff, Wallet, Wand, Wand2, Warehouse, Watch, Waves, Webcam, Wheelchair, Wifi, WifiOff, Wind, Wine, Wrench, X, XCircle, Zap, animations, bounce, cn, composeMotionPresets, customPresets, defineMotionPreset, draw, easeSmooth, extendMotionPreset, fade, getMotionPreset, isDefined, isIconName, isIconNameKebab, isMotionLoaded, mergeConfig, motionPresets, motionTypeList, pop, preloadMotion, pulse, rotate, shake, spin, stagger, translate, useIconAnimation, useIconConfig, useIconContext, withDefault };
