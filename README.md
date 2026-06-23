> **⚠️ DEPRECATED:** Fully migrated to hermes agent.

<div align="center">

  # Swarm Orchestrator v3.4

  ### Turn your IDE into an Autonomous Engineering Team

  [![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
  [![MCP](https://img.shields.io/badge/MCP-Compatible-00ADD8?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3TDEyIDEyTDIyIDdMMTIgMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yIDEyTDEyIDE3TDIyIDEyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+)](https://modelcontextprotocol.io)
  [![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

**Swarm Orchestrator** is a Model Context Protocol (MCP) server that extends AI coding assistants like Antigravity, Cursor, and Claude Desktop with **deterministic, algorithmic capabilities**. Instead of relying purely on LLM reasoning, Vexorbis Swarm uses specialized workers—code analysis, fault localization, formal verification, and autonomous Git management—to deliver faster, more reliable results.

  ## 📖 Documentation
  
<div align="center">

| Getting Started | Concepts | Guides | Reference |
|-----------------|----------|--------|-----------|
| [Introduction](docs/human/getting-started/introduction.md) | [Architecture](docs/human/concepts/architecture.md) | [PLAN.md Syntax](docs/human/guides/plan-syntax.md) | [Tools](docs/human/reference/tools.md) |
| [Installation](docs/human/getting-started/installation.md) | [Decision Logic](docs/human/concepts/decision-logic.md) | [Git Workflows](docs/human/guides/git-workflows.md) | [Configuration](docs/human/reference/configuration.md) |
| [Quick Start](docs/human/getting-started/quickstart.md) | [Three Pillars](docs/human/concepts/three-pillars.md) | [Debugging](docs/human/guides/debugging.md) | [API Reference](docs/human/reference/api.md) |
| | | [Custom Tools](docs/human/guides/custom-tools.md) | [Troubleshooting](docs/human/reference/troubleshooting.md) |

</div>

## 🚀 Quick Start

### Docker (Recommended)

```bash
git clone https://github.com/AgentAgony/swarm.git
cd swarm
docker compose up -d --build
```

### Configure Your IDE

Add the MCP server to your IDE's configuration (e.g., `~/.gemini/antigravity/mcp_config.json` on Windows):

```json
{
  "mcpServers": {
    "swarm-orchestrator": {
      "command": "docker",
      "args": ["exec", "-i", "swarm-mcp-server", "python", "server.py"]
    }
  }
}
```

---

## 🔍 Tool Selection Guide

```mermaid
flowchart LR
    Start([My Goal]) --> Q1{Type?}

    Q1 -->|Find symbol by name| A["search_codebase(keyword_only=true)<br/>~1ms"]
    Q1 -->|Find code by concept| B["search_codebase()<br/>~240ms"]
    Q1 -->|Understand architecture| C["retrieve_context()<br/>~1-2s"]
    Q1 -->|Debug failing tests| D["debug command<br/>Ochiai SBFL"]

    style A fill:#2ecc71,color:#fff
    style B fill:#3498db,color:#fff
    style C fill:#9b59b6,color:#fff
    style D fill:#e74c3c,color:#fff
```

## 📜 License

MIT








