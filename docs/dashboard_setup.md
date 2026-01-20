# Swarm Admin Dashboard Setup

The Swarm Admin Dashboard provides a real-time visual interface for the Orchestrator, allowing you to monitor tasks, view the knowledge graph, and check system status.

## Architecture

-   **Frontend**: React (Vite) + Wouter + Lucide + Recharts
-   **Backend**: FastAPI (`dashboard_server.py`) acting as a bridge to the Orchestrator logic.
-   **Design**: custom "Premium" glassmorphism theme using Vanilla CSS.

## Prerequisites

-   Node.js (v18+)
-   Python 3.10+
-   Swarm dependencies (`pip install -r requirements.txt`)

## Installation & Running

1.  **Build the Frontend**
    ```bash
    cd dashboard
    npm install
    npm run build
    ```

2.  **Start the Dashboard Server**
    From the root `swarm` directory:
    ```bash
    python dashboard_server.py
    ```

3.  **Access the Dashboard**
    Open [http://localhost:8000](http://localhost:8000) in your browser.

## Features

-   **Overview**: System stats (active tasks, memory nodes).
-   **Task Board**: List of active tasks and their status.
-   **Knowledge Graph**: Interactive force-directed graph of the codebase (HippoRAG).
-   **Memory**: View active context and memory state.

## Development

-   **Frontend Dev Server**: `cd dashboard && npm run dev` (Runs on port 5173).
-   **Backend Dev Server**: `python dashboard_server.py` (Runs on port 8000).

Note: For full integration during development, you may need to configure the Vite proxy to point `/api` to `http://localhost:8000`.
