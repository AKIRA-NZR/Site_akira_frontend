---
title: "DISTRIBUTED EVENT BUS"
type: "backend"
summary: "MENSAGERIA ASSÍNCRONA COM CONSENSO RAFT."
featured: true
order: 1
technologies:
  - name: "GO"
    version: "1.23"
  - name: "KAFKA"
    version: "3.7"
  - name: "REDIS"
    version: "7.2"
metrics:
  throughput: "140K MSG/S"
  latency_p99: "1.8MS"
  uptime: "99.99%"
githubUrl: "https://github.com"
cliCommand: "go run cmd/node/main.go --shards=8 --raft"
cliOutput: "[OK] 8 SHARDS ACTIVE | 140,240 MSG/S | P99: 1.84MS"
---
