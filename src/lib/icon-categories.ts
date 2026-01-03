/**
 * Icon category metadata for filtering and organization
 */

export type IconCategory =
  | 'arrows'
  | 'media'
  | 'communication'
  | 'ui'
  | 'files'
  | 'users'
  | 'devices'
  | 'weather'
  | 'tools'
  | 'charts'
  | 'security'
  | 'shopping'
  | 'health'
  | 'education'
  | 'buildings'
  | 'sports'
  | 'food'
  | 'transportation'
  | 'nature'
  | 'social'

export interface IconCategoryInfo {
  id: IconCategory
  label: string
  description: string
}

export const categoryList: IconCategoryInfo[] = [
  { id: 'arrows', label: 'Arrows', description: 'Navigation and directional arrows' },
  { id: 'media', label: 'Media', description: 'Audio, video, and playback controls' },
  { id: 'communication', label: 'Communication', description: 'Messaging, email, and social' },
  { id: 'ui', label: 'UI', description: 'Interface elements and layout' },
  { id: 'files', label: 'Files', description: 'Documents, folders, and storage' },
  { id: 'users', label: 'Users', description: 'People and accounts' },
  { id: 'devices', label: 'Devices', description: 'Hardware and electronics' },
  { id: 'weather', label: 'Weather', description: 'Weather and nature conditions' },
  { id: 'tools', label: 'Tools', description: 'Development and utilities' },
  { id: 'charts', label: 'Charts', description: 'Data visualization and analytics' },
  { id: 'security', label: 'Security', description: 'Locks, shields, and privacy' },
  { id: 'shopping', label: 'Shopping', description: 'Commerce and payments' },
  { id: 'health', label: 'Health', description: 'Medical and wellness' },
  { id: 'education', label: 'Education', description: 'Learning and books' },
  { id: 'buildings', label: 'Buildings', description: 'Places and architecture' },
  { id: 'sports', label: 'Sports', description: 'Games and activities' },
  { id: 'food', label: 'Food', description: 'Food and beverages' },
  { id: 'transportation', label: 'Transportation', description: 'Vehicles and travel' },
  { id: 'nature', label: 'Nature', description: 'Plants and environment' },
  { id: 'social', label: 'Social', description: 'Social interactions and emotions' },
]

/**
 * Icon to category mapping
 */
export const iconCategories: Record<string, IconCategory[]> = {
  // Arrows & Navigation
  ArrowLeft: ['arrows', 'ui'],
  ArrowRight: ['arrows', 'ui'],
  ArrowUp: ['arrows', 'ui'],
  ArrowDown: ['arrows', 'ui'],
  ArrowUpRight: ['arrows'],
  ArrowUpLeft: ['arrows'],
  ArrowDownRight: ['arrows'],
  ArrowDownLeft: ['arrows'],
  ChevronDown: ['arrows', 'ui'],
  ChevronUp: ['arrows', 'ui'],
  ChevronsUp: ['arrows'],
  ChevronsDown: ['arrows'],
  ChevronsLeft: ['arrows'],
  ChevronsRight: ['arrows'],
  CornerUpLeft: ['arrows'],
  CornerUpRight: ['arrows'],
  CornerDownLeft: ['arrows'],
  CornerDownRight: ['arrows'],
  MoveHorizontal: ['arrows', 'ui'],

  // Media & Entertainment
  Play: ['media'],
  Pause: ['media'],
  Volume: ['media'],
  VolumeOff: ['media'],
  Mic: ['media', 'communication'],
  MicOff: ['media', 'communication'],
  Camera: ['media', 'devices'],
  Airplay: ['media', 'devices'],
  Cast: ['media', 'devices'],
  FastForward: ['media'],
  Film: ['media'],
  Headphones: ['media', 'devices'],
  Music: ['media'],
  Radio: ['media', 'devices'],
  Repeat: ['media'],
  Rewind: ['media'],
  Shuffle: ['media'],
  SkipBack: ['media'],
  SkipForward: ['media'],
  Speaker: ['media', 'devices'],
  Tv: ['media', 'devices'],
  Video: ['media'],
  Video2: ['media'],
  VideoOff: ['media'],

  // Communication
  Mail: ['communication'],
  MessageCircle: ['communication', 'social'],
  MessageSquare: ['communication', 'social'],
  Phone: ['communication'],
  PhoneCall: ['communication'],
  PhoneOff: ['communication'],
  PhoneIncoming: ['communication'],
  PhoneOutgoing: ['communication'],
  PhoneMissed: ['communication'],
  Send: ['communication'],
  Send2: ['communication'],
  AtSign: ['communication'],
  Hash: ['communication', 'social'],
  Voicemail: ['communication'],
  Rss: ['communication'],
  Wifi: ['communication', 'devices'],
  WifiOff: ['communication', 'devices'],

  // UI & Layout
  Menu: ['ui'],
  X: ['ui'],
  Check: ['ui'],
  Plus: ['ui'],
  Minus: ['ui'],
  Search: ['ui'],
  Settings: ['ui', 'tools'],
  Filter: ['ui'],
  Grid: ['ui'],
  List: ['ui'],
  Layout: ['ui'],
  LayoutGrid: ['ui'],
  LayoutList: ['ui'],
  Sidebar: ['ui'],
  PanelLeft: ['ui'],
  PanelRight: ['ui'],
  Maximize: ['ui'],
  Minimize: ['ui'],
  Maximize2: ['ui'],
  Minimize2: ['ui'],
  Columns: ['ui'],
  Rows: ['ui'],
  Square: ['ui'],
  Circle: ['ui'],
  Triangle: ['ui'],
  MoreHorizontal: ['ui'],
  Loader: ['ui'],
  Refresh: ['ui'],
  Eye: ['ui'],
  EyeOff: ['ui'],
  Copy: ['ui'],
  Bookmark: ['ui'],
  Link: ['ui'],
  Tag: ['ui', 'shopping'],
  Tag2: ['ui', 'shopping'],
  Tags: ['ui', 'shopping'],
  Zap: ['ui'],
  Info: ['ui'],
  HelpCircle: ['ui'],
  AlertCircle: ['ui'],
  AlertTriangle: ['ui', 'security'],
  AlertOctagon: ['ui', 'security'],
  CheckCircle: ['ui'],
  XCircle: ['ui'],

  // Users & Social
  User: ['users'],
  Users: ['users', 'social'],
  UserPlus: ['users'],
  UserMinus: ['users'],
  UserX: ['users'],
  UserCheck: ['users'],
  UserCog: ['users', 'tools'],
  Contact: ['users', 'communication'],
  Contact2: ['users', 'communication'],
  Baby: ['users'],

  // Social & Emotions
  Heart: ['social'],
  HeartPulse: ['social', 'health'],
  Star: ['social', 'ui'],
  ThumbsUp: ['social'],
  ThumbsDown: ['social'],
  Smile: ['social'],
  Frown: ['social'],
  Meh: ['social'],
  Award: ['social', 'sports'],
  Crown: ['social'],
  Gift: ['social', 'shopping'],

  // Files & Documents
  File: ['files'],
  FileText: ['files'],
  FilePlus: ['files'],
  FileMinus: ['files'],
  FileCheck: ['files'],
  FileX: ['files'],
  Files: ['files'],
  Folder: ['files'],
  FolderPlus: ['files'],
  FolderMinus: ['files'],
  FolderOpen: ['files'],
  Archive: ['files'],
  Clipboard: ['files', 'ui'],
  ClipboardCheck: ['files', 'ui'],
  ClipboardList: ['files', 'ui'],
  ClipboardCopy: ['files', 'ui'],
  Paperclip: ['files', 'communication'],
  Download: ['files', 'ui'],
  Upload: ['files', 'ui'],
  Save: ['files', 'ui'],
  Trash: ['files', 'ui'],
  Edit: ['files', 'ui'],

  // Devices & Hardware
  Laptop: ['devices'],
  Monitor: ['devices'],
  Tablet: ['devices'],
  Smartphone: ['devices'],
  Watch: ['devices'],
  Printer: ['devices'],
  Mouse: ['devices'],
  Keyboard: ['devices'],
  Gamepad2: ['devices', 'sports'],
  Webcam: ['devices'],
  Router: ['devices'],
  UsbDrive: ['devices'],
  SdCard: ['devices'],
  Battery: ['devices'],
  BatteryCharging: ['devices'],
  BatteryLow: ['devices'],
  Bluetooth: ['devices'],
  Server: ['devices', 'tools'],
  HardDrive: ['devices', 'tools'],
  Cpu: ['devices', 'tools'],
  Database: ['devices', 'tools'],

  // Tools & Development
  Code: ['tools'],
  Code2: ['tools'],
  Terminal: ['tools'],
  Command: ['tools'],
  Wrench: ['tools'],
  Hammer: ['tools'],
  Screwdriver: ['tools'],
  Palette: ['tools'],
  Brush: ['tools'],
  Pen: ['tools', 'education'],
  Pencil: ['tools', 'education'],
  PenTool: ['tools'],

  // Weather & Nature
  Cloud: ['weather', 'nature'],
  CloudRain: ['weather', 'nature'],
  CloudSnow: ['weather', 'nature'],
  CloudLightning: ['weather', 'nature'],
  CloudDrizzle: ['weather', 'nature'],
  CloudSun: ['weather', 'nature'],
  Sun: ['weather', 'nature'],
  Moon: ['weather', 'nature'],
  Sunrise: ['weather', 'nature'],
  Sunset: ['weather', 'nature'],
  Wind: ['weather', 'nature'],
  Thermometer: ['weather', 'health'],
  Thermometer2: ['weather', 'health'],
  Droplet: ['weather', 'nature'],
  Umbrella: ['weather'],
  Snowflake: ['weather', 'nature'],
  Flame: ['weather', 'nature'],
  Leaf: ['nature'],
  Tree: ['nature'],

  // Charts & Data
  Activity: ['charts', 'health'],
  AreaChart: ['charts'],
  BarChart: ['charts'],
  BarChart2: ['charts'],
  Gauge: ['charts'],
  Kanban: ['charts', 'ui'],
  LineChart: ['charts'],
  PieChart: ['charts'],
  Presentation: ['charts', 'education'],
  Signal: ['charts', 'devices'],
  SignalHigh: ['charts', 'devices'],
  SignalLow: ['charts', 'devices'],
  SignalZero: ['charts', 'devices'],
  Table: ['charts', 'ui'],
  Table2: ['charts', 'ui'],
  TrendingDown: ['charts'],
  TrendingUp: ['charts'],

  // Security & Privacy
  Lock: ['security'],
  Unlock: ['security'],
  LockOpen: ['security'],
  Shield: ['security'],
  ShieldCheck: ['security'],
  ShieldOff: ['security'],
  ShieldAlert: ['security'],
  Key: ['security'],
  KeyRound: ['security'],
  Fingerprint: ['security'],
  Scan: ['security', 'ui'],
  ScanLine: ['security', 'ui'],
  Ban: ['security', 'ui'],
  BadgeCheck: ['security', 'social'],

  // Shopping & Commerce
  ShoppingCart: ['shopping'],
  ShoppingBag: ['shopping'],
  CreditCard: ['shopping'],
  DollarSign: ['shopping'],
  Percent: ['shopping'],
  Receipt: ['shopping'],
  Wallet: ['shopping'],
  Package: ['shopping', 'files'],
  Truck: ['shopping', 'transportation'],
  Store: ['shopping', 'buildings'],
  Barcode: ['shopping'],
  QrCode: ['shopping'],

  // Health & Medical
  Stethoscope: ['health'],
  Pill: ['health'],
  Syringe: ['health'],
  Bandage: ['health'],
  Microscope: ['health', 'education'],
  TestTube: ['health', 'education'],
  TestTubes: ['health', 'education'],
  Dna: ['health'],
  Bone: ['health'],
  Brain: ['health'],
  Ear: ['health'],
  Eye2: ['health'],
  Hand: ['health'],
  Footprints: ['health'],
  Wheelchair: ['health', 'transportation'],
  Accessibility: ['health', 'ui'],

  // Education & Books
  GraduationCap: ['education'],
  Book: ['education'],
  BookOpen: ['education'],
  BookMarked: ['education'],
  Library: ['education', 'buildings'],
  Notebook: ['education'],
  NotebookPen: ['education'],
  Ruler: ['education', 'tools'],
  Highlighter: ['education', 'tools'],
  Eraser: ['education', 'tools'],
  Calculator: ['education', 'tools'],
  Backpack: ['education'],
  Lightbulb: ['education', 'ui'],
  LightbulbOff: ['education', 'ui'],
  Lamp: ['education'],
  LampDesk: ['education'],
  Glasses: ['education'],

  // Buildings & Places
  Home: ['buildings', 'ui'],
  Building: ['buildings'],
  Building2: ['buildings'],
  Factory: ['buildings'],
  Landmark: ['buildings'],
  Castle: ['buildings'],
  Church: ['buildings'],
  Hospital: ['buildings', 'health'],
  School: ['buildings', 'education'],
  Warehouse: ['buildings'],
  Tent: ['buildings'],
  Mountain: ['buildings', 'nature'],
  MountainSnow: ['buildings', 'nature'],
  Waves: ['nature'],
  Anchor: ['transportation'],
  Compass: ['transportation', 'tools'],
  Map: ['transportation', 'ui'],
  MapPin: ['transportation', 'ui'],
  Globe: ['transportation', 'communication'],
  Inbox: ['communication', 'ui'],
  Calendar: ['ui'],
  Clock: ['ui'],
  Bell: ['ui', 'communication'],

  // Sports & Games
  Trophy: ['sports'],
  Medal: ['sports'],
  Target: ['sports', 'ui'],
  Crosshair: ['sports', 'ui'],
  Dice1: ['sports'],
  Dice2: ['sports'],
  Dice3: ['sports'],
  Dice4: ['sports'],
  Dice5: ['sports'],
  Dice6: ['sports'],
  Puzzle: ['sports'],
  Joystick: ['sports', 'devices'],
  Swords: ['sports'],
  Sword: ['sports'],
  Wand: ['sports', 'tools'],
  Wand2: ['sports', 'tools'],
  Dumbbell: ['sports', 'health'],

  // Food & Drink
  Coffee: ['food'],
  Cup: ['food'],
  Wine: ['food'],
  Beer: ['food'],
  Martini: ['food'],
  Pizza: ['food'],
  Apple: ['food', 'health'],
  Cherry: ['food'],
  Grape: ['food'],
  Banana: ['food'],
  Carrot: ['food', 'health'],
  Sandwich: ['food'],
  Utensils: ['food'],
  UtensilsCrossed: ['food'],
  ChefHat: ['food'],
  Cookie: ['food'],
  IceCream: ['food'],

  // Transportation
  Car: ['transportation'],
  CarFront: ['transportation'],
  Bus: ['transportation'],
  Train: ['transportation'],
  Plane: ['transportation'],
  PlaneTakeoff: ['transportation'],
  PlaneLanding: ['transportation'],
  Ship: ['transportation'],
  Sailboat: ['transportation'],
  Bike: ['transportation'],
  Rocket: ['transportation'],
  Fuel: ['transportation'],
  Parking: ['transportation'],
  TrafficCone: ['transportation'],
  Navigation: ['transportation'],
  Navigation2: ['transportation'],
  Milestone: ['transportation'],
}

/**
 * Get categories for an icon
 */
export function getIconCategories(iconName: string): IconCategory[] {
  return iconCategories[iconName] || []
}

/**
 * Get all icons in a category
 */
export function getIconsByCategory(category: IconCategory): string[] {
  return Object.entries(iconCategories)
    .filter(([, categories]) => categories.includes(category))
    .map(([name]) => name)
}

/**
 * Check if an icon belongs to a category
 */
export function iconInCategory(iconName: string, category: IconCategory): boolean {
  return iconCategories[iconName]?.includes(category) || false
}
