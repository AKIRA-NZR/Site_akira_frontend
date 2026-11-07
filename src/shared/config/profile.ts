import {
  PHOTO_AKIRA_BIKE_SET,
  PHOTO_CRIMSON_MOON_SET,
  PHOTO_CRIMSON_ONI_SET,
  PHOTO_MOEBIUS_TRUSS_SET,
  type ResponsiveImageSet,
} from '../media/frontImages';

export interface SocialLink {
  label: string;
  url: string;
  username: string;
}

export interface MetricHighlight {
  value: string;
  unit: string;
  label: string;
}

export interface CorePrinciple {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  spec: string;
  previewImage: ResponsiveImageSet;
  previewCaption: string;
}

export interface ProfileData {
  handle: string;
  name: string;
  title: string;
  specialty: string;
  location: string;
  status: string;
  summary: string;
  bioContext: string;
  metrics: MetricHighlight[];
  socials: SocialLink[];
  corePrinciples: CorePrinciple[];
}

export const profile: ProfileData = {
  handle: 'Akira',
  name: 'Akira',
  title: 'Engenheiro de Software & Arquiteto Back-end',
  specialty: 'Sistemas Distribuídos, Concorrência & Alta Vazão',
  location: 'Brasil // Operação Remota',
  status: 'Disponível para Arquitetura & Sistemas Críticos',
  summary:
    'Projeto APIs resilientes, motores de mensageria assíncrona e bancos de dados distribuídos com latência p99 previsível sob alta carga.',
  bioContext:
    'Engenharia orientada a contratos estritos, isolamento de falhas e observabilidade de ponta a ponta sem complexidade acidental.',
  metrics: [
    {
      value: '99.99%',
      unit: 'SLA',
      label: 'Disponibilidade em Produção',
    },
    {
      value: '< 12ms',
      unit: 'p99',
      label: 'Latência sob Carga',
    },
    {
      value: '140k+',
      unit: 'msg/s',
      label: 'Vazão Assíncrona',
    },
  ],
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com',
      username: 'github.com/akira',
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com',
      username: 'linkedin.com/in/akira',
    },
    {
      label: 'E-mail',
      url: 'mailto:akira.eng@proton.me',
      username: 'akira.eng@proton.me',
    },
  ],
  corePrinciples: [
    {
      index: '01',
      title: 'Concorrência & I/O Não-Bloqueante',
      subtitle: 'Go · Rust · Event Loops',
      description:
        'Pipelines assíncronos com controle estrito de backpressure, zero contenção de locks e alocação previsível em memória.',
      spec: 'runtime: Go 1.23 / Tokio | scheduler: work-stealing',
      previewImage: PHOTO_AKIRA_BIKE_SET,
      previewCaption: 'FIG 01 // EXECUÇÃO CONCORRENTE DE ALTA VELOCIDADE',
    },
    {
      index: '02',
      title: 'Consistência & Tolerância a Falhas',
      subtitle: 'Raft · Outbox Pattern · Idempotência',
      description:
        'Garantia de entrega at-least-once, chaves de idempotência UUIDv7 e isolamento transacional em operações financeiras críticas.',
      spec: 'consensus: Raft | isolation: SERIALIZABLE',
      previewImage: PHOTO_CRIMSON_MOON_SET,
      previewCaption: 'FIG 02 // ISOLAMENTO E CONSENSO DISTRIBUÍDO',
    },
    {
      index: '03',
      title: 'Modelagem Relacional & Particionamento',
      subtitle: 'PostgreSQL · Redis · ClickHouse',
      description:
        'Esquemas normalizados, índices compostos auditados via plano de execução e cache distribuído com invalidação atômica.',
      spec: 'storage: PG 16 + Redis 7.2 | index: B-Tree / GIN',
      previewImage: PHOTO_MOEBIUS_TRUSS_SET,
      previewCaption: 'FIG 03 // TOPOLOGIA DE DADOS E PARTICIONAMENTO',
    },
    {
      index: '04',
      title: 'Telemetria & Observabilidade RED',
      subtitle: 'OpenTelemetry · Prometheus · Tracing',
      description:
        'Rastreamento distribuído W3C ponta a ponta correlacionando taxa de requisições, erros e histogramas de duração.',
      spec: 'telemetry: OTel v1.27 | metrics: p50 / p95 / p99',
      previewImage: PHOTO_CRIMSON_ONI_SET,
      previewCaption: 'FIG 04 // INSPEÇÃO DE TRACES EM TEMPO REAL',
    },
  ],
};
