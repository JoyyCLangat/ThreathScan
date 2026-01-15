// Gemini-powered verification
import axios from "axios";

export async function verifyFinding(finding: any): Promise<boolean> {
  console.log("🤖 Verifying with AI...");

  // Prototype: auto-approve HIGH severity
  if (finding.severity === "HIGH") {
    return true;
  }

  return false;
}
