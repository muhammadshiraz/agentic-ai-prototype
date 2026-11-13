# 🤖 Agentic AI Prototype

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![React 18](https://img.shields.io/badge/react-18+-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688.svg)](https://fastapi.tiangolo.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991.svg)](https://openai.com/)
[![Pinecone](https://img.shields.io/badge/Pinecone-Vector-00B4D8.svg)](https://www.pinecone.io/)
[![Backend hosting: Render](https://img.shields.io/badge/Backend-Render%20Free-46E3B7.svg)](https://render.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000.svg)](https://vercel.com)
 
![Agentic AI Prototype — Full-Stack AI Engineering](./screenshots/agentic-ai-cover.png)

> 🚀 **Frontend:** [Open app](https://agentic-ai-prototype.vercel.app) | [Deploy the backend on Render](#backend-render-free)

---

## 🎯 Overview

This project is a fully functional **Agentic AI** system that combines:

| Component | Description |
|-----------|-------------|
| **🤖 Agentic AI** | Autonomous decision-making and workflow execution |
| **🔍 RAG** | Retrieval-Augmented Generation for contextual document retrieval |
| **🧠 MCP** | Model Context Protocol Servers for persistent agent memory |
| **⚡ OpenAI** | Function/Tool calling for real-world actions |
| **🎨 UI** | Modern React + TypeScript interface for agent interaction |

**Live Links:**
- **Frontend UI:** [https://agentic-ai-prototype.vercel.app](https://agentic-ai-prototype.vercel.app)
- **Backend API:** Use the public URL assigned to your Render service after deployment.
- **API Documentation (Swagger):** Append `/docs` to that backend URL.

---

## 🧪 How to Use — Sample Questions

Once you open the frontend, you can ask the AI agent these questions to test its capabilities:

### 🔍 Test RAG (Retrieval-Augmented Generation)

The AI has been pre-loaded with sample documents about:
- Agentic AI
- RAG
- MCP
- Urban Resilience
- Digital Twins

Ask:

| **Question** | **Expected Response** |
|---|---|
| `What is Agentic AI?` | The AI will retrieve the document about Agentic AI and answer based on it. |
| `What is RAG?` | The AI will retrieve the RAG document and explain it. |
| `What is MCP?` | The AI will retrieve the MCP document and explain it. |
| `What is urban resilience?` | The AI will retrieve the urban resilience document. |
| `What are digital twins?` | The AI will retrieve the digital twins document. |

### 🧠 Test MCP Memory

You can store and retrieve information in the agent's persistent memory:

| **Question** | **Expected Behavior** |
|---|---|
| `Save to memory: my_favorite_color = blue` | The AI will save `my_favorite_color = blue` to its memory. |
| `What is my favorite color?` | The AI will retrieve `blue` from memory and respond. |
| `Save to memory: user_name = Muhammad` | The AI will store your name. |
| `What is my name?` | The AI will recall your name. |

### ⚡ Test OpenAI Function/Tool Calling

The AI can perform real-world actions:

| **Question** | **Expected Behavior** |
|---|---|
| `Search the web for Python programming` | The AI will call the `search_web` tool and show simulated results. |
| `Analyze this data: {"sales": 1000, "profit": 200}` | The AI will call the `analyze_data` tool. |
| `Send an email to test@example.com with subject "Hello" and body "This is a test"` | The AI will call the `send_email` tool (simulated). |

### 🤖 Test Agentic Workflow

You can run a multi-step autonomous workflow:

| **Question** | **Expected Behavior** |
|---|---|
| `Run workflow for task: plan a project` | The AI will execute a predefined workflow (analyze → decide → execute). |

---

## 🖥️ Screenshots

- **Chat Interface:** ![Chat Interface](screenshots/chat.png)
- **Agent Dashboard:** ![Agent Dashboard](screenshots/dashboard.png)
- **Monitoring Panel:** ![Monitoring Panel](screenshots/monitoring.png)

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
| Render Free | Backend deployment |
| Vercel | Frontend deployment |

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
├── render.yaml             # Free Render backend deployment
└── README.md               # This file
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Python 3.11+
- Node.js 18+
- OpenAI API Key
- (Optional) Pinecone API Key for real RAG

### 1. Clone the Repository

```bash
git clone https://github.com/muhammadshiraz/agentic-ai-prototype.git
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

The backend defaults to `gpt-5.6-terra`. Set `OPENAI_MODEL` in `backend/.env`
to override it with a model that supports Chat Completions, function calling,
and `reasoning_effort="none"`. Restart the backend after changing configuration.

On Windows PowerShell, run the backend setup with:

```powershell
cd backend
python --version
python -m venv venv311
.\venv311\Scripts\python.exe -m pip install -r requirements.txt
# Create or edit .env and add your OPENAI_API_KEY.
.\venv311\Scripts\python.exe app.py
```

The environment name `venv311` does not select Python 3.11; `python -m venv`
uses the interpreter currently on your PATH. The dependency pins support Python
3.13 and 3.14. If installation fails while building `pydantic-core==2.14.1` with
a `ForwardRef._evaluate` error, use the updated `requirements.txt` above instead
of the older `pydantic==2.5.0` pin. Pydantic selects its matching core package
automatically.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Local development sends `/api` requests through Vite to `http://127.0.0.1:8000`.
For a different backend, set `VITE_API_URL` in `frontend/.env.local` to its full
API base URL, for example `http://localhost:8000/api`, and restart Vite.
For production, set `VITE_API_URL` to your Render service URL plus `/api` before
building. This overrides the legacy Railway fallback in the frontend.

### 4. Open Your Browser

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

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

## 🌐 Deployment

### Backend (Render Free)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/muhammadshiraz/agentic-ai-prototype)

1. Sign in to Render, open the button above, and review the Blueprint from
   `render.yaml`. It explicitly selects the **Free** compute plan and creates
   only the Python web service.
2. Enter `OPENAI_API_KEY` in Render's secret input when prompted. The repository
   contains no API key. `OPENAI_MODEL` defaults to `gpt-5.6-terra`.
3. Deploy and copy the actual `https://...onrender.com` URL shown by Render.
4. Open that URL to check health, then `/docs` for the API documentation.
5. Update Vercel as described below to connect the frontend to this service.

For manual Web Service setup, use these values:

| Setting | Value |
|---------|-------|
| Repository | `muhammadshiraz/agentic-ai-prototype` |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | Python 3 |
| Instance Type | **Free** |
| Build Command | `python -m pip install -r requirements.txt` |
| Start Command | `python -m uvicorn app:app --host 0.0.0.0 --port $PORT` |
| Health Check Path | `/` |
| Environment | `PYTHON_VERSION=3.14.10`, `OPENAI_API_KEY`, `OPENAI_MODEL=gpt-5.6-terra` |

Render's [Free web services](https://render.com/docs/free) sleep after 15 minutes
without traffic and take about one minute to wake up on the next request.
This app's in-memory conversation and memory store reset when the process
restarts or sleeps. The health endpoint stays available without an OpenAI key;
chat returns HTTP 503 until the key is configured. Hosting on the Free plan
does not include OpenAI API usage.

### Frontend (Vercel)

1. Sign up at [Vercel.com](https://vercel.com) (free)
2. Import your GitHub repository
3. Set Root Directory: `frontend/`
4. Framework Preset: `Vite`
5. Set the **Production** environment variable `VITE_API_URL` to the actual
   Render backend URL plus `/api`, for example
   `https://YOUR-SERVICE.onrender.com/api`. Replace any old Railway value.
6. Redeploy Vercel after updating the variable. Vite includes this value in the
   frontend at build time, so changing the variable alone does not update the
   existing deployment. Never put `OPENAI_API_KEY` in a `VITE_` variable.

---

## 📊 Features

- ✅ **Agentic AI** — Autonomous decision-making and workflow execution
- ✅ **RAG Pipelines** — Contextual document retrieval for accurate responses
- ✅ **MCP Servers** — Persistent memory for stateful interactions
- ✅ **OpenAI Function Calling** — Real-world tool execution
- ✅ **Full Stack** — Python FastAPI + React TypeScript
- ✅ **Modern Stack** — Tailwind CSS, Vite, Docker
- ✅ **Engineering Prototype** — Demonstrates AI workflows, retrieval, tool calling, and full-stack integration; production hardening remains on the roadmap.
- ✅ **Containerized** — Docker and Docker Compose support
- ✅ **Chat History Persistence** — LocalStorage for conversation history
- ✅ **Clear History Button** — Reset conversation anytime

---

## 🚧 Roadmap

- [ ] Add WebSocket support for real-time streaming
- [ ] Add authentication and user sessions
- [ ] Add more tools (Slack, Notion, GitHub, etc.)
- [ ] Add agent memory persistence to database
- [ ] Add CI/CD pipeline with GitHub Actions

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
- [Render](https://render.com) for backend hosting
- [Vercel](https://vercel.com) for frontend hosting

---

**Built with ❤️ by Muhammad Shiraz**
