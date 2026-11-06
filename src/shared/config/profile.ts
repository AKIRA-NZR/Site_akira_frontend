export interface SocialLink {
  label: string;
  url: string;
  username: string;
  icon: 'github' | 'linkedin' | 'email' | 'twitter' | 'terminal';
}

export interface MetricHighlight {
  value: string;
  unit: string;
  label: string;
  detail: string;
}

export interface ProfileData {
  handle: string;
  name: string;
  title: string;
  specialty: string;
  location: string;
  status: string;
  summary: string;
  fullBio: string[];
  metrics: MetricHighlight[];
  socials: SocialLink[];
  corePrinciples: {
    title: string;
    description: string;
    code: string;
  }[];
}

export const profile: ProfileData = {
  handle: "Akira",
  name: "Akira",
  title: "Engenheiro de Software & Arquiteto Back-end",
  specialty: "Sistemas Distribuídos, Microsserviços & Alta Performance",
  location: "Brasil / Remoto Global",
  status: "Disponível para Projetos Críticos & Arquitetura",
  summary: "Especialista em projetar APIs resilientes, microsserviços desacoplados e infraestruturas com latência previsível e alta vazão.",
  fullBio: [
    "Engenheiro de software com foco absoluto em engenharia de sistemas robustos, bancos de dados de alta concorrência e arquitetura orientada a eventos.",
    "Acredito que simplicidade e observabilidade superam complexidade artificial. Desenvolvo contratos de API rigorosos, pipelines de mensageria com garantia de entrega e sistemas tolerantes a falhas.",
    "Experiência com linguagens de alta concorrência (Go, Node/TypeScript, Rust), bancos relacionais (PostgreSQL) e NoSQL distribuídos (Redis, MongoDB), além de conteinerização com Docker e orquestração moderna."
  ],
  metrics: [
    {
      value: "99.99%",
      unit: "SLA",
      label: "Disponibilidade de Sistemas",
      detail: "Arquiteturas com failover automático e circuit breakers"
    },
    {
      value: "< 12ms",
      unit: "p99",
      label: "Latência em Produção",
      detail: "Otimização de queries, pooling de conexões e cacheamento"
    },
    {
      value: "100%",
      unit: "Type-Safe",
      label: "Contratos de Engenharia",
      detail: "Schemas Zod, validação estrita e observabilidade OpenTelemetry"
    }
  ],
  socials: [
    {
      label: "GitHub",
      url: "https://github.com",
      username: "@akira-dev",
      icon: "github"
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com",
      username: "in/akira-backend",
      icon: "linkedin"
    },
    {
      label: "Email",
      url: "mailto:akira.eng@proton.me",
      username: "akira.eng@proton.me",
      icon: "email"
    }
  ],
  corePrinciples: [
    {
      title: "Consistência & Tolerância a Falhas",
      description: "Implementação de padrões de idempotência, sagas distribuídas e filas de mensagens resilientes.",
      code: "pattern: Saga / Outbox | guarantee: At-Least-Once"
    },
    {
      title: "Modelagem Relacional Rigorosa",
      description: "Bancos normalizados, isolamento ACID, índices balanceados e consultas com custo e plano de execução auditados.",
      code: "db: PostgreSQL 16 | explain: analyze | index: B-Tree"
    },
    {
      title: "Observabilidade & Métricas em Tempo Real",
      description: "Tracing distribuído ponta a ponta, métricas de taxa de erro, tráfego, saturação e alertas proativos.",
      code: "stack: Prometheus + Grafana + OpenTelemetry"
    }
  ]
};
