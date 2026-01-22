import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginView = ({ onLogin }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate key against config endpoint
      const res = await fetch('/api/config', {
        headers: { 'X-Swarm-Key': key }
      });

      if (res.ok) {
        onLogin(key);
      } else {
        setError('Invalid API Key. Access Denied.');
      }
    } catch (err) {
      setError('Connection refused. Is server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-dark)',
      position: 'relative',
      zIndex: 100
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'rgba(99, 102, 241, 0.1)', 
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            border: '1px solid rgba(99, 102, 241, 0.3)'
          }}>
            <ShieldCheck size={32} color="#6366f1" />
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Security Check</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter dashboard access key</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              border: '1px solid var(--border-glass)',
            }}>
              <Lock size={18} style={{ marginLeft: '16px', color: 'var(--text-secondary)' }} />
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="sk-swarm-..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '16px',
                  color: '#fff',
                  outline: 'none',
                  fontFamily: 'monospace'
                }}
                autoFocus
              />
            </div>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '12px', textAlign: 'center' }}
              >
                {error}
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !key}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Verifying...' : 'Authenticate'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginView;
