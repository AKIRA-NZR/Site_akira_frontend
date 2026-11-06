---
title: "Reverse Proxy & API Gateway"
type: "backend"
summary: "API Gateway reativo em Rust com token-bucket rate limiter distribuído, balanceamento de carga ponderado e terminação mTLS zero-overhead."
featured: true
order: 2
technologies:
  - name: "Rust"
    version: "1.80"
  - name: "Tokio"
    version: "1.38"
  - name: "PostgreSQL"
    version: "16.3"
  - name: "OpenTelemetry"
    version: "0.24"
metrics:
  throughput: "85k req/s"
  latency_p99: "0.6ms"
  uptime: "99.999%"
githubUrl: "https://github.com"
cliCommand: "cargo run --release -- --config config/edge-gateway.toml --mtls"
cliOutput: "[GATEWAY] Listening on 0.0.0.0:8443 (HTTP/2, HTTP/3) | Upstream pool: 12 nodes | p99: 620µs"
---

Gateway reativo desenvolvido para proteger microsserviços internos, aplicando rate limiting em memória distribuída com Redis e exportando traces no padrão W3C.
