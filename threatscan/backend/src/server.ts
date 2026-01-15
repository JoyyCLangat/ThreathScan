import dotenv from "dotenv";
dotenv.config(); // Load .env FIRST

import Fastify from "fastify";
import { initBlockchainService, getBlockchainService } from "./services/blockchainService";

const server = Fastify({ logger: true });

// Initialize blockchain at startup
let blockchainEnabled = false;

try {
  const blockchain = initBlockchainService();
  const wallet = await blockchain.getWalletInfo();
  
  console.log("🔗 Blockchain enabled");
  console.log(`   Wallet: ${wallet.address}`);
  console.log(`   USDC: ${wallet.usdcBalance}`);
  
  blockchainEnabled = true;
} catch (error: any) {
  console.warn("⚠️  Blockchain disabled:", error.message);
  console.warn("   Running in demo mode");
}

// Use blockchain in routes
server.post("/api/submit-finding", async (request, reply) => {
  const finding = request.body as {
    id: string;
    repoUrl: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
    hash: string;
  };
  
  if (blockchainEnabled) {
    const blockchain = getBlockchainService();
    const result = await blockchain.submitFinding(finding);
    
    if (result.success) {
      return { success: true, txHash: result.txHash };
    }
  }
  
  return { success: false, error: "Blockchain not enabled" };
});