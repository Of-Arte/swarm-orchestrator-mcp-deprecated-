import React, { useState, useEffect } from 'react';
import { Route, Link, useLocation } from 'wouter';
import { LayoutDashboard, Database, Network, ListChecks, Settings, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/design_system.css';
import './App.css';

// Placeholder components
const Overview = () => (
  <div className="page-content">
    <h1 className="gradient-text">Swarm Overview</h1>
    <div className="stats-grid">
      <div className="glass-panel stat-card">
        <Activity size={24} color="#6366f1" />
        <div className="stat-value">Active</div>
        <div className="stat-label">System Status</div>
      </div>
      <div className="glass-panel stat-card">
        <ListChecks size={24} color="#a855f7" />
        <div className="stat-value">12</div>
        <div className="stat-label">Tasks in Queue</div>
      </div>
      <div className="glass-panel stat-card">
        <Network size={24} color="#ec4899" />
        <div className="stat-value">156</div>
        <div className="stat-label">Nodes in Graph</div>
      </div>
    </div>
    
    <div className="glass-panel dashboard-chart">
      <h2>Recent Task Activity</h2>
      <div style={{height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
        Chart will be rendered here
      </div>
    </div>
  </div>
);

const KnowledgeGraph = () => (
  <div className="page-content">
    <h1 className="gradient-text">Knowledge Graph</h1>
    <div className="glass-panel graph-container">
      <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
        Force-directed graph will be rendered here (HippoRAG)
      </div>
    </div>
  </div>
);

function App() {
  const [location] = useLocation();

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="glass-panel side-nav">
        <div className="nav-logo">
          <div className="logo-icon glass-panel">S</div>
          <span className="logo-text">SWARM</span>
        </div>
        
        <ul className="nav-links">
          <li>
            <Link href="/">
              <a className={location === '/' ? 'active' : ''}>
                <LayoutDashboard size={20} />
                <span>Overview</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/tasks">
              <a className={location === '/tasks' ? 'active' : ''}>
                <ListChecks size={20} />
                <span>Task Board</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/graph">
              <a className={location === '/graph' ? 'active' : ''}>
                <Network size={20} />
                <span>Graph View</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/memory">
              <a className={location === '/memory' ? 'active' : ''}>
                <Database size={20} />
                <span>Memory</span>
              </a>
            </Link>
          </li>
        </ul>

        <div className="nav-footer">
          <Link href="/settings">
            <a className={location === '/settings' ? 'active' : ''}>
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Route path="/" component={Overview} />
            <Route path="/graph" component={KnowledgeGraph} />
            <Route path="/tasks" component={() => (
              <div className="page-content">
                <h1 className="gradient-text">Task Management</h1>
                <p>Track your agent tasks in real-time.</p>
              </div>
            )} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
