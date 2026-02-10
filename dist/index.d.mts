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
type MotionType = 'scale' | 'rotate' | 'translate' | 'shake' | 'pulse' | 'bounce' | 'draw' | 'spin' | 'ring' | 'wiggle' | 'heartbeat' | 'swing' | 'float' | 'none';
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
    lively?: MotionType;
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
     * When provided, overrides lively
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
     * Pre-built variants from the motion preset (based on lively)
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
 * @param lively - Optional motion type to use preset variants
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
 *   props.lively
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
declare function useIconAnimation(animated?: boolean, lively?: MotionType, trigger?: TriggerType): UseIconAnimationReturn;

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
type IconName = 'AbTest' | 'Accessibility' | 'Achievement' | 'Acorn' | 'Activity' | 'Aggregate' | 'Airbnb' | 'Airplay' | 'Airport' | 'AlarmClock' | 'AlertCircle' | 'AlertCircle2' | 'AlertOctagon' | 'AlertTriangle' | 'Alias' | 'Amazon' | 'Ambulance' | 'Ambulance2' | 'Analytics' | 'Anchor' | 'Anchor2' | 'Angry' | 'Angular' | 'Annoyed' | 'Apartment' | 'Api' | 'Apple' | 'Approved' | 'Arcade' | 'Archive' | 'Archive2' | 'AreaChart' | 'Armor' | 'ArrowDown' | 'ArrowDownCircle' | 'ArrowDownCircle2' | 'ArrowDownLeft' | 'ArrowDownRight' | 'ArrowDownSquare' | 'ArrowLeft' | 'ArrowLeftCircle' | 'ArrowLeftCircle2' | 'ArrowLeftSquare' | 'ArrowRight' | 'ArrowRightCircle' | 'ArrowRightCircle2' | 'ArrowRightSquare' | 'ArrowUp' | 'ArrowUpCircle' | 'ArrowUpCircle2' | 'ArrowUpLeft' | 'ArrowUpRight' | 'ArrowUpSquare' | 'ArrowsCollapse' | 'ArrowsExpand' | 'ArrowsMaximize2' | 'ArrowsMinimize2' | 'Asana' | 'Assigned' | 'Assignment' | 'AtSign' | 'Atom2' | 'Attendance' | 'Attribution' | 'AudioDescription' | 'AudioLines' | 'Automation' | 'Award' | 'Aws' | 'Axe' | 'Azure' | 'Baby' | 'Backlink' | 'Backlog' | 'Backpack' | 'Backpack2' | 'Bacon' | 'Bacteria' | 'Badge2' | 'BadgeAlert' | 'BadgeCheck' | 'BadgeCheck2' | 'BadgeDollar' | 'BadgeHelp' | 'BadgeInfo' | 'BadgeMinus' | 'BadgePercent' | 'BadgePlus' | 'BadgeX' | 'Baggage' | 'BaggageClaim' | 'Ban' | 'Banana' | 'Bandage' | 'Bandage2' | 'Bandcamp' | 'Bank' | 'Banknote' | 'BarChart' | 'BarChart2' | 'BarChartHorizontal' | 'Barcode' | 'Barcode2' | 'Barometer' | 'Baseball' | 'Basket' | 'Basketball' | 'Bathtub' | 'Battery' | 'BatteryCharging' | 'BatteryEmpty' | 'BatteryHalf' | 'BatteryLow' | 'BatteryQuarter' | 'BatteryThreeQuarters' | 'Beach' | 'Beaker2' | 'Bear' | 'Bed' | 'Bee' | 'Beer' | 'Behance' | 'Bell' | 'BellOff' | 'BellRing' | 'Benchmark' | 'Bicycle' | 'Bike' | 'Binder' | 'Biohazard2' | 'Bird' | 'Bitbucket' | 'Bitcoin' | 'Blender' | 'Block' | 'Block2' | 'Blocker' | 'BloodDrop' | 'BloodPressure' | 'Bluesky' | 'Bluetooth' | 'BoardingPass' | 'Boat' | 'BodyScan' | 'Bold' | 'Bone' | 'Book' | 'BookClosed' | 'BookMarked' | 'BookOpen' | 'Bookmark' | 'Bookshelf' | 'Boss' | 'Bot' | 'Boulder' | 'Bowling' | 'Braille' | 'Brain' | 'BrainCircuit' | 'BrainCog' | 'Branch' | 'Bread' | 'Briefcase2' | 'BriefcaseMedical' | 'Brightness' | 'Broadcast' | 'Brush' | 'Bug' | 'Building' | 'Building2' | 'Burger' | 'Bus' | 'BusinessCard' | 'Butterfly' | 'ButtonA' | 'ButtonB' | 'ButtonX' | 'ButtonY' | 'Cable' | 'Cactus' | 'Cake' | 'Calculator' | 'Calendar' | 'CalendarCheck' | 'CalendarDays' | 'CalendarMinus' | 'CalendarPlus' | 'CalendarX' | 'Caliper' | 'Camera' | 'CameraMovie' | 'Camping' | 'Candle' | 'Candy' | 'Cap' | 'Capsule' | 'Car' | 'CarFront' | 'Carpet' | 'Carrot' | 'CarryOn' | 'CartCheck' | 'CartMinus' | 'CartPlus' | 'CartX' | 'Cast' | 'Castle' | 'Cat' | 'Cave' | 'Certificate' | 'Certificate2' | 'Chain' | 'ChainBroken' | 'Chair' | 'Chalkboard' | 'Check' | 'CheckCircle' | 'CheckCircle2' | 'CheckIn' | 'CheckOut' | 'CheckSquare' | 'Checkbox' | 'CheckboxChecked' | 'ChefHat' | 'Cherry' | 'ChevronDown' | 'ChevronUp' | 'ChevronsDown' | 'ChevronsLeft' | 'ChevronsRight' | 'ChevronsUp' | 'Chicken' | 'Chimney' | 'ChipAi' | 'Chocolate' | 'Chopsticks' | 'Chrome' | 'Church' | 'Churn' | 'Cinema' | 'Circle' | 'Citation' | 'Classroom' | 'Clipboard' | 'Clipboard2' | 'ClipboardCheck' | 'ClipboardCheck2' | 'ClipboardCopy' | 'ClipboardCopy2' | 'ClipboardData' | 'ClipboardEdit' | 'ClipboardHeart' | 'ClipboardList' | 'ClipboardList2' | 'ClipboardMinus' | 'ClipboardPaste2' | 'ClipboardPlus' | 'ClipboardSearch' | 'ClipboardSignature' | 'ClipboardText' | 'ClipboardX2' | 'Clock' | 'ClosedCaption' | 'ClosedCaptions' | 'Cloud' | 'CloudDrizzle' | 'CloudFog' | 'CloudLightning' | 'CloudRain' | 'CloudSnow' | 'CloudSun' | 'Clubhouse' | 'Coat' | 'Code' | 'CodeBlock' | 'CodeSquare' | 'Code2' | 'Codepen' | 'Codesandbox' | 'Coffee' | 'Cohort' | 'Coin' | 'Coins' | 'Columns' | 'Command' | 'Comment' | 'CommentCheck' | 'CommentPlus' | 'CommentX' | 'Compare' | 'Compass' | 'Compass2' | 'Competitive' | 'Complete' | 'Concierge' | 'Confused' | 'Console' | 'Contact' | 'Contact2' | 'Container' | 'Contract' | 'Contract2' | 'Contrast' | 'Controller' | 'ControllerWireless' | 'Cookie' | 'Cool' | 'Coop' | 'Copier' | 'Copy' | 'Coral' | 'CornerDownLeft' | 'CornerDownLeft2' | 'CornerDownRight' | 'CornerDownRight2' | 'CornerUpLeft' | 'CornerUpLeft2' | 'CornerUpRight' | 'CornerUpRight2' | 'Correlation' | 'Coupon' | 'Course' | 'Cpu' | 'Crafting' | 'CreditCard' | 'Croissant' | 'Cross' | 'Crosshair' | 'Crosshair2' | 'Crown' | 'Cruise' | 'Crutches' | 'Cry' | 'Crystal' | 'Css' | 'Cup' | 'Cupcake' | 'Curriculum' | 'Cursor' | 'CursorClick' | 'CursorText' | 'Curtain' | 'CustomsIcon' | 'Cycling' | 'Dashboard' | 'DataPoint' | 'Database' | 'Database2' | 'DatabaseBackup' | 'DatabaseZap' | 'Deadline' | 'Deal' | 'DeepLink' | 'Deer' | 'Deezer' | 'Defend' | 'Delegated' | 'Dependency' | 'Desert' | 'Desk' | 'Desk2' | 'Desktop' | 'Dial' | 'Diamond' | 'Dice1' | 'Dice2' | 'Dice3' | 'Dice4' | 'Dice5' | 'Dice6' | 'Dictionary' | 'Dimension' | 'Diploma' | 'Directions' | 'Disc' | 'Disc2' | 'Disc3' | 'Discord' | 'Discount' | 'Dislike' | 'Distraction' | 'Divide2' | 'Dividend' | 'Dna' | 'Dna2' | 'DnaHelix' | 'DocumentPrinter' | 'Dog' | 'DollarSign' | 'Donut' | 'DonutChart' | 'Door' | 'DoorClosed' | 'DoorOpen' | 'Download' | 'Downtrend' | 'Dpad' | 'Dress' | 'Dribbble' | 'Drill' | 'Droplet' | 'DueDate' | 'Dumbbell' | 'Duplicate' | 'Ear' | 'EarHearing' | 'EarOff' | 'Ebay' | 'Edge' | 'Edit' | 'Egg2' | 'Electron' | 'Elephant' | 'Emergency' | 'Envelope2' | 'Equalizer' | 'Equals' | 'Eraser' | 'Estimate' | 'Etsy' | 'Exam' | 'Experiment' | 'Exposure' | 'ExternalLink' | 'ExternalLink2' | 'Eye' | 'Eye2' | 'EyeOff' | 'FaceId' | 'Facebook' | 'Factory' | 'FastForward' | 'Faucet' | 'Fax' | 'Feed' | 'Feedback' | 'Fence' | 'Fern' | 'Figma' | 'File' | 'FileArchive' | 'FileAudio' | 'FileCheck' | 'FileCode' | 'FileImage' | 'FileMinus' | 'FilePlus' | 'FileText' | 'FileVideo' | 'FileX' | 'Files' | 'Film' | 'Film2' | 'FilmSlate' | 'Filter' | 'Fingerprint' | 'FireTruck' | 'Firefox' | 'Firewall' | 'FirstAid' | 'Fish' | 'Fist' | 'Flame' | 'Flashlight' | 'FlashlightOff' | 'Flask2' | 'FlaskRound' | 'Flat' | 'FlightTicket' | 'Flower' | 'Flower2' | 'Focus' | 'FocusRing' | 'Folder' | 'FolderMinus' | 'FolderOpen' | 'FolderPlus' | 'Follow' | 'Follow2' | 'Football' | 'Footprints' | 'Forecast' | 'Forest' | 'Fork' | 'Fortress' | 'Fossil' | 'Fox' | 'Fraction' | 'FreeShipping' | 'Frown' | 'Fuel' | 'Function' | 'Funnel' | 'FunnelChart' | 'Future' | 'Gamepad' | 'Gamepad2' | 'Garage' | 'GardenHose' | 'Gate' | 'Gauge' | 'Generator' | 'Geyser' | 'Gift' | 'GitBranch' | 'GitCommit' | 'GitFork' | 'GitMerge' | 'GitPullRequest' | 'Github' | 'Gitlab' | 'Glasses' | 'Globe' | 'Globe2' | 'Glue' | 'Golf' | 'Goodreads' | 'GoogleCloud' | 'Grab' | 'GrabCursor' | 'Grabbing' | 'Grade' | 'GraduationCap' | 'Grape' | 'GreaterThan' | 'Grid' | 'Grid2x2' | 'Grid3x3' | 'Growth' | 'Guard' | 'Hail' | 'Hammer' | 'Hand' | 'HandMetal' | 'HandWave' | 'Handheld' | 'Handshake' | 'Handshake2' | 'Happy' | 'HardDrive' | 'HardDrive2' | 'Hash' | 'Hashtag' | 'Hashtag2' | 'Hat' | 'Heading1' | 'Heading2' | 'Heading3' | 'Headphones' | 'HealthBar' | 'Heart' | 'HeartPulse' | 'HeartShape' | 'Heartbeat' | 'Heatmap' | 'Helicopter' | 'HelpCircle' | 'HelpCursor' | 'Hexagon' | 'HighScore' | 'Highlighter' | 'Hiking' | 'History' | 'Hockey' | 'Home' | 'Homework' | 'Hoodie' | 'Horse' | 'Hospital' | 'Hotdog' | 'Hotel' | 'HotelBed' | 'HotelKey' | 'Hourglass' | 'House2' | 'HouseCheck' | 'HouseCog' | 'HouseHeart' | 'HousePlus' | 'HouseX' | 'Html' | 'Humidity' | 'Hyperlink' | 'Hypothesis' | 'IceCream' | 'IceCream2' | 'IdCard' | 'Immigration' | 'Immunity' | 'InProgress' | 'InStock' | 'Inbox' | 'Incomplete' | 'Indent' | 'Infinity' | 'Influencer' | 'Info' | 'InfoCircle' | 'Ink' | 'Instagram' | 'InternalLink' | 'Inventory' | 'Inventory2' | 'Investment2' | 'Invoice' | 'Island' | 'Italic' | 'Ivy' | 'Jacket' | 'JavascriptIcon' | 'Joystick' | 'Joystick2' | 'Json' | 'Jungle' | 'Kanban' | 'KanbanBoard' | 'Kettle' | 'Key' | 'KeyRound' | 'KeySquare' | 'Keyboard' | 'KeyboardNav' | 'Knife2' | 'Knob' | 'KoFi' | 'Kpi' | 'LabResults' | 'Ladder' | 'Ladle' | 'Lake' | 'Lamp' | 'LampCeiling' | 'LampDesk' | 'LampFloor' | 'LampWall' | 'Landmark' | 'Lantern' | 'Laptop' | 'Laugh' | 'Layout' | 'LayoutGrid' | 'LayoutList' | 'Leaderboard' | 'Leaf' | 'Leaf2' | 'Lecture' | 'LessThan' | 'Letterboxd' | 'Level' | 'LevelUp' | 'Library' | 'Library2' | 'Lightbulb' | 'LightbulbOff' | 'Lighthouse' | 'Like' | 'LikeFilled' | 'Line' | 'LineChart' | 'Linear' | 'Link' | 'Link2Off' | 'Linkedin' | 'Lion' | 'List' | 'Live' | 'LiveStream' | 'Lively' | 'Loader' | 'Loading' | 'Locate' | 'LocateFixed' | 'Lock' | 'LockKeyhole' | 'LockOpen' | 'Lollipop' | 'Loot' | 'Loss' | 'Love' | 'Luggage' | 'Lungs' | 'Magnet' | 'Mail' | 'MailCheck' | 'MailOpen' | 'MailPlus' | 'Mailbox' | 'ManaBar' | 'Map' | 'MapPin' | 'MapPinned' | 'Markdown' | 'Marker' | 'Market' | 'Martini' | 'Mastodon' | 'Maximize' | 'Maximize2' | 'Medal' | 'Medal2' | 'MedicalBag' | 'MedicalCross' | 'Medium' | 'Meeting' | 'Meh' | 'Memory' | 'Mention' | 'Mention2' | 'Menu' | 'MenuDots' | 'MenuDotsHorizontal' | 'MenuGrid' | 'MessageAi' | 'MessageCircle' | 'MessageSquare' | 'MessagesSquare' | 'Messenger' | 'Meta' | 'Metric' | 'Mic' | 'MicOff' | 'Microscope' | 'Microscope2' | 'Microwave' | 'Milestone' | 'Milestone2' | 'Minimize' | 'Minimize2' | 'Minus' | 'Minus2' | 'MinusCircle' | 'MinusSquare' | 'Molecule' | 'Monday' | 'Monitor' | 'Moon' | 'MoreHorizontal' | 'Moss' | 'Motorcycle' | 'Mountain' | 'MountainSnow' | 'Mouse' | 'MoveCursor' | 'MoveHorizontal' | 'Multiplayer' | 'Multiply' | 'Mushroom' | 'Music' | 'Music2' | 'Music3' | 'Music4' | 'NameBadge' | 'Navigation' | 'Navigation2' | 'Neon' | 'Netflix' | 'NeuralNetwork' | 'Nextjs' | 'Nodejs' | 'Noodles' | 'NotAllowed' | 'NotEqual' | 'Notebook' | 'NotebookPen' | 'NotebookPen2' | 'Notebook2' | 'Notion' | 'Npm' | 'Nucleus' | 'Ocean' | 'Octagon' | 'Odometer' | 'Office' | 'Ok' | 'OnHold' | 'Opera' | 'OutOfStock' | 'Outdent' | 'Outlet' | 'Outlier' | 'Oval' | 'Overdue' | 'Oxygen' | 'Package' | 'PageSetup' | 'Paintbrush' | 'Palette' | 'Palm' | 'Pan' | 'PanelBottom' | 'PanelLeft' | 'PanelRight' | 'PanelTop' | 'Pants' | 'PaperFeed' | 'Paperclip' | 'Paperclip2' | 'Parallelogram' | 'Parking' | 'Partnership' | 'Passport' | 'Passport2' | 'Patreon' | 'Pause' | 'PauseCircle' | 'Paypal' | 'Peace' | 'Pebbles' | 'Pen' | 'Pen2' | 'PenLine' | 'PenTool' | 'Pencil' | 'Pencil2' | 'PencilLine' | 'Pending' | 'Pentagon' | 'Percent' | 'PercentBadge' | 'Percentage' | 'Permalink' | 'PetriDish' | 'Phone' | 'PhoneCall' | 'PhoneIncoming' | 'PhoneMissed' | 'PhoneOff' | 'PhoneOutgoing' | 'Pi' | 'Pickup' | 'PictureFrame' | 'PieChart' | 'PieChart2' | 'PiggyBank' | 'Pill' | 'Pill2' | 'Pills' | 'Pinch' | 'PineTree' | 'Pinecone' | 'Pinterest' | 'Pitch' | 'Pizza' | 'Plane' | 'PlaneLanding' | 'PlaneTakeoff' | 'Plant2' | 'Plate' | 'Play' | 'PlayCircle' | 'Playlist' | 'Pliers' | 'Plug2' | 'Plus' | 'Plus2' | 'PlusCircle' | 'PlusSquare' | 'Podcast' | 'PointDown' | 'PointLeft' | 'PointRight' | 'PointUp' | 'Pointer2' | 'PoliceCar' | 'Poll' | 'Pomodoro' | 'Pool' | 'Popsicle' | 'Portfolio' | 'Post' | 'Pot' | 'Potion' | 'PowerOff' | 'PowerUp' | 'Prescription' | 'Presentation' | 'Presentation2' | 'PriceTag' | 'PriceTagPlus' | 'PrintPreview' | 'PrintQueue' | 'Printer' | 'Printer2' | 'PrinterCheck' | 'PrinterX' | 'Priority' | 'PriorityHigh' | 'PriorityLow' | 'Profit' | 'Progress' | 'Projector' | 'Protection' | 'Protractor' | 'Pulse' | 'Puzzle' | 'PuzzlePiece' | 'Pvp' | 'QrCode' | 'QrScan' | 'Quest' | 'Queue' | 'Quiz' | 'Quote' | 'Rabbit' | 'Radiation' | 'Radio' | 'RadioButton' | 'RadioChecked' | 'Rainbow' | 'Rake' | 'Ram' | 'Rating' | 'React' | 'Reaction' | 'Receipt' | 'Receipt2' | 'ReceiptCheck' | 'ReceiptX' | 'Record' | 'Recovery' | 'Rectangle' | 'Recurring' | 'Reddit' | 'ReducedMotion' | 'Reference' | 'Refresh' | 'Refrigerator' | 'Refund' | 'Regex' | 'Regression' | 'Rejected' | 'Reminder' | 'Reorder' | 'Repeat' | 'Report' | 'Repost' | 'Research' | 'Reservation' | 'ResizeDiagonal' | 'ResizeHorizontal' | 'ResizeVertical' | 'Respawn' | 'Retention' | 'Return' | 'Revenue' | 'Review2' | 'Rewind' | 'Rice' | 'River' | 'RoadTrip' | 'Roadmap' | 'Robot' | 'Rocket' | 'Roi' | 'Roller' | 'RoomService' | 'Rose' | 'Route' | 'Router' | 'Rows' | 'Rss' | 'RubberStamp' | 'Ruler' | 'Ruler2' | 'RulerSquare' | 'Running' | 'Runway' | 'Sad' | 'Safari' | 'Sailboat' | 'Salad' | 'Sandwich' | 'Save' | 'Save2' | 'SavePlus' | 'Saw' | 'Scale2' | 'Scan' | 'Scan2' | 'ScanFace' | 'ScanLine' | 'Scanner' | 'Scanner2' | 'ScatterPlot' | 'Schedule' | 'Schedule2' | 'School' | 'Scissors2' | 'Scooter' | 'Screen' | 'ScreenReader' | 'Screwdriver' | 'SdCard' | 'Search' | 'SearchMinus' | 'SearchPlus' | 'Seaweed' | 'Seedling' | 'Segment' | 'Seminar' | 'Send' | 'Send2' | 'Server' | 'Server2' | 'ServerCog' | 'ServerCrash' | 'ServerOff' | 'Settings' | 'Share' | 'Share2' | 'ShareForward' | 'Shareholder' | 'Shell' | 'Shield' | 'Shield2' | 'ShieldAlert' | 'ShieldAlert2' | 'ShieldCheck' | 'ShieldDollar' | 'ShieldLock' | 'ShieldMinus2' | 'ShieldOff' | 'ShieldOff2' | 'ShieldPlus' | 'ShieldPlus2' | 'ShieldUnlock' | 'ShieldUser' | 'ShieldX' | 'Ship' | 'Shipping' | 'ShippingFast' | 'Shirt' | 'Shopify' | 'ShoppingBag' | 'ShoppingBagPlus' | 'ShoppingCart' | 'Shortcut' | 'Shorts' | 'Shovel' | 'Shrimp' | 'Shuffle' | 'Sidebar' | 'SidebarClose' | 'SidebarOpen' | 'Sigma' | 'Sign' | 'SignLanguage' | 'Signal' | 'SignalApp' | 'SignalHigh' | 'SignalLow' | 'SignalZero' | 'Signpost' | 'Sink' | 'Skiing' | 'SkipBack' | 'SkipForward' | 'Slack' | 'Sleep' | 'Slider' | 'SliderHorizontal' | 'SliderVertical' | 'Smartphone' | 'Smile' | 'Snapchat' | 'Snippet' | 'Snowflake' | 'Soccer' | 'Sofa' | 'Soundcloud' | 'Soup' | 'Spa' | 'Sparkles' | 'Sparkline' | 'Spatula' | 'Speaker' | 'Speaker2' | 'Speaker3' | 'SpeedDial' | 'Speedometer' | 'Spoon2' | 'Spotify' | 'Spotlight' | 'Sprint' | 'Sprout' | 'Sqrt' | 'Square' | 'Ssd' | 'Stackoverflow' | 'Stakeholder' | 'Stamp' | 'Stamp2' | 'Stapler' | 'Star' | 'Starfish' | 'Startup' | 'Statistics' | 'Steak' | 'Stethoscope' | 'Stethoscope2' | 'StopCircle' | 'Stopwatch' | 'Storage' | 'Store' | 'StoreFront' | 'Story' | 'Strategy' | 'Strava' | 'Stream' | 'Strikethrough' | 'Stripe' | 'StudentId' | 'Studio' | 'Subscript' | 'Substack' | 'Subtask' | 'Subtitle' | 'Sun' | 'Sunglasses' | 'Sunrise' | 'Sunset' | 'Superscript' | 'SurgeProtector' | 'Surprised' | 'Survey' | 'Sushi' | 'Svelte' | 'Sweater' | 'Swimming' | 'SwitchOff' | 'SwitchOn' | 'Sword' | 'Swords' | 'Syringe' | 'Syringe2' | 'Table' | 'Table2' | 'Tablet' | 'Taco' | 'Tag' | 'TagPerson' | 'Tag2' | 'Tags' | 'Tailwind' | 'Tape' | 'TapeMeasure' | 'Target' | 'Target2' | 'Task' | 'TaskCheck' | 'TaskList' | 'Team' | 'Teams' | 'Telegram' | 'Temperature' | 'TemperatureDial' | 'Template' | 'Tennis' | 'Tent' | 'Terminal' | 'Terminal2' | 'TerminalGate' | 'TerminalSquare' | 'TestTube' | 'TestTube2' | 'TestTubes' | 'Testimonial' | 'Text' | 'TextCursor' | 'TextSize' | 'Textbook' | 'Thermometer' | 'Thermometer2' | 'ThermometerMedical' | 'Threads' | 'ThumbsDown' | 'ThumbsUp' | 'Ticket' | 'Tie' | 'Tiktok' | 'TimeTracking' | 'Timeline' | 'Timeline2' | 'Timer' | 'Toaster' | 'Toggle' | 'ToggleLeft' | 'ToggleRight' | 'Toilet' | 'Toner' | 'Toolbox' | 'Torch' | 'Tornado' | 'Tower' | 'TrafficCone' | 'Train' | 'Trapezoid' | 'Trash' | 'Tree' | 'Tree2' | 'TreePalm' | 'TreePine' | 'Treemap' | 'Trello' | 'Trending' | 'TrendingDown' | 'TrendingUp' | 'Triangle' | 'Trigger' | 'Trophy' | 'Trophy2' | 'Truck' | 'Tshirt' | 'Tulip' | 'Tumblr' | 'Turtle' | 'Tutor' | 'Tv' | 'Twitch' | 'Twitter' | 'TwoFactor' | 'TypescriptIcon' | 'Ufo' | 'Umbrella' | 'Underline' | 'Unfollow' | 'Unfollow2' | 'University' | 'Unlock' | 'Unverified' | 'Upload' | 'Ups' | 'Uptrend' | 'UsbDrive' | 'User' | 'UserCheck' | 'UserCircle' | 'UserCog' | 'UserMinus' | 'UserPlus' | 'UserX' | 'Users' | 'Utensils' | 'UtensilsCrossed' | 'Vaccine' | 'Variance' | 'Vault' | 'Vercel' | 'Verified' | 'Verified2' | 'Viber' | 'Video' | 'Video2' | 'VideoOff' | 'Vimeo' | 'Vinyl' | 'Viral' | 'Virus' | 'Visa' | 'Vitals' | 'VoiceControl' | 'Voicemail' | 'Volcano' | 'Volleyball' | 'Volume' | 'Volume1' | 'Volume2' | 'VolumeDial' | 'VolumeOff' | 'VolumeX' | 'Vscode' | 'Vue' | 'WaitCursor' | 'Walker' | 'Wallet' | 'WalletCards' | 'Wand' | 'Wand2' | 'WandSparkles' | 'Warehouse' | 'Watch' | 'WatchAccessory' | 'Waterfall' | 'WateringCan' | 'Waveform' | 'Waves' | 'Waypoints' | 'Webcam' | 'Webhook' | 'Wechat' | 'Weight' | 'Whatsapp' | 'Wheelchair' | 'Wheelchair2' | 'Whisk' | 'Whiteboard' | 'Widget' | 'Wifi' | 'WifiOff' | 'Wind' | 'Window' | 'Window2' | 'Wine' | 'Wink' | 'Wishlist' | 'Wolf' | 'Workflow' | 'Wrench' | 'X' | 'XCircle' | 'XCircle2' | 'XSquare' | 'XTwitter' | 'Xml' | 'XpBar' | 'Xray' | 'Youtube' | 'Zap' | 'Zoom';
/**
 * Union type of all available icon names (kebab-case)
 *
 * Useful for configuration objects or CLI tools
 */
type IconNameKebab = 'ab-test' | 'accessibility' | 'achievement' | 'acorn' | 'activity' | 'aggregate' | 'airbnb' | 'airplay' | 'airport' | 'alarm-clock' | 'alert-circle' | 'alert-circle-2' | 'alert-octagon' | 'alert-triangle' | 'alias' | 'amazon' | 'ambulance' | 'ambulance-2' | 'analytics' | 'anchor' | 'anchor-2' | 'angry' | 'angular' | 'annoyed' | 'apartment' | 'api' | 'apple' | 'approved' | 'arcade' | 'archive' | 'archive-2' | 'area-chart' | 'armor' | 'arrow-down' | 'arrow-down-circle' | 'arrow-down-circle-2' | 'arrow-down-left' | 'arrow-down-right' | 'arrow-down-square' | 'arrow-left' | 'arrow-left-circle' | 'arrow-left-circle-2' | 'arrow-left-square' | 'arrow-right' | 'arrow-right-circle' | 'arrow-right-circle-2' | 'arrow-right-square' | 'arrow-up' | 'arrow-up-circle' | 'arrow-up-circle-2' | 'arrow-up-left' | 'arrow-up-right' | 'arrow-up-square' | 'arrows-collapse' | 'arrows-expand' | 'arrows-maximize-2' | 'arrows-minimize-2' | 'asana' | 'assigned' | 'assignment' | 'at-sign' | 'atom-2' | 'attendance' | 'attribution' | 'audio-description' | 'audio-lines' | 'automation' | 'award' | 'aws' | 'axe' | 'azure' | 'baby' | 'backlink' | 'backlog' | 'backpack' | 'backpack2' | 'bacon' | 'bacteria' | 'badge-2' | 'badge-alert' | 'badge-check' | 'badge-check-2' | 'badge-dollar' | 'badge-help' | 'badge-info' | 'badge-minus' | 'badge-percent' | 'badge-plus' | 'badge-x' | 'baggage' | 'baggage-claim' | 'ban' | 'banana' | 'bandage' | 'bandage-2' | 'bandcamp' | 'bank' | 'banknote' | 'bar-chart' | 'bar-chart-2' | 'bar-chart-horizontal' | 'barcode' | 'barcode-2' | 'barometer' | 'baseball' | 'basket' | 'basketball' | 'bathtub' | 'battery' | 'battery-charging' | 'battery-empty' | 'battery-half' | 'battery-low' | 'battery-quarter' | 'battery-three-quarters' | 'beach' | 'beaker-2' | 'bear' | 'bed' | 'bee' | 'beer' | 'behance' | 'bell' | 'bell-off' | 'bell-ring' | 'benchmark' | 'bicycle' | 'bike' | 'binder' | 'biohazard-2' | 'bird' | 'bitbucket' | 'bitcoin' | 'blender' | 'block' | 'block-2' | 'blocker' | 'blood-drop' | 'blood-pressure' | 'bluesky' | 'bluetooth' | 'boarding-pass' | 'boat' | 'body-scan' | 'bold' | 'bone' | 'book' | 'book-closed' | 'book-marked' | 'book-open' | 'bookmark' | 'bookshelf' | 'boss' | 'bot' | 'boulder' | 'bowling' | 'braille' | 'brain' | 'brain-circuit' | 'brain-cog' | 'branch' | 'bread' | 'briefcase-2' | 'briefcase-medical' | 'brightness' | 'broadcast' | 'brush' | 'bug' | 'building' | 'building2' | 'burger' | 'bus' | 'business-card' | 'butterfly' | 'button-a' | 'button-b' | 'button-x' | 'button-y' | 'cable' | 'cactus' | 'cake' | 'calculator' | 'calendar' | 'calendar-check' | 'calendar-days' | 'calendar-minus' | 'calendar-plus' | 'calendar-x' | 'caliper' | 'camera' | 'camera-movie' | 'camping' | 'candle' | 'candy' | 'cap' | 'capsule' | 'car' | 'car-front' | 'carpet' | 'carrot' | 'carry-on' | 'cart-check' | 'cart-minus' | 'cart-plus' | 'cart-x' | 'cast' | 'castle' | 'cat' | 'cave' | 'certificate' | 'certificate2' | 'chain' | 'chain-broken' | 'chair' | 'chalkboard' | 'check' | 'check-circle' | 'check-circle-2' | 'check-in' | 'check-out' | 'check-square' | 'checkbox' | 'checkbox-checked' | 'chef-hat' | 'cherry' | 'chevron-down' | 'chevron-up' | 'chevrons-down' | 'chevrons-left' | 'chevrons-right' | 'chevrons-up' | 'chicken' | 'chimney' | 'chip-ai' | 'chocolate' | 'chopsticks' | 'chrome' | 'church' | 'churn' | 'cinema' | 'circle' | 'citation' | 'classroom' | 'clipboard' | 'clipboard-2' | 'clipboard-check' | 'clipboard-check-2' | 'clipboard-copy' | 'clipboard-copy-2' | 'clipboard-data' | 'clipboard-edit' | 'clipboard-heart' | 'clipboard-list' | 'clipboard-list-2' | 'clipboard-minus' | 'clipboard-paste-2' | 'clipboard-plus' | 'clipboard-search' | 'clipboard-signature' | 'clipboard-text' | 'clipboard-x-2' | 'clock' | 'closed-caption' | 'closed-captions' | 'cloud' | 'cloud-drizzle' | 'cloud-fog' | 'cloud-lightning' | 'cloud-rain' | 'cloud-snow' | 'cloud-sun' | 'clubhouse' | 'coat' | 'code' | 'code-block' | 'code-square' | 'code2' | 'codepen' | 'codesandbox' | 'coffee' | 'cohort' | 'coin' | 'coins' | 'columns' | 'command' | 'comment' | 'comment-check' | 'comment-plus' | 'comment-x' | 'compare' | 'compass' | 'compass-2' | 'competitive' | 'complete' | 'concierge' | 'confused' | 'console' | 'contact' | 'contact2' | 'container' | 'contract' | 'contract-2' | 'contrast' | 'controller' | 'controller-wireless' | 'cookie' | 'cool' | 'coop' | 'copier' | 'copy' | 'coral' | 'corner-down-left' | 'corner-down-left-2' | 'corner-down-right' | 'corner-down-right-2' | 'corner-up-left' | 'corner-up-left-2' | 'corner-up-right' | 'corner-up-right-2' | 'correlation' | 'coupon' | 'course' | 'cpu' | 'crafting' | 'credit-card' | 'croissant' | 'cross' | 'crosshair' | 'crosshair-2' | 'crown' | 'cruise' | 'crutches' | 'cry' | 'crystal' | 'css' | 'cup' | 'cupcake' | 'curriculum' | 'cursor' | 'cursor-click' | 'cursor-text' | 'curtain' | 'customs-icon' | 'cycling' | 'dashboard' | 'data-point' | 'database' | 'database-2' | 'database-backup' | 'database-zap' | 'deadline' | 'deal' | 'deep-link' | 'deer' | 'deezer' | 'defend' | 'delegated' | 'dependency' | 'desert' | 'desk' | 'desk2' | 'desktop' | 'dial' | 'diamond' | 'dice-1' | 'dice-2' | 'dice-3' | 'dice-4' | 'dice-5' | 'dice-6' | 'dictionary' | 'dimension' | 'diploma' | 'directions' | 'disc' | 'disc-2' | 'disc-3' | 'discord' | 'discount' | 'dislike' | 'distraction' | 'divide-2' | 'dividend' | 'dna' | 'dna-2' | 'dna-helix' | 'document-printer' | 'dog' | 'dollar-sign' | 'donut' | 'donut-chart' | 'door' | 'door-closed' | 'door-open' | 'download' | 'downtrend' | 'dpad' | 'dress' | 'dribbble' | 'drill' | 'droplet' | 'due-date' | 'dumbbell' | 'duplicate' | 'ear' | 'ear-hearing' | 'ear-off' | 'ebay' | 'edge' | 'edit' | 'egg2' | 'electron' | 'elephant' | 'emergency' | 'envelope-2' | 'equalizer' | 'equals' | 'eraser' | 'estimate' | 'etsy' | 'exam' | 'experiment' | 'exposure' | 'external-link' | 'external-link-2' | 'eye' | 'eye-2' | 'eye-off' | 'face-id' | 'facebook' | 'factory' | 'fast-forward' | 'faucet' | 'fax' | 'feed' | 'feedback' | 'fence' | 'fern' | 'figma' | 'file' | 'file-archive' | 'file-audio' | 'file-check' | 'file-code' | 'file-image' | 'file-minus' | 'file-plus' | 'file-text' | 'file-video' | 'file-x' | 'files' | 'film' | 'film-2' | 'film-slate' | 'filter' | 'fingerprint' | 'fire-truck' | 'firefox' | 'firewall' | 'first-aid' | 'fish' | 'fist' | 'flame' | 'flashlight' | 'flashlight-off' | 'flask-2' | 'flask-round' | 'flat' | 'flight-ticket' | 'flower' | 'flower-2' | 'focus' | 'focus-ring' | 'folder' | 'folder-minus' | 'folder-open' | 'folder-plus' | 'follow' | 'follow-2' | 'football' | 'footprints' | 'forecast' | 'forest' | 'fork' | 'fortress' | 'fossil' | 'fox' | 'fraction' | 'free-shipping' | 'frown' | 'fuel' | 'function' | 'funnel' | 'funnel-chart' | 'future' | 'gamepad' | 'gamepad-2' | 'garage' | 'garden-hose' | 'gate' | 'gauge' | 'generator' | 'geyser' | 'gift' | 'git-branch' | 'git-commit' | 'git-fork' | 'git-merge' | 'git-pull-request' | 'github' | 'gitlab' | 'glasses' | 'globe' | 'globe-2' | 'glue' | 'golf' | 'goodreads' | 'google-cloud' | 'grab' | 'grab-cursor' | 'grabbing' | 'grade' | 'graduation-cap' | 'grape' | 'greater-than' | 'grid' | 'grid-2x2' | 'grid-3x3' | 'growth' | 'guard' | 'hail' | 'hammer' | 'hand' | 'hand-metal' | 'hand-wave' | 'handheld' | 'handshake' | 'handshake-2' | 'happy' | 'hard-drive' | 'hard-drive-2' | 'hash' | 'hashtag' | 'hashtag-2' | 'hat' | 'heading-1' | 'heading-2' | 'heading-3' | 'headphones' | 'health-bar' | 'heart' | 'heart-pulse' | 'heart-shape' | 'heartbeat' | 'heatmap' | 'helicopter' | 'help-circle' | 'help-cursor' | 'hexagon' | 'high-score' | 'highlighter' | 'hiking' | 'history' | 'hockey' | 'home' | 'homework' | 'hoodie' | 'horse' | 'hospital' | 'hotdog' | 'hotel' | 'hotel-bed' | 'hotel-key' | 'hourglass' | 'house-2' | 'house-check' | 'house-cog' | 'house-heart' | 'house-plus' | 'house-x' | 'html' | 'humidity' | 'hyperlink' | 'hypothesis' | 'ice-cream' | 'ice-cream-2' | 'id-card' | 'immigration' | 'immunity' | 'in-progress' | 'in-stock' | 'inbox' | 'incomplete' | 'indent' | 'infinity' | 'influencer' | 'info' | 'info-circle' | 'ink' | 'instagram' | 'internal-link' | 'inventory' | 'inventory-2' | 'investment-2' | 'invoice' | 'island' | 'italic' | 'ivy' | 'jacket' | 'javascript-icon' | 'joystick' | 'joystick-2' | 'json' | 'jungle' | 'kanban' | 'kanban-board' | 'kettle' | 'key' | 'key-round' | 'key-square' | 'keyboard' | 'keyboard-nav' | 'knife-2' | 'knob' | 'ko-fi' | 'kpi' | 'lab-results' | 'ladder' | 'ladle' | 'lake' | 'lamp' | 'lamp-ceiling' | 'lamp-desk' | 'lamp-floor' | 'lamp-wall' | 'landmark' | 'lantern' | 'laptop' | 'laugh' | 'layout' | 'layout-grid' | 'layout-list' | 'leaderboard' | 'leaf' | 'leaf-2' | 'lecture' | 'less-than' | 'letterboxd' | 'level' | 'level-up' | 'library' | 'library2' | 'lightbulb' | 'lightbulb-off' | 'lighthouse' | 'like' | 'like-filled' | 'line' | 'line-chart' | 'linear' | 'link' | 'link-2-off' | 'linkedin' | 'lion' | 'list' | 'live' | 'live-stream' | 'lively' | 'loader' | 'loading' | 'locate' | 'locate-fixed' | 'lock' | 'lock-keyhole' | 'lock-open' | 'lollipop' | 'loot' | 'loss' | 'love' | 'luggage' | 'lungs' | 'magnet' | 'mail' | 'mail-check' | 'mail-open' | 'mail-plus' | 'mailbox' | 'mana-bar' | 'map' | 'map-pin' | 'map-pinned' | 'markdown' | 'marker' | 'market' | 'martini' | 'mastodon' | 'maximize' | 'maximize-2' | 'medal' | 'medal2' | 'medical-bag' | 'medical-cross' | 'medium' | 'meeting' | 'meh' | 'memory' | 'mention' | 'mention-2' | 'menu' | 'menu-dots' | 'menu-dots-horizontal' | 'menu-grid' | 'message-ai' | 'message-circle' | 'message-square' | 'messages-square' | 'messenger' | 'meta' | 'metric' | 'mic' | 'mic-off' | 'microscope' | 'microscope-2' | 'microwave' | 'milestone' | 'milestone-2' | 'minimize' | 'minimize-2' | 'minus' | 'minus-2' | 'minus-circle' | 'minus-square' | 'molecule' | 'monday' | 'monitor' | 'moon' | 'more-horizontal' | 'moss' | 'motorcycle' | 'mountain' | 'mountain-snow' | 'mouse' | 'move-cursor' | 'move-horizontal' | 'multiplayer' | 'multiply' | 'mushroom' | 'music' | 'music-2' | 'music-3' | 'music-4' | 'name-badge' | 'navigation' | 'navigation-2' | 'neon' | 'netflix' | 'neural-network' | 'nextjs' | 'nodejs' | 'noodles' | 'not-allowed' | 'not-equal' | 'notebook' | 'notebook-pen' | 'notebook-pen2' | 'notebook2' | 'notion' | 'npm' | 'nucleus' | 'ocean' | 'octagon' | 'odometer' | 'office' | 'ok' | 'on-hold' | 'opera' | 'out-of-stock' | 'outdent' | 'outlet' | 'outlier' | 'oval' | 'overdue' | 'oxygen' | 'package' | 'page-setup' | 'paintbrush' | 'palette' | 'palm' | 'pan' | 'panel-bottom' | 'panel-left' | 'panel-right' | 'panel-top' | 'pants' | 'paper-feed' | 'paperclip' | 'paperclip-2' | 'parallelogram' | 'parking' | 'partnership' | 'passport' | 'passport-2' | 'patreon' | 'pause' | 'pause-circle' | 'paypal' | 'peace' | 'pebbles' | 'pen' | 'pen-2' | 'pen-line' | 'pen-tool' | 'pencil' | 'pencil-2' | 'pencil-line' | 'pending' | 'pentagon' | 'percent' | 'percent-badge' | 'percentage' | 'permalink' | 'petri-dish' | 'phone' | 'phone-call' | 'phone-incoming' | 'phone-missed' | 'phone-off' | 'phone-outgoing' | 'pi' | 'pickup' | 'picture-frame' | 'pie-chart' | 'pie-chart-2' | 'piggy-bank' | 'pill' | 'pill-2' | 'pills' | 'pinch' | 'pine-tree' | 'pinecone' | 'pinterest' | 'pitch' | 'pizza' | 'plane' | 'plane-landing' | 'plane-takeoff' | 'plant-2' | 'plate' | 'play' | 'play-circle' | 'playlist' | 'pliers' | 'plug-2' | 'plus' | 'plus-2' | 'plus-circle' | 'plus-square' | 'podcast' | 'point-down' | 'point-left' | 'point-right' | 'point-up' | 'pointer-2' | 'police-car' | 'poll' | 'pomodoro' | 'pool' | 'popsicle' | 'portfolio' | 'post' | 'pot' | 'potion' | 'power-off' | 'power-up' | 'prescription' | 'presentation' | 'presentation-2' | 'price-tag' | 'price-tag-plus' | 'print-preview' | 'print-queue' | 'printer' | 'printer-2' | 'printer-check' | 'printer-x' | 'priority' | 'priority-high' | 'priority-low' | 'profit' | 'progress' | 'projector' | 'protection' | 'protractor' | 'pulse' | 'puzzle' | 'puzzle-piece' | 'pvp' | 'qr-code' | 'qr-scan' | 'quest' | 'queue' | 'quiz' | 'quote' | 'rabbit' | 'radiation' | 'radio' | 'radio-button' | 'radio-checked' | 'rainbow' | 'rake' | 'ram' | 'rating' | 'react' | 'reaction' | 'receipt' | 'receipt-2' | 'receipt-check' | 'receipt-x' | 'record' | 'recovery' | 'rectangle' | 'recurring' | 'reddit' | 'reduced-motion' | 'reference' | 'refresh' | 'refrigerator' | 'refund' | 'regex' | 'regression' | 'rejected' | 'reminder' | 'reorder' | 'repeat' | 'report' | 'repost' | 'research' | 'reservation' | 'resize-diagonal' | 'resize-horizontal' | 'resize-vertical' | 'respawn' | 'retention' | 'return' | 'revenue' | 'review-2' | 'rewind' | 'rice' | 'river' | 'road-trip' | 'roadmap' | 'robot' | 'rocket' | 'roi' | 'roller' | 'room-service' | 'rose' | 'route' | 'router' | 'rows' | 'rss' | 'rubber-stamp' | 'ruler' | 'ruler-2' | 'ruler-square' | 'running' | 'runway' | 'sad' | 'safari' | 'sailboat' | 'salad' | 'sandwich' | 'save' | 'save-2' | 'save-plus' | 'saw' | 'scale-2' | 'scan' | 'scan-2' | 'scan-face' | 'scan-line' | 'scanner' | 'scanner-2' | 'scatter-plot' | 'schedule' | 'schedule2' | 'school' | 'scissors-2' | 'scooter' | 'screen' | 'screen-reader' | 'screwdriver' | 'sd-card' | 'search' | 'search-minus' | 'search-plus' | 'seaweed' | 'seedling' | 'segment' | 'seminar' | 'send' | 'send-2' | 'server' | 'server-2' | 'server-cog' | 'server-crash' | 'server-off' | 'settings' | 'share' | 'share-2' | 'share-forward' | 'shareholder' | 'shell' | 'shield' | 'shield-2' | 'shield-alert' | 'shield-alert-2' | 'shield-check' | 'shield-dollar' | 'shield-lock' | 'shield-minus-2' | 'shield-off' | 'shield-off-2' | 'shield-plus' | 'shield-plus-2' | 'shield-unlock' | 'shield-user' | 'shield-x' | 'ship' | 'shipping' | 'shipping-fast' | 'shirt' | 'shopify' | 'shopping-bag' | 'shopping-bag-plus' | 'shopping-cart' | 'shortcut' | 'shorts' | 'shovel' | 'shrimp' | 'shuffle' | 'sidebar' | 'sidebar-close' | 'sidebar-open' | 'sigma' | 'sign' | 'sign-language' | 'signal' | 'signal-app' | 'signal-high' | 'signal-low' | 'signal-zero' | 'signpost' | 'sink' | 'skiing' | 'skip-back' | 'skip-forward' | 'slack' | 'sleep' | 'slider' | 'slider-horizontal' | 'slider-vertical' | 'smartphone' | 'smile' | 'snapchat' | 'snippet' | 'snowflake' | 'soccer' | 'sofa' | 'soundcloud' | 'soup' | 'spa' | 'sparkles' | 'sparkline' | 'spatula' | 'speaker' | 'speaker-2' | 'speaker-3' | 'speed-dial' | 'speedometer' | 'spoon-2' | 'spotify' | 'spotlight' | 'sprint' | 'sprout' | 'sqrt' | 'square' | 'ssd' | 'stackoverflow' | 'stakeholder' | 'stamp' | 'stamp-2' | 'stapler' | 'star' | 'starfish' | 'startup' | 'statistics' | 'steak' | 'stethoscope' | 'stethoscope-2' | 'stop-circle' | 'stopwatch' | 'storage' | 'store' | 'store-front' | 'story' | 'strategy' | 'strava' | 'stream' | 'strikethrough' | 'stripe' | 'student-id' | 'studio' | 'subscript' | 'substack' | 'subtask' | 'subtitle' | 'sun' | 'sunglasses' | 'sunrise' | 'sunset' | 'superscript' | 'surge-protector' | 'surprised' | 'survey' | 'sushi' | 'svelte' | 'sweater' | 'swimming' | 'switch-off' | 'switch-on' | 'sword' | 'swords' | 'syringe' | 'syringe-2' | 'table' | 'table-2' | 'tablet' | 'taco' | 'tag' | 'tag-person' | 'tag2' | 'tags' | 'tailwind' | 'tape' | 'tape-measure' | 'target' | 'target-2' | 'task' | 'task-check' | 'task-list' | 'team' | 'teams' | 'telegram' | 'temperature' | 'temperature-dial' | 'template' | 'tennis' | 'tent' | 'terminal' | 'terminal-2' | 'terminal-gate' | 'terminal-square' | 'test-tube' | 'test-tube-2' | 'test-tubes' | 'testimonial' | 'text' | 'text-cursor' | 'text-size' | 'textbook' | 'thermometer' | 'thermometer-2' | 'thermometer-medical' | 'threads' | 'thumbs-down' | 'thumbs-up' | 'ticket' | 'tie' | 'tiktok' | 'time-tracking' | 'timeline' | 'timeline-2' | 'timer' | 'toaster' | 'toggle' | 'toggle-left' | 'toggle-right' | 'toilet' | 'toner' | 'toolbox' | 'torch' | 'tornado' | 'tower' | 'traffic-cone' | 'train' | 'trapezoid' | 'trash' | 'tree' | 'tree-2' | 'tree-palm' | 'tree-pine' | 'treemap' | 'trello' | 'trending' | 'trending-down' | 'trending-up' | 'triangle' | 'trigger' | 'trophy' | 'trophy2' | 'truck' | 'tshirt' | 'tulip' | 'tumblr' | 'turtle' | 'tutor' | 'tv' | 'twitch' | 'twitter' | 'two-factor' | 'typescript-icon' | 'ufo' | 'umbrella' | 'underline' | 'unfollow' | 'unfollow-2' | 'university' | 'unlock' | 'unverified' | 'upload' | 'ups' | 'uptrend' | 'usb-drive' | 'user' | 'user-check' | 'user-circle' | 'user-cog' | 'user-minus' | 'user-plus' | 'user-x' | 'users' | 'utensils' | 'utensils-crossed' | 'vaccine' | 'variance' | 'vault' | 'vercel' | 'verified' | 'verified-2' | 'viber' | 'video' | 'video-2' | 'video-off' | 'vimeo' | 'vinyl' | 'viral' | 'virus' | 'visa' | 'vitals' | 'voice-control' | 'voicemail' | 'volcano' | 'volleyball' | 'volume' | 'volume-1' | 'volume-2' | 'volume-dial' | 'volume-off' | 'volume-x' | 'vscode' | 'vue' | 'wait-cursor' | 'walker' | 'wallet' | 'wallet-cards' | 'wand' | 'wand-2' | 'wand-sparkles' | 'warehouse' | 'watch' | 'watch-accessory' | 'waterfall' | 'watering-can' | 'waveform' | 'waves' | 'waypoints' | 'webcam' | 'webhook' | 'wechat' | 'weight' | 'whatsapp' | 'wheelchair' | 'wheelchair-2' | 'whisk' | 'whiteboard' | 'widget' | 'wifi' | 'wifi-off' | 'wind' | 'window' | 'window-2' | 'wine' | 'wink' | 'wishlist' | 'wolf' | 'workflow' | 'wrench' | 'x' | 'x-circle' | 'x-circle-2' | 'x-square' | 'x-twitter' | 'xml' | 'xp-bar' | 'xray' | 'youtube' | 'zap' | 'zoom';
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
declare const ICON_NAMES: readonly ["AbTest", "Accessibility", "Achievement", "Acorn", "Activity", "Aggregate", "Airbnb", "Airplay", "Airport", "AlarmClock", "AlertCircle", "AlertCircle2", "AlertOctagon", "AlertTriangle", "Alias", "Amazon", "Ambulance", "Ambulance2", "Analytics", "Anchor", "Anchor2", "Angry", "Angular", "Annoyed", "Apartment", "Api", "Apple", "Approved", "Arcade", "Archive", "Archive2", "AreaChart", "Armor", "ArrowDown", "ArrowDownCircle", "ArrowDownCircle2", "ArrowDownLeft", "ArrowDownRight", "ArrowDownSquare", "ArrowLeft", "ArrowLeftCircle", "ArrowLeftCircle2", "ArrowLeftSquare", "ArrowRight", "ArrowRightCircle", "ArrowRightCircle2", "ArrowRightSquare", "ArrowUp", "ArrowUpCircle", "ArrowUpCircle2", "ArrowUpLeft", "ArrowUpRight", "ArrowUpSquare", "ArrowsCollapse", "ArrowsExpand", "ArrowsMaximize2", "ArrowsMinimize2", "Asana", "Assigned", "Assignment", "AtSign", "Atom2", "Attendance", "Attribution", "AudioDescription", "AudioLines", "Automation", "Award", "Aws", "Axe", "Azure", "Baby", "Backlink", "Backlog", "Backpack", "Backpack2", "Bacon", "Bacteria", "Badge2", "BadgeAlert", "BadgeCheck", "BadgeCheck2", "BadgeDollar", "BadgeHelp", "BadgeInfo", "BadgeMinus", "BadgePercent", "BadgePlus", "BadgeX", "Baggage", "BaggageClaim", "Ban", "Banana", "Bandage", "Bandage2", "Bandcamp", "Bank", "Banknote", "BarChart", "BarChart2", "BarChartHorizontal", "Barcode", "Barcode2", "Barometer", "Baseball", "Basket", "Basketball", "Bathtub", "Battery", "BatteryCharging", "BatteryEmpty", "BatteryHalf", "BatteryLow", "BatteryQuarter", "BatteryThreeQuarters", "Beach", "Beaker2", "Bear", "Bed", "Bee", "Beer", "Behance", "Bell", "BellOff", "BellRing", "Benchmark", "Bicycle", "Bike", "Binder", "Biohazard2", "Bird", "Bitbucket", "Bitcoin", "Blender", "Block", "Block2", "Blocker", "BloodDrop", "BloodPressure", "Bluesky", "Bluetooth", "BoardingPass", "Boat", "BodyScan", "Bold", "Bone", "Book", "BookClosed", "BookMarked", "BookOpen", "Bookmark", "Bookshelf", "Boss", "Bot", "Boulder", "Bowling", "Braille", "Brain", "BrainCircuit", "BrainCog", "Branch", "Bread", "Briefcase2", "BriefcaseMedical", "Brightness", "Broadcast", "Brush", "Bug", "Building", "Building2", "Burger", "Bus", "BusinessCard", "Butterfly", "ButtonA", "ButtonB", "ButtonX", "ButtonY", "Cable", "Cactus", "Cake", "Calculator", "Calendar", "CalendarCheck", "CalendarDays", "CalendarMinus", "CalendarPlus", "CalendarX", "Caliper", "Camera", "CameraMovie", "Camping", "Candle", "Candy", "Cap", "Capsule", "Car", "CarFront", "Carpet", "Carrot", "CarryOn", "CartCheck", "CartMinus", "CartPlus", "CartX", "Cast", "Castle", "Cat", "Cave", "Certificate", "Certificate2", "Chain", "ChainBroken", "Chair", "Chalkboard", "Check", "CheckCircle", "CheckCircle2", "CheckIn", "CheckOut", "CheckSquare", "Checkbox", "CheckboxChecked", "ChefHat", "Cherry", "ChevronDown", "ChevronUp", "ChevronsDown", "ChevronsLeft", "ChevronsRight", "ChevronsUp", "Chicken", "Chimney", "ChipAi", "Chocolate", "Chopsticks", "Chrome", "Church", "Churn", "Cinema", "Circle", "Citation", "Classroom", "Clipboard", "Clipboard2", "ClipboardCheck", "ClipboardCheck2", "ClipboardCopy", "ClipboardCopy2", "ClipboardData", "ClipboardEdit", "ClipboardHeart", "ClipboardList", "ClipboardList2", "ClipboardMinus", "ClipboardPaste2", "ClipboardPlus", "ClipboardSearch", "ClipboardSignature", "ClipboardText", "ClipboardX2", "Clock", "ClosedCaption", "ClosedCaptions", "Cloud", "CloudDrizzle", "CloudFog", "CloudLightning", "CloudRain", "CloudSnow", "CloudSun", "Clubhouse", "Coat", "Code", "CodeBlock", "CodeSquare", "Code2", "Codepen", "Codesandbox", "Coffee", "Cohort", "Coin", "Coins", "Columns", "Command", "Comment", "CommentCheck", "CommentPlus", "CommentX", "Compare", "Compass", "Compass2", "Competitive", "Complete", "Concierge", "Confused", "Console", "Contact", "Contact2", "Container", "Contract", "Contract2", "Contrast", "Controller", "ControllerWireless", "Cookie", "Cool", "Coop", "Copier", "Copy", "Coral", "CornerDownLeft", "CornerDownLeft2", "CornerDownRight", "CornerDownRight2", "CornerUpLeft", "CornerUpLeft2", "CornerUpRight", "CornerUpRight2", "Correlation", "Coupon", "Course", "Cpu", "Crafting", "CreditCard", "Croissant", "Cross", "Crosshair", "Crosshair2", "Crown", "Cruise", "Crutches", "Cry", "Crystal", "Css", "Cup", "Cupcake", "Curriculum", "Cursor", "CursorClick", "CursorText", "Curtain", "CustomsIcon", "Cycling", "Dashboard", "DataPoint", "Database", "Database2", "DatabaseBackup", "DatabaseZap", "Deadline", "Deal", "DeepLink", "Deer", "Deezer", "Defend", "Delegated", "Dependency", "Desert", "Desk", "Desk2", "Desktop", "Dial", "Diamond", "Dice1", "Dice2", "Dice3", "Dice4", "Dice5", "Dice6", "Dictionary", "Dimension", "Diploma", "Directions", "Disc", "Disc2", "Disc3", "Discord", "Discount", "Dislike", "Distraction", "Divide2", "Dividend", "Dna", "Dna2", "DnaHelix", "DocumentPrinter", "Dog", "DollarSign", "Donut", "DonutChart", "Door", "DoorClosed", "DoorOpen", "Download", "Downtrend", "Dpad", "Dress", "Dribbble", "Drill", "Droplet", "DueDate", "Dumbbell", "Duplicate", "Ear", "EarHearing", "EarOff", "Ebay", "Edge", "Edit", "Egg2", "Electron", "Elephant", "Emergency", "Envelope2", "Equalizer", "Equals", "Eraser", "Estimate", "Etsy", "Exam", "Experiment", "Exposure", "ExternalLink", "ExternalLink2", "Eye", "Eye2", "EyeOff", "FaceId", "Facebook", "Factory", "FastForward", "Faucet", "Fax", "Feed", "Feedback", "Fence", "Fern", "Figma", "File", "FileArchive", "FileAudio", "FileCheck", "FileCode", "FileImage", "FileMinus", "FilePlus", "FileText", "FileVideo", "FileX", "Files", "Film", "Film2", "FilmSlate", "Filter", "Fingerprint", "FireTruck", "Firefox", "Firewall", "FirstAid", "Fish", "Fist", "Flame", "Flashlight", "FlashlightOff", "Flask2", "FlaskRound", "Flat", "FlightTicket", "Flower", "Flower2", "Focus", "FocusRing", "Folder", "FolderMinus", "FolderOpen", "FolderPlus", "Follow", "Follow2", "Football", "Footprints", "Forecast", "Forest", "Fork", "Fortress", "Fossil", "Fox", "Fraction", "FreeShipping", "Frown", "Fuel", "Function", "Funnel", "FunnelChart", "Future", "Gamepad", "Gamepad2", "Garage", "GardenHose", "Gate", "Gauge", "Generator", "Geyser", "Gift", "GitBranch", "GitCommit", "GitFork", "GitMerge", "GitPullRequest", "Github", "Gitlab", "Glasses", "Globe", "Globe2", "Glue", "Golf", "Goodreads", "GoogleCloud", "Grab", "GrabCursor", "Grabbing", "Grade", "GraduationCap", "Grape", "GreaterThan", "Grid", "Grid2x2", "Grid3x3", "Growth", "Guard", "Hail", "Hammer", "Hand", "HandMetal", "HandWave", "Handheld", "Handshake", "Handshake2", "Happy", "HardDrive", "HardDrive2", "Hash", "Hashtag", "Hashtag2", "Hat", "Heading1", "Heading2", "Heading3", "Headphones", "HealthBar", "Heart", "HeartPulse", "HeartShape", "Heartbeat", "Heatmap", "Helicopter", "HelpCircle", "HelpCursor", "Hexagon", "HighScore", "Highlighter", "Hiking", "History", "Hockey", "Home", "Homework", "Hoodie", "Horse", "Hospital", "Hotdog", "Hotel", "HotelBed", "HotelKey", "Hourglass", "House2", "HouseCheck", "HouseCog", "HouseHeart", "HousePlus", "HouseX", "Html", "Humidity", "Hyperlink", "Hypothesis", "IceCream", "IceCream2", "IdCard", "Immigration", "Immunity", "InProgress", "InStock", "Inbox", "Incomplete", "Indent", "Infinity", "Influencer", "Info", "InfoCircle", "Ink", "Instagram", "InternalLink", "Inventory", "Inventory2", "Investment2", "Invoice", "Island", "Italic", "Ivy", "Jacket", "JavascriptIcon", "Joystick", "Joystick2", "Json", "Jungle", "Kanban", "KanbanBoard", "Kettle", "Key", "KeyRound", "KeySquare", "Keyboard", "KeyboardNav", "Knife2", "Knob", "KoFi", "Kpi", "LabResults", "Ladder", "Ladle", "Lake", "Lamp", "LampCeiling", "LampDesk", "LampFloor", "LampWall", "Landmark", "Lantern", "Laptop", "Laugh", "Layout", "LayoutGrid", "LayoutList", "Leaderboard", "Leaf", "Leaf2", "Lecture", "LessThan", "Letterboxd", "Level", "LevelUp", "Library", "Library2", "Lightbulb", "LightbulbOff", "Lighthouse", "Like", "LikeFilled", "Line", "LineChart", "Linear", "Link", "Link2Off", "Linkedin", "Lion", "List", "Live", "LiveStream", "Lively", "Loader", "Loading", "Locate", "LocateFixed", "Lock", "LockKeyhole", "LockOpen", "Lollipop", "Loot", "Loss", "Love", "Luggage", "Lungs", "Magnet", "Mail", "MailCheck", "MailOpen", "MailPlus", "Mailbox", "ManaBar", "Map", "MapPin", "MapPinned", "Markdown", "Marker", "Market", "Martini", "Mastodon", "Maximize", "Maximize2", "Medal", "Medal2", "MedicalBag", "MedicalCross", "Medium", "Meeting", "Meh", "Memory", "Mention", "Mention2", "Menu", "MenuDots", "MenuDotsHorizontal", "MenuGrid", "MessageAi", "MessageCircle", "MessageSquare", "MessagesSquare", "Messenger", "Meta", "Metric", "Mic", "MicOff", "Microscope", "Microscope2", "Microwave", "Milestone", "Milestone2", "Minimize", "Minimize2", "Minus", "Minus2", "MinusCircle", "MinusSquare", "Molecule", "Monday", "Monitor", "Moon", "MoreHorizontal", "Moss", "Motorcycle", "Mountain", "MountainSnow", "Mouse", "MoveCursor", "MoveHorizontal", "Multiplayer", "Multiply", "Mushroom", "Music", "Music2", "Music3", "Music4", "NameBadge", "Navigation", "Navigation2", "Neon", "Netflix", "NeuralNetwork", "Nextjs", "Nodejs", "Noodles", "NotAllowed", "NotEqual", "Notebook", "NotebookPen", "NotebookPen2", "Notebook2", "Notion", "Npm", "Nucleus", "Ocean", "Octagon", "Odometer", "Office", "Ok", "OnHold", "Opera", "OutOfStock", "Outdent", "Outlet", "Outlier", "Oval", "Overdue", "Oxygen", "Package", "PageSetup", "Paintbrush", "Palette", "Palm", "Pan", "PanelBottom", "PanelLeft", "PanelRight", "PanelTop", "Pants", "PaperFeed", "Paperclip", "Paperclip2", "Parallelogram", "Parking", "Partnership", "Passport", "Passport2", "Patreon", "Pause", "PauseCircle", "Paypal", "Peace", "Pebbles", "Pen", "Pen2", "PenLine", "PenTool", "Pencil", "Pencil2", "PencilLine", "Pending", "Pentagon", "Percent", "PercentBadge", "Percentage", "Permalink", "PetriDish", "Phone", "PhoneCall", "PhoneIncoming", "PhoneMissed", "PhoneOff", "PhoneOutgoing", "Pi", "Pickup", "PictureFrame", "PieChart", "PieChart2", "PiggyBank", "Pill", "Pill2", "Pills", "Pinch", "PineTree", "Pinecone", "Pinterest", "Pitch", "Pizza", "Plane", "PlaneLanding", "PlaneTakeoff", "Plant2", "Plate", "Play", "PlayCircle", "Playlist", "Pliers", "Plug2", "Plus", "Plus2", "PlusCircle", "PlusSquare", "Podcast", "PointDown", "PointLeft", "PointRight", "PointUp", "Pointer2", "PoliceCar", "Poll", "Pomodoro", "Pool", "Popsicle", "Portfolio", "Post", "Pot", "Potion", "PowerOff", "PowerUp", "Prescription", "Presentation", "Presentation2", "PriceTag", "PriceTagPlus", "PrintPreview", "PrintQueue", "Printer", "Printer2", "PrinterCheck", "PrinterX", "Priority", "PriorityHigh", "PriorityLow", "Profit", "Progress", "Projector", "Protection", "Protractor", "Pulse", "Puzzle", "PuzzlePiece", "Pvp", "QrCode", "QrScan", "Quest", "Queue", "Quiz", "Quote", "Rabbit", "Radiation", "Radio", "RadioButton", "RadioChecked", "Rainbow", "Rake", "Ram", "Rating", "React", "Reaction", "Receipt", "Receipt2", "ReceiptCheck", "ReceiptX", "Record", "Recovery", "Rectangle", "Recurring", "Reddit", "ReducedMotion", "Reference", "Refresh", "Refrigerator", "Refund", "Regex", "Regression", "Rejected", "Reminder", "Reorder", "Repeat", "Report", "Repost", "Research", "Reservation", "ResizeDiagonal", "ResizeHorizontal", "ResizeVertical", "Respawn", "Retention", "Return", "Revenue", "Review2", "Rewind", "Rice", "River", "RoadTrip", "Roadmap", "Robot", "Rocket", "Roi", "Roller", "RoomService", "Rose", "Route", "Router", "Rows", "Rss", "RubberStamp", "Ruler", "Ruler2", "RulerSquare", "Running", "Runway", "Sad", "Safari", "Sailboat", "Salad", "Sandwich", "Save", "Save2", "SavePlus", "Saw", "Scale2", "Scan", "Scan2", "ScanFace", "ScanLine", "Scanner", "Scanner2", "ScatterPlot", "Schedule", "Schedule2", "School", "Scissors2", "Scooter", "Screen", "ScreenReader", "Screwdriver", "SdCard", "Search", "SearchMinus", "SearchPlus", "Seaweed", "Seedling", "Segment", "Seminar", "Send", "Send2", "Server", "Server2", "ServerCog", "ServerCrash", "ServerOff", "Settings", "Share", "Share2", "ShareForward", "Shareholder", "Shell", "Shield", "Shield2", "ShieldAlert", "ShieldAlert2", "ShieldCheck", "ShieldDollar", "ShieldLock", "ShieldMinus2", "ShieldOff", "ShieldOff2", "ShieldPlus", "ShieldPlus2", "ShieldUnlock", "ShieldUser", "ShieldX", "Ship", "Shipping", "ShippingFast", "Shirt", "Shopify", "ShoppingBag", "ShoppingBagPlus", "ShoppingCart", "Shortcut", "Shorts", "Shovel", "Shrimp", "Shuffle", "Sidebar", "SidebarClose", "SidebarOpen", "Sigma", "Sign", "SignLanguage", "Signal", "SignalApp", "SignalHigh", "SignalLow", "SignalZero", "Signpost", "Sink", "Skiing", "SkipBack", "SkipForward", "Slack", "Sleep", "Slider", "SliderHorizontal", "SliderVertical", "Smartphone", "Smile", "Snapchat", "Snippet", "Snowflake", "Soccer", "Sofa", "Soundcloud", "Soup", "Spa", "Sparkles", "Sparkline", "Spatula", "Speaker", "Speaker2", "Speaker3", "SpeedDial", "Speedometer", "Spoon2", "Spotify", "Spotlight", "Sprint", "Sprout", "Sqrt", "Square", "Ssd", "Stackoverflow", "Stakeholder", "Stamp", "Stamp2", "Stapler", "Star", "Starfish", "Startup", "Statistics", "Steak", "Stethoscope", "Stethoscope2", "StopCircle", "Stopwatch", "Storage", "Store", "StoreFront", "Story", "Strategy", "Strava", "Stream", "Strikethrough", "Stripe", "StudentId", "Studio", "Subscript", "Substack", "Subtask", "Subtitle", "Sun", "Sunglasses", "Sunrise", "Sunset", "Superscript", "SurgeProtector", "Surprised", "Survey", "Sushi", "Svelte", "Sweater", "Swimming", "SwitchOff", "SwitchOn", "Sword", "Swords", "Syringe", "Syringe2", "Table", "Table2", "Tablet", "Taco", "Tag", "TagPerson", "Tag2", "Tags", "Tailwind", "Tape", "TapeMeasure", "Target", "Target2", "Task", "TaskCheck", "TaskList", "Team", "Teams", "Telegram", "Temperature", "TemperatureDial", "Template", "Tennis", "Tent", "Terminal", "Terminal2", "TerminalGate", "TerminalSquare", "TestTube", "TestTube2", "TestTubes", "Testimonial", "Text", "TextCursor", "TextSize", "Textbook", "Thermometer", "Thermometer2", "ThermometerMedical", "Threads", "ThumbsDown", "ThumbsUp", "Ticket", "Tie", "Tiktok", "TimeTracking", "Timeline", "Timeline2", "Timer", "Toaster", "Toggle", "ToggleLeft", "ToggleRight", "Toilet", "Toner", "Toolbox", "Torch", "Tornado", "Tower", "TrafficCone", "Train", "Trapezoid", "Trash", "Tree", "Tree2", "TreePalm", "TreePine", "Treemap", "Trello", "Trending", "TrendingDown", "TrendingUp", "Triangle", "Trigger", "Trophy", "Trophy2", "Truck", "Tshirt", "Tulip", "Tumblr", "Turtle", "Tutor", "Tv", "Twitch", "Twitter", "TwoFactor", "TypescriptIcon", "Ufo", "Umbrella", "Underline", "Unfollow", "Unfollow2", "University", "Unlock", "Unverified", "Upload", "Ups", "Uptrend", "UsbDrive", "User", "UserCheck", "UserCircle", "UserCog", "UserMinus", "UserPlus", "UserX", "Users", "Utensils", "UtensilsCrossed", "Vaccine", "Variance", "Vault", "Vercel", "Verified", "Verified2", "Viber", "Video", "Video2", "VideoOff", "Vimeo", "Vinyl", "Viral", "Virus", "Visa", "Vitals", "VoiceControl", "Voicemail", "Volcano", "Volleyball", "Volume", "Volume1", "Volume2", "VolumeDial", "VolumeOff", "VolumeX", "Vscode", "Vue", "WaitCursor", "Walker", "Wallet", "WalletCards", "Wand", "Wand2", "WandSparkles", "Warehouse", "Watch", "WatchAccessory", "Waterfall", "WateringCan", "Waveform", "Waves", "Waypoints", "Webcam", "Webhook", "Wechat", "Weight", "Whatsapp", "Wheelchair", "Wheelchair2", "Whisk", "Whiteboard", "Widget", "Wifi", "WifiOff", "Wind", "Window", "Window2", "Wine", "Wink", "Wishlist", "Wolf", "Workflow", "Wrench", "X", "XCircle", "XCircle2", "XSquare", "XTwitter", "Xml", "XpBar", "Xray", "Youtube", "Zap", "Zoom"];
/**
 * Array of all icon names (kebab-case)
 */
declare const ICON_NAMES_KEBAB: readonly ["ab-test", "accessibility", "achievement", "acorn", "activity", "aggregate", "airbnb", "airplay", "airport", "alarm-clock", "alert-circle", "alert-circle-2", "alert-octagon", "alert-triangle", "alias", "amazon", "ambulance", "ambulance-2", "analytics", "anchor", "anchor-2", "angry", "angular", "annoyed", "apartment", "api", "apple", "approved", "arcade", "archive", "archive-2", "area-chart", "armor", "arrow-down", "arrow-down-circle", "arrow-down-circle-2", "arrow-down-left", "arrow-down-right", "arrow-down-square", "arrow-left", "arrow-left-circle", "arrow-left-circle-2", "arrow-left-square", "arrow-right", "arrow-right-circle", "arrow-right-circle-2", "arrow-right-square", "arrow-up", "arrow-up-circle", "arrow-up-circle-2", "arrow-up-left", "arrow-up-right", "arrow-up-square", "arrows-collapse", "arrows-expand", "arrows-maximize-2", "arrows-minimize-2", "asana", "assigned", "assignment", "at-sign", "atom-2", "attendance", "attribution", "audio-description", "audio-lines", "automation", "award", "aws", "axe", "azure", "baby", "backlink", "backlog", "backpack", "backpack2", "bacon", "bacteria", "badge-2", "badge-alert", "badge-check", "badge-check-2", "badge-dollar", "badge-help", "badge-info", "badge-minus", "badge-percent", "badge-plus", "badge-x", "baggage", "baggage-claim", "ban", "banana", "bandage", "bandage-2", "bandcamp", "bank", "banknote", "bar-chart", "bar-chart-2", "bar-chart-horizontal", "barcode", "barcode-2", "barometer", "baseball", "basket", "basketball", "bathtub", "battery", "battery-charging", "battery-empty", "battery-half", "battery-low", "battery-quarter", "battery-three-quarters", "beach", "beaker-2", "bear", "bed", "bee", "beer", "behance", "bell", "bell-off", "bell-ring", "benchmark", "bicycle", "bike", "binder", "biohazard-2", "bird", "bitbucket", "bitcoin", "blender", "block", "block-2", "blocker", "blood-drop", "blood-pressure", "bluesky", "bluetooth", "boarding-pass", "boat", "body-scan", "bold", "bone", "book", "book-closed", "book-marked", "book-open", "bookmark", "bookshelf", "boss", "bot", "boulder", "bowling", "braille", "brain", "brain-circuit", "brain-cog", "branch", "bread", "briefcase-2", "briefcase-medical", "brightness", "broadcast", "brush", "bug", "building", "building2", "burger", "bus", "business-card", "butterfly", "button-a", "button-b", "button-x", "button-y", "cable", "cactus", "cake", "calculator", "calendar", "calendar-check", "calendar-days", "calendar-minus", "calendar-plus", "calendar-x", "caliper", "camera", "camera-movie", "camping", "candle", "candy", "cap", "capsule", "car", "car-front", "carpet", "carrot", "carry-on", "cart-check", "cart-minus", "cart-plus", "cart-x", "cast", "castle", "cat", "cave", "certificate", "certificate2", "chain", "chain-broken", "chair", "chalkboard", "check", "check-circle", "check-circle-2", "check-in", "check-out", "check-square", "checkbox", "checkbox-checked", "chef-hat", "cherry", "chevron-down", "chevron-up", "chevrons-down", "chevrons-left", "chevrons-right", "chevrons-up", "chicken", "chimney", "chip-ai", "chocolate", "chopsticks", "chrome", "church", "churn", "cinema", "circle", "citation", "classroom", "clipboard", "clipboard-2", "clipboard-check", "clipboard-check-2", "clipboard-copy", "clipboard-copy-2", "clipboard-data", "clipboard-edit", "clipboard-heart", "clipboard-list", "clipboard-list-2", "clipboard-minus", "clipboard-paste-2", "clipboard-plus", "clipboard-search", "clipboard-signature", "clipboard-text", "clipboard-x-2", "clock", "closed-caption", "closed-captions", "cloud", "cloud-drizzle", "cloud-fog", "cloud-lightning", "cloud-rain", "cloud-snow", "cloud-sun", "clubhouse", "coat", "code", "code-block", "code-square", "code2", "codepen", "codesandbox", "coffee", "cohort", "coin", "coins", "columns", "command", "comment", "comment-check", "comment-plus", "comment-x", "compare", "compass", "compass-2", "competitive", "complete", "concierge", "confused", "console", "contact", "contact2", "container", "contract", "contract-2", "contrast", "controller", "controller-wireless", "cookie", "cool", "coop", "copier", "copy", "coral", "corner-down-left", "corner-down-left-2", "corner-down-right", "corner-down-right-2", "corner-up-left", "corner-up-left-2", "corner-up-right", "corner-up-right-2", "correlation", "coupon", "course", "cpu", "crafting", "credit-card", "croissant", "cross", "crosshair", "crosshair-2", "crown", "cruise", "crutches", "cry", "crystal", "css", "cup", "cupcake", "curriculum", "cursor", "cursor-click", "cursor-text", "curtain", "customs-icon", "cycling", "dashboard", "data-point", "database", "database-2", "database-backup", "database-zap", "deadline", "deal", "deep-link", "deer", "deezer", "defend", "delegated", "dependency", "desert", "desk", "desk2", "desktop", "dial", "diamond", "dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6", "dictionary", "dimension", "diploma", "directions", "disc", "disc-2", "disc-3", "discord", "discount", "dislike", "distraction", "divide-2", "dividend", "dna", "dna-2", "dna-helix", "document-printer", "dog", "dollar-sign", "donut", "donut-chart", "door", "door-closed", "door-open", "download", "downtrend", "dpad", "dress", "dribbble", "drill", "droplet", "due-date", "dumbbell", "duplicate", "ear", "ear-hearing", "ear-off", "ebay", "edge", "edit", "egg2", "electron", "elephant", "emergency", "envelope-2", "equalizer", "equals", "eraser", "estimate", "etsy", "exam", "experiment", "exposure", "external-link", "external-link-2", "eye", "eye-2", "eye-off", "face-id", "facebook", "factory", "fast-forward", "faucet", "fax", "feed", "feedback", "fence", "fern", "figma", "file", "file-archive", "file-audio", "file-check", "file-code", "file-image", "file-minus", "file-plus", "file-text", "file-video", "file-x", "files", "film", "film-2", "film-slate", "filter", "fingerprint", "fire-truck", "firefox", "firewall", "first-aid", "fish", "fist", "flame", "flashlight", "flashlight-off", "flask-2", "flask-round", "flat", "flight-ticket", "flower", "flower-2", "focus", "focus-ring", "folder", "folder-minus", "folder-open", "folder-plus", "follow", "follow-2", "football", "footprints", "forecast", "forest", "fork", "fortress", "fossil", "fox", "fraction", "free-shipping", "frown", "fuel", "function", "funnel", "funnel-chart", "future", "gamepad", "gamepad-2", "garage", "garden-hose", "gate", "gauge", "generator", "geyser", "gift", "git-branch", "git-commit", "git-fork", "git-merge", "git-pull-request", "github", "gitlab", "glasses", "globe", "globe-2", "glue", "golf", "goodreads", "google-cloud", "grab", "grab-cursor", "grabbing", "grade", "graduation-cap", "grape", "greater-than", "grid", "grid-2x2", "grid-3x3", "growth", "guard", "hail", "hammer", "hand", "hand-metal", "hand-wave", "handheld", "handshake", "handshake-2", "happy", "hard-drive", "hard-drive-2", "hash", "hashtag", "hashtag-2", "hat", "heading-1", "heading-2", "heading-3", "headphones", "health-bar", "heart", "heart-pulse", "heart-shape", "heartbeat", "heatmap", "helicopter", "help-circle", "help-cursor", "hexagon", "high-score", "highlighter", "hiking", "history", "hockey", "home", "homework", "hoodie", "horse", "hospital", "hotdog", "hotel", "hotel-bed", "hotel-key", "hourglass", "house-2", "house-check", "house-cog", "house-heart", "house-plus", "house-x", "html", "humidity", "hyperlink", "hypothesis", "ice-cream", "ice-cream-2", "id-card", "immigration", "immunity", "in-progress", "in-stock", "inbox", "incomplete", "indent", "infinity", "influencer", "info", "info-circle", "ink", "instagram", "internal-link", "inventory", "inventory-2", "investment-2", "invoice", "island", "italic", "ivy", "jacket", "javascript-icon", "joystick", "joystick-2", "json", "jungle", "kanban", "kanban-board", "kettle", "key", "key-round", "key-square", "keyboard", "keyboard-nav", "knife-2", "knob", "ko-fi", "kpi", "lab-results", "ladder", "ladle", "lake", "lamp", "lamp-ceiling", "lamp-desk", "lamp-floor", "lamp-wall", "landmark", "lantern", "laptop", "laugh", "layout", "layout-grid", "layout-list", "leaderboard", "leaf", "leaf-2", "lecture", "less-than", "letterboxd", "level", "level-up", "library", "library2", "lightbulb", "lightbulb-off", "lighthouse", "like", "like-filled", "line", "line-chart", "linear", "link", "link-2-off", "linkedin", "lion", "list", "live", "live-stream", "lively", "loader", "loading", "locate", "locate-fixed", "lock", "lock-keyhole", "lock-open", "lollipop", "loot", "loss", "love", "luggage", "lungs", "magnet", "mail", "mail-check", "mail-open", "mail-plus", "mailbox", "mana-bar", "map", "map-pin", "map-pinned", "markdown", "marker", "market", "martini", "mastodon", "maximize", "maximize-2", "medal", "medal2", "medical-bag", "medical-cross", "medium", "meeting", "meh", "memory", "mention", "mention-2", "menu", "menu-dots", "menu-dots-horizontal", "menu-grid", "message-ai", "message-circle", "message-square", "messages-square", "messenger", "meta", "metric", "mic", "mic-off", "microscope", "microscope-2", "microwave", "milestone", "milestone-2", "minimize", "minimize-2", "minus", "minus-2", "minus-circle", "minus-square", "molecule", "monday", "monitor", "moon", "more-horizontal", "moss", "motorcycle", "mountain", "mountain-snow", "mouse", "move-cursor", "move-horizontal", "multiplayer", "multiply", "mushroom", "music", "music-2", "music-3", "music-4", "name-badge", "navigation", "navigation-2", "neon", "netflix", "neural-network", "nextjs", "nodejs", "noodles", "not-allowed", "not-equal", "notebook", "notebook-pen", "notebook-pen2", "notebook2", "notion", "npm", "nucleus", "ocean", "octagon", "odometer", "office", "ok", "on-hold", "opera", "out-of-stock", "outdent", "outlet", "outlier", "oval", "overdue", "oxygen", "package", "page-setup", "paintbrush", "palette", "palm", "pan", "panel-bottom", "panel-left", "panel-right", "panel-top", "pants", "paper-feed", "paperclip", "paperclip-2", "parallelogram", "parking", "partnership", "passport", "passport-2", "patreon", "pause", "pause-circle", "paypal", "peace", "pebbles", "pen", "pen-2", "pen-line", "pen-tool", "pencil", "pencil-2", "pencil-line", "pending", "pentagon", "percent", "percent-badge", "percentage", "permalink", "petri-dish", "phone", "phone-call", "phone-incoming", "phone-missed", "phone-off", "phone-outgoing", "pi", "pickup", "picture-frame", "pie-chart", "pie-chart-2", "piggy-bank", "pill", "pill-2", "pills", "pinch", "pine-tree", "pinecone", "pinterest", "pitch", "pizza", "plane", "plane-landing", "plane-takeoff", "plant-2", "plate", "play", "play-circle", "playlist", "pliers", "plug-2", "plus", "plus-2", "plus-circle", "plus-square", "podcast", "point-down", "point-left", "point-right", "point-up", "pointer-2", "police-car", "poll", "pomodoro", "pool", "popsicle", "portfolio", "post", "pot", "potion", "power-off", "power-up", "prescription", "presentation", "presentation-2", "price-tag", "price-tag-plus", "print-preview", "print-queue", "printer", "printer-2", "printer-check", "printer-x", "priority", "priority-high", "priority-low", "profit", "progress", "projector", "protection", "protractor", "pulse", "puzzle", "puzzle-piece", "pvp", "qr-code", "qr-scan", "quest", "queue", "quiz", "quote", "rabbit", "radiation", "radio", "radio-button", "radio-checked", "rainbow", "rake", "ram", "rating", "react", "reaction", "receipt", "receipt-2", "receipt-check", "receipt-x", "record", "recovery", "rectangle", "recurring", "reddit", "reduced-motion", "reference", "refresh", "refrigerator", "refund", "regex", "regression", "rejected", "reminder", "reorder", "repeat", "report", "repost", "research", "reservation", "resize-diagonal", "resize-horizontal", "resize-vertical", "respawn", "retention", "return", "revenue", "review-2", "rewind", "rice", "river", "road-trip", "roadmap", "robot", "rocket", "roi", "roller", "room-service", "rose", "route", "router", "rows", "rss", "rubber-stamp", "ruler", "ruler-2", "ruler-square", "running", "runway", "sad", "safari", "sailboat", "salad", "sandwich", "save", "save-2", "save-plus", "saw", "scale-2", "scan", "scan-2", "scan-face", "scan-line", "scanner", "scanner-2", "scatter-plot", "schedule", "schedule2", "school", "scissors-2", "scooter", "screen", "screen-reader", "screwdriver", "sd-card", "search", "search-minus", "search-plus", "seaweed", "seedling", "segment", "seminar", "send", "send-2", "server", "server-2", "server-cog", "server-crash", "server-off", "settings", "share", "share-2", "share-forward", "shareholder", "shell", "shield", "shield-2", "shield-alert", "shield-alert-2", "shield-check", "shield-dollar", "shield-lock", "shield-minus-2", "shield-off", "shield-off-2", "shield-plus", "shield-plus-2", "shield-unlock", "shield-user", "shield-x", "ship", "shipping", "shipping-fast", "shirt", "shopify", "shopping-bag", "shopping-bag-plus", "shopping-cart", "shortcut", "shorts", "shovel", "shrimp", "shuffle", "sidebar", "sidebar-close", "sidebar-open", "sigma", "sign", "sign-language", "signal", "signal-app", "signal-high", "signal-low", "signal-zero", "signpost", "sink", "skiing", "skip-back", "skip-forward", "slack", "sleep", "slider", "slider-horizontal", "slider-vertical", "smartphone", "smile", "snapchat", "snippet", "snowflake", "soccer", "sofa", "soundcloud", "soup", "spa", "sparkles", "sparkline", "spatula", "speaker", "speaker-2", "speaker-3", "speed-dial", "speedometer", "spoon-2", "spotify", "spotlight", "sprint", "sprout", "sqrt", "square", "ssd", "stackoverflow", "stakeholder", "stamp", "stamp-2", "stapler", "star", "starfish", "startup", "statistics", "steak", "stethoscope", "stethoscope-2", "stop-circle", "stopwatch", "storage", "store", "store-front", "story", "strategy", "strava", "stream", "strikethrough", "stripe", "student-id", "studio", "subscript", "substack", "subtask", "subtitle", "sun", "sunglasses", "sunrise", "sunset", "superscript", "surge-protector", "surprised", "survey", "sushi", "svelte", "sweater", "swimming", "switch-off", "switch-on", "sword", "swords", "syringe", "syringe-2", "table", "table-2", "tablet", "taco", "tag", "tag-person", "tag2", "tags", "tailwind", "tape", "tape-measure", "target", "target-2", "task", "task-check", "task-list", "team", "teams", "telegram", "temperature", "temperature-dial", "template", "tennis", "tent", "terminal", "terminal-2", "terminal-gate", "terminal-square", "test-tube", "test-tube-2", "test-tubes", "testimonial", "text", "text-cursor", "text-size", "textbook", "thermometer", "thermometer-2", "thermometer-medical", "threads", "thumbs-down", "thumbs-up", "ticket", "tie", "tiktok", "time-tracking", "timeline", "timeline-2", "timer", "toaster", "toggle", "toggle-left", "toggle-right", "toilet", "toner", "toolbox", "torch", "tornado", "tower", "traffic-cone", "train", "trapezoid", "trash", "tree", "tree-2", "tree-palm", "tree-pine", "treemap", "trello", "trending", "trending-down", "trending-up", "triangle", "trigger", "trophy", "trophy2", "truck", "tshirt", "tulip", "tumblr", "turtle", "tutor", "tv", "twitch", "twitter", "two-factor", "typescript-icon", "ufo", "umbrella", "underline", "unfollow", "unfollow-2", "university", "unlock", "unverified", "upload", "ups", "uptrend", "usb-drive", "user", "user-check", "user-circle", "user-cog", "user-minus", "user-plus", "user-x", "users", "utensils", "utensils-crossed", "vaccine", "variance", "vault", "vercel", "verified", "verified-2", "viber", "video", "video-2", "video-off", "vimeo", "vinyl", "viral", "virus", "visa", "vitals", "voice-control", "voicemail", "volcano", "volleyball", "volume", "volume-1", "volume-2", "volume-dial", "volume-off", "volume-x", "vscode", "vue", "wait-cursor", "walker", "wallet", "wallet-cards", "wand", "wand-2", "wand-sparkles", "warehouse", "watch", "watch-accessory", "waterfall", "watering-can", "waveform", "waves", "waypoints", "webcam", "webhook", "wechat", "weight", "whatsapp", "wheelchair", "wheelchair-2", "whisk", "whiteboard", "widget", "wifi", "wifi-off", "wind", "window", "window-2", "wine", "wink", "wishlist", "wolf", "workflow", "wrench", "x", "x-circle", "x-circle-2", "x-square", "x-twitter", "xml", "xp-bar", "xray", "youtube", "zap", "zoom"];
/**
 * Total number of icons in the library
 */
declare const ICON_COUNT: 1319;
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

declare const Accessibility: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Activity: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Airplay: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlarmClock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertCircle2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertOctagon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AlertTriangle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ambulance: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Analytics: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Anchor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Angry: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Annoyed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Apartment: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Api: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Apple: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Approved: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Archive2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Archive: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AreaChart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowLeftCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowRightCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowsCollapse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowsExpand: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AtSign: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Atom2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AudioDescription: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AudioLines: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Award: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Axe: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Baby: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Backpack: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Badge2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeAlert: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeCheck2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeDollar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeHelp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeInfo: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgePercent: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgePlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BadgeX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ban: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Banana: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bandage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bank: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Banknote: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BarChart2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BarChartHorizontal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BarChart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Barcode: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Barometer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Baseball: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Basket: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Basketball: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bathtub: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryCharging: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryEmpty: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryHalf: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryLow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryQuarter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BatteryThreeQuarters: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Battery: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Beaker2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bear: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bee: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Beer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BellOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BellRing: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bell: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bicycle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bike: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Biohazard2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Binder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Blender: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bird: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bitcoin: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Block: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bluetooth: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Boat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bold: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bone: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BookClosed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BookMarked: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BookOpen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Book: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bookmark: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bot: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bowling: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Braille: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Branch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BrainCircuit: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BrainCog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Brain: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Briefcase2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BriefcaseMedical: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Brightness: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Broadcast: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Brush: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bug: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Building: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Building2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BusinessCard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Butterfly: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cable: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cactus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cake: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Calculator: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CalendarCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CalendarDays: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CalendarMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CalendarPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CalendarX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Calendar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Caliper: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CameraMovie: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Camera: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Candle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cap: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CarFront: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Car: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Carpet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Carrot: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cast: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Castle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Certificate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chair: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckCircle2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Check: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckboxChecked: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Checkbox: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChefHat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cherry: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chopsticks: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronDown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsDown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChevronsUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chimney: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChipAi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Church: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cinema: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Circle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clipboard2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCheck2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCopy2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardCopy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardData: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardEdit: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardHeart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardList2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardList: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardPaste2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardSearch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardSignature: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardText: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClipboardX2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clipboard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClosedCaption: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ClosedCaptions: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudDrizzle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudFog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudLightning: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudRain: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudSnow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CloudSun: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cloud: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CodeBlock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CodeSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Code: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Code2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coffee: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coins: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Columns: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Command: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Compass2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Compass: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Complete: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Confused: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contact: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contact2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Container: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contract: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contrast: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cookie: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cool: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Copy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cpu: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CreditCard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cross: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crosshair2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crosshair: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cry: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Css: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cup: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CursorClick: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CursorText: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cursor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Curtain: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cycling: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Database2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DatabaseBackup: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DatabaseZap: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Database: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Deer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Desk: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Desktop: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dial: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Diamond: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice1: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice3: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice4: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice5: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dice6: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dimension: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Directions: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Divide2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Disc2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Disc3: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Disc: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dna2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dna: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DollarSign: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DoorClosed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DoorOpen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Door: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Download: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dress: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Drill: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Droplet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dumbbell: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const EarHearing: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const EarOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ear: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Edit: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Electron: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Elephant: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Envelope2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Equalizer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Equals: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eraser: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Exposure: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ExternalLink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eye2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const EyeOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Eye: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Facebook: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FaceId: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Factory: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FastForward: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Faucet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileArchive: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileAudio: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileCode: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileImage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FilePlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileText: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileVideo: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FileX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const File: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Files: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fence: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Film2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FilmSlate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Film: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Filter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fingerprint: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FireTruck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Firewall: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FirstAid: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fish: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fist: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flame: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FlashlightOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flashlight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flask2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FlaskRound: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flower2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flower: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FocusRing: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderOpen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FolderPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Folder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Follow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Football: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fork: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Footprints: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fox: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fraction: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Frown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fuel: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Function: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Future: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gamepad2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gamepad: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Garage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GardenHose: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gauge: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Generator: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Gift: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GitBranch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GitCommit: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GitFork: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GitMerge: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GitPullRequest: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Glasses: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Globe2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Globe: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Glue: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Golf: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GrabCursor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grab: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grabbing: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GraduationCap: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grape: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GreaterThan: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grid2x2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grid3x3: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grid: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hail: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hammer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HandMetal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HandWave: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hand: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Handshake: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Happy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HardDrive2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HardDrive: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hash: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hashtag: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heading1: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heading2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heading3: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Headphones: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HeartPulse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HeartShape: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Helicopter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HelpCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HelpCursor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hexagon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Highlighter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const History: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hockey: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Home: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hoodie: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Horse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hospital: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hotel: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const House2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HouseCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HouseCog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HouseHeart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HousePlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HouseX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hourglass: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Html: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Humidity: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const IceCream: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const IdCard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Inbox: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Incomplete: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Indent: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Infinity: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const InfoCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Info: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Instagram: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Invoice: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Italic: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Jacket: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const JavascriptIcon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Joystick: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Json: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Kanban: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const KeyRound: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const KeySquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Key: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const KeyboardNav: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Keyboard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Kettle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Knife2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Knob: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ladder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ladle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LampCeiling: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LampDesk: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LampFloor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LampWall: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lamp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Landmark: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lantern: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Laptop: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Laugh: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LayoutGrid: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LayoutList: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Layout: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Leaf2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Leaf: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LessThan: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Level: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Library: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LightbulbOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lightbulb: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lighthouse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LineChart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Linkedin: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Link: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lion: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const List: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Live: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lively: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Loader: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Loading: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LocateFixed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Locate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LockKeyhole: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LockOpen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Love: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Luggage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lungs: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Magnet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mailbox: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MailCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MailOpen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MailPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mail: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MapPin: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MapPinned: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Map: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Marker: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Markdown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Martini: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Maximize2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Maximize: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Medal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Meeting: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Meh: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Memory: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mention: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Meta: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MenuDotsHorizontal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MenuDots: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MenuGrid: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Menu: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessageAi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessageCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessageSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MessagesSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MicOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mic: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Microwave: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Microscope2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Microscope: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Milestone: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minimize2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minimize: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MinusCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MinusSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Minus2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Molecule: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Monitor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Moon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MoreHorizontal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Motorcycle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MountainSnow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mountain: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mouse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MoveCursor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MoveHorizontal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Music2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Music3: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Music4: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Music: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Multiply: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NameBadge: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Navigation2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Navigation: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Neon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NeuralNetwork: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NotAllowed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NotEqual: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NotebookPen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Notebook: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Nucleus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Octagon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Odometer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Office: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ok: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Outdent: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Outlet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Oval: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Package: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Paintbrush: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Palette: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Palm: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pan: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelBottom: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PanelTop: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pants: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Paperclip: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Paperclip2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Parallelogram: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Parking: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Passport: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PauseCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pause: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Peace: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PenTool: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pen2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PenLine: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pencil: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pencil2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PencilLine: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pending: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pentagon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PercentBadge: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Percent: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Percentage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PetriDish: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneCall: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneIncoming: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneMissed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PhoneOutgoing: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Phone: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PictureFrame: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PieChart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PiggyBank: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pill: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pinch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PineTree: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pizza: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plant2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlaneLanding: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlaneTakeoff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plane: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlayCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Play: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Playlist: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pliers: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plug2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlusCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PlusSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Plus2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Podcast: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PointDown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PointLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PointRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PointUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pointer2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PoliceCar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Portfolio: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pot: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Potion: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PowerOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Presentation2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Presentation: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Printer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Progress: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Projector: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Protractor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PuzzlePiece: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Puzzle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const QrCode: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Queue: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Quote: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rabbit: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Radiation: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const RadioButton: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const RadioChecked: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Radio: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rainbow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rake: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ram: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Receipt2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Receipt: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Record$1: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rectangle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ReducedMotion: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Refresh: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Refrigerator: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Regex: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rejected: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Repeat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ResizeDiagonal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ResizeHorizontal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ResizeVertical: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rewind: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Robot: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rocket: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Roller: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rose: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Route: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Router: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rows: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rss: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const RubberStamp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ruler2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const RulerSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ruler: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Running: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sad: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sailboat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sandwich: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Save: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Saw: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scale2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ScanFace: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ScanLine: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scan: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scanner: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scissors2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Schedule: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const School: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scooter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ScreenReader: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Screen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Screwdriver: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SdCard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Seedling: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SearchMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SearchPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Search: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Send2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Send: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Server2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ServerCog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ServerCrash: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ServerOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Server: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Settings: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Share: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldAlert: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shield: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ship: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shirt: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShoppingBag: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShoppingCart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shorts: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shovel: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shuffle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SidebarClose: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SidebarOpen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sidebar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignLanguage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalHigh: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalLow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalZero: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Signal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sigma: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Signpost: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Skiing: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SkipBack: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SkipForward: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sleep: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SliderHorizontal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SliderVertical: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Slider: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Smartphone: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Smile: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Snippet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Snowflake: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Soccer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sofa: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sparkles: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Spatula: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Speaker2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Speaker3: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Speaker: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SpeedDial: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Speedometer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Spotlight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Spoon2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sprout: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sqrt: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Square: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ssd: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stamp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Star: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stapler: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Statistics: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stethoscope: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const StopCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stopwatch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Storage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Store: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stream: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Strikethrough: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Studio: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Subscript: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Subtitle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sun: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sunglasses: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sunrise: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sunset: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Superscript: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SurgeProtector: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Surprised: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sweater: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Swimming: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SwitchOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SwitchOn: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sword: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Swords: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Syringe: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Table2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Table: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tablet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tag: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tag2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tags: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tape: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TapeMeasure: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Target: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Team: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TemperatureDial: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tennis: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tent: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Terminal2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TerminalSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Terminal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TestTube2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TestTube: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TestTubes: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TextCursor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TextSize: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Text: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Thermometer2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ThermometerMedical: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Thermometer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ThumbsDown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ThumbsUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ticket: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tie: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Timeline: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Timer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ToggleLeft: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ToggleRight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Toggle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Toaster: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Toilet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Toolbox: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Torch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tornado: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tower: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrafficCone: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Train: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trapezoid: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trash: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tree2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TreePalm: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TreePine: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tree: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrendingDown: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TrendingUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Triangle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trophy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Truck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tshirt: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tulip: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Turtle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tv: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TwoFactor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TypescriptIcon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ufo: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Umbrella: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Underline: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Unfollow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Unlock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Unverified: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Upload: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ups: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UsbDrive: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserCog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UserX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const User: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Users: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const UtensilsCrossed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Utensils: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vault: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Verified: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Video2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VideoOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Video: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vinyl: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VoiceControl: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Voicemail: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Volleyball: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Volume1: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Volume2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VolumeDial: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VolumeOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const VolumeX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Volume: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WaitCursor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WalletCards: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wallet: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wand2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WandSparkles: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wand: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WateringCan: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Warehouse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WatchAccessory: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Watch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Waveform: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Waves: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Waypoints: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Webcam: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Webhook: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Weight: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Whisk: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wheelchair: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const WifiOff: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wifi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wind: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Window2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Window: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wine: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wolf: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wrench: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const XCircle2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const XCircle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const XSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const X: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Xml: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Zap: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Alias: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Anchor2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Backlink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chain: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ChainBroken: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Citation: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DeepLink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ExternalLink2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hyperlink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const InternalLink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Link2Off: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Permalink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Reference: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shortcut: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Armor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Defend: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fortress: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Guard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Protection: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shield2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldAlert2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldDollar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldLock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldMinus2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldOff2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldPlus2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldUnlock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShieldUser: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Copier: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DocumentPrinter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fax: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ink: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PageSetup: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PaperFeed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PrintPreview: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PrintQueue: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Printer2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PrinterCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PrinterX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scan2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Scanner2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Toner: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownCircle2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowDownSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowLeftCircle2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowLeftSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowRightCircle2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowRightSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpCircle2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowUpSquare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowsMaximize2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ArrowsMinimize2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownLeft2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerDownRight2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpLeft2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CornerUpRight2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Competitive: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Contract2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Deal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dividend: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Feedback: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Growth: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Handshake2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Investment2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Kpi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Loss: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Market: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Milestone2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Partnership: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pitch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Profit: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rating: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Research: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Review2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Revenue: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Roadmap: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Roi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shareholder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sign: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stakeholder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stamp2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Startup: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Strategy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Survey: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Target2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Testimonial: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Barcode2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CartCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CartMinus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CartPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CartX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Compare: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coupon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Discount: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FreeShipping: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const InStock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Inventory: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const OutOfStock: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pickup: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PriceTag: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PriceTagPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const QrScan: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ReceiptCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ReceiptX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Refund: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Reorder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Return: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shipping: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShippingFast: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShoppingBagPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const StoreFront: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wishlist: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ambulance2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bacteria: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bandage2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BloodDrop: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BloodPressure: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BodyScan: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Capsule: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crutches: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DnaHelix: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Emergency: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heartbeat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Immunity: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LabResults: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MedicalBag: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const MedicalCross: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Oxygen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pill2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pills: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Prescription: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pulse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Recovery: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stethoscope2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Syringe2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Temperature: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vaccine: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Virus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vitals: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Walker: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wheelchair2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Xray: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Airport: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Baggage: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BaggageClaim: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Beach: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const BoardingPass: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Camping: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CarryOn: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckIn: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CheckOut: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Concierge: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cruise: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CustomsIcon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FlightTicket: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hiking: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HotelBed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HotelKey: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Immigration: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Passport2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pool: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Reservation: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const RoadTrip: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const RoomService: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Runway: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Safari: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Spa: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TerminalGate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Visa: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Acorn: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Boulder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cave: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coral: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crystal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Desert: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fern: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Forest: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Fossil: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Geyser: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Island: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ivy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Jungle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lake: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Moss: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mushroom: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ocean: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pebbles: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pinecone: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const River: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Seaweed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shell: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Starfish: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Volcano: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Waterfall: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bacon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bread: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Burger: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Candy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chicken: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chocolate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Croissant: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cupcake: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Donut: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Egg2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hotdog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const IceCream2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lollipop: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Noodles: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Popsicle: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Rice: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Salad: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shrimp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Soup: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Steak: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sushi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Taco: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Block2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Comment: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CommentCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CommentPlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CommentX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dislike: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Feed: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Follow2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hashtag2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Influencer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Like: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LikeFilled: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LiveStream: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mention2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Poll: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Post: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Reaction: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Report: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Repost: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Save2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SavePlus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Share2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ShareForward: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Story: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TagPerson: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Timeline2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trending: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Unfollow2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Verified2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Viral: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Assigned: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Automation: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Backlog: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Blocker: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Deadline: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Delegated: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dependency: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Distraction: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DueDate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Duplicate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Estimate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Focus: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const InProgress: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const KanbanBoard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const OnHold: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Overdue: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pomodoro: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Priority: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PriorityHigh: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PriorityLow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Recurring: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Reminder: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sprint: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Subtask: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Task: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TaskCheck: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TaskList: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Template: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const TimeTracking: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Workflow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const AbTest: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Aggregate: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Attribution: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Benchmark: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Churn: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Cohort: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Correlation: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dashboard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DataPoint: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const DonutChart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Downtrend: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Experiment: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Flat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Forecast: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Funnel: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const FunnelChart: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Heatmap: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Hypothesis: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Metric: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Outlier: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PieChart2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Regression: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Retention: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ScatterPlot: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Segment: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Sparkline: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Treemap: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Uptrend: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Variance: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Widget: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Achievement: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Arcade: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Boss: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ButtonA: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ButtonB: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ButtonX: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ButtonY: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coin: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Console: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Controller: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ControllerWireless: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Coop: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Crafting: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dpad: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Handheld: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HealthBar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const HighScore: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Inventory2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Joystick2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Leaderboard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const LevelUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Loot: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const ManaBar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Multiplayer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const PowerUp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pvp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Quest: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Respawn: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trigger: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const XpBar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Youtube: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Assignment: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Attendance: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Backpack2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bookshelf: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Certificate2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chalkboard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Classroom: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Course: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Curriculum: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Desk2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dictionary: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Diploma: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Exam: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Grade: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Homework: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Lecture: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Library2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Medal2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Notebook2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const NotebookPen2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Quiz: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Schedule2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Seminar: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const StudentId: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Textbook: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trophy2: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tutor: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const University: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Whiteboard: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Behance: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bluesky: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Discord: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Dribbble: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Figma: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Github: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Goodreads: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Letterboxd: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Mastodon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Medium: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Netflix: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Pinterest: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Reddit: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Slack: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Snapchat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Spotify: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Strava: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Substack: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Threads: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tiktok: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tumblr: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Twitch: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Twitter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const XTwitter: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Clubhouse: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Line: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Messenger: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const SignalApp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Teams: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Telegram: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Viber: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Wechat: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Whatsapp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Zoom: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Chrome: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Edge: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Firefox: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Opera: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Angular: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bitbucket: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CodePen: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const CodeSandbox: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GitLab: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Nextjs: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Nodejs: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Npm: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const React: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const StackOverflow: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Svelte: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Tailwind: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vercel: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vscode: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vue: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Bandcamp: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Deezer: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Soundcloud: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Vimeo: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const KoFi: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Patreon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Asana: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Linear: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Monday: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Notion: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Trello: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Aws: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Azure: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const GoogleCloud: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Paypal: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Stripe: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Airbnb: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Amazon: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Ebay: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Etsy: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

declare const Shopify: ({ size, strokeWidth, className, animated, lively, trigger, "aria-label": ariaLabel }: IconProps) => react.JSX.Element;

export { AbTest, Accessibility, Achievement, Acorn, Activity, Aggregate, Airbnb, Airplay, Airport, AlarmClock, AlertCircle, AlertCircle2, AlertOctagon, AlertTriangle, Alias, Amazon, Ambulance, Ambulance2, Analytics, Anchor, Anchor2, Angry, Angular, type AnimationMode, type AnimationName, type AnimationPreset, type AnimationVariants, Annoyed, Apartment, Api, Apple, Approved, Arcade, Archive, Archive2, AreaChart, Armor, ArrowDown, ArrowDownCircle, ArrowDownCircle2, ArrowDownLeft, ArrowDownRight, ArrowDownSquare, ArrowLeft, ArrowLeftCircle, ArrowLeftCircle2, ArrowLeftSquare, ArrowRight, ArrowRightCircle, ArrowRightCircle2, ArrowRightSquare, ArrowUp, ArrowUpCircle, ArrowUpCircle2, ArrowUpLeft, ArrowUpRight, ArrowUpSquare, ArrowsCollapse, ArrowsExpand, ArrowsMaximize2, ArrowsMinimize2, Asana, Assigned, Assignment, AtSign, Atom2, Attendance, Attribution, AudioDescription, AudioLines, Automation, Award, Aws, Axe, Azure, Baby, Backlink, Backlog, Backpack, Backpack2, Bacon, Bacteria, Badge2, BadgeAlert, BadgeCheck, BadgeCheck2, BadgeDollar, BadgeHelp, BadgeInfo, BadgeMinus, BadgePercent, BadgePlus, BadgeX, Baggage, BaggageClaim, Ban, Banana, Bandage, Bandage2, Bandcamp, Bank, Banknote, BarChart, BarChart2, BarChartHorizontal, Barcode, Barcode2, Barometer, Baseball, Basket, Basketball, Bathtub, Battery, BatteryCharging, BatteryEmpty, BatteryHalf, BatteryLow, BatteryQuarter, BatteryThreeQuarters, Beach, Beaker2, Bear, Bed, Bee, Beer, Behance, Bell, BellOff, BellRing, Benchmark, Bicycle, Bike, Binder, Biohazard2, Bird, Bitbucket, Bitcoin, Blender, Block, Block2, Blocker, BloodDrop, BloodPressure, Bluesky, Bluetooth, BoardingPass, Boat, BodyScan, Bold, Bone, Book, BookClosed, BookMarked, BookOpen, Bookmark, Bookshelf, Boss, Bot, Boulder, Bowling, Braille, Brain, BrainCircuit, BrainCog, Branch, Bread, Briefcase2, BriefcaseMedical, Brightness, Broadcast, Brush, Bug, Building, Building2, Burger, Bus, BusinessCard, Butterfly, ButtonA, ButtonB, ButtonX, ButtonY, Cable, Cactus, Cake, Calculator, Calendar, CalendarCheck, CalendarDays, CalendarMinus, CalendarPlus, CalendarX, Caliper, Camera, CameraMovie, Camping, Candle, Candy, Cap, Capsule, Car, CarFront, Carpet, Carrot, CarryOn, CartCheck, CartMinus, CartPlus, CartX, Cast, Castle, Cat, Cave, Certificate, Certificate2, Chain, ChainBroken, Chair, Chalkboard, Check, CheckCircle, CheckCircle2, CheckIn, CheckOut, CheckSquare, Checkbox, CheckboxChecked, ChefHat, Cherry, ChevronDown, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Chicken, Chimney, ChipAi, Chocolate, Chopsticks, Chrome, Church, Churn, Cinema, Circle, Citation, Classroom, Clipboard, Clipboard2, ClipboardCheck, ClipboardCheck2, ClipboardCopy, ClipboardCopy2, ClipboardData, ClipboardEdit, ClipboardHeart, ClipboardList, ClipboardList2, ClipboardMinus, ClipboardPaste2, ClipboardPlus, ClipboardSearch, ClipboardSignature, ClipboardText, ClipboardX2, Clock, ClosedCaption, ClosedCaptions, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Clubhouse, Coat, Code, Code2, CodeBlock, CodePen, CodeSandbox, CodeSquare, Coffee, Cohort, Coin, Coins, Columns, Command, Comment, CommentCheck, CommentPlus, CommentX, Compare, Compass, Compass2, Competitive, Complete, Concierge, Confused, Console, Contact, Contact2, Container, Contract, Contract2, Contrast, Controller, ControllerWireless, Cookie, Cool, Coop, Copier, Copy, Coral, CornerDownLeft, CornerDownLeft2, CornerDownRight, CornerDownRight2, CornerUpLeft, CornerUpLeft2, CornerUpRight, CornerUpRight2, Correlation, Coupon, Course, Cpu, Crafting, CreditCard, Croissant, Cross, Crosshair, Crosshair2, Crown, Cruise, Crutches, Cry, Crystal, Css, Cup, Cupcake, Curriculum, Cursor, CursorClick, CursorText, Curtain, type CustomMotionPreset, type CustomMotionPresetConfig, type CustomMotionPresetOptions, type CustomPresetName, CustomsIcon, Cycling, Dashboard, DataPoint, Database, Database2, DatabaseBackup, DatabaseZap, Deadline, Deal, DeepLink, Deer, Deezer, Defend, Delegated, Dependency, Desert, Desk, Desk2, Desktop, Dial, Diamond, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dictionary, Dimension, Diploma, Directions, Disc, Disc2, Disc3, Discord, Discount, Dislike, Distraction, Divide2, Dividend, Dna, Dna2, DnaHelix, DocumentPrinter, Dog, DollarSign, Donut, DonutChart, Door, DoorClosed, DoorOpen, Download, Downtrend, Dpad, Dress, Dribbble, Drill, Droplet, DueDate, Dumbbell, Duplicate, Ear, EarHearing, EarOff, Ebay, Edge, Edit, Egg2, Electron, Elephant, Emergency, Envelope2, Equalizer, Equals, Eraser, Estimate, Etsy, Exam, Experiment, Exposure, ExternalLink, ExternalLink2, Eye, Eye2, EyeOff, FaceId, Facebook, Factory, FastForward, Faucet, Fax, Feed, Feedback, Fence, Fern, Figma, File, FileArchive, FileAudio, FileCheck, FileCode, FileImage, FileMinus, FilePlus, FileText, FileVideo, FileX, Files, Film, Film2, FilmSlate, Filter, Fingerprint, FireTruck, Firefox, Firewall, FirstAid, Fish, Fist, Flame, Flashlight, FlashlightOff, Flask2, FlaskRound, Flat, FlightTicket, Flower, Flower2, Focus, FocusRing, Folder, FolderMinus, FolderOpen, FolderPlus, Follow, Follow2, Football, Footprints, Forecast, Forest, Fork, Fortress, Fossil, Fox, Fraction, FreeShipping, Frown, Fuel, Function, Funnel, FunnelChart, Future, Gamepad, Gamepad2, Garage, GardenHose, Gate, Gauge, Generator, Geyser, Gift, GitBranch, GitCommit, GitFork, GitLab, GitMerge, GitPullRequest, Github, Glasses, Globe, Globe2, Glue, Golf, Goodreads, GoogleCloud, Grab, GrabCursor, Grabbing, Grade, GraduationCap, Grape, GreaterThan, Grid, Grid2x2, Grid3x3, Growth, Guard, Hail, Hammer, Hand, HandMetal, HandWave, Handheld, Handshake, Handshake2, Happy, HardDrive, HardDrive2, Hash, Hashtag, Hashtag2, Hat, Heading1, Heading2, Heading3, Headphones, HealthBar, Heart, HeartPulse, HeartShape, Heartbeat, Heatmap, Helicopter, HelpCircle, HelpCursor, Hexagon, HighScore, Highlighter, Hiking, History, Hockey, Home, Homework, Hoodie, Horse, Hospital, Hotdog, Hotel, HotelBed, HotelKey, Hourglass, House2, HouseCheck, HouseCog, HouseHeart, HousePlus, HouseX, Html, Humidity, Hyperlink, Hypothesis, ICON_COUNT, ICON_NAMES, ICON_NAMES_KEBAB, ICON_NAME_MAP, IceCream, IceCream2, type IconConfig, type IconName, type IconNameKebab, type IconProps, IconProvider, type IconProviderProps, IdCard, Immigration, Immunity, InProgress, InStock, Inbox, Incomplete, Indent, Infinity, Influencer, Info, InfoCircle, Ink, Instagram, InternalLink, Inventory, Inventory2, Investment2, Invoice, Island, Italic, Ivy, Jacket, JavascriptIcon, Joystick, Joystick2, Json, Jungle, Kanban, KanbanBoard, Kettle, Key, KeyRound, KeySquare, Keyboard, KeyboardNav, Knife2, Knob, KoFi, Kpi, LabResults, Ladder, Ladle, Lake, Lamp, LampCeiling, LampDesk, LampFloor, LampWall, Landmark, Lantern, Laptop, Laugh, Layout, LayoutGrid, LayoutList, LazyMotionIcon, type LazyMotionIconProps, LazyMotionPathElement, type LazyMotionPathProps, Leaderboard, Leaf, Leaf2, Lecture, LessThan, Letterboxd, Level, LevelUp, Library, Library2, Lightbulb, LightbulbOff, Lighthouse, Like, LikeFilled, Line, LineChart, Linear, Link, Link2Off, Linkedin, Lion, List, Live, LiveStream, Lively, Loader, Loading, Locate, LocateFixed, Lock, LockKeyhole, LockOpen, Lollipop, Loot, Loss, Love, Luggage, Lungs, Magnet, Mail, MailCheck, MailOpen, MailPlus, Mailbox, ManaBar, Map, MapPin, MapPinned, Markdown, Marker, Market, Martini, Mastodon, Maximize, Maximize2, Medal, Medal2, MedicalBag, MedicalCross, Medium, Meeting, Meh, Memory, Mention, Mention2, Menu, MenuDots, MenuDotsHorizontal, MenuGrid, MessageAi, MessageCircle, MessageSquare, MessagesSquare, Messenger, Meta, Metric, Mic, MicOff, Microscope, Microscope2, Microwave, Milestone, Milestone2, Minimize, Minimize2, Minus, Minus2, MinusCircle, MinusSquare, Molecule, Monday, Monitor, Moon, MoreHorizontal, Moss, type MotionPreset, type MotionType, Motorcycle, Mountain, MountainSnow, Mouse, MoveCursor, MoveHorizontal, Multiplayer, Multiply, Mushroom, Music, Music2, Music3, Music4, NameBadge, Navigation, Navigation2, Neon, Netflix, NeuralNetwork, Nextjs, Nodejs, Noodles, NotAllowed, NotEqual, Notebook, Notebook2, NotebookPen, NotebookPen2, Notion, Npm, Nucleus, Ocean, Octagon, Odometer, Office, Ok, OnHold, Opera, OutOfStock, Outdent, Outlet, Outlier, Oval, Overdue, Oxygen, Package, PageSetup, Paintbrush, Palette, Palm, Pan, PanelBottom, PanelLeft, PanelRight, PanelTop, Pants, PaperFeed, Paperclip, Paperclip2, Parallelogram, Parking, Partnership, Passport, Passport2, Patreon, Pause, PauseCircle, Paypal, Peace, Pebbles, Pen, Pen2, PenLine, PenTool, Pencil, Pencil2, PencilLine, Pending, Pentagon, Percent, PercentBadge, Percentage, Permalink, PetriDish, Phone, PhoneCall, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, Pi, Pickup, PictureFrame, PieChart, PieChart2, PiggyBank, Pill, Pill2, Pills, Pinch, PineTree, Pinecone, Pinterest, Pitch, Pizza, Plane, PlaneLanding, PlaneTakeoff, Plant2, Plate, Play, PlayCircle, Playlist, Pliers, Plug2, Plus, Plus2, PlusCircle, PlusSquare, Podcast, PointDown, PointLeft, PointRight, PointUp, Pointer2, PoliceCar, Poll, Pomodoro, Pool, Popsicle, Portfolio, Post, Pot, Potion, PowerOff, PowerUp, Prescription, Presentation, Presentation2, PriceTag, PriceTagPlus, PrintPreview, PrintQueue, Printer, Printer2, PrinterCheck, PrinterX, Priority, PriorityHigh, PriorityLow, Profit, Progress, Projector, Protection, Protractor, Pulse, Puzzle, PuzzlePiece, Pvp, QrCode, QrScan, Quest, Queue, Quiz, Quote, Rabbit, Radiation, Radio, RadioButton, RadioChecked, Rainbow, Rake, Ram, Rating, React as ReactLogo, Reaction, Receipt, Receipt2, ReceiptCheck, ReceiptX, Record$1 as Record, Recovery, Rectangle, Recurring, Reddit, ReducedMotion, Reference, Refresh, Refrigerator, Refund, Regex, Regression, Rejected, Reminder, Reorder, Repeat, Report, Repost, Research, Reservation, ResizeDiagonal, ResizeHorizontal, ResizeVertical, Respawn, Retention, Return, Revenue, Review2, Rewind, Rice, River, RoadTrip, Roadmap, Robot, Rocket, Roi, Roller, RoomService, Rose, Route, Router, Rows, Rss, RubberStamp, Ruler, Ruler2, RulerSquare, Running, Runway, Sad, Safari, Sailboat, Salad, Sandwich, Save, Save2, SavePlus, Saw, Scale2, Scan, Scan2, ScanFace, ScanLine, Scanner, Scanner2, ScatterPlot, Schedule, Schedule2, School, Scissors2, Scooter, Screen, ScreenReader, Screwdriver, SdCard, Search, SearchMinus, SearchPlus, Seaweed, Seedling, Segment, Seminar, Send, Send2, Server, Server2, ServerCog, ServerCrash, ServerOff, Settings, Share, Share2, ShareForward, Shareholder, Shell, Shield, Shield2, ShieldAlert, ShieldAlert2, ShieldCheck, ShieldDollar, ShieldLock, ShieldMinus2, ShieldOff, ShieldOff2, ShieldPlus, ShieldPlus2, ShieldUnlock, ShieldUser, ShieldX, Ship, Shipping, ShippingFast, Shirt, Shopify, ShoppingBag, ShoppingBagPlus, ShoppingCart, Shortcut, Shorts, Shovel, Shrimp, Shuffle, Sidebar, SidebarClose, SidebarOpen, Sigma, Sign, SignLanguage, Signal, SignalApp, SignalHigh, SignalLow, SignalZero, Signpost, Sink, Skiing, SkipBack, SkipForward, Slack, Sleep, Slider, SliderHorizontal, SliderVertical, Smartphone, Smile, Snapchat, Snippet, Snowflake, Soccer, Sofa, Soundcloud, Soup, Spa, Sparkles, Sparkline, Spatula, Speaker, Speaker2, Speaker3, SpeedDial, Speedometer, Spoon2, Spotify, Spotlight, Sprint, Sprout, Sqrt, Square, Ssd, StackOverflow, Stakeholder, Stamp, Stamp2, Stapler, Star, Starfish, Startup, Statistics, Steak, Stethoscope, Stethoscope2, StopCircle, Stopwatch, Storage, Store, StoreFront, Story, Strategy, Strava, Stream, Strikethrough, Stripe, StudentId, Studio, Subscript, Substack, Subtask, Subtitle, Sun, Sunglasses, Sunrise, Sunset, Superscript, SurgeProtector, Surprised, Survey, Sushi, Svelte, Sweater, Swimming, SwitchOff, SwitchOn, Sword, Swords, Syringe, Syringe2, Table, Table2, Tablet, Taco, Tag, Tag2, TagPerson, Tags, Tailwind, Tape, TapeMeasure, Target, Target2, Task, TaskCheck, TaskList, Team, Teams, Telegram, Temperature, TemperatureDial, Template, Tennis, Tent, Terminal, Terminal2, TerminalGate, TerminalSquare, TestTube, TestTube2, TestTubes, Testimonial, Text, TextCursor, TextSize, Textbook, Thermometer, Thermometer2, ThermometerMedical, Threads, ThumbsDown, ThumbsUp, Ticket, Tie, Tiktok, TimeTracking, Timeline, Timeline2, Timer, Toaster, Toggle, ToggleLeft, ToggleRight, Toilet, Toner, Toolbox, Torch, Tornado, Tower, TrafficCone, Train, type TransitionConfig, Trapezoid, Trash, Tree, Tree2, TreePalm, TreePine, Treemap, Trello, Trending, TrendingDown, TrendingUp, Triangle, Trigger, type TriggerType, Trophy, Trophy2, Truck, Tshirt, Tulip, Tumblr, Turtle, Tutor, Tv, Twitch, Twitter, TwoFactor, TypescriptIcon, Ufo, Umbrella, Underline, Unfollow, Unfollow2, University, Unlock, Unverified, Upload, Ups, Uptrend, UsbDrive, type UseIconAnimationReturn, type UseIconConfigReturn, User, UserCheck, UserCircle, UserCog, UserMinus, UserPlus, UserX, Users, Utensils, UtensilsCrossed, Vaccine, Variance, Vault, Vercel, Verified, Verified2, Viber, Video, Video2, VideoOff, Vimeo, Vinyl, Viral, Virus, Visa, Vitals, VoiceControl, Voicemail, Volcano, Volleyball, Volume, Volume1, Volume2, VolumeDial, VolumeOff, VolumeX, Vscode, Vue, WaitCursor, Walker, Wallet, WalletCards, Wand, Wand2, WandSparkles, Warehouse, Watch, WatchAccessory, Waterfall, WateringCan, Waveform, Waves, Waypoints, Webcam, Webhook, Wechat, Weight, Whatsapp, Wheelchair, Wheelchair2, Whisk, Whiteboard, Widget, Wifi, WifiOff, Wind, Window, Window2, Wine, Wink, Wishlist, Wolf, Workflow, Wrench, X, XCircle, XCircle2, XSquare, XTwitter, Xml, XpBar, Xray, Youtube, Zap, Zoom, animations, bounce, cn, composeMotionPresets, customPresets, defineMotionPreset, draw, easeSmooth, extendMotionPreset, fade, getMotionPreset, isDefined, isIconName, isIconNameKebab, isMotionLoaded, mergeConfig, motionPresets, motionTypeList, pop, preloadMotion, pulse, rotate, shake, spin, stagger, translate, useIconAnimation, useIconConfig, useIconContext, withDefault };
