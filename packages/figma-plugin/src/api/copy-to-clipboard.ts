/**
 * Clipboard handling for code copying
 */

import type { CopyPayload } from '../types/messages'

/**
 * Handle copying code to clipboard
 *
 * Since the Figma sandbox doesn't have direct access to the clipboard API,
 * this function sends the text back to the UI via postMessage, where the
 * UI can use navigator.clipboard.writeText() to perform the actual copy.
 *
 * @param payload - Copy parameters including text and format
 */
export function copyToClipboard(payload: CopyPayload): void {
  const { text, format } = payload

  // Send text back to UI for clipboard access
  // The UI has access to navigator.clipboard.writeText()
  figma.ui.postMessage({
    type: 'copy-text',
    payload: { text, format }
  })

  // Show notification to user
  const formatLabel = format.toUpperCase()
  figma.notify(`${formatLabel} copied to clipboard`)
}
