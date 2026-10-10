const base = [
  {
    id: "shmupx",
    image: "/images/projects/shmupx/logo.png",
    background: "/images/projects/shmupx/background.jpg",
    logoBackground: "/images/projects/shmupx/modal-background.jpg",
    tech: ["Rust", "Tauri v2", "ONNX Runtime", "PostgreSQL", "pgvector", "Claude Code"],
    links: { live: "#", repo: "#" },
    status: "in_progress",
    startDate: "2024-12",
    text: {
      pt: {
        title: "ShmupX",
        role: "Engenheiro de Software Sênior & Fundador na ShmupX | C#/.NET, Sistemas Distribuídos e IA Aplicada",
        startDateLabel: "Dezembro de 2024",
        statusLabel: "Em andamento",
        tagline:
          "Plataforma internacional de esports e ecossistema desktop para o gênero shoot 'em up",
        description:
          "Fundador da ShmupX, uma plataforma internacional de esports e ecossistema desktop dedicado ao gênero shoot 'em up (shmup), responsável pela estratégia de produto, arquitetura de software e desenvolvimento ponta a ponta. Apliquei Spec-Driven Development e Architecture Decision Records (ADRs) para guiar o desenvolvimento assistido por IA com Claude Code, apoiado por avaliações automatizadas e revisão de código. Liderei a reescrita do desktop de WinUI 3 para Rust e Tauri v2, reduzindo o uso de memória em repouso em 70% e o tamanho da aplicação para menos de 25 MB. Construí integrações nativas para Windows e Linux de processamento de áudio, entrada de controle em segundo plano e gravação contínua de gameplay para suportar a integridade competitiva. Desenvolvi um pipeline local de visão computacional com ONNX Runtime em Rust para processamento de frames do jogo e reconhecimento de pontuação, viabilizando a verificação automatizada de recordes. Projetei modelos de dados em PostgreSQL com salvaguardas transacionais para rankings e saldos de tokens, e implementei RAG específico do jogo com pgvector para tutores de voz com IA.",
      },
      en: {
        title: "ShmupX",
        role: "Senior Software Engineer & Founder at ShmupX | C#/.NET, Distributed Systems & Applied AI",
        startDateLabel: "December 2024",
        statusLabel: "In progress",
        tagline:
          "International esports platform and desktop ecosystem for the shoot 'em up genre",
        description:
          "Founder of ShmupX, an international esports platform and desktop ecosystem dedicated to the shoot 'em up (shmup) genre, responsible for product strategy, software architecture, and end-to-end development. Applied Spec-Driven Development and Architecture Decision Records (ADRs) to guide AI-assisted implementation with Claude Code, supported by automated evaluations and code review. Led the desktop rewrite from WinUI 3 to Rust and Tauri v2, reducing idle memory usage by 70% and application size to under 25 MB. Built native Windows and Linux integrations for audio processing, background controller input, and continuous gameplay recording to support competitive integrity. Developed a local ONNX Runtime computer-vision pipeline in Rust for game-frame processing and score recognition, enabling automated high-score verification. Designed PostgreSQL data models with transactional safeguards for rankings and token balances, and implemented game-specific RAG with pgvector to power AI voice tutors.",
      },
      ja: {
        title: "ShmupX",
        role: "シニアソフトウェアエンジニア 兼 ShmupX創業者 | C#/.NET、分散システム、応用AI",
        startDateLabel: "2024年12月",
        statusLabel: "進行中",
        tagline:
          "シューティングゲーム（shmup）ジャンルに特化した国際eスポーツプラットフォーム兼デスクトップエコシステム",
        description:
          "ShmupXの創業者として、シューティングゲーム（shmup）ジャンルに特化した国際eスポーツプラットフォーム兼デスクトップエコシステムのプロダクト戦略、ソフトウェアアーキテクチャ、エンドツーエンド開発を担当。Spec-Driven DevelopmentとArchitecture Decision Records（ADR）を活用し、Claude CodeによるAI支援開発を自動評価とコードレビューで支えながら推進。デスクトップアプリをWinUI 3からRustとTauri v2へ全面的に書き換え、アイドル時のメモリ使用量を70%削減、アプリケーションサイズを25MB未満に縮小。音声処理、バックグラウンドでのコントローラー入力、競技の公正性を支える継続的なゲームプレイ録画など、WindowsおよびLinux向けのネイティブ統合を構築。RustによるローカルONNX Runtimeのコンピュータービジョンパイプラインを開発し、ゲーム画面処理とスコア認識によりハイスコアの自動検証を実現。ランキングとトークン残高のためのPostgreSQLデータモデルとトランザクション保護を設計し、AIボイスチューターを支えるゲーム特化型RAGをpgvectorで実装。",
      },
    },
  },
  {
    id: "veeceo",
    image: "/images/projects/veeceo/logo.png",
    background: "/images/projects/veeceo/background.png",
    logoSurface: "light",
    pageTheme: "light",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "React Flow",
      "ELK.js",
      "Octokit",
    ],
    links: { live: "#", repo: "#" },
    text: {
      pt: {
        title: "Veeceo",
        role:
          "Engenharia de Software & Arquitetura de Produto | DDD, GitHub App e Visualização de Grafos",
        tagline:
          "Domain Map que transforma repositórios do GitHub em uma visão viva da arquitetura de domínio",
        description:
          "Veeceo é uma ferramenta de Domain Map orientada a Domain-Driven Design que conecta os repositórios do GitHub do usuário e gera automaticamente um mapa visual da arquitetura de domínio. A integração separa autenticação por OAuth da autorização de repositórios por GitHub App, sem depender de tokens pessoais. O scanner transforma repositórios em domínios e pastas de alto nível em subdomínios, classificados como core, supporting ou generic com dados reais de commits obtidos pelo Octokit. O modelo registra relacionamentos upstream, downstream, dependências, integrações e eventos, além de uma linguagem ubíqua. A interface usa React Flow e ELK.js para oferecer um grafo interativo com layout automático, agrupamento por projetos e geração de documentação viva. A aplicação foi construída com Next.js 16, React 19, TypeScript, Zustand, React Query, Tailwind CSS v4, shadcn/ui, Radix UI e testes de serviço com Vitest.",
      },
      en: {
        title: "Veeceo",
        role:
          "Software Engineering & Product Architecture | DDD, GitHub App, and Graph Visualization",
        tagline:
          "A Domain Map that turns GitHub repositories into a living view of domain architecture",
        description:
          "Veeceo is a Domain-Driven Design mapping tool that connects a user's GitHub repositories and automatically generates a visual map of their domain architecture. The integration separates OAuth authentication from repository authorization through a GitHub App, without relying on personal access tokens. Its scanner turns repositories into domains and top-level folders into subdomains, classifying them as core, supporting, or generic with real commit data retrieved through Octokit. The model captures upstream and downstream relationships, dependencies, integrations, events, and ubiquitous language. React Flow and ELK.js power an interactive graph with automatic layout, project grouping, and living documentation generation. The application uses Next.js 16, React 19, TypeScript, Zustand, React Query, Tailwind CSS v4, shadcn/ui, Radix UI, and Vitest service tests.",
      },
      ja: {
        title: "Veeceo",
        role:
          "ソフトウェアエンジニアリング & プロダクトアーキテクチャ | DDD、GitHub App、グラフ可視化",
        tagline:
          "GitHubリポジトリをドメインアーキテクチャの生きたマップへ変換するDomain Map",
        description:
          "Veeceoは、ユーザーのGitHubリポジトリを接続し、ドメインアーキテクチャのビジュアルマップを自動生成するDomain-Driven Design指向のツールです。OAuthによる認証とGitHub Appによるリポジトリ認可を分離し、個人アクセストークンに依存しません。スキャナーは各リポジトリをドメイン、トップレベルのフォルダをサブドメインとして扱い、Octokitで取得した実際のコミットデータを基にcore、supporting、genericへ分類します。モデルはupstream、downstream、依存、統合、イベントの関係とユビキタス言語を記録します。React FlowとELK.jsによる自動レイアウト付きのインタラクティブグラフ、プロジェクト単位のグループ化、マップからの生きたドキュメント生成を備えています。Next.js 16、React 19、TypeScript、Zustand、React Query、Tailwind CSS v4、shadcn/ui、Radix UI、Vitestで構築されています。",
      },
    },
  },
  // TODO: fake preview cards — remove before shipping
  {
    id: "demo1",
    tech: ["React", "Node.js", "PostgreSQL"],
    links: { live: "#", repo: "#" },
    status: "done",
    startDate: "2023-01",
    text: {
      pt: {
        title: "Projeto Demo 1",
        role: "Card de exemplo para visualizar o carrossel",
        startDateLabel: "Janeiro de 2023",
        statusLabel: "Concluído",
        tagline: "Card fake apenas para testar o carrossel com mais itens",
        description: "Conteúdo de demonstração.",
      },
      en: {
        title: "Demo Project 1",
        role: "Sample card to preview the carousel",
        startDateLabel: "January 2023",
        statusLabel: "Done",
        tagline: "Fake card just to test the carousel with more items",
        description: "Demo content.",
      },
      ja: {
        title: "デモプロジェクト 1",
        role: "カルーセルのプレビュー用サンプルカード",
        startDateLabel: "2023年1月",
        statusLabel: "完了",
        tagline: "カルーセルをテストするための仮のカードです",
        description: "デモ用コンテンツ。",
      },
    },
  },
  {
    id: "demo2",
    tech: ["Vue", "GraphQL", "Redis"],
    links: { live: "#", repo: "#" },
    status: "in_progress",
    startDate: "2023-06",
    text: {
      pt: {
        title: "Projeto Demo 2",
        role: "Card de exemplo para visualizar o carrossel",
        startDateLabel: "Junho de 2023",
        statusLabel: "Em andamento",
        tagline: "Card fake apenas para testar o carrossel com mais itens",
        description: "Conteúdo de demonstração.",
      },
      en: {
        title: "Demo Project 2",
        role: "Sample card to preview the carousel",
        startDateLabel: "June 2023",
        statusLabel: "In progress",
        tagline: "Fake card just to test the carousel with more items",
        description: "Demo content.",
      },
      ja: {
        title: "デモプロジェクト 2",
        role: "カルーセルのプレビュー用サンプルカード",
        startDateLabel: "2023年6月",
        statusLabel: "進行中",
        tagline: "カルーセルをテストするための仮のカードです",
        description: "デモ用コンテンツ。",
      },
    },
  },
  {
    id: "demo3",
    tech: ["Flutter", "Firebase", "Dart"],
    links: { live: "#", repo: "#" },
    status: "done",
    startDate: "2024-03",
    text: {
      pt: {
        title: "Projeto Demo 3",
        role: "Card de exemplo para visualizar o carrossel",
        startDateLabel: "Março de 2024",
        statusLabel: "Concluído",
        tagline: "Card fake apenas para testar o carrossel com mais itens",
        description: "Conteúdo de demonstração.",
      },
      en: {
        title: "Demo Project 3",
        role: "Sample card to preview the carousel",
        startDateLabel: "March 2024",
        statusLabel: "Done",
        tagline: "Fake card just to test the carousel with more items",
        description: "Demo content.",
      },
      ja: {
        title: "デモプロジェクト 3",
        role: "カルーセルのプレビュー用サンプルカード",
        startDateLabel: "2024年3月",
        statusLabel: "完了",
        tagline: "カルーセルをテストするための仮のカードです",
        description: "デモ用コンテンツ。",
      },
    },
  },
];

export function getProjects(lang = "pt") {
  return base.map(
    ({ id, image, background, logoBackground, logoSurface, pageTheme, tech, links, text }) => ({
      id,
      image,
      background,
      logoBackground,
      logoSurface,
      pageTheme,
      tech,
      links,
      ...(text[lang] ?? text.pt),
    }),
  );
}
