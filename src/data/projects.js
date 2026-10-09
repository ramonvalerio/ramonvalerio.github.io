export const projects = [
  {
    id: "nimbus-orchestrator",
    title: "Nimbus Orchestrator",
    tagline: "Plataforma de orquestração de microsserviços em tempo real",
    description:
      "Painel de controle para orquestrar e monitorar microsserviços distribuídos em múltiplos clusters Kubernetes. Inclui deploy canário automatizado, rollback com um clique e visualização de topologia de serviços em tempo real, reduzindo o tempo médio de recuperação de incidentes em 68%.",
    tech: ["React", "TypeScript", "Node.js", "Kubernetes", "gRPC", "Redis"],
    media: [
      { type: "banner", label: "Visão geral do dashboard" },
      { type: "screenshot", label: "Topologia de serviços" },
      { type: "screenshot", label: "Deploy canário em andamento" },
      { type: "video", label: "Demo: rollback em um clique" },
    ],
    links: {
      live: "#",
      repo: "#",
    },
  },
  {
    id: "pulse-analytics",
    title: "Pulse Analytics",
    tagline: "Motor de analytics de produto com insights em tempo real",
    description:
      "SDK e dashboard de product analytics construídos para alta cardinalidade de eventos. Processa milhões de eventos por dia com pipelines de streaming, oferecendo funis, coortes e alertas de anomalia configuráveis sem necessidade de SQL.",
    tech: ["Next.js", "ClickHouse", "Kafka", "Go", "D3.js"],
    media: [
      { type: "banner", label: "Dashboard de funis" },
      { type: "screenshot", label: "Análise de coortes" },
      { type: "screenshot", label: "Alertas de anomalia" },
      { type: "video", label: "Demo: construção de funil ao vivo" },
    ],
    links: {
      live: "#",
      repo: "#",
    },
  },
  {
    id: "aurora-commerce",
    title: "Aurora Commerce",
    tagline: "Headless commerce com personalização por IA",
    description:
      "Plataforma de e-commerce headless com motor de recomendação próprio, checkout otimizado para conversão e suporte a múltiplas vitrines (web, app, totens). A personalização via modelo de recomendação elevou o ticket médio em 23%.",
    tech: ["Remix", "GraphQL", "Python", "PostgreSQL", "Stripe", "Docker"],
    media: [
      { type: "banner", label: "Vitrine personalizada" },
      { type: "screenshot", label: "Fluxo de checkout" },
      { type: "screenshot", label: "Painel de recomendações" },
      { type: "video", label: "Demo: jornada de compra completa" },
    ],
    links: {
      live: "#",
      repo: "#",
    },
  },
];
