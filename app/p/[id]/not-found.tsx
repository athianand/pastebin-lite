export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          padding: '32px',
          color: 'white'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '32px', 
            fontWeight: '700'
          }}>
            Paste Not Found
          </h1>
          <p style={{ 
            margin: '0', 
            fontSize: '16px', 
            opacity: '0.9'
          }}>
            This paste doesn't exist, has expired, or has reached its view limit
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '18px', 
              fontWeight: '600',
              color: '#374151'
            }}>
              Possible reasons:
            </h3>
            <ul style={{ 
              textAlign: 'left', 
              color: '#6b7280',
              fontSize: '14px',
              lineHeight: '1.6',
              paddingLeft: '20px'
            }}>
              <li>⏰ The paste has expired (TTL reached)</li>
              <li>👁️ The paste has reached its maximum view count</li>
              <li>🔗 The paste ID is incorrect or doesn't exist</li>
              <li>🗑️ The paste was deleted</li>
            </ul>
          </div>

          <a 
            href="/" 
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            🏠 Create New Paste
          </a>
        </div>
      </div>
    </div>
  );
}