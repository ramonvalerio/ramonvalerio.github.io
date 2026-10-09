const base = [
  {
    id: "shmupx",
    image: "/images/projects/logo.png",
    background: "/images/projects/bg_top.jpg",
    logoBackground: "/images/projects/bg_emu.jpg",
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
];

export function getProjects(lang = "pt") {
  return base.map(
    ({ id, image, background, logoBackground, tech, links, text }) => ({
      id,
      image,
      background,
      logoBackground,
      tech,
      links,
      ...(text[lang] ?? text.pt),
    }),
  );
}
