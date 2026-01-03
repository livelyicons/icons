/**
 * Usage Examples for Figma API Integration
 *
 * This file demonstrates how to use the Figma API functions
 * from the UI components. These are example snippets, not
 * meant to be imported directly.
 */

import { buildSvgString, DEFAULT_CONFIG } from '../src/utils/svg-builder'
import type { IconData } from '../../../scripts/figma-plugin/types'

// ============================================================================
// Example 1: Insert Icon from UI Component
// ============================================================================

function ExampleIconInsertButton() {
  const { sendMessage } = useFigmaMessage()

  const handleInsert = (iconData: IconData) => {
    // Build SVG string from icon data
    const svgString = buildSvgString(iconData, {
      size: 24,
      strokeWidth: 2,
      color: '#000000'
    })

    // Send insert message to Figma sandbox
    sendMessage('insert-icon', {
      name: iconData.name,
      svgString,
      size: 24
    })
  }

  return <button onClick={() => handleInsert(someIcon)}>Insert</button>
}

// ============================================================================
// Example 2: Copy SVG to Clipboard
// ============================================================================

function ExampleCopySVGButton() {
  const { sendMessage } = useFigmaMessage()

  const handleCopySVG = (iconData: IconData) => {
    // Build SVG string
    const svgString = buildSvgString(iconData, {
      size: 24,
      strokeWidth: 2,
      color: 'currentColor' // Allows CSS color inheritance
    })

    // Send copy message to Figma sandbox
    sendMessage('copy-to-clipboard', {
      text: svgString,
      format: 'svg'
    })
  }

  return <button onClick={() => handleCopySVG(someIcon)}>Copy SVG</button>
}

// ============================================================================
// Example 3: Copy React Component
// ============================================================================

function ExampleCopyReactButton() {
  const { sendMessage } = useFigmaMessage()

  const handleCopyReact = (iconData: IconData) => {
    // Generate React component code
    const componentCode = generateReactComponent(iconData)

    // Send copy message
    sendMessage('copy-to-clipboard', {
      text: componentCode,
      format: 'react'
    })
  }

  return <button onClick={() => handleCopyReact(someIcon)}>Copy React</button>
}

// Helper function to generate React component
function generateReactComponent(icon: IconData): string {
  const elements = icon.elements
    .map(el => {
      const attrs = Object.entries(el.attributes)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ')
      return `    <${el.type} ${attrs} />`
    })
    .join('\n')

  return `export function ${icon.name}Icon({ size = 24, color = 'currentColor' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="${icon.viewBox}"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
${elements}
    </svg>
  )
}`
}

// ============================================================================
// Example 4: Insert with Custom Size
// ============================================================================

function ExampleCustomSizeInsert() {
  const { sendMessage } = useFigmaMessage()
  const [size, setSize] = useState(24)

  const handleInsert = (iconData: IconData) => {
    const svgString = buildSvgString(iconData, {
      size: size,
      strokeWidth: 2,
      color: '#000000'
    })

    sendMessage('insert-icon', {
      name: `${iconData.name} (${size}px)`,
      svgString,
      size
    })
  }

  return (
    <div>
      <input
        type="range"
        min="16"
        max="128"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <button onClick={() => handleInsert(someIcon)}>
        Insert {size}px Icon
      </button>
    </div>
  )
}

// ============================================================================
// Example 5: Insert with Custom Color
// ============================================================================

function ExampleCustomColorInsert() {
  const { sendMessage } = useFigmaMessage()
  const [color, setColor] = useState('#000000')

  const handleInsert = (iconData: IconData) => {
    const svgString = buildSvgString(iconData, {
      size: 24,
      strokeWidth: 2,
      color: color
    })

    sendMessage('insert-icon', {
      name: iconData.name,
      svgString,
      size: 24
    })
  }

  return (
    <div>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={() => handleInsert(someIcon)}>
        Insert with Color
      </button>
    </div>
  )
}

// ============================================================================
// Example 6: Batch Insert Multiple Icons
// ============================================================================

function ExampleBatchInsert() {
  const { sendMessage } = useFigmaMessage()

  const handleBatchInsert = async (icons: IconData[]) => {
    for (const icon of icons) {
      const svgString = buildSvgString(icon, DEFAULT_CONFIG)

      sendMessage('insert-icon', {
        name: icon.name,
        svgString,
        size: 24
      })

      // Small delay between insertions to prevent overwhelming Figma
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  return (
    <button onClick={() => handleBatchInsert(selectedIcons)}>
      Insert {selectedIcons.length} Icons
    </button>
  )
}

// ============================================================================
// Example 7: Complete Icon Card Component
// ============================================================================

function IconCard({ icon }: { icon: IconData }) {
  const { sendMessage } = useFigmaMessage()

  const handleInsert = () => {
    const svgString = buildSvgString(icon, {
      size: 24,
      strokeWidth: 2,
      color: '#000000'
    })

    sendMessage('insert-icon', {
      name: icon.name,
      svgString,
      size: 24
    })
  }

  const handleCopy = (format: 'svg' | 'react' | 'vue') => {
    let text: string

    switch (format) {
      case 'svg':
        text = buildSvgString(icon, DEFAULT_CONFIG)
        break
      case 'react':
        text = generateReactComponent(icon)
        break
      case 'vue':
        text = generateVueComponent(icon)
        break
    }

    sendMessage('copy-to-clipboard', { text, format })
  }

  return (
    <div className="icon-card">
      <div className="icon-preview">
        {/* Render icon preview here */}
      </div>
      <div className="icon-name">{icon.name}</div>
      <div className="icon-actions">
        <button onClick={handleInsert}>Insert</button>
        <button onClick={() => handleCopy('svg')}>SVG</button>
        <button onClick={() => handleCopy('react')}>React</button>
        <button onClick={() => handleCopy('vue')}>Vue</button>
      </div>
    </div>
  )
}

// ============================================================================
// Type Declarations (for examples only)
// ============================================================================

declare function useFigmaMessage(): {
  sendMessage: (type: string, payload?: any) => void
}

declare const someIcon: IconData
declare const selectedIcons: IconData[]
declare const useState: any

declare function generateVueComponent(icon: IconData): string
