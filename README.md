# ThreatScan

**ThreatScan** is a fully autonomous AI-powered cybersecurity platform where a single AI agent scans infrastructure, verifies vulnerabilities, and triggers instant USDC payouts via Arc smart contracts and Circle infrastructure.

This project demonstrates a real-world **agentic commerce** system where detection, verification, and payments are fully automated, leveraging **x402 payments** and programmable wallets.

---

## Features

- **Autonomous AI Agent:** Single agent scans and validates vulnerabilities.
- **Instant USDC Payments:** Verified findings trigger payments on Arc.
- **x402 Integration:** Web-native API payments for agent services.
- **Circle Wallets & Gateway:** Agent manages funds automatically.
- **Cross-Chain Ready:** Bridge Kit and Gateway enable flexible USDC movement.

---

## Tech Stack

- **Backend:** Node.js, Fastify, TypeScript
- **Smart Contracts:** Solidity, OpenZeppelin, Foundry
- **AI Agent:** Gemini / Open-source LLM (LangGraph)
- **Payments:** Arc, USDC, Circle Wallets, x402
- **Frontend:** Next.js + Tailwind (optional dashboard)
- **Database:** SQLite (prototype) / PostgreSQL (production-ready)

---

## Setup & Installation

1. **Clone the repo**
```bash
git clone https://github.com/<your-username>/threatscan.git
cd threatscan
Install dependencies

cd backend
npm install


Configure environment variables

cp .env.example .env
# Add your Circle API keys, Arc RPC URL, agent config


Deploy Smart Contracts

cd scripts
node deployContracts.js


Run ThreatScan Agent Demo

node runAgentDemo.js


(Optional) Start Frontend

cd frontend
npm install
npm run dev

Project Flow

The ThreatScan AI agent scans target infrastructure for vulnerabilities.

Findings are verified autonomously by the agent.

Verified results are submitted to Arc smart contracts.

USDC payments are instantly released to the agent’s Circle Wallet.

Optional x402 API calls enable web-native monetization for verification services.

Circle Product Feedback

Products Used: Arc, USDC, Circle Wallets, Circle Gateway, Circle Bridge Kit

Why: Sub-second finality, stable payments, programmable wallets, and cross-chain support.

What Worked: Wallet management, instant settlement, composable API integration.

What Could Be Improved: More agent-specific examples and local cross-chain testing.

Recommendations: Richer SDK abstractions for agent workflows and x402 payment references.
