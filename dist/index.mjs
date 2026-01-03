export { StaticAlertCircle, StaticArrowLeft, StaticArrowRight, StaticBell, StaticCalendar, StaticCheck, StaticCheckCircle, StaticChevronDown, StaticChevronUp, StaticClock, StaticCopy, StaticDownload, StaticEdit, StaticEye, StaticEyeOff, StaticHeart, StaticHelpCircle, StaticHome, StaticInfo, StaticLoader, StaticLock, StaticMail, StaticMenu, StaticMessageCircle, StaticMinus, StaticPhone, StaticPlus, StaticRefresh, StaticSearch, StaticSettings, StaticShare, StaticStar, StaticThumbsDown, StaticThumbsUp, StaticTrash, StaticUpload, StaticUser, StaticUsers, StaticX, StaticXCircle, createStaticIcon, withStatic } from './chunk-FZN7GKKV.mjs';
export { cssAnimationClasses, cssKeyframes, cssStylesheet, getCssAnimationClasses, injectCssAnimations, motionTypeToCssClass, removeCssAnimations, triggerTypeToCssClass } from './chunk-PLCTGVWN.mjs';
import { __require } from './chunk-BJTO5JO5.mjs';
import * as React3 from 'react';
import React3__default, { createContext, lazy, forwardRef, useContext, Suspense } from 'react';
import { useReducedMotion, motion } from 'motion/react';

var DEFAULT_CONFIG = {
  animated: true,
  defaultSize: 24,
  defaultStrokeWidth: 2
};
var IconContext = createContext(void 0);
function IconProvider({ children, config }) {
  const mergedConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };
  return /* @__PURE__ */ React3__default.createElement(IconContext.Provider, { value: mergedConfig }, children);
}
function useIconContext() {
  const context = useContext(IconContext);
  return context ?? DEFAULT_CONFIG;
}

// src/lib/motion-presets.ts
var springBouncy = {
  type: "spring",
  stiffness: 400,
  damping: 10
};
var springSoft = {
  type: "spring",
  stiffness: 300,
  damping: 20
};
var springSnappy = {
  type: "spring",
  stiffness: 500,
  damping: 25
};
var easeSmooth = {
  duration: 0.3,
  ease: "easeInOut"
};
var motionPresets = {
  scale: {
    variants: {
      initial: { scale: 1 },
      hover: { scale: 1.15 }
    },
    transition: springBouncy
  },
  rotate: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: 180 }
    },
    transition: springSoft
  },
  translate: {
    variants: {
      initial: { x: 0, y: 0 },
      hover: { x: 2, y: -2 }
    },
    transition: springSnappy
  },
  shake: {
    variants: {
      initial: { x: 0 },
      hover: { x: [0, -3, 3, -3, 3, 0] }
    },
    transition: { duration: 0.4 }
  },
  pulse: {
    variants: {
      initial: { scale: 1, opacity: 1 },
      hover: {
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1]
      }
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  bounce: {
    variants: {
      initial: { y: 0 },
      hover: { y: [0, -6, 0] }
    },
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      times: [0, 0.5, 1]
    }
  },
  draw: {
    variants: {
      initial: { opacity: 0.4, scale: 0.9 },
      hover: { opacity: 1, scale: 1 }
    },
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  spin: {
    variants: {
      initial: { rotate: 0 },
      hover: { rotate: 360 }
    },
    transition: {
      duration: 0.8,
      ease: "linear",
      repeat: Infinity
    }
  },
  none: {
    variants: {
      initial: {},
      hover: {}
    },
    transition: { duration: 0 }
  }
};
function getMotionPreset(type = "scale") {
  return motionPresets[type] || motionPresets.scale;
}
var motionTypeList = [
  { type: "scale", label: "Scale", description: "Grow on hover" },
  { type: "rotate", label: "Rotate", description: "Spin on hover" },
  { type: "translate", label: "Translate", description: "Slide on hover" },
  { type: "shake", label: "Shake", description: "Wobble effect" },
  { type: "pulse", label: "Pulse", description: "Heartbeat effect" },
  { type: "bounce", label: "Bounce", description: "Bouncy spring" },
  { type: "draw", label: "Draw", description: "Fade reveal" },
  { type: "spin", label: "Spin", description: "Continuous rotation" },
  { type: "none", label: "None", description: "No animation" }
];

// src/hooks/useIconAnimation.ts
function useIconAnimation(animated, motionType = "scale", trigger = "hover") {
  const context = useIconContext();
  const prefersReducedMotion = useReducedMotion();
  const preset = getMotionPreset(motionType);
  const isAnimated = (() => {
    if (animated !== void 0) {
      return animated;
    }
    if (!context.animated) {
      return false;
    }
    if (prefersReducedMotion) {
      return false;
    }
    return true;
  })();
  const getVariants = (variants) => {
    if (!isAnimated) {
      return void 0;
    }
    return variants;
  };
  const transition = isAnimated ? void 0 : { duration: 0 };
  const presetVariants = isAnimated ? preset.variants : void 0;
  const getAnimationProps = () => {
    if (!isAnimated) {
      return { initial: "initial", variants: preset.variants };
    }
    const loopTransition = {
      ...preset.transition,
      repeat: Infinity,
      repeatType: "loop"
    };
    switch (trigger) {
      case "hover":
        return {
          initial: "initial",
          whileHover: "hover",
          variants: preset.variants,
          transition: preset.transition
        };
      case "loop":
        return {
          initial: "initial",
          animate: "hover",
          variants: preset.variants,
          transition: loopTransition
        };
      case "mount":
        return {
          initial: "initial",
          animate: "hover",
          variants: preset.variants,
          transition: preset.transition
        };
      case "inView":
        return {
          initial: "initial",
          whileInView: "hover",
          viewport: { once: true, amount: 0.5 },
          variants: preset.variants,
          transition: preset.transition
        };
      default:
        return {
          initial: "initial",
          whileHover: "hover",
          variants: preset.variants,
          transition: preset.transition
        };
    }
  };
  const getPathAnimationProps = () => {
    if (!isAnimated || motionType !== "draw") {
      return {};
    }
    const drawTransition = {
      duration: 1.5,
      ease: "easeInOut"
    };
    const drawVariants = {
      initial: { pathLength: 1, opacity: 1 },
      hover: {
        pathLength: [1, 0, 1],
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      }
    };
    const drawInViewVariants = {
      initial: { pathLength: 0, opacity: 0.3 },
      hover: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: 1.5,
          ease: "easeInOut"
        }
      }
    };
    switch (trigger) {
      case "hover":
        return {
          variants: drawVariants,
          initial: "initial"
        };
      case "loop":
        return {
          initial: { pathLength: 0, opacity: 0.5 },
          animate: { pathLength: [0, 1, 1, 0], opacity: [0.5, 1, 1, 0.5] },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.6, 1]
          }
        };
      case "mount":
        return {
          initial: { pathLength: 0, opacity: 0.3 },
          animate: { pathLength: 1, opacity: 1 },
          transition: drawTransition
        };
      case "inView":
        return {
          variants: drawInViewVariants,
          initial: "initial"
        };
      default:
        return {};
    }
  };
  const getDrawWrapperProps = () => {
    if (!isAnimated || motionType !== "draw") {
      return {};
    }
    switch (trigger) {
      case "hover":
        return {
          initial: "initial",
          whileHover: "hover"
        };
      case "inView":
        return {
          initial: "initial",
          whileInView: "hover",
          viewport: { once: true, amount: 0.5 }
        };
      default:
        return {};
    }
  };
  const result = {
    isAnimated,
    getVariants,
    transition,
    presetVariants,
    presetTransition: preset.transition,
    animationProps: getAnimationProps(),
    pathAnimationProps: getPathAnimationProps(),
    drawWrapperProps: getDrawWrapperProps()
  };
  return result;
}

// src/lib/utils.ts
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function mergeConfig(base, overrides) {
  return { ...base, ...overrides };
}
function isDefined(value) {
  return value !== null && value !== void 0;
}
function withDefault(value, fallback) {
  return isDefined(value) ? value : fallback;
}

// src/hooks/useIconConfig.ts
function useIconConfig(props) {
  const context = useIconContext();
  return {
    size: withDefault(props.size, context.defaultSize),
    strokeWidth: withDefault(props.strokeWidth, context.defaultStrokeWidth),
    className: props.className,
    animated: withDefault(props.animated, context.animated)
  };
}

// src/lib/icon-names.ts
var ICON_NAMES = [
  "Accessibility",
  "Activity",
  "Airplay",
  "AlertCircle",
  "AlertOctagon",
  "AlertTriangle",
  "Anchor",
  "Apple",
  "Archive",
  "AreaChart",
  "ArrowDown",
  "ArrowDownLeft",
  "ArrowDownRight",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowUpLeft",
  "ArrowUpRight",
  "AtSign",
  "Award",
  "Baby",
  "Backpack",
  "BadgeCheck",
  "Ban",
  "Banana",
  "Bandage",
  "BarChart",
  "BarChart2",
  "Barcode",
  "Battery",
  "BatteryCharging",
  "BatteryLow",
  "Beer",
  "Bell",
  "Bike",
  "Bluetooth",
  "Bone",
  "Book",
  "BookMarked",
  "BookOpen",
  "Bookmark",
  "Brain",
  "Brush",
  "Building",
  "Building2",
  "Bus",
  "Calculator",
  "Calendar",
  "Camera",
  "Car",
  "CarFront",
  "Carrot",
  "Cast",
  "Castle",
  "Check",
  "CheckCircle",
  "ChefHat",
  "Cherry",
  "ChevronDown",
  "ChevronUp",
  "ChevronsDown",
  "ChevronsLeft",
  "ChevronsRight",
  "ChevronsUp",
  "Church",
  "Circle",
  "Clipboard",
  "ClipboardCheck",
  "ClipboardCopy",
  "ClipboardList",
  "Clock",
  "Cloud",
  "CloudDrizzle",
  "CloudLightning",
  "CloudRain",
  "CloudSnow",
  "CloudSun",
  "Code",
  "Code2",
  "Coffee",
  "Columns",
  "Command",
  "Compass",
  "Contact",
  "Contact2",
  "Cookie",
  "Copy",
  "CornerDownLeft",
  "CornerDownRight",
  "CornerUpLeft",
  "CornerUpRight",
  "Cpu",
  "CreditCard",
  "Crosshair",
  "Crown",
  "Cup",
  "Database",
  "Dice1",
  "Dice2",
  "Dice3",
  "Dice4",
  "Dice5",
  "Dice6",
  "Dna",
  "DollarSign",
  "Download",
  "Droplet",
  "Dumbbell",
  "Ear",
  "Edit",
  "Eraser",
  "Eye",
  "Eye2",
  "EyeOff",
  "Factory",
  "FastForward",
  "File",
  "FileCheck",
  "FileMinus",
  "FilePlus",
  "FileText",
  "FileX",
  "Files",
  "Film",
  "Filter",
  "Fingerprint",
  "Flame",
  "Folder",
  "FolderMinus",
  "FolderOpen",
  "FolderPlus",
  "Footprints",
  "Frown",
  "Fuel",
  "Gamepad2",
  "Gauge",
  "Gift",
  "Glasses",
  "Globe",
  "GraduationCap",
  "Grape",
  "Grid",
  "Hammer",
  "Hand",
  "HardDrive",
  "Hash",
  "Headphones",
  "Heart",
  "HeartPulse",
  "HelpCircle",
  "Highlighter",
  "Home",
  "Hospital",
  "IceCream",
  "Inbox",
  "Info",
  "Joystick",
  "Kanban",
  "Key",
  "KeyRound",
  "Keyboard",
  "Lamp",
  "LampDesk",
  "Landmark",
  "Laptop",
  "Layout",
  "LayoutGrid",
  "LayoutList",
  "Leaf",
  "Library",
  "Lightbulb",
  "LightbulbOff",
  "LineChart",
  "Link",
  "List",
  "Loader",
  "Lock",
  "LockOpen",
  "Mail",
  "Map",
  "MapPin",
  "Martini",
  "Maximize",
  "Maximize2",
  "Medal",
  "Meh",
  "Menu",
  "MessageCircle",
  "MessageSquare",
  "Mic",
  "MicOff",
  "Microscope",
  "Milestone",
  "Minimize",
  "Minimize2",
  "Minus",
  "Monitor",
  "Moon",
  "MoreHorizontal",
  "Mountain",
  "MountainSnow",
  "Mouse",
  "MoveHorizontal",
  "Music",
  "Navigation",
  "Navigation2",
  "Notebook",
  "NotebookPen",
  "Package",
  "Palette",
  "PanelLeft",
  "PanelRight",
  "Paperclip",
  "Parking",
  "Pause",
  "Pen",
  "PenTool",
  "Pencil",
  "Percent",
  "Phone",
  "PhoneCall",
  "PhoneIncoming",
  "PhoneMissed",
  "PhoneOff",
  "PhoneOutgoing",
  "PieChart",
  "Pill",
  "Pizza",
  "Plane",
  "PlaneLanding",
  "PlaneTakeoff",
  "Play",
  "Plus",
  "Presentation",
  "Printer",
  "Puzzle",
  "QrCode",
  "Radio",
  "Receipt",
  "Refresh",
  "Repeat",
  "Rewind",
  "Rocket",
  "Router",
  "Rows",
  "Rss",
  "Ruler",
  "Sailboat",
  "Sandwich",
  "Save",
  "Scan",
  "ScanLine",
  "School",
  "Screwdriver",
  "SdCard",
  "Search",
  "Send",
  "Send2",
  "Server",
  "Settings",
  "Share",
  "Shield",
  "ShieldAlert",
  "ShieldCheck",
  "ShieldOff",
  "Ship",
  "ShoppingBag",
  "ShoppingCart",
  "Shuffle",
  "Sidebar",
  "Signal",
  "SignalHigh",
  "SignalLow",
  "SignalZero",
  "SkipBack",
  "SkipForward",
  "Smartphone",
  "Smile",
  "Snowflake",
  "Speaker",
  "Square",
  "Star",
  "Stethoscope",
  "Store",
  "Sun",
  "Sunrise",
  "Sunset",
  "Sword",
  "Swords",
  "Syringe",
  "Table",
  "Table2",
  "Tablet",
  "Tag",
  "Tag2",
  "Tags",
  "Target",
  "Tent",
  "Terminal",
  "TestTube",
  "TestTubes",
  "Thermometer",
  "Thermometer2",
  "ThumbsDown",
  "ThumbsUp",
  "TrafficCone",
  "Train",
  "Trash",
  "Tree",
  "TrendingDown",
  "TrendingUp",
  "Triangle",
  "Trophy",
  "Truck",
  "Tv",
  "Umbrella",
  "Unlock",
  "Upload",
  "UsbDrive",
  "User",
  "UserCheck",
  "UserCog",
  "UserMinus",
  "UserPlus",
  "UserX",
  "Users",
  "Utensils",
  "UtensilsCrossed",
  "Video",
  "Video2",
  "VideoOff",
  "Voicemail",
  "Volume",
  "VolumeOff",
  "Wallet",
  "Wand",
  "Wand2",
  "Warehouse",
  "Watch",
  "Waves",
  "Webcam",
  "Wheelchair",
  "Wifi",
  "WifiOff",
  "Wind",
  "Wine",
  "Wrench",
  "X",
  "XCircle",
  "Zap"
];
var ICON_NAMES_KEBAB = [
  "accessibility",
  "activity",
  "airplay",
  "alert-circle",
  "alert-octagon",
  "alert-triangle",
  "anchor",
  "apple",
  "archive",
  "area-chart",
  "arrow-down",
  "arrow-down-left",
  "arrow-down-right",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "arrow-up-left",
  "arrow-up-right",
  "at-sign",
  "award",
  "baby",
  "backpack",
  "badge-check",
  "ban",
  "banana",
  "bandage",
  "bar-chart",
  "bar-chart-2",
  "barcode",
  "battery",
  "battery-charging",
  "battery-low",
  "beer",
  "bell",
  "bike",
  "bluetooth",
  "bone",
  "book",
  "book-marked",
  "book-open",
  "bookmark",
  "brain",
  "brush",
  "building",
  "building2",
  "bus",
  "calculator",
  "calendar",
  "camera",
  "car",
  "car-front",
  "carrot",
  "cast",
  "castle",
  "check",
  "check-circle",
  "chef-hat",
  "cherry",
  "chevron-down",
  "chevron-up",
  "chevrons-down",
  "chevrons-left",
  "chevrons-right",
  "chevrons-up",
  "church",
  "circle",
  "clipboard",
  "clipboard-check",
  "clipboard-copy",
  "clipboard-list",
  "clock",
  "cloud",
  "cloud-drizzle",
  "cloud-lightning",
  "cloud-rain",
  "cloud-snow",
  "cloud-sun",
  "code",
  "code2",
  "coffee",
  "columns",
  "command",
  "compass",
  "contact",
  "contact2",
  "cookie",
  "copy",
  "corner-down-left",
  "corner-down-right",
  "corner-up-left",
  "corner-up-right",
  "cpu",
  "credit-card",
  "crosshair",
  "crown",
  "cup",
  "database",
  "dice-1",
  "dice-2",
  "dice-3",
  "dice-4",
  "dice-5",
  "dice-6",
  "dna",
  "dollar-sign",
  "download",
  "droplet",
  "dumbbell",
  "ear",
  "edit",
  "eraser",
  "eye",
  "eye-2",
  "eye-off",
  "factory",
  "fast-forward",
  "file",
  "file-check",
  "file-minus",
  "file-plus",
  "file-text",
  "file-x",
  "files",
  "film",
  "filter",
  "fingerprint",
  "flame",
  "folder",
  "folder-minus",
  "folder-open",
  "folder-plus",
  "footprints",
  "frown",
  "fuel",
  "gamepad-2",
  "gauge",
  "gift",
  "glasses",
  "globe",
  "graduation-cap",
  "grape",
  "grid",
  "hammer",
  "hand",
  "hard-drive",
  "hash",
  "headphones",
  "heart",
  "heart-pulse",
  "help-circle",
  "highlighter",
  "home",
  "hospital",
  "ice-cream",
  "inbox",
  "info",
  "joystick",
  "kanban",
  "key",
  "key-round",
  "keyboard",
  "lamp",
  "lamp-desk",
  "landmark",
  "laptop",
  "layout",
  "layout-grid",
  "layout-list",
  "leaf",
  "library",
  "lightbulb",
  "lightbulb-off",
  "line-chart",
  "link",
  "list",
  "loader",
  "lock",
  "lock-open",
  "mail",
  "map",
  "map-pin",
  "martini",
  "maximize",
  "maximize-2",
  "medal",
  "meh",
  "menu",
  "message-circle",
  "message-square",
  "mic",
  "mic-off",
  "microscope",
  "milestone",
  "minimize",
  "minimize-2",
  "minus",
  "monitor",
  "moon",
  "more-horizontal",
  "mountain",
  "mountain-snow",
  "mouse",
  "move-horizontal",
  "music",
  "navigation",
  "navigation-2",
  "notebook",
  "notebook-pen",
  "package",
  "palette",
  "panel-left",
  "panel-right",
  "paperclip",
  "parking",
  "pause",
  "pen",
  "pen-tool",
  "pencil",
  "percent",
  "phone",
  "phone-call",
  "phone-incoming",
  "phone-missed",
  "phone-off",
  "phone-outgoing",
  "pie-chart",
  "pill",
  "pizza",
  "plane",
  "plane-landing",
  "plane-takeoff",
  "play",
  "plus",
  "presentation",
  "printer",
  "puzzle",
  "qr-code",
  "radio",
  "receipt",
  "refresh",
  "repeat",
  "rewind",
  "rocket",
  "router",
  "rows",
  "rss",
  "ruler",
  "sailboat",
  "sandwich",
  "save",
  "scan",
  "scan-line",
  "school",
  "screwdriver",
  "sd-card",
  "search",
  "send",
  "send-2",
  "server",
  "settings",
  "share",
  "shield",
  "shield-alert",
  "shield-check",
  "shield-off",
  "ship",
  "shopping-bag",
  "shopping-cart",
  "shuffle",
  "sidebar",
  "signal",
  "signal-high",
  "signal-low",
  "signal-zero",
  "skip-back",
  "skip-forward",
  "smartphone",
  "smile",
  "snowflake",
  "speaker",
  "square",
  "star",
  "stethoscope",
  "store",
  "sun",
  "sunrise",
  "sunset",
  "sword",
  "swords",
  "syringe",
  "table",
  "table-2",
  "tablet",
  "tag",
  "tag2",
  "tags",
  "target",
  "tent",
  "terminal",
  "test-tube",
  "test-tubes",
  "thermometer",
  "thermometer-2",
  "thumbs-down",
  "thumbs-up",
  "traffic-cone",
  "train",
  "trash",
  "tree",
  "trending-down",
  "trending-up",
  "triangle",
  "trophy",
  "truck",
  "tv",
  "umbrella",
  "unlock",
  "upload",
  "usb-drive",
  "user",
  "user-check",
  "user-cog",
  "user-minus",
  "user-plus",
  "user-x",
  "users",
  "utensils",
  "utensils-crossed",
  "video",
  "video-2",
  "video-off",
  "voicemail",
  "volume",
  "volume-off",
  "wallet",
  "wand",
  "wand-2",
  "warehouse",
  "watch",
  "waves",
  "webcam",
  "wheelchair",
  "wifi",
  "wifi-off",
  "wind",
  "wine",
  "wrench",
  "x",
  "x-circle",
  "zap"
];
var ICON_COUNT = 350;
var ICON_NAME_MAP = {
  "accessibility": "Accessibility",
  "activity": "Activity",
  "airplay": "Airplay",
  "alert-circle": "AlertCircle",
  "alert-octagon": "AlertOctagon",
  "alert-triangle": "AlertTriangle",
  "anchor": "Anchor",
  "apple": "Apple",
  "archive": "Archive",
  "area-chart": "AreaChart",
  "arrow-down": "ArrowDown",
  "arrow-down-left": "ArrowDownLeft",
  "arrow-down-right": "ArrowDownRight",
  "arrow-left": "ArrowLeft",
  "arrow-right": "ArrowRight",
  "arrow-up": "ArrowUp",
  "arrow-up-left": "ArrowUpLeft",
  "arrow-up-right": "ArrowUpRight",
  "at-sign": "AtSign",
  "award": "Award",
  "baby": "Baby",
  "backpack": "Backpack",
  "badge-check": "BadgeCheck",
  "ban": "Ban",
  "banana": "Banana",
  "bandage": "Bandage",
  "bar-chart": "BarChart",
  "bar-chart-2": "BarChart2",
  "barcode": "Barcode",
  "battery": "Battery",
  "battery-charging": "BatteryCharging",
  "battery-low": "BatteryLow",
  "beer": "Beer",
  "bell": "Bell",
  "bike": "Bike",
  "bluetooth": "Bluetooth",
  "bone": "Bone",
  "book": "Book",
  "book-marked": "BookMarked",
  "book-open": "BookOpen",
  "bookmark": "Bookmark",
  "brain": "Brain",
  "brush": "Brush",
  "building": "Building",
  "building2": "Building2",
  "bus": "Bus",
  "calculator": "Calculator",
  "calendar": "Calendar",
  "camera": "Camera",
  "car": "Car",
  "car-front": "CarFront",
  "carrot": "Carrot",
  "cast": "Cast",
  "castle": "Castle",
  "check": "Check",
  "check-circle": "CheckCircle",
  "chef-hat": "ChefHat",
  "cherry": "Cherry",
  "chevron-down": "ChevronDown",
  "chevron-up": "ChevronUp",
  "chevrons-down": "ChevronsDown",
  "chevrons-left": "ChevronsLeft",
  "chevrons-right": "ChevronsRight",
  "chevrons-up": "ChevronsUp",
  "church": "Church",
  "circle": "Circle",
  "clipboard": "Clipboard",
  "clipboard-check": "ClipboardCheck",
  "clipboard-copy": "ClipboardCopy",
  "clipboard-list": "ClipboardList",
  "clock": "Clock",
  "cloud": "Cloud",
  "cloud-drizzle": "CloudDrizzle",
  "cloud-lightning": "CloudLightning",
  "cloud-rain": "CloudRain",
  "cloud-snow": "CloudSnow",
  "cloud-sun": "CloudSun",
  "code": "Code",
  "code2": "Code2",
  "coffee": "Coffee",
  "columns": "Columns",
  "command": "Command",
  "compass": "Compass",
  "contact": "Contact",
  "contact2": "Contact2",
  "cookie": "Cookie",
  "copy": "Copy",
  "corner-down-left": "CornerDownLeft",
  "corner-down-right": "CornerDownRight",
  "corner-up-left": "CornerUpLeft",
  "corner-up-right": "CornerUpRight",
  "cpu": "Cpu",
  "credit-card": "CreditCard",
  "crosshair": "Crosshair",
  "crown": "Crown",
  "cup": "Cup",
  "database": "Database",
  "dice-1": "Dice1",
  "dice-2": "Dice2",
  "dice-3": "Dice3",
  "dice-4": "Dice4",
  "dice-5": "Dice5",
  "dice-6": "Dice6",
  "dna": "Dna",
  "dollar-sign": "DollarSign",
  "download": "Download",
  "droplet": "Droplet",
  "dumbbell": "Dumbbell",
  "ear": "Ear",
  "edit": "Edit",
  "eraser": "Eraser",
  "eye": "Eye",
  "eye-2": "Eye2",
  "eye-off": "EyeOff",
  "factory": "Factory",
  "fast-forward": "FastForward",
  "file": "File",
  "file-check": "FileCheck",
  "file-minus": "FileMinus",
  "file-plus": "FilePlus",
  "file-text": "FileText",
  "file-x": "FileX",
  "files": "Files",
  "film": "Film",
  "filter": "Filter",
  "fingerprint": "Fingerprint",
  "flame": "Flame",
  "folder": "Folder",
  "folder-minus": "FolderMinus",
  "folder-open": "FolderOpen",
  "folder-plus": "FolderPlus",
  "footprints": "Footprints",
  "frown": "Frown",
  "fuel": "Fuel",
  "gamepad-2": "Gamepad2",
  "gauge": "Gauge",
  "gift": "Gift",
  "glasses": "Glasses",
  "globe": "Globe",
  "graduation-cap": "GraduationCap",
  "grape": "Grape",
  "grid": "Grid",
  "hammer": "Hammer",
  "hand": "Hand",
  "hard-drive": "HardDrive",
  "hash": "Hash",
  "headphones": "Headphones",
  "heart": "Heart",
  "heart-pulse": "HeartPulse",
  "help-circle": "HelpCircle",
  "highlighter": "Highlighter",
  "home": "Home",
  "hospital": "Hospital",
  "ice-cream": "IceCream",
  "inbox": "Inbox",
  "info": "Info",
  "joystick": "Joystick",
  "kanban": "Kanban",
  "key": "Key",
  "key-round": "KeyRound",
  "keyboard": "Keyboard",
  "lamp": "Lamp",
  "lamp-desk": "LampDesk",
  "landmark": "Landmark",
  "laptop": "Laptop",
  "layout": "Layout",
  "layout-grid": "LayoutGrid",
  "layout-list": "LayoutList",
  "leaf": "Leaf",
  "library": "Library",
  "lightbulb": "Lightbulb",
  "lightbulb-off": "LightbulbOff",
  "line-chart": "LineChart",
  "link": "Link",
  "list": "List",
  "loader": "Loader",
  "lock": "Lock",
  "lock-open": "LockOpen",
  "mail": "Mail",
  "map": "Map",
  "map-pin": "MapPin",
  "martini": "Martini",
  "maximize": "Maximize",
  "maximize-2": "Maximize2",
  "medal": "Medal",
  "meh": "Meh",
  "menu": "Menu",
  "message-circle": "MessageCircle",
  "message-square": "MessageSquare",
  "mic": "Mic",
  "mic-off": "MicOff",
  "microscope": "Microscope",
  "milestone": "Milestone",
  "minimize": "Minimize",
  "minimize-2": "Minimize2",
  "minus": "Minus",
  "monitor": "Monitor",
  "moon": "Moon",
  "more-horizontal": "MoreHorizontal",
  "mountain": "Mountain",
  "mountain-snow": "MountainSnow",
  "mouse": "Mouse",
  "move-horizontal": "MoveHorizontal",
  "music": "Music",
  "navigation": "Navigation",
  "navigation-2": "Navigation2",
  "notebook": "Notebook",
  "notebook-pen": "NotebookPen",
  "package": "Package",
  "palette": "Palette",
  "panel-left": "PanelLeft",
  "panel-right": "PanelRight",
  "paperclip": "Paperclip",
  "parking": "Parking",
  "pause": "Pause",
  "pen": "Pen",
  "pen-tool": "PenTool",
  "pencil": "Pencil",
  "percent": "Percent",
  "phone": "Phone",
  "phone-call": "PhoneCall",
  "phone-incoming": "PhoneIncoming",
  "phone-missed": "PhoneMissed",
  "phone-off": "PhoneOff",
  "phone-outgoing": "PhoneOutgoing",
  "pie-chart": "PieChart",
  "pill": "Pill",
  "pizza": "Pizza",
  "plane": "Plane",
  "plane-landing": "PlaneLanding",
  "plane-takeoff": "PlaneTakeoff",
  "play": "Play",
  "plus": "Plus",
  "presentation": "Presentation",
  "printer": "Printer",
  "puzzle": "Puzzle",
  "qr-code": "QrCode",
  "radio": "Radio",
  "receipt": "Receipt",
  "refresh": "Refresh",
  "repeat": "Repeat",
  "rewind": "Rewind",
  "rocket": "Rocket",
  "router": "Router",
  "rows": "Rows",
  "rss": "Rss",
  "ruler": "Ruler",
  "sailboat": "Sailboat",
  "sandwich": "Sandwich",
  "save": "Save",
  "scan": "Scan",
  "scan-line": "ScanLine",
  "school": "School",
  "screwdriver": "Screwdriver",
  "sd-card": "SdCard",
  "search": "Search",
  "send": "Send",
  "send-2": "Send2",
  "server": "Server",
  "settings": "Settings",
  "share": "Share",
  "shield": "Shield",
  "shield-alert": "ShieldAlert",
  "shield-check": "ShieldCheck",
  "shield-off": "ShieldOff",
  "ship": "Ship",
  "shopping-bag": "ShoppingBag",
  "shopping-cart": "ShoppingCart",
  "shuffle": "Shuffle",
  "sidebar": "Sidebar",
  "signal": "Signal",
  "signal-high": "SignalHigh",
  "signal-low": "SignalLow",
  "signal-zero": "SignalZero",
  "skip-back": "SkipBack",
  "skip-forward": "SkipForward",
  "smartphone": "Smartphone",
  "smile": "Smile",
  "snowflake": "Snowflake",
  "speaker": "Speaker",
  "square": "Square",
  "star": "Star",
  "stethoscope": "Stethoscope",
  "store": "Store",
  "sun": "Sun",
  "sunrise": "Sunrise",
  "sunset": "Sunset",
  "sword": "Sword",
  "swords": "Swords",
  "syringe": "Syringe",
  "table": "Table",
  "table-2": "Table2",
  "tablet": "Tablet",
  "tag": "Tag",
  "tag2": "Tag2",
  "tags": "Tags",
  "target": "Target",
  "tent": "Tent",
  "terminal": "Terminal",
  "test-tube": "TestTube",
  "test-tubes": "TestTubes",
  "thermometer": "Thermometer",
  "thermometer-2": "Thermometer2",
  "thumbs-down": "ThumbsDown",
  "thumbs-up": "ThumbsUp",
  "traffic-cone": "TrafficCone",
  "train": "Train",
  "trash": "Trash",
  "tree": "Tree",
  "trending-down": "TrendingDown",
  "trending-up": "TrendingUp",
  "triangle": "Triangle",
  "trophy": "Trophy",
  "truck": "Truck",
  "tv": "Tv",
  "umbrella": "Umbrella",
  "unlock": "Unlock",
  "upload": "Upload",
  "usb-drive": "UsbDrive",
  "user": "User",
  "user-check": "UserCheck",
  "user-cog": "UserCog",
  "user-minus": "UserMinus",
  "user-plus": "UserPlus",
  "user-x": "UserX",
  "users": "Users",
  "utensils": "Utensils",
  "utensils-crossed": "UtensilsCrossed",
  "video": "Video",
  "video-2": "Video2",
  "video-off": "VideoOff",
  "voicemail": "Voicemail",
  "volume": "Volume",
  "volume-off": "VolumeOff",
  "wallet": "Wallet",
  "wand": "Wand",
  "wand-2": "Wand2",
  "warehouse": "Warehouse",
  "watch": "Watch",
  "waves": "Waves",
  "webcam": "Webcam",
  "wheelchair": "Wheelchair",
  "wifi": "Wifi",
  "wifi-off": "WifiOff",
  "wind": "Wind",
  "wine": "Wine",
  "wrench": "Wrench",
  "x": "X",
  "x-circle": "XCircle",
  "zap": "Zap"
};
function isIconName(name) {
  return ICON_NAMES.includes(name);
}
function isIconNameKebab(name) {
  return ICON_NAMES_KEBAB.includes(name);
}

// src/lib/animations.ts
var draw = {
  initial: { pathLength: 0 },
  hover: { pathLength: 1 },
  transition: {
    duration: 0.4,
    ease: "easeInOut"
  }
};
var rotate = {
  hover: { rotate: 180 },
  transition: {
    type: "spring",
    stiffness: 200
  }
};
var pulse = {
  hover: { scale: 1.2 },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};
var bounce = {
  hover: { y: -2 },
  transition: {
    type: "spring",
    stiffness: 500
  }
};
var translate = {
  hover: { x: 3 },
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 15
  }
};
var stagger = {
  initial: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 1 },
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};
var shake = {
  hover: {
    x: [0, -4, 4, -4, 4, 0]
  },
  transition: {
    duration: 0.4,
    ease: "easeInOut"
  }
};
var spin = {
  hover: { rotate: 360 },
  transition: {
    duration: 0.6,
    ease: "linear"
  }
};
var fade = {
  initial: { opacity: 0.6 },
  hover: { opacity: 1 },
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};
var pop = {
  hover: {
    scale: 1.15,
    rotate: 5
  },
  tap: {
    scale: 0.95
  },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 15
  }
};
var animations = {
  draw,
  rotate,
  pulse,
  bounce,
  translate,
  stagger,
  shake,
  spin,
  fade,
  pop
};

// src/lib/define-motion-preset.ts
function defineMotionPreset(name, options) {
  const variants = {
    initial: options.initial ?? {},
    hover: options.hover
  };
  if (options.tap) {
    variants.tap = options.tap;
  }
  const defaultTransition = {
    type: "spring",
    stiffness: 400,
    damping: 15
  };
  return {
    name,
    variants,
    transition: options.transition ?? defaultTransition
  };
}
function composeMotionPresets(presets) {
  const combinedInitial = {};
  const combinedHover = {};
  const combinedTap = {};
  let combinedTransition = {};
  for (const preset of presets) {
    const initial = preset.variants.initial;
    const hover = preset.variants.hover;
    const tap = preset.variants.tap;
    if (initial) {
      Object.assign(combinedInitial, initial);
    }
    if (hover) {
      Object.assign(combinedHover, hover);
    }
    if (tap) {
      Object.assign(combinedTap, tap);
    }
    if (preset.transition) {
      combinedTransition = { ...combinedTransition, ...preset.transition };
    }
  }
  const variants = {
    initial: combinedInitial,
    hover: combinedHover
  };
  if (Object.keys(combinedTap).length > 0) {
    variants.tap = combinedTap;
  }
  return {
    name: "composed",
    variants,
    transition: combinedTransition
  };
}
function extendMotionPreset(basePreset, overrides) {
  const baseInitial = basePreset.variants.initial;
  const baseHover = basePreset.variants.hover;
  const baseTap = basePreset.variants.tap;
  const variants = {
    initial: { ...baseInitial, ...overrides.initial },
    hover: { ...baseHover, ...overrides.hover }
  };
  if (baseTap || overrides.tap) {
    variants.tap = { ...baseTap, ...overrides.tap };
  }
  return {
    name: `${basePreset.name}-extended`,
    variants,
    transition: overrides.transition ?? basePreset.transition
  };
}
var customPresets = {
  /**
   * Wiggle animation - rotates back and forth
   */
  wiggle: defineMotionPreset("wiggle", {
    initial: { rotate: 0 },
    hover: { rotate: [0, -12, 12, -8, 8, -4, 4, 0] },
    transition: { duration: 0.6, ease: "easeInOut" }
  }),
  /**
   * Jello animation - elastic squish effect
   */
  jello: defineMotionPreset("jello", {
    initial: { scaleX: 1, scaleY: 1 },
    hover: {
      scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1]
    },
    transition: { duration: 0.6 }
  }),
  /**
   * Rubberband animation - stretchy bounce
   */
  rubberband: defineMotionPreset("rubberband", {
    initial: { scaleX: 1, scaleY: 1 },
    hover: {
      scaleX: [1, 1.2, 0.9, 1.1, 0.95, 1],
      scaleY: [1, 0.8, 1.1, 0.9, 1.05, 1]
    },
    transition: { duration: 0.5, ease: "easeOut" }
  }),
  /**
   * Heartbeat animation - pulsing effect
   */
  heartbeat: defineMotionPreset("heartbeat", {
    initial: { scale: 1 },
    hover: { scale: [1, 1.15, 1, 1.1, 1] },
    transition: { duration: 0.8, times: [0, 0.14, 0.28, 0.42, 1] }
  }),
  /**
   * Swing animation - pendulum effect
   */
  swing: defineMotionPreset("swing", {
    initial: { rotate: 0 },
    hover: { rotate: [0, 15, -10, 5, -5, 0] },
    transition: { duration: 0.6 }
  }),
  /**
   * Tada animation - attention-grabbing effect
   */
  tada: defineMotionPreset("tada", {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
      rotate: [0, -3, -3, 3, -3, 3, -3, 3, -3, 0]
    },
    transition: { duration: 0.8 }
  }),
  /**
   * Float animation - gentle up and down motion
   */
  float: defineMotionPreset("float", {
    initial: { y: 0 },
    hover: { y: [0, -8, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
  }),
  /**
   * Glow animation - scale with opacity pulse
   */
  glow: defineMotionPreset("glow", {
    initial: { scale: 1, opacity: 1 },
    hover: {
      scale: [1, 1.1, 1.05],
      opacity: [1, 0.8, 1]
    },
    transition: { duration: 0.3 }
  })
};
var LazyMotionSvg = lazy(async () => {
  const { motion: motion351 } = await import('motion/react');
  const MotionSvgWrapper = forwardRef((props, ref) => {
    return /* @__PURE__ */ React3.createElement(motion351.svg, { ref, ...props });
  });
  MotionSvgWrapper.displayName = "MotionSvgWrapper";
  return { default: MotionSvgWrapper };
});
var StaticSvg = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ React3.createElement("svg", { ref, ...props });
  }
);
StaticSvg.displayName = "StaticSvg";
function LazyMotionIcon({
  animated,
  size,
  strokeWidth,
  className,
  variants,
  transition,
  initial,
  whileHover,
  whileInView,
  animate,
  viewport,
  "aria-label": ariaLabel,
  children,
  viewBox = "0 0 24 24"
}) {
  const commonProps = {
    width: size,
    height: size,
    viewBox,
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    role: ariaLabel ? "img" : void 0,
    "aria-label": ariaLabel,
    "aria-hidden": ariaLabel ? void 0 : true
  };
  if (!animated) {
    return /* @__PURE__ */ React3.createElement(StaticSvg, { ...commonProps }, children);
  }
  return /* @__PURE__ */ React3.createElement(
    Suspense,
    {
      fallback: /* @__PURE__ */ React3.createElement(StaticSvg, { ...commonProps }, children)
    },
    /* @__PURE__ */ React3.createElement(
      LazyMotionSvg,
      {
        ...commonProps,
        variants,
        transition,
        initial,
        whileHover,
        whileInView,
        animate,
        viewport
      },
      children
    )
  );
}
var LazyMotionPath = lazy(async () => {
  const { motion: motion351 } = await import('motion/react');
  const MotionPathWrapper = forwardRef((props, ref) => {
    return /* @__PURE__ */ React3.createElement(motion351.path, { ref, ...props });
  });
  MotionPathWrapper.displayName = "MotionPathWrapper";
  return { default: MotionPathWrapper };
});
var StaticPath = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ React3.createElement("path", { ref, ...props });
  }
);
StaticPath.displayName = "StaticPath";
function LazyMotionPathElement({
  animated,
  d,
  pathLength = 1,
  variants,
  transition,
  initial,
  animate,
  className
}) {
  if (!animated) {
    return /* @__PURE__ */ React3.createElement(StaticPath, { d, pathLength, className });
  }
  return /* @__PURE__ */ React3.createElement(Suspense, { fallback: /* @__PURE__ */ React3.createElement(StaticPath, { d, pathLength, className }) }, /* @__PURE__ */ React3.createElement(
    LazyMotionPath,
    {
      d,
      pathLength,
      variants,
      transition,
      initial,
      animate,
      className
    }
  ));
}
function isMotionLoaded() {
  try {
    __require.resolve("motion/react");
    return true;
  } catch {
    return false;
  }
}
function preloadMotion() {
  import('motion/react').catch(() => {
  });
}
var Accessibility = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "16", cy: "4", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m18 19 1-7-6 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m5 8 3-3 5.5 3-2.36 3.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4.24 14.5a5 5 0 0 0 6.88 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M13.76 17.5a5 5 0 0 0-6.88-6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var AlertCircle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "8", x2: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "16", x2: "12.01", y2: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowLeft = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "19", y1: "12", x2: "5", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "12 19 5 12 12 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowRight = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "5", y1: "12", x2: "19", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "12 5 19 12 12 19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Award = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "8", r: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Baby = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 12h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 12h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Bell = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "shake",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M13.73 21a2 2 0 0 1-3.46 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Calendar = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", y1: "2", x2: "16", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "2", x2: "8", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "10", x2: "21", y2: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Check = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "draw",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "20 6 9 17 4 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CheckCircle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "22 4 12 14.01 9 11.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ChevronDown = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "6 9 12 15 18 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ChevronUp = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "18 15 12 9 6 15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Clock = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "12 6 12 12 16 14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Contact = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "4", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "10", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", x2: "8", y1: "2", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "16", y1: "2", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Contact2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 18a4 4 0 0 0-8 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "11", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "4", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", x2: "8", y1: "2", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "16", y1: "2", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Copy = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Crown = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Download = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 5v14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "19 12 12 19 5 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Edit = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Eye = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  const useCssDraw = isDraw && trigger === "hover";
  const useMotionDraw = isDraw && trigger !== "hover";
  const drawClass = useCssDraw ? "draw-animation" : "";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${drawClass}`.trim(),
      ...!isDraw ? animationProps : useCssDraw ? drawWrapperProps : {},
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(
      motion.path,
      {
        d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
        pathLength: 1,
        className: useCssDraw ? "draw-path" : "",
        ...useMotionDraw ? pathAnimationProps : {}
      }
    ),
    /* @__PURE__ */ React.createElement(
      motion.circle,
      {
        cx: "12",
        cy: "12",
        r: "3",
        pathLength: 1,
        className: useCssDraw ? "draw-path" : "",
        ...useMotionDraw ? pathAnimationProps : {}
      }
    )
  );
};
var EyeOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "1", y1: "1", x2: "23", y2: "23", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Frown = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 16s-1.5-2-4-2-4 2-4 2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", x2: "9.01", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", x2: "15.01", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Heart = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  const useCssDraw = isDraw && trigger === "hover";
  const useMotionDraw = isDraw && trigger !== "hover";
  const drawClass = useCssDraw ? "draw-animation" : "";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${drawClass}`.trim(),
      ...!isDraw ? animationProps : useCssDraw ? drawWrapperProps : {},
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(
      motion.path,
      {
        d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
        pathLength: 1,
        className: useCssDraw ? "draw-path" : "",
        ...useMotionDraw ? pathAnimationProps : {}
      }
    )
  );
};
var HelpCircle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "17", x2: "12.01", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Home = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "9 22 9 12 15 12 15 22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Inbox = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "22 12 16 12 14 15 10 15 8 12 2 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Info = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "16", x2: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "8", x2: "12.01", y2: "8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Loader = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Lock = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 11V7a5 5 0 0 1 10 0v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Mail = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "20", height: "16", x: "2", y: "4", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Meh = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", x2: "16", y1: "15", y2: "15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", x2: "9.01", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", x2: "15.01", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Menu = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", y1: "6", x2: "20", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", y1: "12", x2: "20", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", y1: "18", x2: "20", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var MessageCircle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Minus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "5", y1: "12", x2: "19", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Phone = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Plus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "5", x2: "12", y2: "19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "5", y1: "12", x2: "19", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Refresh = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Save = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "17 21 17 13 7 13 7 21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "7 3 7 8 15 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Search = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "11", cy: "11", r: "8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 21L16.65 16.65", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Send = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", y1: "2", x2: "11", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "22 2 15 22 11 13 2 9 22 2", ...isDraw ? pathAnimationProps : {} })
  );
};
var Settings = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Share = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18", cy: "5", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "6", cy: "12", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18", cy: "19", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Smile = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 14s1.5 2 4 2 4-2 4-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", x2: "9.01", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", x2: "15.01", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Star = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ThumbsDown = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 14V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ThumbsUp = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 10v12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Trash = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "3 6 5 6 21 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "10", y1: "11", x2: "10", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", y1: "11", x2: "14", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Upload = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 19V5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "5 12 12 5 19 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var User = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "8", r: "5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 21a8 8 0 0 0-16 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var UserCheck = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "9", cy: "7", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "16 11 18 13 22 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var UserCog = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18", cy: "15", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "9", cy: "7", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 15H6a4 4 0 0 0-4 4v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m21.7 16.4-.9-.3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m15.2 13.9-.9-.3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16.6 18.7.3-.9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19.1 12.2.3-.9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19.6 18.7-.4-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16.8 12.3-.4-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14.3 16.6 1-.4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m20.7 13.8 1-.4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var UserMinus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "9", cy: "7", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "16", y1: "11", y2: "11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var UserPlus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "9", cy: "7", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "19", x2: "19", y1: "8", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "16", y1: "11", y2: "11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var UserX = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "9", cy: "7", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "17", x2: "22", y1: "8", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "17", y1: "8", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Users = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "9", cy: "7", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 21v-2a4 4 0 0 0-3-3.87", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 3.13a4 4 0 0 1 0 7.75", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var X = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18", y1: "6", x2: "6", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", y1: "6", x2: "18", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var XCircle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", y1: "9", x2: "9", y2: "15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "9", x2: "15", y2: "15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Cloud = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var File = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14 2 14 8 20 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Filter = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", ...isDraw ? pathAnimationProps : {} })
  );
};
var Folder = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Grid = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "7", height: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "3", width: "7", height: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "14", width: "7", height: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "14", width: "7", height: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var List = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "6", x2: "21", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "12", x2: "21", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "18", x2: "21", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "6", x2: "3.01", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "12", x2: "3.01", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "18", x2: "3.01", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var MoreHorizontal = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "1", fill: "currentColor", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "19", cy: "12", r: "1", fill: "currentColor", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "5", cy: "12", r: "1", fill: "currentColor", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Bookmark = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Link = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var MapPin = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "10", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Moon = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Sun = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "1", x2: "12", y2: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "21", x2: "12", y2: "23", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "1", y1: "12", x2: "3", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "21", y1: "12", x2: "23", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Tag = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "7", y1: "7", x2: "7.01", y2: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Zap = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2", ...isDraw ? pathAnimationProps : {} })
  );
};
var Play = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "5 3 19 12 5 21 5 3", ...isDraw ? pathAnimationProps : {} })
  );
};
var Pause = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "6", y: "4", width: "4", height: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "4", width: "4", height: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Volume = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15.54 8.46a5 5 0 0 1 0 7.07", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19.07 4.93a10 10 0 0 1 0 14.14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var VolumeOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 9l-6 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 9l6 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Mic = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "9", y: "2", width: "6", height: "11", rx: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 10v2a7 7 0 0 1-14 0v-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "19", x2: "12", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "22", x2: "16", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var MicOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 9v3a3 3 0 0 0 5.12 2.12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 9.34V4a3 3 0 0 0-5.94-.6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 16.95A7 7 0 0 1 5 12v-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 10v2a7 7 0 0 1-.11 1.23", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "19", x2: "12", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "22", x2: "16", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "1", y1: "1", x2: "23", y2: "23", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Camera = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "13", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Airplay = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "12 15 17 21 7 21 12 15", ...isDraw ? pathAnimationProps : {} })
  );
};
var Cast = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", y1: "20", x2: "2.01", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FastForward = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "13 19 22 12 13 5 13 19", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "2 19 11 12 2 5 2 19", ...isDraw ? pathAnimationProps : {} })
  );
};
var Film = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "2", y: "2", width: "20", height: "20", rx: "2.18", ry: "2.18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "7", y1: "2", x2: "7", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "17", y1: "2", x2: "17", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", y1: "12", x2: "22", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", y1: "7", x2: "7", y2: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", y1: "17", x2: "7", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "17", y1: "17", x2: "22", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "17", y1: "7", x2: "22", y2: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Headphones = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 18v-6a9 9 0 0 1 18 0v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Music = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 18V5l12-2v13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "6", cy: "18", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18", cy: "16", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Radio = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Repeat = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "17 1 21 5 17 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 11V9a4 4 0 0 1 4-4h14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "7 23 3 19 7 15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 13v2a4 4 0 0 1-4 4H3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Rewind = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "11 19 2 12 11 5 11 19", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "22 19 13 12 22 5 22 19", ...isDraw ? pathAnimationProps : {} })
  );
};
var Shuffle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "16 3 21 3 21 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", y1: "20", x2: "21", y2: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "21 16 21 21 16 21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", y1: "15", x2: "21", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", y1: "4", x2: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var SkipBack = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "19 20 9 12 19 4 19 20", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "5", y1: "19", x2: "5", y2: "5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var SkipForward = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "5 4 15 12 5 20 5 4", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "19", y1: "5", x2: "19", y2: "19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Speaker = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "4", y: "2", width: "16", height: "20", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "14", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "6", x2: "12.01", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Tv = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "2", y: "7", width: "20", height: "15", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "17 2 12 7 7 2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Video = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "23 7 16 12 23 17 23 7", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Code = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "16 18 22 12 16 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "8 6 2 12 8 18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Code2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m18 16 4-4-4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m6 8-4 4 4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14.5 4-5 16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Terminal = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "4 17 10 11 4 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "19", x2: "20", y2: "19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Command = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Database = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.ellipse, { cx: "12", cy: "5", rx: "9", ry: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 5v14a9 3 0 0 0 18 0V5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 12a9 3 0 0 0 18 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Server = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", y1: "6", x2: "6.01", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", y1: "18", x2: "6.01", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var HardDrive = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", y1: "12", x2: "2", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", y1: "16", x2: "6.01", y2: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "10", y1: "16", x2: "10.01", y2: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Cpu = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "4", y: "4", width: "16", height: "16", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "9", y: "9", width: "6", height: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 1v3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 1v3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 20v3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 20v3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 9h3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 14h3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M1 9h3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M1 14h3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wrench = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Hammer = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.64 15 22 10.64", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Screwdriver = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m13 17-4.5 4.5a2.12 2.12 0 1 1-3-3L10 14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m10.5 10.5 3 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 6l-3-3-4.5 4.5 3 3L21 6z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 9.5 18 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Palette = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "13.5", cy: "6.5", r: "0.5", fill: "currentColor", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "17.5", cy: "10.5", r: "0.5", fill: "currentColor", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "8.5", cy: "7.5", r: "0.5", fill: "currentColor", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "6.5", cy: "12.5", r: "0.5", fill: "currentColor", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Brush = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Pen = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Pencil = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m15 5 4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CloudRain = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 14v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 14v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 16v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CloudSnow = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 15h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 19h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 17h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 21h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 15h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 19h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CloudLightning = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m13 12-3 5h4l-3 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CloudDrizzle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 19v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 14v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 19v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 14v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 21v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 16v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CloudSun = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m4.93 4.93 1.41 1.41", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 12h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19.07 4.93-1.41 1.41", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Sunrise = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2v8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m4.93 10.93 1.41 1.41", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 18h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 18h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19.07 10.93-1.41 1.41", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 22H2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m8 6 4-4 4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 18a4 4 0 0 0-8 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Sunset = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 10V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m4.93 10.93 1.41 1.41", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 18h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 18h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19.07 10.93-1.41 1.41", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 22H2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16 6-4 4-4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 18a4 4 0 0 0-8 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wind = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9.6 4.6A2 2 0 1 1 11 8H2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12.6 19.4A2 2 0 1 0 14 16H2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Thermometer = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Droplet = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Umbrella = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 12a10.06 10.06 0 0 0-20 0Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 12v8a2 2 0 0 0 4 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2v1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Snowflake = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", x2: "22", y1: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12", y1: "2", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m20 16-4-4 4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m4 8 4 4-4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16 4-4 4-4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m8 20 4-4 4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Flame = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Leaf = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Tree = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 22v-7l-2-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14 14 2-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowUp = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "19", x2: "12", y2: "5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "5 12 12 5 19 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowDown = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "5", x2: "12", y2: "19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "19 12 12 19 5 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowUpRight = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "7", y1: "17", x2: "17", y2: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "7 7 17 7 17 17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowUpLeft = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "17", y1: "17", x2: "7", y2: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "17 7 7 7 7 17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowDownRight = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "7", y1: "7", x2: "17", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "17 7 17 17 7 17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ArrowDownLeft = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "17", y1: "7", x2: "7", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "7 7 7 17 17 17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ChevronsUp = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "17 11 12 6 7 11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "17 18 12 13 7 18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ChevronsDown = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "7 13 12 18 17 13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "7 6 12 11 17 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ChevronsLeft = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "11 17 6 12 11 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "18 17 13 12 18 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ChevronsRight = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "13 17 18 12 13 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "6 17 11 12 6 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CornerUpLeft = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "9 14 4 9 9 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 20v-7a4 4 0 0 0-4-4H4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CornerUpRight = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "15 14 20 9 15 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 20v-7a4 4 0 0 1 4-4h12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CornerDownLeft = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "9 10 4 15 9 20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 4v7a4 4 0 0 1-4 4H4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CornerDownRight = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "15 10 20 15 15 20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 4v7a4 4 0 0 0 4 4h12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var MoveHorizontal = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "18 8 22 12 18 16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "6 8 2 12 6 16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", y1: "12", x2: "22", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Layout = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "9", x2: "21", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "21", x2: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var LayoutGrid = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "7", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "3", width: "7", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "14", width: "7", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "14", width: "7", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var LayoutList = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "7", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", y1: "4", x2: "21", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", y1: "9", x2: "21", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "14", width: "7", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", y1: "15", x2: "21", y2: "15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", y1: "20", x2: "21", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Sidebar = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "3", x2: "9", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PanelLeft = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "3", x2: "9", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PanelRight = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", y1: "3", x2: "15", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Maximize = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 3H5a2 2 0 0 0-2 2v3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 8V5a2 2 0 0 0-2-2h-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 16v3a2 2 0 0 0 2 2h3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 21h3a2 2 0 0 0 2-2v-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Minimize = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 14h6v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 10h-6V4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 10l7-7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 21l7-7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Maximize2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "15 3 21 3 21 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "9 21 3 21 3 15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "21", y1: "3", x2: "14", y2: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "21", x2: "10", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Minimize2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "4 14 10 14 10 20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "20 10 14 10 14 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", y1: "10", x2: "21", y2: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "21", x2: "10", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Columns = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "7", height: "18", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "3", width: "7", height: "18", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Rows = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "18", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "14", width: "18", height: "7", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Square = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Circle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Triangle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var AtSign = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Hash = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", x2: "20", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", x2: "20", y1: "15", y2: "15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "10", x2: "8", y1: "3", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "14", y1: "3", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var MessageSquare = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Send2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m3 3 3 9-3 9 19-9Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 12h16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PhoneCall = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.05 2a9 9 0 0 1 8 7.94", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.05 6A5 5 0 0 1 18 10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PhoneOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "2", y1: "2", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PhoneIncoming = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "16 2 16 8 22 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "16", y1: "2", y2: "8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PhoneOutgoing = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "22 8 22 2 16 2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "22", y1: "8", y2: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PhoneMissed = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "16", y1: "2", y2: "8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "22", y1: "2", y2: "8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Voicemail = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "6", cy: "12", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18", cy: "12", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "18", y1: "16", y2: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Video2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "2", y: "6", width: "14", height: "12", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var VideoOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "2", y1: "2", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Rss = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 11a9 9 0 0 1 9 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 4a16 16 0 0 1 16 16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "5", cy: "19", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wifi = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 20h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 8.82a15 15 0 0 1 20 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 12.859a10 10 0 0 1 14 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8.5 16.429a5 5 0 0 1 7 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var WifiOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 20h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8.5 16.429a5 5 0 0 1 7 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 12.859a10 10 0 0 1 5.17-2.69", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 12.859a10 10 0 0 0-2.007-1.523", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 8.82a15 15 0 0 1 4.177-2.643", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 8.82a15 15 0 0 0-11.288-3.764", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", x2: "22", y1: "2", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Unlock = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 11V7a5 5 0 0 1 9.9-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Shield = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ShieldCheck = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m9 12 2 2 4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ShieldOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4.73 4.73 4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "1", y1: "1", x2: "23", y2: "23", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Key = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Fingerprint = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8.65 22c.21-.66.45-1.32.57-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 13.12c0 2.38 0 6.38-1 8.88", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.8 16c.2-2 .131-5.354 0-6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Scan = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 7V5a2 2 0 0 1 2-2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 3h2a2 2 0 0 1 2 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 17v2a2 2 0 0 1-2 2h-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 21H5a2 2 0 0 1-2-2v-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ScanLine = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 7V5a2 2 0 0 1 2-2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 3h2a2 2 0 0 1 2 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 17v2a2 2 0 0 1-2 2h-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 21H5a2 2 0 0 1-2-2v-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "7", y1: "12", x2: "17", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var AlertTriangle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "9", x2: "12", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "17", x2: "12.01", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var AlertOctagon = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "8", x2: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "16", x2: "12.01", y2: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Ban = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4.93", y1: "4.93", x2: "19.07", y2: "19.07", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ShieldAlert = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "8", x2: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "16", x2: "12.01", y2: "16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var LockOpen = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 11V7a5 5 0 0 1 10 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var KeyRound = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "16.5", cy: "7.5", r: ".5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var BadgeCheck = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m9 12 2 2 4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ShoppingCart = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "9", cy: "21", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "20", cy: "21", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ShoppingBag = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", y1: "6", x2: "21", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 10a4 4 0 0 1-8 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CreditCard = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "1", y1: "10", x2: "23", y2: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var DollarSign = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "1", x2: "12", y2: "23", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Percent = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "19", y1: "5", x2: "5", y2: "19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "6.5", cy: "6.5", r: "2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "17.5", cy: "17.5", r: "2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Receipt = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "6", x2: "16", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "10", x2: "16", y2: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", y1: "14", x2: "12", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wallet = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 12V7H5a2 2 0 0 1 0-4h14v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 5v14a2 2 0 0 0 2 2h16v-5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 12a2 2 0 0 0 0 4h4v-4h-4z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Gift = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "20 12 20 22 4 22 4 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "2", y: "7", width: "20", height: "5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "22", x2: "12", y2: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Package = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16.5", y1: "9.4", x2: "7.5", y2: "4.21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "3.27 6.96 12 12.01 20.73 6.96", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "22.08", x2: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Truck = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "1", y: "3", width: "15", height: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "16 8 20 8 23 11 23 16 16 16 16 8", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "5.5", cy: "18.5", r: "2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18.5", cy: "18.5", r: "2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Store = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 22V12h6v10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Barcode = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", y1: "4", x2: "2", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", y1: "4", x2: "6", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "4", x2: "9", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "13", y1: "4", x2: "13", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "17", y1: "4", x2: "17", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", y1: "4", x2: "22", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var QrCode = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "3", width: "7", height: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "3", width: "7", height: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "3", y: "14", width: "7", height: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { x: "14", y: "14", width: "3", height: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "21", y1: "14", x2: "21", y2: "14.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", y1: "21", x2: "14", y2: "21.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "21", y1: "21", x2: "21", y2: "21.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18", y1: "18", x2: "18", y2: "18.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Tag2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2l9 4.9V17L12 22l-9-4.9V7z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "10", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Tags = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 9.01V9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 5h2v7l-4.29 4.29", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 5h2v7l-6.29 6.29c-.3.3-.64.52-1 .67", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FileText = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14 2 14 8 20 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", y1: "13", x2: "8", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", y1: "17", x2: "8", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "10", y1: "9", x2: "8", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FilePlus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14 2 14 8 20 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "18", x2: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "15", x2: "15", y2: "15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FileMinus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14 2 14 8 20 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "15", x2: "15", y2: "15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FileCheck = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14 2 14 8 20 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "9 15 11 17 15 13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FileX = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14 2 14 8 20 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9.5", y1: "12.5", x2: "14.5", y2: "17.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14.5", y1: "12.5", x2: "9.5", y2: "17.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Files = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 2v5h5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FolderPlus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", y1: "11", x2: "12", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "14", x2: "15", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FolderMinus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", y1: "14", x2: "15", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var FolderOpen = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 14l1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Archive = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "2", y: "3", width: "20", height: "5", rx: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 12h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Clipboard = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ClipboardCheck = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "9 14 11 16 15 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ClipboardList = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 11h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 16h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 11h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ClipboardCopy = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 4h2a2 2 0 0 1 2 2v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 14H11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 10l-4 4 4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Paperclip = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Activity = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 12h-4l-3 9L9 3l-3 9H2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var AreaChart = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 3v18h18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 12v5h12V8l-5 5-4-4Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var BarChart = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12", y1: "20", y2: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18", x2: "18", y1: "20", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "6", y1: "20", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var BarChart2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18", x2: "18", y1: "20", y2: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12", y1: "20", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "6", y1: "20", y2: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Gauge = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m12 14 4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3.34 19a10 10 0 1 1 17.32 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Kanban = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 5v11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 5v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 5v14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var LineChart = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 3v18h18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19 9-5 5-4-4-3 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PieChart = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.21 15.89A10 10 0 1 1 8 2.83", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 12A10 10 0 0 0 12 2v10z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Presentation = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 3h20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m7 21 5-5 5 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Signal = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 20h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 20v-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 20v-8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 20V8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 4v16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var SignalHigh = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 20h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 20v-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 20v-8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 20V8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var SignalLow = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 20h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 20v-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var SignalZero = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 20h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Table = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 3v18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 9h18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 15h18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Table2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var TrendingDown = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "22 17 13.5 8.5 8.5 13.5 2 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "16 17 22 17 22 11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var TrendingUp = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "22 7 13.5 15.5 8.5 10.5 2 17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "16 7 22 7 22 13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Laptop = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Monitor = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "20", height: "14", x: "2", y: "3", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", x2: "16", y1: "21", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12", y1: "17", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Tablet = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12.01", y1: "18", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Watch = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "12 10 12 12 13 13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Printer = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "6 9 6 2 18 2 18 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "12", height: "8", x: "6", y: "14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Mouse = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "5", y: "2", width: "14", height: "20", rx: "7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 6v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Keyboard = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "20", height: "16", x: "2", y: "4", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 8h.001", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 8h.001", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 8h.001", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 8h.001", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 12h.001", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 12h.001", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 12h.001", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 16h10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Smartphone = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 18h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Gamepad2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "10", y1: "11", y2: "11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", x2: "8", y1: "9", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", x2: "15.01", y1: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18", x2: "18.01", y1: "10", y2: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Webcam = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "10", r: "8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "10", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 22h10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 22v-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Router = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "20", height: "8", x: "2", y: "14", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6.01 18H6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10.01 18H10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 10v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.84 7.17a4 4 0 0 0-5.66 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20.66 4.34a8 8 0 0 0-11.31 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var UsbDrive = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "10", cy: "7", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "14", cy: "7", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 3h8l2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5l2-2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 11v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var SdCard = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.5 2H9a1 1 0 0 0-.74.32L4.32 7.14A1 1 0 0 0 4 7.86V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4.5A2.5 2.5 0 0 0 17.5 2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 6V4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 6V4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Battery = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "22", y1: "11", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var BatteryCharging = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m11 7-3 5h4l-3 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "22", y1: "11", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var BatteryLow = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "22", y1: "11", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "6", y1: "11", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Bluetooth = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m7 7 10 10-5 5V2l5 5L7 17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var HeartPulse = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 5.006a5 5 0 1 1 7.5 7.566", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4.5 12h2l1 -2l2 4l2 -4l1 2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Stethoscope = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "20", cy: "10", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Pill = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m8.5 8.5 7 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Syringe = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m18 2 4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m17 7 3-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m9 11 4 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m5 19-3 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14 4 6 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Bandage = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18.8 5.2a4.24 4.24 0 0 0-6 0L5.2 12.8a4.24 4.24 0 0 0 6 6l7.6-7.6a4.24 4.24 0 0 0 0-6Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m9.8 14.2 4.4-4.4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "11", cy: "11", r: ".5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "13", cy: "13", r: ".5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "13", cy: "11", r: ".5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "11", cy: "13", r: ".5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Thermometer2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 11v5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "16", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Microscope = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 18h8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 22h18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 22a7 7 0 1 0 0-14h-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 14h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var TestTube = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8.5 2h7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14.5 16h-5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var TestTubes = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 2h7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 2h7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 16H4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 16h-5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dna = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 15c6.667-6 13.333 0 20-6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m17 6-2.5-2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14 8-1-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m7 18 2.5 2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m3.5 14.5.5.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m20 9 .5.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m6.5 12.5 1 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16.5 10.5 1 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m10 16 1.5 1.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Bone = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Brain = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3.477 10.896a4 4 0 0 1 .585-.396", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19.938 10.5a4 4 0 0 1 .585.396", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 18a4 4 0 0 1-1.967-.516", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19.967 17.484A4 4 0 0 1 18 18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Ear = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Eye2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Hand = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Footprints = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 17h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 13h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wheelchair = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "8", cy: "18", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 14V7c0-.6.4-1 1-1h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 9l2 4h-9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "8", cy: "4", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var GraduationCap = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 10v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Book = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var BookOpen = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 7v14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var BookMarked = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 2v8l3-3 3 3V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Library = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16 6 4 14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 6v14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 8v12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 4v16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Notebook = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 6h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 10h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 14h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 18h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "16", height: "20", x: "4", y: "2", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 2v20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var NotebookPen = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 6h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 10h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 14h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 18h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L10.586 9.407a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Ruler = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14.5 12.5 2-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m11.5 9.5 2-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m8.5 6.5 2-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m17.5 15.5 2-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PenTool = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m2.3 2.3 7.286 7.286", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "11", cy: "11", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Highlighter = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m9 11-6 6v3h9l3-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Eraser = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 21H7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m5 11 9 9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Calculator = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "16", height: "20", x: "4", y: "2", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "8", x2: "16", y1: "6", y2: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "16", y1: "14", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 10h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 10h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 10h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 14h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 14h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 18h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 18h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Backpack = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 18h8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 22v-6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 22v-6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Lightbulb = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 18h6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 22h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var LightbulbOff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m2 2 20 20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 18h6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 22h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Lamp = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 2h8l4 10H4L8 2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 12v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var LampDesk = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14 5-3 3 2 7 8-8-7-2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14 5-3 3-3-3 3-3 3 3Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9.5 6.5 4 12l3 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Glasses = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "6", cy: "15", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18", cy: "15", r: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 15a2 2 0 0 0-4 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Building = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 22v-4h6v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 6h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 6h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 6h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 10h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 14h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 10h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 14h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 10h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 14h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Building2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 6h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 10h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 14h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 18h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Factory = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 18h1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 18h1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 18h1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Landmark = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", x2: "21", y1: "22", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "6", y1: "18", y2: "11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "10", x2: "10", y1: "18", y2: "11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", x2: "14", y1: "18", y2: "11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "18", x2: "18", y1: "18", y2: "11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "12 2 20 7 4 7", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", x2: "21", y1: "18", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Castle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 11V4H6v7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 22v-4a3 3 0 0 0-6 0v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 11V9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 11V9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 4V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 4V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 4V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 4V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Church = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 22V5l-6-3-6 3v17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 7v5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 9h4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Hospital = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 6v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 14h-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 18h-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 8h-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var School = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 22v-4a2 2 0 1 0-4 0v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m18 10 4 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V12l4-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 5v17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m4 6 8-4 8 4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 5v17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "9", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Warehouse = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 18h12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 14h12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "12", height: "12", x: "6", y: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Tent = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3.5 21 14 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20.5 21 10 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15.5 21 12 15l-3.5 6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 21h20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Mountain = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m8 3 4 8 5-5 5 15H2L8 3z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var MountainSnow = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m8 3 4 8 5-5 5 15H2L8 3z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Waves = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Anchor = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "5", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12", y1: "22", y2: "8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 12H2a10 10 0 0 0 20 0h-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Compass = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76", ...isDraw ? pathAnimationProps : {} })
  );
};
var Map = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21", ...isDraw ? pathAnimationProps : {} }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "9", x2: "9", y1: "3", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "15", x2: "15", y1: "6", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Globe = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "2", x2: "22", y1: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Trophy = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 22h16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Medal = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M11 12 5.12 2.2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m13 12 5.88-9.8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 7h8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "17", r: "5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 18v-2h-.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Target = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Crosshair = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "12", r: "10", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "22", x2: "18", y1: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "2", y1: "12", y2: "12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12", y1: "6", y2: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "12", x2: "12", y1: "22", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dice1 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 12h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dice2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 9h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 15h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dice3 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 8h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 12h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dice4 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 8h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 8h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dice5 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 8h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 8h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 12h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dice6 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 8h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 12h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 8h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 12h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Puzzle = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Joystick = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 15v-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 15V9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12", cy: "6", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Swords = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "13", x2: "19", y1: "19", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "20", y1: "16", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "19", x2: "21", y1: "21", y2: "19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "5", x2: "9", y1: "14", y2: "18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "7", x2: "4", y1: "17", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", x2: "5", y1: "19", y2: "21", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Sword = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polyline, { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "13", x2: "19", y1: "19", y2: "13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "16", x2: "20", y1: "16", y2: "20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "19", x2: "21", y1: "21", y2: "19", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wand = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 4V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 16v-2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 9h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M20 9h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.8 11.8 19 13", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 9h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.8 6.2 19 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m3 21 9-9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12.2 6.2 11 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wand2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14 7 3 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 6v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 14v4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 2v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 8H3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 16h-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M11 3H9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Dumbbell = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m6.5 6.5 11 11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m21 21-1-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m3 3 1 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m18 22 4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m2 6 4-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m3 10 7-7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m14 21 7-7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Coffee = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 8h1a4 4 0 1 1 0 8h-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "6", y1: "2", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "10", x2: "10", y1: "2", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "14", x2: "14", y1: "2", y2: "4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Cup = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 8h1a4 4 0 0 1 0 8h-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Wine = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 22h8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 17v5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 3h14c0 0 0 4-2 8s-5 6-5 6-3-2-5-6-2-8-2-8z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 8h14", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Beer = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 11h1a3 3 0 0 1 0 6h-1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 12v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M13 12v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2.5 11 2.5s2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Martini = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 22h8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 17v5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19 3-7 8-7-8Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "5", x2: "19", y1: "3", y2: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "10", cy: "7", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Pizza = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 11h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M11 15h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 16h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m2 16 20 6-6-20A20 20 0 0 0 2 16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Apple = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 2c1 .5 2 2 2 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Cherry = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Grape = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 5V2l-5.89 5.89", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "16.6", cy: "15.89", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "8.11", cy: "7.4", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "12.35", cy: "11.65", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "13.91", cy: "5.85", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18.15", cy: "10.09", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "6.56", cy: "13.2", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "10.8", cy: "17.44", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "5", cy: "19", r: "3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Banana = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Carrot = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Sandwich = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10.66 19c.53.5 1.19.89 1.93 1.11a4 4 0 0 0 3.24-.43l2.5-1.68", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Utensils = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 2v20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var UtensilsCrossed = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m2.1 21.8 6.4-6.3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m19 5-7 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var ChefHat = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "6", x2: "18", y1: "17", y2: "17", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Cookie = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8.5 8.5v.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 15.5v.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 12v.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M11 17v.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 14v.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var IceCream = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 7A5 5 0 0 0 7 7", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Car = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "7", cy: "17", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 17h6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "17", cy: "17", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var CarFront = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 8l-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7 14h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17 14h.01", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "8", x: "3", y: "10", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M5 18v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 18v2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Bus = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 6v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M15 6v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 12h19.6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "7", cy: "18", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 18h5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "16", cy: "18", r: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Train = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { x: "4", y: "3", width: "16", height: "16", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4 11h16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 3v8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 19l-2 3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 22l-2-3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M8 15h0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M16 15h0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Plane = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PlaneTakeoff = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 22h20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.9a2 2 0 0 1-1.22.1z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var PlaneLanding = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 22h20", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Ship = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 10V4.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 4.5a2.5 2.5 0 0 0 0-5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Sailboat = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M21 14 10 2 3 14h18Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M10 2v16", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Bike = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "18.5", cy: "17.5", r: "3.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "5.5", cy: "17.5", r: "3.5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.circle, { cx: "15", cy: "5", r: "1", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 17.5V14l-3-3 4-3 2 3h2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Rocket = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Fuel = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.line, { x1: "3", x2: "15", y1: "22", y2: "22", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.line, { x1: "4", x2: "14", y1: "9", y2: "9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Parking = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.rect, { width: "18", height: "18", x: "3", y: "3", rx: "2", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9 17V7h4a3 3 0 0 1 0 6H9", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var TrafficCone = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M9.3 6.2a4.55 4.55 0 0 0 5.4 0", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7.9 10.7c.9.8 2.4 1.3 4.1 1.3s3.2-.5 4.1-1.3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M13.9 3.5a1.93 1.93 0 0 0-3.8-.1l-3 10c-.1.2-.1.4-.1.6 0 1.7 2.2 3 5 3s5-1.3 5-3c0-.2 0-.4-.1-.5z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M7.5 12.2 5 22H2l2.5-9.8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "m16.5 12.2 2.5 9.8h3L19.5 12", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};
var Navigation = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "3 11 22 2 13 21 11 13 3 11", ...isDraw ? pathAnimationProps : {} })
  );
};
var Navigation2 = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.polygon, { points: "12 2 19 21 12 17 5 21 12 2", ...isDraw ? pathAnimationProps : {} })
  );
};
var Milestone = ({
  size = 24,
  strokeWidth = 2,
  className,
  animated,
  motionType = "scale",
  trigger = "hover",
  "aria-label": ariaLabel
}) => {
  const { animationProps, pathAnimationProps, drawWrapperProps } = useIconAnimation(animated, motionType, trigger);
  const isDraw = motionType === "draw";
  return /* @__PURE__ */ React.createElement(
    motion.svg,
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `${className || ""} ${isDraw ? "draw-animation" : ""}`.trim(),
      ...!isDraw ? animationProps : drawWrapperProps,
      role: ariaLabel ? "img" : void 0,
      "aria-label": ariaLabel,
      "aria-hidden": ariaLabel ? void 0 : true
    },
    /* @__PURE__ */ React.createElement(motion.path, { d: "M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 13v8", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" }),
    /* @__PURE__ */ React.createElement(motion.path, { d: "M12 3v3", ...isDraw ? pathAnimationProps : {}, pathLength: 1, className: isDraw ? "draw-path" : "" })
  );
};

export { Accessibility, Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, Anchor, Apple, Archive, AreaChart, ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, AtSign, Award, Baby, Backpack, BadgeCheck, Ban, Banana, Bandage, BarChart, BarChart2, Barcode, Battery, BatteryCharging, BatteryLow, Beer, Bell, Bike, Bluetooth, Bone, Book, BookMarked, BookOpen, Bookmark, Brain, Brush, Building, Building2, Bus, Calculator, Calendar, Camera, Car, CarFront, Carrot, Cast, Castle, Check, CheckCircle, ChefHat, Cherry, ChevronDown, ChevronUp, ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp, Church, Circle, Clipboard, ClipboardCheck, ClipboardCopy, ClipboardList, Clock, Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, CloudSun, Code, Code2, Coffee, Columns, Command, Compass, Contact, Contact2, Cookie, Copy, CornerDownLeft, CornerDownRight, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crosshair, Crown, Cup, Database, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Dna, DollarSign, Download, Droplet, Dumbbell, Ear, Edit, Eraser, Eye, Eye2, EyeOff, Factory, FastForward, File, FileCheck, FileMinus, FilePlus, FileText, FileX, Files, Film, Filter, Fingerprint, Flame, Folder, FolderMinus, FolderOpen, FolderPlus, Footprints, Frown, Fuel, Gamepad2, Gauge, Gift, Glasses, Globe, GraduationCap, Grape, Grid, Hammer, Hand, HardDrive, Hash, Headphones, Heart, HeartPulse, HelpCircle, Highlighter, Home, Hospital, ICON_COUNT, ICON_NAMES, ICON_NAMES_KEBAB, ICON_NAME_MAP, IceCream, IconProvider, Inbox, Info, Joystick, Kanban, Key, KeyRound, Keyboard, Lamp, LampDesk, Landmark, Laptop, Layout, LayoutGrid, LayoutList, LazyMotionIcon, LazyMotionPathElement, Leaf, Library, Lightbulb, LightbulbOff, LineChart, Link, List, Loader, Lock, LockOpen, Mail, Map, MapPin, Martini, Maximize, Maximize2, Medal, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Microscope, Milestone, Minimize, Minimize2, Minus, Monitor, Moon, MoreHorizontal, Mountain, MountainSnow, Mouse, MoveHorizontal, Music, Navigation, Navigation2, Notebook, NotebookPen, Package, Palette, PanelLeft, PanelRight, Paperclip, Parking, Pause, Pen, PenTool, Pencil, Percent, Phone, PhoneCall, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, PieChart, Pill, Pizza, Plane, PlaneLanding, PlaneTakeoff, Play, Plus, Presentation, Printer, Puzzle, QrCode, Radio, Receipt, Refresh, Repeat, Rewind, Rocket, Router, Rows, Rss, Ruler, Sailboat, Sandwich, Save, Scan, ScanLine, School, Screwdriver, SdCard, Search, Send, Send2, Server, Settings, Share, Shield, ShieldAlert, ShieldCheck, ShieldOff, Ship, ShoppingBag, ShoppingCart, Shuffle, Sidebar, Signal, SignalHigh, SignalLow, SignalZero, SkipBack, SkipForward, Smartphone, Smile, Snowflake, Speaker, Square, Star, Stethoscope, Store, Sun, Sunrise, Sunset, Sword, Swords, Syringe, Table, Table2, Tablet, Tag, Tag2, Tags, Target, Tent, Terminal, TestTube, TestTubes, Thermometer, Thermometer2, ThumbsDown, ThumbsUp, TrafficCone, Train, Trash, Tree, TrendingDown, TrendingUp, Triangle, Trophy, Truck, Tv, Umbrella, Unlock, Upload, UsbDrive, User, UserCheck, UserCog, UserMinus, UserPlus, UserX, Users, Utensils, UtensilsCrossed, Video, Video2, VideoOff, Voicemail, Volume, VolumeOff, Wallet, Wand, Wand2, Warehouse, Watch, Waves, Webcam, Wheelchair, Wifi, WifiOff, Wind, Wine, Wrench, X, XCircle, Zap, animations, bounce, cn, composeMotionPresets, customPresets, defineMotionPreset, draw, easeSmooth, extendMotionPreset, fade, getMotionPreset, isDefined, isIconName, isIconNameKebab, isMotionLoaded, mergeConfig, motionPresets, motionTypeList, pop, preloadMotion, pulse, rotate, shake, spin, stagger, translate, useIconAnimation, useIconConfig, useIconContext, withDefault };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map