/**
 * Figma Plugin Sandbox Entry Point
 *
 * This file runs in the Figma plugin sandbox (main thread).
 * It has access to the Figma API but not browser APIs like clipboard.
 */

import { insertIcon, copyToClipboard } from './api'
import type { PluginMessage } from './types/messages'

// Show the plugin UI with theme support
figma.showUI(__html__, {
  width: 340,
  height: 680,
  title: 'LivelyIcons',
  themeColors: true
})

/**
 * Handle messages from the UI
 *
 * Messages are sent from the UI via parent.postMessage()
 * and received here for processing with the Figma API.
 */
figma.ui.onmessage = async (msg: PluginMessage) => {
  try {
    switch (msg.type) {
      case 'insert-icon':
        // Insert icon onto canvas
        await insertIcon(msg.payload)
        break

      case 'copy-to-clipboard':
        // Copy code to clipboard (sends back to UI)
        copyToClipboard(msg.payload)
        break

      case 'cancel':
        // Close the plugin
        figma.closePlugin()
        break

      default:
        console.warn('Unknown message type:', msg)
    }
  } catch (error) {
    // Show error notification to user
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    figma.notify(message, { error: true })
    console.error('Plugin error:', error)
  }
}

/**
 * Handle plugin close event
 */
figma.on('close', () => {
  console.log('LivelyIcons plugin closed')
})
