interface PasteData {
  content: string;
  created_at: number;
  expires_at: number | null;
  max_views: number | null;
  views: number;
}

// Persistent storage using global object (survives across requests in same instance)
const globalForPastes = globalThis as unknown as {
  pastes: Map<string, PasteData> | undefined;
};

if (!globalForPastes.pastes) {
  globalForPastes.pastes = new Map<string, PasteData>();
  
  // Add demo paste
  globalForPastes.pastes.set('paste:demo', {
    content: 'Hello World!\n\nThis is a demo paste to show the application working.\n\nFeatures:\n- Create pastes with text content\n- Optional TTL (time to live)\n- Optional view limits\n- Modern responsive UI\n- Shareable URLs\n\nTry creating your own paste at the home page!',
    created_at: Date.now(),
    expires_at: null,
    max_views: null,
    views: 0
  });
}

const mockStorage = {
  get: (key: string) => globalForPastes.pastes?.get(key),
  set: (key: string, value: PasteData) => globalForPastes.pastes?.set(key, value),
  has: (key: string) => globalForPastes.pastes?.has(key) || false
};

export { mockStorage, type PasteData };