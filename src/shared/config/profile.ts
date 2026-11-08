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
  title: string;
  subtitle: string;
  spec: string;
  previewImage: ResponsiveImageSet;
  previewCaption: string;
}

export const profile = {
  handle: 'AKIRA',
  title: 'ENGENHEIRO DE SOFTWARE & ARQUITETO BACK-END',
  specialty: 'SISTEMAS DISTRIBUÍDOS & ALTA PERFORMANCE',
  intro: {
    headline: 'ARQUITETURA DE SOFTWARE & ENGENHARIA BACK-END',
    bio: 'DESENVOLVO SISTEMAS DISTRIBUÍDOS RESILIENTES, MICROSSERVIÇOS DE BAIXA LATÊNCIA E INFRAESTRUTURAS ESCALÁVEIS. FOCO EM CONCORRÊNCIA, CONTRATOS ESTRITOS E DISPONIBILIDADE CONTÍNUA SOB CARGA CRÍTICA.',
    location: 'BRASIL // REMOTO GLOBAL',
    availability: 'DISPONÍVEL PARA PROJETOS & CONSULTORIA',
  },
  socials: [
    { label: 'GITHUB', url: 'https://github.com/AKIRA-NZR', username: 'AKIRA-NZR' },
    { label: 'VOIDCUBE', url: 'https://github.com/VoidCube-Tech', username: 'VOIDCUBE-TECH' },
    { label: 'INSTAGRAM', url: 'https://instagram.com/akir4_nzr', username: 'AKIR4_NZR' },
    { label: 'EMAIL', url: 'mailto:akira.eng@proton.me', username: 'AKIRA.ENG@PROTON.ME' },
  ] satisfies SocialLink[],
  corePrinciples: [
    {
      title: 'CONCORRÊNCIA & I/O',
      subtitle: 'GO · RUST · TOKIO',
      spec: 'ZERO LOCK CONTENTION',
      previewImage: PHOTO_AKIRA_BIKE_SET,
      previewCaption: 'CONCORRÊNCIA & SHARDING',
    },
    {
      title: 'CONSENSO & RESILIÊNCIA',
      subtitle: 'RAFT · IDEMPOTÊNCIA',
      spec: 'AT-LEAST-ONCE DELIVERY',
      previewImage: PHOTO_CRIMSON_MOON_SET,
      previewCaption: 'CONSENSO DISTRIBUÍDO',
    },
    {
      title: 'MODELAGEM & DADOS',
      subtitle: 'POSTGRESQL · REDIS',
      spec: 'ACID SERIALIZABLE',
      previewImage: PHOTO_MOEBIUS_TRUSS_SET,
      previewCaption: 'TOPOLOGIA DE PERSISTÊNCIA',
    },
    {
      title: 'TELEMETRIA & TRACING',
      subtitle: 'OTEL · PROMETHEUS',
      spec: 'W3C TRACE CONTEXT',
      previewImage: PHOTO_CRIMSON_ONI_SET,
      previewCaption: 'OBSERVABILIDADE DISTRIBUÍDA',
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
