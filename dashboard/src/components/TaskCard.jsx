import { X, RefreshCw, Loader, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task }) => {
  const [actionLoading, setActionLoading] = useState(false);

  const handleAction = async (action) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/tasks/${task.task_id}/${action}`, { method: 'POST' });
      if (res.ok) {
        alert(`Task ${action} successful`);
        window.location.reload();
      } else {
        alert(`Failed to ${action} task`);
      }
    } catch (e) {
      alert(`Error: ${e}`);
    } finally {
      setActionLoading(false);
    }
  };

  const statusConfig = {
    'COMPLETED': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', glow: 'rgba(16, 185, 129, 0.2)', icon: CheckCircle },
    'FAILED': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', glow: 'rgba(239, 68, 68, 0.2)', icon: AlertCircle },
    'RUNNING': { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)', glow: 'rgba(99, 102, 241, 0.2)', icon: Loader, pulse: true },
    'PENDING': { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)', glow: 'rgba(148, 163, 184, 0.1)', icon: Clock }
  };

  const config = statusConfig[task.status] || statusConfig['PENDING'];
  const StatusIcon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: `0 12px 40px -12px ${config.glow}` }}
      className="glass-panel" 
      style={{ 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        borderLeft: `3px solid ${config.color}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <StatusIcon size={16} color={config.color} className={config.pulse ? 'spin' : ''} />
            <span style={{
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              background: config.bg,
              color: config.color,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {task.status}
            </span>
          </div>
          <p style={{ margin: '8px 0 4px 0', fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{task.description}</p>
          <code style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{task.task_id}</code>
        </div>
      </div>

      {task.feedback_log && task.feedback_log.length > 0 && (
        <div style={{ 
          marginTop: '8px', 
          padding: '10px 14px', 
          background: 'rgba(0, 0, 0, 0.2)', 
          border: '1px solid var(--border-glass)',
          borderRadius: '8px',
          fontSize: '0.85rem', 
          color: 'var(--text-secondary)',
          fontFamily: 'monospace'
        }}>
          <span style={{ color: config.color, marginRight: '8px' }}>&gt;</span>
          {task.feedback_log[task.feedback_log.length - 1]}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {task.status === 'RUNNING' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction('cancel')}
            disabled={actionLoading}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              borderRadius: '8px',
              cursor: actionLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {actionLoading ? <Loader size={14} className="spin" /> : <X size={14} />}
            Cancel Session
          </motion.button>
        )}
        
        {task.status === 'FAILED' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction('retry')}
            disabled={actionLoading}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#6366f1',
              borderRadius: '8px',
              cursor: actionLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            {actionLoading ? <Loader size={14} className="spin" /> : <RefreshCw size={14} />}
            Retry Task
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
