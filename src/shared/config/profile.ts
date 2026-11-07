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
  spec: string;
  previewImage: ResponsiveImageSet;
  previewCaption: string;
}

export const profile = {
  handle: 'AKIRA',
  title: 'ARQUITETURA & BACK-END',
  specialty: 'SISTEMAS DISTRIBUÍDOS',
  summary: 'APIS RESILIENTES, CONCORRÊNCIA E BAIXA LATÊNCIA.',
  metrics: [
    { value: '99.99%', unit: 'SLA', label: 'UPTIME' },
    { value: '< 12MS', unit: 'P99', label: 'LATÊNCIA' },
    { value: '140K', unit: 'MSG/S', label: 'VAZÃO' },
  ] satisfies MetricHighlight[],
  socials: [
    { label: 'GITHUB', url: 'https://github.com', username: '@AKIRA' },
    { label: 'LINKEDIN', url: 'https://linkedin.com', username: 'IN/AKIRA' },
    { label: 'EMAIL', url: 'mailto:akira.eng@proton.me', username: 'AKIRA.ENG@PROTON.ME' },
  ] satisfies SocialLink[],
  corePrinciples: [
    {
      index: '01',
      title: 'CONCORRÊNCIA & I/O',
      subtitle: 'GO · RUST · TOKIO',
      spec: 'ZERO LOCK CONTENTION',
      previewImage: PHOTO_AKIRA_BIKE_SET,
      previewCaption: 'FIG 01 // CONCORRÊNCIA',
    },
    {
      index: '02',
      title: 'CONSENSO & TOLERÂNCIA',
      subtitle: 'RAFT · IDEMPOTÊNCIA',
      spec: 'AT-LEAST-ONCE DELIVERY',
      previewImage: PHOTO_CRIMSON_MOON_SET,
      previewCaption: 'FIG 02 // CONSENSO',
    },
    {
      index: '03',
      title: 'MODELAGEM & DADOS',
      subtitle: 'POSTGRESQL · REDIS',
      spec: 'ACID SERIALIZABLE',
      previewImage: PHOTO_MOEBIUS_TRUSS_SET,
      previewCaption: 'FIG 03 // TOPOLOGIA',
    },
    {
      index: '04',
      title: 'TELEMETRIA & TRACING',
      subtitle: 'OTEL · PROMETHEUS',
      spec: 'W3C TRACE CONTEXT',
      previewImage: PHOTO_CRIMSON_ONI_SET,
      previewCaption: 'FIG 04 // TELEMETRIA',
    },
  ] satisfies CorePrinciple[],
  stack: [
    { name: 'GO', version: '1.23' },
    { name: 'RUST', version: '1.80' },
    { name: 'NODE / TS', version: '22.4' },
    { name: 'POSTGRESQL', version: '16.3' },
    { name: 'REDIS', version: '7.2' },
    { name: 'KAFKA', version: '3.7' },
    { name: 'DOCKER', version: '27.0' },
    { name: 'KUBERNETES', version: '1.30' },
  ],
};
