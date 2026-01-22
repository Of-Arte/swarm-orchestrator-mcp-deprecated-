import React, { useState, useEffect } from 'react';
import { Route, Link, useLocation } from 'wouter';
import { LayoutDashboard, Database, Network, ListChecks, Settings as SettingsIcon, Activity, Book, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/design_system.css';
import './App.css';

import Overview from './views/Overview';
import TaskBoard from './views/TaskBoard';
import KnowledgeGraph from './views/KnowledgeGraph';
import DocsPage from './views/DocsPage';
import Memory from './views/Memory';
import Settings from './views/Settings';
import Analytics from './views/Analytics';

import HealthBadge from './components/HealthBadge';
import LoginView from './views/LoginView';
import { useSwarmData } from './hooks/useSwarmData';

function App() {
  const [location] = useLocation();
  // DEV: Auth disabled
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { data: status } = useSwarmData('/status');
  const { data: health } = useSwarmData('/health', 10000); // Poll health every 10s
  const isDemo = status?.status === 'demo';

  const handleLogin = (key) => {
    localStorage.setItem('swarm_key', key);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="glass-panel side-nav">
        <div className="nav-logo">
          <div className="logo-icon glass-panel">S</div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span className="logo-text">SWARM</span>
            {isDemo && <span style={{fontSize: '0.7rem', color: '#f59e0b', fontWeight: 'bold'}}>DEMO MODE</span>}
          </div>
        </div>
        
        <HealthBadge health={health} />
        
        <ul className="nav-links">
          <li>
            <Link href="/">
              <motion.a 
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={location === '/' ? 'active' : ''}
              >
                <LayoutDashboard size={20} />
                <span>Overview</span>
              </motion.a>
            </Link>
          </li>
          <li>
            <Link href="/tasks">
              <motion.a 
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={location === '/tasks' ? 'active' : ''}
              >
                <ListChecks size={20} />
                <span>Skills & Tools</span>
              </motion.a>
            </Link>
          </li>
          <li>
            <Link href="/graph">
              <motion.a 
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={location === '/graph' ? 'active' : ''}
              >
                <Network size={20} />
                <span>AI Knowledge Base</span>
              </motion.a>
            </Link>
          </li>
          <li>
            <Link href="/memory">
              <motion.a 
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={location === '/memory' ? 'active' : ''}
              >
                <Database size={20} />
                <span>Memory</span>
              </motion.a>
            </Link>
          </li>
          <li>
            <Link href="/docs">
              <motion.a 
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={location === '/docs' ? 'active' : ''}
              >
                <Book size={20} />
                <span>Documentation</span>
              </motion.a>
            </Link>
          </li>
          <li>
            <Link href="/analytics">
              <motion.a 
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={location === '/analytics' ? 'active' : ''}
              >
                <BarChart3 size={20} />
                <span>Analytics</span>
              </motion.a>
            </Link>
          </li>
        </ul>

        <div className="nav-footer">
          <Link href="/settings">
            <motion.a 
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={location === '/settings' ? 'active' : ''}
            >
              <SettingsIcon size={20} />
              <span>Settings</span>
            </motion.a>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-viewport">
        {isDemo && (
          <div className="demo-banner">
            <span>⚠️ DEMO MODE - Unable to connect to Swarm MCP. Showing mock data.</span>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ height: '100%' }}
          >
            <Route path="/" component={Overview} />
            <Route path="/graph" component={KnowledgeGraph} />
            <Route path="/tasks" component={TaskBoard} />
            <Route path="/docs" component={DocsPage} />
            <Route path="/memory" component={Memory} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/settings" component={Settings} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
