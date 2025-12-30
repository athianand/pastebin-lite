'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [result, setResult] = useState<{ id: string; url: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const body: any = { content: content.trim() };
      
      if (ttlSeconds && ttlSeconds.trim()) {
        const ttl = parseInt(ttlSeconds.trim(), 10);
        if (!isNaN(ttl) && ttl > 0) {
          body.ttl_seconds = ttl;
        }
      }
      
      if (maxViews && maxViews.trim()) {
        const views = parseInt(maxViews.trim(), 10);
        if (!isNaN(views) && views > 0) {
          body.max_views = views;
        }
      }

      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create paste');
        return;
      }

      setResult(data);
      setContent('');
      setTtlSeconds('');
      setMaxViews('');
    } catch (err) {
      setError('Failed to create paste');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    fontFamily: 'inherit',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          padding: '32px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '32px', 
            fontWeight: '700',
            letterSpacing: '-0.025em'
          }}>
            📋 Pastebin Lite
          </h1>
          <p style={{ 
            margin: '0', 
            fontSize: '16px', 
            opacity: '0.9',
            fontWeight: '400'
          }}>
            Share text snippets with optional expiry and view limits
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="content" style={labelStyle}>
                📝 Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                style={{
                  ...inputStyle,
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  resize: 'vertical',
                  minHeight: '200px'
                }}
                placeholder="Paste your text here...\n\nSupports plain text, code, logs, or any text content."
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px', 
              marginBottom: '24px' 
            }}>
              <div>
                <label htmlFor="ttl" style={labelStyle}>
                  ⏰ Expire after (seconds)
                </label>
                <input
                  id="ttl"
                  type="number"
                  value={ttlSeconds}
                  onChange={(e) => setTtlSeconds(e.target.value)}
                  min="1"
                  style={inputStyle}
                  placeholder="e.g., 3600 (1 hour)"
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                />
              </div>

              <div>
                <label htmlFor="maxViews" style={labelStyle}>
                  👁️ Max views
                </label>
                <input
                  id="maxViews"
                  type="number"
                  value={maxViews}
                  onChange={(e) => setMaxViews(e.target.value)}
                  min="1"
                  style={inputStyle}
                  placeholder="e.g., 10"
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !content.trim()}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: loading || !content.trim() 
                  ? '#9ca3af' 
                  : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? '🔄 Creating...' : '🚀 Create Paste'}
            </button>
          </form>

          {error && (
            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              backgroundColor: '#fef2f2', 
              color: '#dc2626',
              borderRadius: '8px',
              border: '1px solid #fecaca',
              fontSize: '14px'
            }}>
              ❌ {error}
            </div>
          )}

          {result && (
            <div style={{ 
              marginTop: '24px', 
              padding: '24px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '12px',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                color: '#166534',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                ✅ Paste created successfully!
              </h3>
              
              <div style={{ marginBottom: '12px' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#374151', fontWeight: '600' }}>
                  📋 Paste ID:
                </p>
                <code style={{ 
                  backgroundColor: '#e5e7eb', 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'monospace'
                }}>
                  {result.id}
                </code>
              </div>
              
              <div>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#374151', fontWeight: '600' }}>
                  🔗 Shareable URL:
                </p>
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db'
                }}>
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#4f46e5', 
                      textDecoration: 'none',
                      fontSize: '14px',
                      flex: '1',
                      wordBreak: 'break-all'
                    }}
                  >
                    {result.url}
                  </a>
                  <button
                    onClick={() => copyToClipboard(result.url)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: copied ? '#10b981' : '#4f46e5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}