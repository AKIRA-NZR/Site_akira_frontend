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

export interface CorePrinciple {
  title: string;
  subtitle: string;
  previewImage: ResponsiveImageSet;
  previewCaption: string;
  codeFileName: string;
  codeLines: string[];
}

export interface DevTool {
  name: string;
  category: string;
  icon: string;
}

export const profile = {
  handle: 'AKIRA',
  title: 'DESENVOLVEDOR BACK-END & ARQUITETURA DE SOFTWARE',
  intro: {
    welcome: 'OLÁ, SOU O AKIRA.',
    bio: 'BEM-VINDO AO MEU ESPAÇO PESSOAL. SOU DESENVOLVEDOR BACK-END E ENTUSIASTA DE ARQUITETURA DE SOFTWARE. AQUI COMPARTILHO MEUS PROJETOS, ESTUDOS E FERRAMENTAS QUE UTILIZO NO DIA A DIA.',
    opportunity: 'ABERTO A NOVAS OPORTUNIDADES.',
  },
  about: {
    title: 'SOBRE.',
    description: 'DESENVOLVER PRA MIM FOI COMO CAIR DE PARAQUEDAS, MAS AO DECORRER DO TEMPO PUDE MOSTRAR DO QUE SOU CAPAZ. AQUI ESTÁ UM POUCO SOBRE MINHA JORNADA E AS FERRAMENTAS QUE UTILIZO NO DIA A DIA.',
  },
  socials: [
    { label: 'GITHUB', url: 'https://github.com/AKIRA-NZR', username: 'AKIRA-NZR' },
    { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/deyvid-alves-774a94246/', username: 'DEYVID-ALVES' },
    { label: 'INSTAGRAM', url: 'https://instagram.com/akir4_nzr', username: 'AKIR4_NZR' },
    { label: 'EMAIL', url: 'mailto:dkaua0955@gmail.com', username: 'DKAUA0955@GMAIL.COM' },
  ] satisfies SocialLink[],
  tools: [
    { name: 'JAVA', category: 'LINGUAGEM', icon: 'java' },
    { name: 'SPRING BOOT', category: 'FRAMEWORK', icon: 'springboot' },
    { name: 'POSTGRESQL', category: 'BANCO DE DADOS', icon: 'postgresql' },
    { name: 'DOCKER', category: 'CONTAINERS', icon: 'docker' },
    { name: 'GRADLE', category: 'BUILD TOOL', icon: 'gradle' },
    { name: 'GIT', category: 'VERSIONAMENTO', icon: 'git' },
    { name: 'ASTRO', category: 'FRONTEND', icon: 'astro' },
    { name: 'NOTION', category: 'PRODUTIVIDADE', icon: 'notion' },
    { name: 'OBSIDIAN', category: 'NOTAS & PKM', icon: 'obsidian' },
    { name: 'SLACK', category: 'COMUNICAÇÃO', icon: 'slack' },
  ] satisfies DevTool[],
  corePrinciples: [
    {
      title: 'ARQUITETURA DE BACK-END',
      subtitle: 'JAVA · SPRING BOOT · REST',
      previewImage: PHOTO_AKIRA_BIKE_SET,
      previewCaption: 'ESTRUTURAÇÃO DE MICROSSERVIÇOS',
      codeFileName: 'TENANTCONTEXTFILTER.JAVA',
      codeLines: [
        '@COMPONENT',
        'PUBLIC CLASS TENANTFILTER EXTENDS ONCEPERREQUESTFILTER {',
        '  @OVERRIDE',
        '  PROTECTED VOID DOFILTERINTERNAL(HTTPREQUEST REQ, ...) {',
        '    STRING TENANTID = REQ.GETHEADER("X-TENANT-ID");',
        '    TENANTCONTEXT.SETCURRENTTENANT(TENANTID);',
        '    CHAIN.DOFILTER(REQ, RES);',
        '  }',
        '}',
      ],
    },
    {
      title: 'PERSISTÊNCIA & MODELAGEM',
      subtitle: 'POSTGRESQL · TRANSAÇÕES ACID',
      previewImage: PHOTO_MOEBIUS_TRUSS_SET,
      previewCaption: 'MODELAGEM DE DADOS RELACIONAL',
      codeFileName: 'V1__INIT_MULTI_TENANT.SQL',
      codeLines: [
        'CREATE TABLE TENANT_PRODUCTS (',
        '  ID UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),',
        '  TENANT_ID UUID NOT NULL REFERENCES TENANTS(ID),',
        '  SKU VARCHAR(64) NOT NULL,',
        '  STOCK_QTY INT NOT NULL CHECK (STOCK_QTY >= 0),',
        '  UNIQUE (TENANT_ID, SKU)',
        ');',
        'CREATE INDEX IDX_TENANT_SKU ON TENANT_PRODUCTS(TENANT_ID);',
      ],
    },
    {
      title: 'CONTÊINERES & AUTOMAÇÃO',
      subtitle: 'DOCKER · GRADLE · CI/CD',
      previewImage: PHOTO_CRIMSON_MOON_SET,
      previewCaption: 'IMPLANTAÇÃO & AMBIENTES',
      codeFileName: 'COMPOSE.YAML',
      codeLines: [
        'SERVICES:',
        '  POSTGRES:',
        '    IMAGE: POSTGRES:16-ALPINE',
        '    PORTS: ["5433:5432"]',
        '    ENVIRONMENT:',
        '      POSTGRES_DB: VOIDCUBE_DEV',
        '    HEALTHCHECK:',
        '      TEST: ["CMD-SHELL", "PG_ISREADY -U POSTGRES"]',
      ],
    },
    {
      title: 'ORGANIZAÇÃO & FLUXO',
      subtitle: 'NOTION · OBSIDIAN · GIT',
      previewImage: PHOTO_CRIMSON_ONI_SET,
      previewCaption: 'GESTÃO DE CONHECIMENTO',
      codeFileName: 'WORKFLOW.SH',
      codeLines: [
        '❯ GIT CHECKOUT -B FEAT/MULTI-TENANT-ISOLATION',
        '❯ ./GRADLEW CLEAN TEST --INFO',
        '  BUILD SUCCESSFUL IN 4S (28 ACTIONABLE TASKS)',
        '❯ GIT COMMIT -M "FEAT(CORE): ISOLATE TENANT CONTEXT"',
        '❯ GIT PUSH ORIGIN FEAT/MULTI-TENANT-ISOLATION',
      ],
    },
  ] satisfies CorePrinciple[],
};
