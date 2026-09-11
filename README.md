# deka-validation

Shared validation and error formatting logic for the Deka runtime and the `dsc` compiler.

## Overview

`deka-validation` provides the error formatting used across Deka's Rust codebases so
diagnostics look and behave identically wherever they are produced. It compiles as a
native Rust crate and, with the `wasm` feature, to WebAssembly for browser and Bun/Node
tooling (the deka.gg playground, CLI helpers).

## Error format

```
Validation Error
❌ Invalid Import

    ┌─ handler.ts:1:26
    │
  1 │ import { serve } from 'deka/invalid';
    │                          ^^^^^^^^^^^^ Module 'deka/invalid' not found
    │
    = help: Available modules: deka, deka/router, deka/sqlite
    │
    └─
```

## Usage

### Rust

```toml
[dependencies]
deka-validation = "0.2"
```

```rust
use deka_validation::format_validation_error;

let error = format_validation_error(
    "import { serve } from 'deka/invalid';",
    "handler.ts",
    "Invalid Import",
    1,
    26,
    "Module 'deka/invalid' not found",
    "Available modules: deka, deka/router, deka/sqlite",
    12,
);

println!("{}", error);
```

### WebAssembly

```bash
cargo build --release --target wasm32-unknown-unknown --features wasm
```

Enable the `wasm` feature to build a `format_validation_error` binding usable from
JavaScript/TypeScript via `wasm-bindgen`.

## Used by

- **deka runtime** (`dekaruntime/deka`) — native Rust, validates PHPX/DekaScript source
- **dsc** (`dekaruntime/dsc`) — the DekaScript compiler
- **deka.gg playground** — WASM build, browser-side validation

This crate is the single source of truth for that error formatting. The deka and dsc
repositories consume it as a published `deka-validation` crates.io dependency rather than
vendoring a copy — changes land here first.

## Development

```bash
cargo test
```

## License

Licensed under Apache-2.0. See [LICENSE](./LICENSE).
