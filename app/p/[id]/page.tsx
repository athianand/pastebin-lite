import { notFound } from 'next/navigation';
import { mockStorage, type PasteData } from '../../../lib/storage';

function getCurrentTime(): number {
  return Date.now();
}

async function getPasteForDisplay(id: string): Promise<{ paste: PasteData; shouldShow: boolean } | null> {
  try {
    const pasteData = mockStorage.get(`paste:${id}`);
    
    if (!pasteData) {
      return null;
    }

    const now = getCurrentTime();

    // Check if expired
    if (pasteData.expires_at && now >= pasteData.expires_at) {
      return null;
    }

    // Check if view limit exceeded
    if (pasteData.max_views && pasteData.views >= pasteData.max_views) {
      return null;
    }

    return { paste: pasteData, shouldShow: true };
  } catch (error) {
    return null;
  }
}

export default async function PastePage({ params }: { params: { id: string } }) {
  const result = await getPasteForDisplay(params.id);

  if (!result) {
    notFound();
  }

  const { paste } = result;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}>
          <div>
            <h1 style={{ 
              margin: '0 0 4px 0', 
              fontSize: '24px', 
              fontWeight: '700'
            }}>
              📋 Paste: {params.id}
            </h1>
            <p style={{ 
              margin: '0', 
              fontSize: '14px', 
              opacity: '0.9'
            }}>
              Created: {new Date(paste.created_at).toLocaleString()}
            </p>
          </div>
          <a 
            href="/" 
            style={{ 
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            ← Create New
          </a>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
                👁️ VIEWS
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>
                {paste.views}
              </div>
            </div>
            
            {paste.max_views && (
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #fde68a'
              }}>
                <div style={{ fontSize: '12px', color: '#92400e', fontWeight: '600', marginBottom: '4px' }}>
                  🔢 REMAINING VIEWS
                </div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#92400e' }}>
                  {Math.max(0, paste.max_views - paste.views)}
                </div>
              </div>
            )}
            
            {paste.expires_at && (
              <div style={{
                backgroundColor: '#fce7f3',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #f9a8d4'
              }}>
                <div style={{ fontSize: '12px', color: '#be185d', fontWeight: '600', marginBottom: '4px' }}>
                  ⏰ EXPIRES
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#be185d' }}>
                  {new Date(paste.expires_at).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* Paste Content */}
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              📄 Content
            </h3>
            <div style={{
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #374151',
              whiteSpace: 'pre-wrap',
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              overflow: 'auto',
              maxHeight: '500px'
            }}>
              {paste.content}
            </div>
          </div>

          {/* Warning messages */}
          {paste.max_views && paste.views >= paste.max_views * 0.8 && (
            <div style={{
              backgroundColor: '#fef3c7',
              color: '#92400e',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #fde68a',
              fontSize: '14px',
              marginTop: '16px'
            }}>
              ⚠️ Warning: This paste is approaching its view limit ({paste.max_views} max views)
            </div>
          )}
          
          {paste.expires_at && paste.expires_at - Date.now() < 3600000 && ( // Less than 1 hour
            <div style={{
              backgroundColor: '#fce7f3',
              color: '#be185d',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #f9a8d4',
              fontSize: '14px',
              marginTop: '16px'
            }}>
              ⏰ Warning: This paste will expire soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}