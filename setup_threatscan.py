import os
import subprocess
import sys

# --- 1. Folder structure ---
folders = [
    "threatscan/backend/src/agent",
    "threatscan/backend/src/services",
    "threatscan/backend/src/routes",
    "threatscan/backend/scripts",
    "threatscan/contracts/src",
    "threatscan/contracts/test",
    "threatscan/frontend/app/dashboard",
    "threatscan/frontend/app/findings",
    "threatscan/frontend/app/analytics",
    "threatscan/frontend/components",
    "threatscan/agent"
]

# --- 2. Files with placeholder content ---
files = {
    "threatscan/backend/src/agent/scanner.ts": "// Vulnerability scanner",
    "threatscan/backend/src/agent/verifier.ts": "// Gemini-powered verification",
    "threatscan/backend/src/agent/submitter.ts": "// Submit to blockchain",
    "threatscan/backend/src/services/circleService.ts": "// Circle Wallet/Gateway/Bridge service",
    "threatscan/backend/src/services/x402Service.ts": "// x402 payment handling",
    "threatscan/backend/src/services/blockchainService.ts": "// Arc interaction service",
    "threatscan/backend/src/routes/api.ts": "// REST API endpoints",
    "threatscan/backend/src/routes/webhooks.ts": "// Circle webhooks",
    "threatscan/backend/src/server.ts": "// Main entry point",
    "threatscan/backend/scripts/deployContracts.js": "// Deploy contracts to Arc",
    "threatscan/backend/scripts/runAgentDemo.js": "// Demo agent workflow",
    "threatscan/backend/package.json": "{\n  \"name\": \"threatscan-backend\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {}\n}",
    "threatscan/contracts/src/ThreatBountyRegistry.sol": "// Main bounty contract",
    "threatscan/contracts/src/PaymentEscrow.sol": "// USDC escrow contract",
    "threatscan/contracts/src/AgentReputation.sol": "// Agent staking contract",
    "threatscan/contracts/test/ThreatBounty.t.sol": "// Contract tests",
    "threatscan/contracts/foundry.toml": "# Foundry configuration placeholder",
    "threatscan/frontend/package.json": "{\n  \"name\": \"threatscan-frontend\",\n  \"version\": \"1.0.0\",\n  \"dependencies\": {}\n}",
    "threatscan/frontend/components/ThreatCard.tsx": "// React component placeholder",
    "threatscan/frontend/components/WalletConnect.tsx": "// React component placeholder",
    "threatscan/frontend/components/AgentStatus.tsx": "// React component placeholder",
    "threatscan/agent/scanner.py": "# Python scanning tools",
    "threatscan/agent/gemini_analyzer.py": "# AI analysis",
    "threatscan/agent/requirements.txt": "# Python dependencies\nrequests\nnumpy\npandas",
    "threatscan/README.md": "# ThreatScan\n\nProject README placeholder"
}

# --- 3. Create folders ---
print("Creating folder structure...")
for folder in folders:
    os.makedirs(folder, exist_ok=True)
    print(f"✓ Created folder: {folder}")

# --- 4. Create files ---
print("\nCreating files...")
for file_path, content in files.items():
    with open(file_path, "w") as f:
        f.write(content)
    print(f"✓ Created file: {file_path}")

# --- 5. Install backend Node.js dependencies ---
print("\n" + "="*60)
print("Installing backend Node.js dependencies...")
print("="*60)
try:
    subprocess.run("npm install", shell=True, check=True, cwd="threatscan/backend")
    print("✓ Backend dependencies installed successfully")
except subprocess.CalledProcessError as e:
    print(f"⚠ Warning: npm install failed for backend: {e}")

# --- 6. Install frontend Node.js dependencies ---
print("\n" + "="*60)
print("Installing frontend Node.js dependencies...")
print("="*60)
try:
    subprocess.run("npm install", shell=True, check=True, cwd="threatscan/frontend")
    print("✓ Frontend dependencies installed successfully")
except subprocess.CalledProcessError as e:
    print(f"⚠ Warning: npm install failed for frontend: {e}")

# --- 7. Setup Python virtual environment for agent ---
print("\n" + "="*60)
print("Setting up Python virtual environment for agent...")
print("="*60)
venv_path = os.path.join("threatscan", "agent", "venv")

try:
    # Use 'python' instead of 'python3' for Windows
    subprocess.run(f"python -m venv {venv_path}", shell=True, check=True)
    print(f"✓ Virtual environment created at: {venv_path}")
    
    # Install Python dependencies
    print("\nInstalling Python dependencies...")
    pip_path = os.path.join(venv_path, "Scripts", "pip.exe")
    requirements_path = os.path.join("threatscan", "agent", "requirements.txt")
    
    subprocess.run(f'"{pip_path}" install -r "{requirements_path}"', shell=True, check=True)
    print("✓ Python dependencies installed successfully")
    
    # Activation instructions
    activate_path = os.path.join(venv_path, "Scripts", "activate")
    print(f"\n✓ To activate the Python environment, run:")
    print(f"  {activate_path}")
    
except subprocess.CalledProcessError as e:
    print(f"⚠ Warning: Python venv setup failed: {e}")

# --- 8. Foundry installation info (Windows) ---
print("\n" + "="*60)
print("Foundry Installation (for Solidity contracts)")
print("="*60)
print("⚠ Note: Foundry installation on Windows requires WSL2 or manual setup")
print("\nOption 1 - WSL2 (Recommended):")
print("  1. Install WSL2: wsl --install")
print("  2. Inside WSL2, run: curl -L https://foundry.paradigm.xyz | bash")
print("  3. Then run: foundryup")
print("\nOption 2 - Pre-built binaries:")
print("  Visit: https://github.com/foundry-rs/foundry/releases")
print("  Download forge.exe, cast.exe, anvil.exe for Windows")
print("\nOption 3 - Build from source:")
print("  See: https://book.getfoundry.sh/getting-started/installation")

print("\n" + "="*60)
print("Setup complete! Your ThreatScan project structure is ready.")
print("="*60)
print("\nNext steps:")
print("1. Activate Python venv: threatscan\\agent\\venv\\Scripts\\activate")
print("2. Install Foundry (see instructions above)")
print("3. Start developing!")