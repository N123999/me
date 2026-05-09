const { spawn } = require("node:child_process");

const deployArgs = process.argv.slice(2);
const CLOUDFLARE_DEPLOY_ENV_KEYS = [
  "CLOUDFLARE_API_TOKEN",
  "CLOUDFLARE_ACCOUNT_ID",
  "CF_API_TOKEN",
  "CF_ACCOUNT_ID",
];

function getExecutable(name) {
  return process.platform === "win32" ? `${name}.cmd` : name;
}

function runCommand(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env,
      shell: process.platform === "win32",
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      if (signal) {
        reject(new Error(`Command terminated by signal ${signal}: ${command} ${args.join(" ")}`));
        return;
      }

      reject(new Error(`Command failed with exit code ${code}: ${command} ${args.join(" ")}`));
    });
  });
}

function getBuildEnv() {
  const buildEnv = { ...process.env };

  for (const key of CLOUDFLARE_DEPLOY_ENV_KEYS) {
    delete buildEnv[key];
  }

  return buildEnv;
}

function ensureDeployEnv() {
  const missing = ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID"].filter(
    (key) => !process.env[key],
  );

  if (missing.length > 0) {
    throw new Error(`Missing environment variable${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`);
  }
}

async function main() {
  await runCommand(getExecutable("npx"), ["opennextjs-cloudflare", "build"], getBuildEnv());
  ensureDeployEnv();
  await runCommand(getExecutable("npx"), ["opennextjs-cloudflare", "deploy", ...deployArgs], process.env);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});