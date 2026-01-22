import { useState, useEffect } from 'react';
import { MOCK_STATUS, MOCK_TASKS, MOCK_GRAPH, MOCK_ANALYTICS_TOOLS, MOCK_ANALYTICS_ROLES } from '../mockData';

const API_BASE = '/api';

export function useSwarmData(endpoint, interval = 5000) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const apiKey = localStorage.getItem('swarm_key');
                const headers = apiKey ? { 'X-Swarm-Key': apiKey } : {};

                const response = await fetch(`${API_BASE}${endpoint}`, { headers });

                if (response.status === 401 || response.status === 403) {
                    throw new Error('AUTH_ERROR');
                }

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }
                const jsonData = await response.json();
                if (isMounted) {
                    setData(jsonData);
                    setLoading(false);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    if (err.message === 'AUTH_ERROR') {
                        console.warn("Authentication failed - redirecting to login");
                        // Let the UI handle this via error state
                        setError('AUTH_REQUIRED');
                        setLoading(false);
                        return;
                    }

                    console.warn(`API Connection failed for ${endpoint}, switching to Demo Mode.`);

                    // Fallback to mocks
                    let mock = null;
                    if (endpoint.includes('status')) mock = MOCK_STATUS;
                    else if (endpoint.includes('tasks')) mock = MOCK_TASKS;
                    else if (endpoint.includes('graph')) mock = MOCK_GRAPH;
                    else if (endpoint.includes('analytics/tools')) mock = MOCK_ANALYTICS_TOOLS;
                    else if (endpoint.includes('analytics/roles')) mock = MOCK_ANALYTICS_ROLES;

                    if (mock) {
                        setData(mock);
                        setError(null); // Clear error since we have valid (mock) data
                    } else {
                        setError(err.message);
                    }
                    setLoading(false);
                }
            }
        };

        fetchData(); // Initial fetch

        if (interval > 0) {
            const timer = setInterval(fetchData, interval);
            return () => {
                isMounted = false;
                clearInterval(timer);
            };
        }

        return () => { isMounted = false; };
    }, [endpoint, interval]);

    return { data, loading, error };
}
