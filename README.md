# 🤖 Agentic AI Prototype

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18+-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg)](https://fastapi.tiangolo.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991.svg)](https://openai.com/)
[![Pinecone](https://img.shields.io/badge/Pinecone-Vector-00B4D8.svg)](https://www.pinecone.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/muhammadshiraz)

<br>

> 🚀 **Build autonomous AI agents with RAG pipelines, MCP Servers, and OpenAI function/tool calling.**

---

## 🎯 Overview

This project demonstrates a fully functional **Agentic AI** system that combines:

| Component | Description |
|-----------|-------------|
| **🤖 Agentic AI** | Autonomous decision-making and workflow execution |
| **🔍 RAG** | Retrieval-Augmented Generation for contextual document retrieval |
| **🧠 MCP** | Model Context Protocol Servers for persistent agent memory |
| **⚡ OpenAI** | Function/Tool calling for real-world actions |
| **🎨 UI** | Modern React + TypeScript interface for agent interaction |

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Python 3.11+ | Core language |
| FastAPI | REST API framework |
| OpenAI API | LLM and function calling |
| Pinecone | Vector database for RAG |
| Uvicorn | ASGI server |

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vite | Build tool |
| Axios | HTTP client |
| LocalStorage | Chat history persistence |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Vercel | Frontend deployment |
| Render / Railway | Backend deployment |

---

## 📁 Project Structure

```
agentic-ai-prototype/
├── backend/
│   ├── app.py              # FastAPI server
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment variables
│   ├── upload_documents.py # Pinecone upload script
│   └── Dockerfile          # Backend container
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/            # API client
│   │   ├── App.jsx         # Main app
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Node dependencies
│   ├── vite.config.js      # Vite config
│   └── Dockerfile          # Frontend container
├── docker-compose.yml      # Multi-container setup
└── README.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- OpenAI API Key
- (Optional) Pinecone API Key for real RAG

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/agentic-ai-prototype.git
cd agentic-ai-prototype
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv311
source venv311/bin/activate  # On Windows: venv311\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
python app.py
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Open Your Browser

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🐳 Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run individually
docker build -t agentic-ai-backend ./backend
docker run -p 8000:8000 --env-file ./backend/.env agentic-ai-backend

docker build -t agentic-ai-frontend ./frontend
docker run -p 5173:5173 agentic-ai-frontend
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/chat` | Chat with Agentic AI |
| POST | `/api/agent/workflow` | Run agentic workflow |
| POST | `/api/memory/store` | Store memory |
| GET | `/api/memory/retrieve/{key}` | Retrieve memory |
| GET | `/api/memory/list` | List all memory |
| DELETE | `/api/memory/delete/{key}` | Delete memory |

---

## 🧠 Agent Architecture

```
User Input
    ↓
RAG Retrieval (Vector DB)
    ↓
Context Enrichment
    ↓
MCP Memory (Persistent)
    ↓
Agent Reasoning (LLM)
    ↓
Tool Calling (OpenAI)
    ↓
Response
```

---

## 🔧 Environment Variables

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional (for RAG)
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=agentic-ai
```

---

## 📤 Upload Documents to Pinecone

```bash
cd backend
python upload_documents.py
```

This will upload sample documents about:
- Agentic AI
- RAG (Retrieval-Augmented Generation)
- MCP (Model Context Protocol)
- Urban Resilience
- Digital Twins

---

## 🌐 Deployment

### Deploy Backend to Render

1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Set:
   - Name: `agentic-ai-backend`
   - Environment: `Python`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port 8000`
5. Add environment variables:
   - `OPENAI_API_KEY`
   - `PINECONE_API_KEY` (optional)
   - `PINECONE_ENVIRONMENT` (optional)
   - `PINECONE_INDEX` (optional)
6. Click **"Create Web Service"**

### Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Framework Preset: `Vite`
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Add environment variable:
   - `VITE_API_URL` = `https://your-backend-url.com/api`
8. Click **"Deploy"**

---

## 📸 Features

✅ **Agentic AI** — Autonomous decision-making and workflow execution
✅ **RAG Pipelines** — Contextual document retrieval for accurate responses
✅ **MCP Servers** — Persistent memory for stateful interactions
✅ **OpenAI Function Calling** — Real-world tool execution
✅ **Full Stack** — Python FastAPI + React TypeScript
✅ **Modern Stack** — Tailwind CSS, Vite, Docker
✅ **Production Ready** — Complete error handling, logging, monitoring
✅ **Containerized** — Docker and Docker Compose support
✅ **Chat History Persistence** — LocalStorage for conversation history
✅ **Clear History Button** — Reset conversation anytime

---

## 🚧 Roadmap

- [ ] Add WebSocket support for real-time streaming
- [ ] Add authentication and user sessions
- [ ] Add more tools (Slack, Notion, GitHub, etc.)
- [ ] Add agent memory persistence to database
- [ ] Add CI/CD pipeline with GitHub Actions

---

## 📊 Project Status

| Component | Status |
|-----------|--------|
| Backend API | ✅ Complete |
| Frontend UI | ✅ Complete |
| RAG Pipeline | ✅ Complete |
| MCP Server | ✅ Complete |
| OpenAI Integration | ✅ Complete |
| Docker Support | ✅ Complete |
| Documentation | ✅ Complete |
| Deployment Ready | ✅ Yes |
| Chat History | ✅ Persisted |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Connect with Me

- **GitHub:** [github.com/muhammadshiraz](https://github.com/muhammadshiraz)
- **LinkedIn:** [linkedin.com/in/muhammadshiraz](https://linkedin.com/in/muhammadshiraz)
- **Email:** muhammadshiraz996@gmail.com

---

## ⭐ Show Your Support

If you found this project useful, please consider giving it a ⭐ on GitHub!

---

## 📝 Acknowledgments

- [OpenAI](https://openai.com) for the LLM API
- [FastAPI](https://fastapi.tiangolo.com) for the backend framework
- [React](https://reactjs.org) for the frontend UI
- [Tailwind CSS](https://tailwindcss.com) for the styling
- [Pinecone](https://www.pinecone.io) for the vector database

---

**Built with ❤️ by Muhammad Shiraz**