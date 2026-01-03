import { render } from 'preact'
import { App } from './App'
import { setupClipboardHandler } from './utils/clipboard'
import './styles/app.css'

// Set up clipboard handler for copy operations
setupClipboardHandler()

// Mount the Preact app
const root = document.getElementById('app')
if (root) {
  render(<App />, root)
}

// Set up message passing to Figma plugin sandbox
export function sendToPlugin(type: string, payload?: any) {
  parent.postMessage(
    {
      pluginMessage: { type, payload }
    },
    '*'
  )
}
