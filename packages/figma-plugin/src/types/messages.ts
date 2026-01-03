/**
 * Message types for communication between UI and Figma sandbox
 */

/**
 * Payload for inserting an icon into Figma canvas
 */
export interface InsertIconPayload {
  /** Icon name for frame label */
  name: string
  /** Complete SVG string to insert */
  svgString: string
  /** Size in pixels */
  size: number
}

/**
 * Payload for copying code to clipboard
 */
export interface CopyPayload {
  /** Code to copy */
  text: string
  /** Format of the code being copied */
  format: 'svg' | 'react' | 'vue'
}

/**
 * Messages sent from UI to Figma sandbox
 */
export type PluginMessage =
  | { type: 'insert-icon'; payload: InsertIconPayload }
  | { type: 'copy-to-clipboard'; payload: CopyPayload }
  | { type: 'cancel' }

/**
 * Messages sent from Figma sandbox to UI
 */
export type UIMessage =
  | { type: 'copy-text'; payload: { text: string; format: string } }
