interface PasteData {
  content: string;
  created_at: number;
  expires_at: number | null;
  max_views: number | null;
  views: number;
}

// Global storage that persists across requests
declare global {
  var pasteStorage: Map<string, PasteData> | undefined;
}

// Initialize global storage
if (!global.pasteStorage) {
  global.pasteStorage = new Map<string, PasteData>();
}

export const mockStorage = global.pasteStorage;
export { type PasteData };