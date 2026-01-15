// create-wallet.ts - Generate a test wallet for development
import { ethers } from "ethers";

console.log("\n🔑 ThreatScan Wallet Generator\n");
console.log("=".repeat(60));

// Generate a new random wallet
const wallet = ethers.Wallet.createRandom();

console.log("\n✅ New wallet created successfully!\n");
console.log("📋 Wallet Details:");
console.log("-".repeat(60));
console.log(`Address:     ${wallet.address}`);
console.log(`Private Key: ${wallet.privateKey}`);
console.log("\n📝 Mnemonic Phrase (12 words):");
console.log("-".repeat(60));
console.log(wallet.mnemonic?.phrase);

console.log("\n" + "=".repeat(60));
console.log("⚠️  SECURITY WARNING");
console.log("=".repeat(60));
console.log("• This is a TEST wallet for DEVELOPMENT only");
console.log("• NEVER use this wallet on mainnet with real funds");
console.log("• NEVER commit the private key to git");
console.log("• Save the mnemonic phrase in a secure location");

console.log("\n" + "=".repeat(60));
console.log("📝 Next Steps");
console.log("=".repeat(60));
console.log("1. Copy the private key above");
console.log("2. Open threatscan/backend/.env");
console.log("3. Update PRIVATE_KEY:");
console.log(`   PRIVATE_KEY=${wallet.privateKey}`);
console.log("\n✨ Your wallet is ready for Arc hackathon!\n");