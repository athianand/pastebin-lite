interface PasteData {
  content: string;
  created_at: number;
  expires_at: number | null;
  max_views: number | null;
  views: number;
}

// Shared mock storage for development
const mockStorage = new Map<string, PasteData>();

export { mockStorage, type PasteData };