/**
 * Icon insertion logic for Figma canvas
 */

import type { InsertIconPayload } from '../types/messages'

type StrokableNode = VectorNode | RectangleNode | EllipseNode | PolygonNode | StarNode | LineNode

function hasOutlineStroke(node: SceneNode): node is StrokableNode {
  return 'outlineStroke' in node && typeof (node as StrokableNode).outlineStroke === 'function'
}

/**
 * Recursively collect all nodes that can have their strokes outlined
 */
function collectStrokableNodes(node: SceneNode): StrokableNode[] {
  const nodes: StrokableNode[] = []

  if (hasOutlineStroke(node)) {
    nodes.push(node)
  }

  if ('children' in node) {
    for (const child of (node as FrameNode).children) {
      nodes.push(...collectStrokableNodes(child))
    }
  }

  return nodes
}

/**
 * Insert an icon into the Figma canvas
 *
 * Creates a vector node from the SVG string, outlines strokes, flattens to
 * a single vector, resizes it, positions it, and selects the new node.
 *
 * @param payload - Icon insertion parameters
 * @throws {Error} If SVG parsing or node creation fails
 */
export async function insertIcon(payload: InsertIconPayload): Promise<void> {
  const { name, svgString, size } = payload

  try {
    // Create node from SVG
    const svgFrame = figma.createNodeFromSvg(svgString)

    // Resize the SVG frame FIRST (before flattening) - this respects the viewBox
    // and scales all children proportionally
    svgFrame.resize(size, size)

    // Collect all strokable child nodes
    const strokableNodes = collectStrokableNodes(svgFrame)

    // Outline all strokes (converts strokes to filled paths)
    const outlinedNodes: VectorNode[] = []
    for (const strokableNode of strokableNodes) {
      const outlined = strokableNode.outlineStroke()
      if (outlined) {
        outlinedNodes.push(outlined)
      }
    }

    // Flatten all outlined nodes into a single vector
    let node: VectorNode
    if (outlinedNodes.length > 0) {
      node = figma.flatten(outlinedNodes)
      // Remove the original SVG frame since we have our outlined/flattened version
      svgFrame.remove()
    } else {
      // Fallback: if no strokes to outline, just flatten the original
      node = figma.flatten([svgFrame])
    }

    // Rename the vector to the icon name
    node.name = name

    // Position at center of viewport or near existing selection
    const center = figma.viewport.center
    const selection = figma.currentPage.selection

    if (selection.length > 0) {
      // Position near the last selected item
      const lastSelected = selection[selection.length - 1]
      node.x = lastSelected.x + lastSelected.width + 20
      node.y = lastSelected.y
    } else {
      // Position at viewport center
      node.x = center.x - size / 2
      node.y = center.y - size / 2
    }

    // Select the newly created node
    figma.currentPage.selection = [node]

    // Scroll the viewport to show the new icon
    figma.viewport.scrollAndZoomIntoView([node])

    // Show success notification
    figma.notify(`Inserted ${name}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to insert icon: ${message}`)
  }
}
