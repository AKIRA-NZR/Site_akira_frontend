---
title: "Double-Entry Financial Ledger"
type: "backend"
summary: "Motor contábil imutável com isolamento serializable no PostgreSQL, idempotência estrita via chaves UUID v7 e reconciliação em tempo real."
featured: true
order: 3
technologies:
  - name: "TypeScript"
    version: "5.5"
  - name: "Node.js"
    version: "22.4"
  - name: "PostgreSQL"
    version: "16.3"
  - name: "Zod"
    version: "3.23"
metrics:
  throughput: "12k tx/s"
  latency_p99: "4.2ms"
  uptime: "99.999%"
githubUrl: "https://github.com"
cliCommand: "npm run start:worker -- --queue=settlement --audit-log=enabled"
cliOutput: "[LEDGER] 0 balance drift detected | Audit lock verified | ACID level: SERIALIZABLE | 12,400 tx/s"
---

Sistema contábil com partidas dobradas garantindo integridade matemática em transações financeiras de alta complexidade.
