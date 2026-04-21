# ThreatScan

**ThreatScan** is a fully autonomous AI-powered cybersecurity platform where a single AI agent scans infrastructure, verifies vulnerabilities, and triggers instant USDC payouts via Arc smart contracts and Circle infrastructure.

This project demonstrates a real-world **agentic commerce** system where detection, verification, and payments are fully automated, leveraging **x402 payments** and programmable wallets.

---

## 🚀 Features

- **Autonomous AI Agent:** Single agent scans and validates vulnerabilities
- **Instant USDC Payments:** Verified findings trigger payments on Arc
- **x402 Integration:** Web-native API payments for agent services
- **Circle Wallets & Gateway:** Agent manages funds automatically
- **Cross-Chain Ready:** Bridge Kit and Gateway enable flexible USDC movement

---


## 🛠️ Tech Stack

- **Backend:** Node.js, Fastify, TypeScript
- **Smart Contracts:** Solidity, OpenZeppelin, Foundry
- **AI Agent:** Gemini / Open-source LLM (LangGraph)
- **Payments:** Arc, USDC, Circle Wallets, x402
- **Frontend:** Next.js + Tailwind (optional dashboard)
- **Database:** SQLite (prototype) / PostgreSQL (production-ready)


---

## 📦 Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/threatscan.git
cd threatscan
```

### 2. Install dependencies

```bash
cd backend
npm install
```


### 3. Configure environment variables

```bash
cp .env.example .env
# Add your Circle API keys, Arc RPC URL, agent config
```

**Required Environment Variables:**

```env
# Arc Blockchain
ARC_RPC_URL=https://rpc.arc.circle.com
ARC_CHAIN_ID=<provided_by_circle>
ARC_USDC_ADDRESS=<native_usdc_on_arc>

# Circle API
CIRCLE_API_KEY=<your_circle_api_key>
CIRCLE_ENTITY_SECRET=<your_entity_secret>
CIRCLE_WALLET_SET_ID=<your_wallet_set_id>

# Smart Contracts
THREAT_BOUNTY_CONTRACT=<deployed_contract_address>

# AI Agent
GEMINI_API_KEY=<your_gemini_api_key>
AGENT_WALLET_PRIVATE_KEY=<agent_wallet_key>

# x402 Payment
X402_FACILITATOR_ADDRESS=<circle_provided>

# Database
DATABASE_URL=sqlite:./threatscan.db
```

### 4. Deploy Smart Contracts

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.ts --network arc-testnet
```

Or using Foundry:

```bash
cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url $ARC_RPC_URL --broadcast
```

### 5. Run ThreatScan Agent Demo

```bash
cd backend
node scripts/runAgentDemo.js
```

### 6. (Optional) Start Frontend Dashboard

```bash
cd frontend
npm install
npm run dev
```

Access the dashboard at: `http://localhost:3000`

---

## 🔄 Project Flow

1. **Scan:** The ThreatScan AI agent scans target infrastructure for vulnerabilities
2. **Verify:** Findings are verified autonomously by the agent using Gemini AI
3. **Submit:** Verified results are submitted to Arc smart contracts
4. **Pay:** USDC payments are instantly released to the agent's Circle Wallet
5. **Monetize:** Optional x402 API calls enable web-native monetization for verification services

```
┌─────────────────┐
│   AI Agent      │
│  (Autonomous)   │
└────────┬────────┘
         │
         ├──> Scans Infrastructure
         │
         ├──> Detects Threats
         │
         ├──> Gemini Verification
         │
         v
┌─────────────────┐
│  Arc Blockchain │
│  Smart Contract │
└────────┬────────┘
         │
         ├──> Validates Finding
         │
         ├──> Releases Escrow
         │
         v
┌─────────────────┐
│ Circle Wallet   │
│ (Agent receives │
│  USDC payment)  │
└─────────────────┘
```

---

## 📁 Project Structure

```
threatscan/
├── backend/
│   ├── src/
│   │   ├── agent/
│   │   │   ├── scanner.ts          # Vulnerability scanner
│   │   │   ├── verifier.ts         # Gemini-powered verification
│   │   │   └── submitter.ts        # Submit to blockchain
│   │   ├── services/
│   │   │   ├── circleService.ts    # Circle Wallet/Gateway/Bridge
│   │   │   ├── x402Service.ts      # x402 payment handling
│   │   │   └── blockchainService.ts # Arc interaction
│   │   ├── routes/
│   │   │   ├── api.ts              # REST API endpoints
│   │   │   └── webhooks.ts         # Circle webhooks
│   │   └── server.ts               # Main entry point
│   ├── scripts/
│   │   ├── deployContracts.js      # Deploy to Arc
│   │   └── runAgentDemo.js         # Demo agent workflow
│   └── package.json
├── contracts/
│   ├── src/
│   │   ├── ThreatBountyRegistry.sol  # Main bounty contract
│   │   ├── PaymentEscrow.sol         # USDC escrow
│   │   └── AgentReputation.sol       # Agent staking
│   ├── test/
│   │   └── ThreatBounty.t.sol      # Contract tests
│   └── foundry.toml
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── findings/
│   │   └── analytics/
│   ├── components/
│   │   ├── ThreatCard.tsx
│   │   ├── WalletConnect.tsx
│   │   └── AgentStatus.tsx
│   └── package.json
├── agent/
│   ├── scanner.py                  # Python scanning tools
│   ├── gemini_analyzer.py          # AI analysis
│   └── requirements.txt
└── README.md
```

---

## 🔑 Key Components

### 1. Smart Contract (ThreatBountyRegistry.sol)

```solidity
// Simplified example
contract ThreatBountyRegistry {
    IERC20 public immutable usdc;
    
    function submitFinding(
        bytes32 findingHash,
        Severity severity,
        string calldata metadata
    ) external {
        // Validate agent
        require(agents[msg.sender].active, "Agent not active");
        
        // Calculate payout
        uint256 payout = bountyAmounts[severity];
        
        // Release USDC payment
        usdc.transfer(msg.sender, payout);
        
        emit FindingPaid(msg.sender, findingHash, payout);
    }
}
```

### 2. Circle Service Integration

```typescript
// backend/src/services/circleService.ts
export class CircleService {
  async createAgentWallet() {
    const response = await this.client.createWallets({
      accountType: 'SCA',
      blockchains: ['ARC'],
      count: 1
    });
    return response.data.wallets[0];
  }

  async getBalance(walletId: string) {
    const response = await this.client.getWalletTokenBalance({
      id: walletId
    });
    return response.data.tokenBalances.find(b => b.token.symbol === 'USDC');
  }
}
```

### 3. AI Agent Scanner

```typescript
// backend/src/agent/scanner.ts
export class ThreatScanner {
  async scanTarget(target: string) {
    const findings = [];
    
    // Check exposed APIs
    const apiThreats = await this.checkExposedAPIs(target);
    findings.push(...apiThreats);
    
    // Check database exposure
    const dbThreats = await this.checkExposedDatabases(target);
    findings.push(...dbThreats);
    
    // Verify with Gemini
    for (const finding of findings) {
      finding.verified = await this.verifyWithGemini(finding);
    }
    
    return findings;
  }
}
```

### 4. x402 Payment Handler

```typescript
// backend/src/services/x402Service.ts
export class X402Service {
  async createPaymentRequest(params: {
    recipient: string;
    amount: string;
    service: string;
  }) {
    const paymentRequest = {
      version: '1.0',
      recipient: params.recipient,
      amount: ethers.parseUnits(params.amount, 6),
      currency: 'USDC',
      blockchain: 'ARC',
      service: params.service
    };
    
    // Sign and return payment proof
    const signature = await this.wallet.signMessage(
      JSON.stringify(paymentRequest)
    );
    
    return { ...paymentRequest, signature };
  }
}
```

---

## 🎯 Demo Workflow

### Automated Agent Demo

```bash
npm run demo
```

**What happens:**

1. **Agent Initialization**
   - Creates Circle Wallet
   - Stakes USDC for reputation
   - Connects to Arc blockchain

2. **Scanning Phase**
   - Scans demo infrastructure
   - Detects exposed S3 bucket
   - Identifies misconfigured API endpoint

3. **Verification Phase**
   - Gemini analyzes severity: HIGH
   - Validates finding authenticity
   - Generates proof of discovery

4. **Submission Phase**
   - Submits finding to Arc contract
   - Transaction confirms in <1 second
   - USDC payment released automatically

5. **Payment Received**
   - Agent Circle Wallet balance updates
   - Transaction recorded on-chain
   - Dashboard updates in real-time

**Expected Output:**

```
🤖 ThreatScan Agent Starting...
✓ Circle Wallet created: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb9
✓ Staked 100 USDC for reputation
✓ Connected to Arc blockchain

🔍 Scanning target: demo.example.com
⚠️  Found: Exposed S3 bucket (s3://demo-bucket)
⚠️  Found: Unauthenticated API (/api/admin)

🧠 Gemini Analysis:
   Severity: HIGH
   Confidence: 95%
   Exploitability: High

📤 Submitting findings to Arc...
✓ Transaction: 0xabc123...
✓ Confirmed in 0.8 seconds

💰 Payment Received: 50 USDC
✓ New Balance: 150 USDC

✅ Demo Complete!
```

---

## 🧪 Testing

### Run Unit Tests

```bash
# Smart Contracts
cd contracts
forge test

# Backend
cd backend
npm test

# Agent
cd agent
pytest
```

### Integration Testing

```bash
npm run test:integration
```

---

## 📊 Analytics Dashboard

Access the dashboard to monitor:

- **Agent Performance:** Success rate, earnings, uptime
- **Threat Intelligence:** Real-time findings, severity distribution
- **Payment Metrics:** Total USDC distributed, avg response time
- **Blockchain Stats:** Gas costs, transaction volume

Dashboard URL (local): `http://localhost:3000/dashboard`

---

## 🌐 Circle Product Integration

### Products Used

| Product | Purpose | Implementation |
|---------|---------|----------------|
| **Arc Blockchain** | Settlement layer with sub-second finality | All transactions on Arc |
| **USDC** | Native gas token & payment currency | Agent payouts in USDC |
| **Circle Wallets** | Programmable wallets for agents | Auto-created for each agent |
| **Circle Gateway** | Unified cross-chain USDC balance | Fund from any chain |
| **Circle Bridge Kit** | Cross-chain USDC movement | Agent withdrawals |
| **x402 Standard** | Web-native API payments | Verification services |

### Why These Products?

- **Sub-second Finality:** Arc enables instant payment settlement
- **Stable Payments:** USDC eliminates volatility risk
- **Programmable Wallets:** Agents manage funds autonomously
- **Cross-Chain Support:** Gateway enables flexible funding
- **Composability:** All products work seamlessly together

### What Worked Well

✅ **Wallet Management:** Circle Wallets made agent setup trivial  
✅ **Instant Settlement:** Arc finality is genuinely fast (<1s)  
✅ **Composable APIs:** SDK integration was straightforward  
✅ **USDC as Gas:** Native USDC simplified payment flows  
✅ **Gateway Abstraction:** Cross-chain complexity hidden  

### Areas for Improvement

💡 **Documentation:** More agent-specific examples and patterns  
💡 **Testing Tools:** Local Arc testnet for faster iteration  
💡 **x402 Tooling:** Reference implementations and libraries  
💡 **Agent SDKs:** Higher-level abstractions for common workflows  
💡 **Monitoring:** Built-in observability for wallet operations  

### Recommendations

1. **Agent Development Kit:** Pre-built templates for common agent patterns
2. **x402 Library:** Official SDK with payment verification helpers
3. **Local Testing:** Docker-based Arc testnet for development
4. **Code Examples:** More real-world agentic commerce examples
5. **Monitoring Dashboard:** Built-in analytics for wallet activity

---

## 🎓 Learning Resources

### Circle Documentation
- [Circle Developer Docs](https://developers.circle.com/)
- [Arc Blockchain](https://www.circle.com/en/arc)
- [Circle Wallets Guide](https://developers.circle.com/circle-mint/docs/programmable-wallets-quickstart)
- [Circle Gateway](https://developers.circle.com/circle-mint/docs/circle-gateway)

### Related Technologies
- [Gemini AI](https://ai.google.dev/)
- [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
- [Foundry Framework](https://book.getfoundry.sh/)
- [Fastify](https://fastify.dev/)

---
