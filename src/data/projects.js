const base = [
  {
    id: "nimbus-orchestrator",
    tech: ["React", "TypeScript", "Node.js", "Kubernetes", "gRPC", "Redis"],
    links: { live: "#", repo: "#" },
    text: {
      pt: {
        title: "Nimbus Orchestrator",
        tagline: "Plataforma de orquestração de microsserviços em tempo real",
        description:
          "Painel de controle para orquestrar e monitorar microsserviços distribuídos em múltiplos clusters Kubernetes. Inclui deploy canário automatizado, rollback com um clique e visualização de topologia de serviços em tempo real, reduzindo o tempo médio de recuperação de incidentes em 68%.",
        media: [
          { type: "banner", label: "Visão geral do dashboard" },
          { type: "screenshot", label: "Topologia de serviços" },
          { type: "screenshot", label: "Deploy canário em andamento" },
          { type: "video", label: "Demo: rollback em um clique" },
        ],
      },
      en: {
        title: "Nimbus Orchestrator",
        tagline: "Real-time microservices orchestration platform",
        description:
          "Control panel to orchestrate and monitor distributed microservices across multiple Kubernetes clusters. Includes automated canary deployments, one-click rollback, and real-time service topology visualization, cutting average incident recovery time by 68%.",
        media: [
          { type: "banner", label: "Dashboard overview" },
          { type: "screenshot", label: "Service topology" },
          { type: "screenshot", label: "Canary deployment in progress" },
          { type: "video", label: "Demo: one-click rollback" },
        ],
      },
      ja: {
        title: "Nimbus Orchestrator",
        tagline: "リアルタイムマイクロサービスオーケストレーションプラットフォーム",
        description:
          "複数のKubernetesクラスター上に分散されたマイクロサービスをオーケストレーション・監視するコントロールパネル。自動カナリアデプロイ、ワンクリックロールバック、リアルタイムのサービストポロジー可視化を備え、平均インシデント復旧時間を68%削減しました。",
        media: [
          { type: "banner", label: "ダッシュボード概要" },
          { type: "screenshot", label: "サービストポロジー" },
          { type: "screenshot", label: "カナリアデプロイ実行中" },
          { type: "video", label: "デモ：ワンクリックロールバック" },
        ],
      },
    },
  },
  {
    id: "pulse-analytics",
    tech: ["Next.js", "ClickHouse", "Kafka", "Go", "D3.js"],
    links: { live: "#", repo: "#" },
    text: {
      pt: {
        title: "Pulse Analytics",
        tagline: "Motor de analytics de produto com insights em tempo real",
        description:
          "SDK e dashboard de product analytics construídos para alta cardinalidade de eventos. Processa milhões de eventos por dia com pipelines de streaming, oferecendo funis, coortes e alertas de anomalia configuráveis sem necessidade de SQL.",
        media: [
          { type: "banner", label: "Dashboard de funis" },
          { type: "screenshot", label: "Análise de coortes" },
          { type: "screenshot", label: "Alertas de anomalia" },
          { type: "video", label: "Demo: construção de funil ao vivo" },
        ],
      },
      en: {
        title: "Pulse Analytics",
        tagline: "Product analytics engine with real-time insights",
        description:
          "Product analytics SDK and dashboard built for high event cardinality. Processes millions of events per day through streaming pipelines, offering funnels, cohorts, and configurable anomaly alerts with no SQL required.",
        media: [
          { type: "banner", label: "Funnel dashboard" },
          { type: "screenshot", label: "Cohort analysis" },
          { type: "screenshot", label: "Anomaly alerts" },
          { type: "video", label: "Demo: building a funnel live" },
        ],
      },
      ja: {
        title: "Pulse Analytics",
        tagline: "リアルタイムインサイトを備えたプロダクト分析エンジン",
        description:
          "高カーディナリティのイベントに対応したプロダクト分析SDK・ダッシュボード。ストリーミングパイプラインで日々数百万件のイベントを処理し、SQL不要でファネル、コホート、異常検知アラートを設定可能にします。",
        media: [
          { type: "banner", label: "ファネルダッシュボード" },
          { type: "screenshot", label: "コホート分析" },
          { type: "screenshot", label: "異常検知アラート" },
          { type: "video", label: "デモ：ライブでのファネル作成" },
        ],
      },
    },
  },
  {
    id: "aurora-commerce",
    tech: ["Remix", "GraphQL", "Python", "PostgreSQL", "Stripe", "Docker"],
    links: { live: "#", repo: "#" },
    text: {
      pt: {
        title: "Aurora Commerce",
        tagline: "Headless commerce com personalização por IA",
        description:
          "Plataforma de e-commerce headless com motor de recomendação próprio, checkout otimizado para conversão e suporte a múltiplas vitrines (web, app, totens). A personalização via modelo de recomendação elevou o ticket médio em 23%.",
        media: [
          { type: "banner", label: "Vitrine personalizada" },
          { type: "screenshot", label: "Fluxo de checkout" },
          { type: "screenshot", label: "Painel de recomendações" },
          { type: "video", label: "Demo: jornada de compra completa" },
        ],
      },
      en: {
        title: "Aurora Commerce",
        tagline: "Headless commerce with AI-powered personalization",
        description:
          "Headless e-commerce platform with an in-house recommendation engine, conversion-optimized checkout, and support for multiple storefronts (web, app, kiosks). Recommendation-driven personalization boosted average order value by 23%.",
        media: [
          { type: "banner", label: "Personalized storefront" },
          { type: "screenshot", label: "Checkout flow" },
          { type: "screenshot", label: "Recommendations panel" },
          { type: "video", label: "Demo: full purchase journey" },
        ],
      },
      ja: {
        title: "Aurora Commerce",
        tagline: "AIによるパーソナライズを備えたヘッドレスコマース",
        description:
          "独自のレコメンデーションエンジン、コンバージョンに最適化されたチェックアウト、複数の店舗フォーマット（Web、アプリ、キオスク）に対応したヘッドレスEコマースプラットフォーム。レコメンデーションモデルによるパーソナライズで平均注文額が23%向上しました。",
        media: [
          { type: "banner", label: "パーソナライズされた店舗" },
          { type: "screenshot", label: "チェックアウトフロー" },
          { type: "screenshot", label: "レコメンデーションパネル" },
          { type: "video", label: "デモ：購入体験の全体フロー" },
        ],
      },
    },
  },
];

export function getProjects(lang = "pt") {
  return base.map(({ id, tech, links, text }) => ({
    id,
    tech,
    links,
    ...(text[lang] ?? text.pt),
  }));
}
