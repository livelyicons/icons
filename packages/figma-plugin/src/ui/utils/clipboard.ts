/**
 * Clipboard utility for handling copy operations
 *
 * The Figma sandbox cannot access the clipboard API directly,
 * so it sends a message back to the UI which has browser access.
 */

import type { UIMessage } from '../../types/messages'

/**
 * Setup clipboard message handler from Figma sandbox
 *
 * This listens for 'copy-text' messages from the sandbox and
 * uses the browser's clipboard API to perform the actual copy.
 *
 * Call this once during UI initialization.
 *
 * @example
 * ```ts
 * // In main.tsx or App.tsx
 * useEffect(() => {
 *   setupClipboardHandler()
 * }, [])
 * ```
 */
export function setupClipboardHandler(): void {
  window.onmessage = async (event: MessageEvent) => {
    const msg = event.data.pluginMessage as UIMessage | undefined

    if (!msg) return

    // Handle copy-text messages from Figma sandbox
    if (msg.type === 'copy-text') {
      try {
        await navigator.clipboard.writeText(msg.payload.text)
        console.log(`Copied ${msg.payload.format} to clipboard`)
      } catch (err) {
        console.error('Clipboard write failed:', err)
        // Fallback: try legacy method
        fallbackCopyToClipboard(msg.payload.text)
      }
    }
  }
}

/**
 * Fallback clipboard copy using execCommand
 *
 * Used when navigator.clipboard API is not available or fails.
 * This can happen in certain browser contexts or older browsers.
 *
 * @param text - Text to copy to clipboard
 */
function fallbackCopyToClipboard(text: string): void {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
    console.log('Copied using fallback method')
  } catch (err) {
    console.error('Fallback copy failed:', err)
  }

  document.body.removeChild(textArea)
}
