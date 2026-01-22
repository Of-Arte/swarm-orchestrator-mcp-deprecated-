import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, RefreshCw, Key, Cpu } from 'lucide-react';
import { useSwarmData } from '../hooks/useSwarmData';

const EnvEditor = () => {
    const { data: config, loading } = useSwarmData('/config');
    const [env, setEnv] = useState({});
    const [models, setModels] = useState({});
    const [saving, setSaving] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (config) {
            setEnv(config.env || {});
            setModels(config.models || {});
        }
    }, [config]);

    const handleEnvChange = (key, val) => {
        setEnv({ ...env, [key]: val });
        setChanged(true);
    };

    const handleModelChange = (role, modelId) => {
        setModels({ ...models, [role]: modelId });
        setChanged(true);
    };

    const saveConfig = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ env, models })
            });
            if (res.ok) {
                alert('Configuration updated. Please restart the Swarm server to apply changes.');
                setChanged(false);
            } else {
                alert('Failed to save configuration');
            }
        } catch (e) {
            alert('Error saving config: ' + e);
        } finally {
            setSaving(false);
        }
    };

    if (loading && !config) return <div>Loading configuration...</div>;

    return (
        <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Key size={24} color="#f59e0b" />
                    <h2 style={{ margin: 0, fontSize: '1.3rem' }}>Environment & Model Config</h2>
                </div>
                {changed && (
                    <button 
                        onClick={saveConfig}
                        disabled={saving}
                        className="glass-panel"
                        style={{
                            padding: '10px 20px',
                            background: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 600,
                            borderRadius: '8px'
                        }}
                    >
                        {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
                        Save Changes
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Env Vars Section */}
                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={16} /> API Keys & Core Vars
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(env).map(([key, val]) => (
                            <div key={key}>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>{key}</label>
                                <input 
                                    type={key.includes('KEY') ? 'password' : 'text'}
                                    value={val}
                                    onChange={(e) => handleEnvChange(key, e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--border-glass)',
                                        borderRadius: '6px',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Model Mappings Section */}
                <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Cpu size={16} /> Worker Model Tags
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(models).map(([role, modelId]) => (
                            <div key={role}>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>{role}</label>
                                <input 
                                    type="text"
                                    value={modelId}
                                    onChange={(e) => handleModelChange(role, e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid var(--border-glass)',
                                        borderRadius: '6px',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {changed && (
                <div style={{ 
                    marginTop: '24px', 
                    padding: '12px', 
                    background: 'rgba(245, 158, 11, 0.1)', 
                    border: '1px solid rgba(245, 158, 11, 0.3)', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#f59e0b',
                    fontSize: '0.9rem'
                }}>
                    <AlertCircle size={20} />
                    <span>You have unsaved changes. Saving will update fixed config files and a server restart will be necessary to apply them.</span>
                </div>
            )}
        </div>
    );
};

export default EnvEditor;
