/**
 * Generate search keywords from icon names
 *
 * Converts PascalCase icon names into searchable keywords
 * Example: "HeartPulse" -> ["heart", "pulse", "heartpulse"]
 */

/**
 * Split PascalCase string into words
 */
function splitPascalCase(str: string): string[] {
  // Insert space before capital letters (except first char)
  const spaced = str.replace(/([A-Z])/g, ' $1').trim()

  // Split by spaces and convert to lowercase
  return spaced
    .split(/\s+/)
    .map(word => word.toLowerCase())
    .filter(word => word.length > 0)
}

/**
 * Common synonyms for icon keywords
 * Add more as needed for better searchability
 */
const SYNONYMS: Record<string, string[]> = {
  'heart': ['love', 'like', 'favorite'],
  'trash': ['delete', 'remove', 'bin'],
  'search': ['find', 'magnify', 'lookup'],
  'user': ['person', 'profile', 'account'],
  'settings': ['config', 'preferences', 'options'],
  'check': ['tick', 'checkmark', 'confirm'],
  'plus': ['add', 'new', 'create'],
  'minus': ['subtract', 'remove'],
  'download': ['save', 'export'],
  'upload': ['import', 'load'],
  'mail': ['email', 'message', 'envelope'],
  'phone': ['call', 'telephone'],
  'home': ['house', 'building'],
  'star': ['favorite', 'bookmark'],
  'calendar': ['date', 'schedule'],
  'clock': ['time', 'watch'],
  'bell': ['notification', 'alert'],
  'lock': ['secure', 'private'],
  'unlock': ['open', 'accessible'],
  'eye': ['view', 'visible', 'show'],
  'edit': ['modify', 'change', 'write'],
  'copy': ['duplicate', 'clone'],
  'link': ['url', 'hyperlink', 'connection'],
  'image': ['picture', 'photo'],
  'video': ['movie', 'film'],
  'music': ['audio', 'sound'],
  'folder': ['directory', 'collection'],
  'file': ['document', 'doc'],
  'arrow': ['direction', 'navigate'],
  'chevron': ['caret', 'arrow'],
  'menu': ['hamburger', 'navigation', 'nav'],
  'grid': ['layout', 'tiles'],
  'list': ['items', 'bullets'],
}

/**
 * Generate keywords from an icon name
 */
export function generateKeywords(iconName: string): string[] {
  const words = splitPascalCase(iconName)
  const keywords = new Set<string>()

  // Add individual words
  words.forEach(word => keywords.add(word))

  // Add full name as single keyword (lowercase)
  keywords.add(iconName.toLowerCase())

  // Add synonyms for each word
  words.forEach(word => {
    const synonyms = SYNONYMS[word]
    if (synonyms) {
      synonyms.forEach(synonym => keywords.add(synonym))
    }
  })

  // Add common compound variations
  if (words.length === 2) {
    // For two-word names, add reversed version
    keywords.add(`${words[1]}${words[0]}`)
  }

  return Array.from(keywords).sort()
}

/**
 * Generate keywords for multiple icons
 */
export function generateAllKeywords(iconNames: string[]): Record<string, string[]> {
  const result: Record<string, string[]> = {}

  iconNames.forEach(name => {
    result[name] = generateKeywords(name)
  })

  return result
}
