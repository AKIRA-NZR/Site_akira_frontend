---
title: "FINANCIAL LEDGER ENGINE"
type: "backend"
summary: "MOTOR CONTÁBIL ACID COM IDEMPOTÊNCIA."
featured: true
order: 3
technologies:
  - name: "TYPESCRIPT"
    version: "5.5"
  - name: "NODE.JS"
    version: "22.4"
  - name: "POSTGRESQL"
    version: "16.3"
metrics:
  throughput: "12K TX/S"
  latency_p99: "4.2MS"
  uptime: "99.999%"
githubUrl: "https://github.com/VoidCube-Tech"
cliCommand: "npm run worker -- --isolation=serializable"
cliOutput: "[OK] 0 DRIFT | ACID SERIALIZABLE | 12,400 TX/S"
---
