interface PasteData {
  content: string;
  created_at: number;
  expires_at: number | null;
  max_views: number | null;
  views: number;
}

// Simple in-memory storage
const mockStorage = new Map<string, PasteData>();

// Add a demo paste for testing
mockStorage.set('demo', {
  content: 'Hello World!\n\nThis is a demo paste to show the application working.\n\nFeatures:\n- Create pastes with text content\n- Optional TTL (time to live)\n- Optional view limits\n- Modern responsive UI\n- Shareable URLs',
  created_at: Date.now(),
  expires_at: null,
  max_views: null,
  views: 0
});

export { mockStorage, type PasteData };