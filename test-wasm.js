// Manual WASM smoke test - exercises the format_validation_error export.
// Build the wasm target first: cargo build --release --target wasm32-unknown-unknown --features wasm
import init, { format_validation_error } from './pkg/deka_validation.js';

await init();

console.log('\nTesting WASM Error Formatter\n');

const test1 = format_validation_error(
  "import { serve } from 'deka/invalid';\n\nexport async function handler() {\n  return { ok: true };\n}",
  "handler.ts",
  "Invalid Import",
  1,
  26,
  "Module 'deka/invalid' not found",
  "Available modules: deka, deka/router, deka/sqlite",
  12
);

console.log('Test 1: Invalid Import');
console.log(test1);

const test2 = format_validation_error(
  "import { kv } from 'deka/kv';\n\nexport async function notAllowed() {\n  await kv.put('key', 'value');\n}",
  "handler.ts",
  "Invalid Export",
  3,
  24,
  "Function 'notAllowed' is not allowed",
  "Allowed functions: init, handler, get, post",
  10
);

console.log('\nTest 2: Invalid Export');
console.log(test2);

console.log('\nAll WASM tests completed.\n');
