---
title: "EDGE API GATEWAY"
type: "backend"
summary: "PROXY REATIVO MTLS ZERO-OVERHEAD."
featured: true
order: 2
technologies:
  - name: "RUST"
    version: "1.80"
  - name: "TOKIO"
    version: "1.38"
  - name: "OTEL"
    version: "0.24"
metrics:
  throughput: "85K REQ/S"
  latency_p99: "0.6MS"
  uptime: "99.999%"
githubUrl: "https://github.com/AKIRA-NZR"
cliCommand: "cargo run --release -- --mtls"
cliOutput: "[OK] HTTP/3 0.0.0.0:8443 | P99: 620µS"
---
