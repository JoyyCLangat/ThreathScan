// Demo agent workflow for ThreatScan
import dotenv from "dotenv";
dotenv.config();

import { initBlockchainService } from "../src/services/blockchainService.js";

console.log("\n🤖 ThreatScan Agent Demo - Arc Hackathon\n");
console.log("=".repeat(60));

async function runDemo() {
  // Step 1: Initialize blockchain
  console.log("\n📋 Step 1: Initialize Blockchain Service");
  console.log("-".repeat(60));
  
  let blockchain;
  try {
    blockchain = initBlockchainService();
    const wallet = await blockchain.getWalletInfo();
    console.log("✅ Blockchain initialized");
    console.log(`   Wallet: ${wallet.address}`);
    console.log(`   Balance: ${wallet.nativeBalance} ETH`);
    console.log(`   USDC: ${wallet.usdcBalance} USDC`);
  } catch (error) {
    console.error("❌ Blockchain init failed:", error.message);
    console.log("⚠️  Running in demo mode\n");
  }
  
  // Step 2: Simulate scanning
  console.log("\n📋 Step 2: Scanning Repository");
  console.log("-".repeat(60));
  console.log("🔍 Scanning: https://github.com/example/vulnerable-app");
  
  await sleep(1000);
  
  const findings = [
    {
      id: "finding-001",
      repoUrl: "https://github.com/example/vulnerable-app",
      severity: "HIGH",
      hash: "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab",
      title: "SQL Injection",
      description: "User input concatenated into SQL query"
    },
    {
      id: "finding-002",
      repoUrl: "https://github.com/example/vulnerable-app",
      severity: "MEDIUM",
      hash: "0xdef4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      title: "XSS Vulnerability",
      description: "Unescaped user input in HTML"
    }
  ];
  
  console.log(`✅ Found ${findings.length} potential issues`);
  
  // Step 3: AI Verification
  console.log("\n📋 Step 3: AI Verification with Gemini");
  console.log("-".repeat(60));
  
  const verifiedFindings = [];
  for (const finding of findings) {
    console.log(`🤖 Verifying: ${finding.title}`);
    await sleep(500);
    
    // Simulate AI verification (would use real Gemini API)
    if (finding.severity === "HIGH") {
      console.log(`   ✅ Verified as valid (95% confidence)`);
      verifiedFindings.push(finding);
    } else {
      console.log(`   ❌ Filtered as false positive (80% confidence)`);
    }
  }
  
  console.log(`\n✅ ${verifiedFindings.length}/${findings.length} findings verified`);
  
  // Step 4: Submit to blockchain
  console.log("\n📋 Step 4: Submit to Arc Blockchain");
  console.log("-".repeat(60));
  
  for (const finding of verifiedFindings) {
    console.log(`📝 Submitting: ${finding.title}`);
    
    if (blockchain) {
      try {
        const result = await blockchain.submitFinding(finding);
        if (result.success) {
          console.log(`   ✅ Submitted! TX: ${result.txHash}`);
          console.log(`   Finding ID: ${result.findingId}`);
        } else {
          console.log(`   ⚠️  Submission failed (demo mode)`);
        }
      } catch (error) {
        console.log(`   ⚠️  Error: ${error.message}`);
      }
    } else {
      console.log(`   ⚠️  Blockchain not available (demo mode)`);
      console.log(`   TX Hash: 0xDEMO_${finding.id}`);
    }
    
    await sleep(500);
  }
  
  // Step 5: Payment release simulation
  console.log("\n📋 Step 5: Release Payment (Simulated)");
  console.log("-".repeat(60));
  
  if (verifiedFindings.length > 0) {
    const finding = verifiedFindings[0];
    const researcherAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
    
    console.log(`💰 Releasing bounty for: ${finding.title}`);
    console.log(`   Recipient: ${researcherAddress}`);
    
    if (blockchain) {
      try {
        const result = await blockchain.releasePayment(finding.id, researcherAddress);
        if (result.success) {
          console.log(`   ✅ Payment released!`);
          console.log(`   Amount: ${result.amount} USDC`);
          console.log(`   TX: ${result.txHash}`);
        } else {
          console.log(`   ⚠️  Payment failed (demo mode)`);
        }
      } catch (error) {
        console.log(`   ⚠️  Error: ${error.message}`);
      }
    } else {
      console.log(`   ⚠️  Blockchain not available (demo mode)`);
      console.log(`   TX Hash: 0xDEMO_PAYMENT`);
    }
  }
  
  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 Demo Summary");
  console.log("=".repeat(60));
  console.log(`✅ Scanned repository: github.com/example/vulnerable-app`);
  console.log(`✅ Found ${findings.length} potential issues`);
  console.log(`✅ AI verified ${verifiedFindings.length} as valid`);
  console.log(`✅ Submitted ${verifiedFindings.length} to Arc blockchain`);
  console.log(`✅ Released bounty payment in USDC`);
  
  console.log("\n🎉 ThreatScan Agent Demo Complete!\n");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the demo
runDemo().catch(error => {
  console.error("\n❌ Demo failed:", error);
  process.exit(1);
});