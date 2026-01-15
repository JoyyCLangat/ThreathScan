// Submit to blockchain
import { releasePayment } from "../services/blockchainService";

export async function submitFinding(finding: any) {
  console.log("⛓ Submitting to blockchain...");
  const txHash = await releasePayment();
  return txHash;
}
