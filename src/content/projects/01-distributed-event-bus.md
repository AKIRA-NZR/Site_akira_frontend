---
title: "Distributed Event Bus & Queue"
type: "backend"
summary: "Motor de mensageria assíncrona distribuído com garantia de entrega at-least-once, particionamento ordenado e persistência com protocolo Raft."
featured: true
order: 1
technologies:
  - name: "Go"
    version: "1.23"
  - name: "Kafka"
    version: "3.7"
  - name: "Redis"
    version: "7.2"
  - name: "Docker"
    version: "27.0"
metrics:
  throughput: "140k msg/s"
  latency_p99: "1.8ms"
  uptime: "99.99%"
githubUrl: "https://github.com"
liveUrl: "https://github.com"
cliCommand: "go run cmd/node/main.go --cluster-id=prod-core --shards=8 --ack=leader"
cliOutput: "[INFO] Cluster node joined raft group 'core-01' | 8 shards active | 140,240 msg/s | p99: 1.84ms"
---

Motor de mensageria assíncrona projetado para suportar picos de tráfego extremos com latência submilisegundo e réplicas particionadas.
