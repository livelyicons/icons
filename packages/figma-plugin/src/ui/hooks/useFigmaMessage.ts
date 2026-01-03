import { useCallback } from 'preact/hooks';

export function useFigmaMessage() {
  const sendMessage = useCallback((type: string, payload?: any) => {
    parent.postMessage({ pluginMessage: { type, payload } }, '*');
  }, []);

  return { sendMessage };
}
