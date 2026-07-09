#!/usr/bin/env node
import '../src/env.js';
import { spawnSync } from 'node:child_process';
import { generate } from '../src/IntentionProcessor.js';
import { testDN, composeAuthenticatedHistogram } from '../src/run-demo.js';

function usage() {
  console.log(`intention-demo

Commands:
  check-ollama
  generate login
  generate histogram
  test login
  test histogram
  compose authenticated-histogram
  demo-recording
`);
}

function run(cmd, args = []) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

async function main() {
  const [command, arg] = process.argv.slice(2);
  try {
    if (!command) return usage();
    if (command === 'check-ollama') {
      console.log('Checking Ollama...');
      run('ollama', ['--version']);
      console.log('Pulling default model gemma4 if needed...');
      run('ollama', ['pull', process.env.OLLAMA_MODEL || 'gemma4']);
      return;
    }
    if (command === 'generate') return generate(arg);
    if (command === 'test') return testDN(arg);
    if (command === 'compose' && arg === 'authenticated-histogram') return composeAuthenticatedHistogram();
    if (command === 'demo-recording') {
      console.log('\n--- INTENTION PROCESSOR: LOGIN DN ---');
      await generate('login');
      console.log('\n--- INTENTION CONTAINER: LOGIN RUNTIME ---');
      await testDN('login');
      console.log('\n--- INTENTION PROCESSOR: HISTOGRAM DN ---');
      await generate('histogram');
      console.log('\n--- INTENTION CONTAINER: HISTOGRAM RUNTIME ---');
      await testDN('histogram');
      console.log('\n--- SIGNAL COMPOSITION RUNTIME ---');
      await composeAuthenticatedHistogram();
      return;
    }
    usage();
  } catch (error) {
    console.error(`\n[demo-error] ${error.message}`);
    process.exit(1);
  }
}

main();
