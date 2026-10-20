const base = [
  {
    id: "shmupx",
    image: "/images/projects/shmupx/logo.png",
    background: "/images/projects/shmupx/background.jpg",
    logoBackground: "/images/projects/shmupx/modal-background.jpg",
    tech: ["Rust", "Tauri v2", "ONNX Runtime", "PostgreSQL", "pgvector", "Claude Code"],
    links: { live: "#", repo: "#" },
    buttons: { viewProject: false, sourceCode: false },
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
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "TanStack Query",
      "Zustand",
      "React Flow",
      "ELK.js",
      "GitHub App (Octokit)",
      "OAuth",
      "Webhooks",
      "Vitest",
    ],
    links: { live: "#", repo: "https://github.com/ramonvalerio/veeceo-front" },
    buttons: { viewProject: false, sourceCode: true },
    status: "in_progress",
    startDate: "2026-09",
    text: {
      pt: {
        title: "Veeceo",
        role: "Fundador & Software Engineer | Full Stack, TypeScript, Next.js e Integrações com GitHub",
        startDateLabel: "Setembro de 2026",
        statusLabel: "Em andamento",
        tagline:
          "Domain Map que transforma repositórios do GitHub em uma visão viva da arquitetura de domínio",
        description:
          "Plataforma criada por mim, de ponta a ponta, que mapeia o domínio de negócio de um produto a partir dos repositórios conectados ao GitHub, com abordagem orientada a DDD (Domain-Driven Design). Projetei a arquitetura e desenvolvi sozinho o frontend e as rotas de backend em Next.js (App Router) e React. Implementei o login com GitHub (OAuth) e a instalação de um GitHub App com permissões somente leitura, sem nunca pedir tokens pessoais ao usuário. Construí o processamento de webhooks e a leitura de repositórios, commits e estrutura de pastas. Desenvolvi um scanner que transforma cada repositório em um Domínio e as pastas de código-fonte em Subdomínios, extraindo classificação, descrição, status e mudanças recentes. Criei um mapa visual interativo com React Flow e layout automático via ELK, além da geração de documentação a partir do mapa e do gerenciamento de projetos. Usei Zustand para estado no cliente, TanStack Query para dados e Vitest para testes automatizados.",
      },
      en: {
        title: "Veeceo",
        role: "Founder & Software Engineer | Full Stack, TypeScript, Next.js & GitHub Integrations",
        startDateLabel: "September 2026",
        statusLabel: "In progress",
        tagline:
          "A Domain Map that turns GitHub repositories into a living view of domain architecture",
        description:
          "Platform I designed and built end to end that maps a product's business domain from repositories connected through GitHub, following a DDD (Domain-Driven Design) approach. Solely responsible for the architecture, frontend, and backend route handlers, built with Next.js (App Router) and React. Implemented GitHub sign-in (OAuth) and a read-only GitHub App installation, so users never have to provide personal access tokens. Built webhook handling and repository, commit, and directory-tree reading. Developed a scanner that turns each repository into a Domain and its top-level source folders into Subdomains, extracting classification, description, status, and recent changes. Created an interactive visual map with React Flow and automatic ELK layout, plus documentation generation from the map and project management. Used Zustand for client state, TanStack Query for data fetching, and Vitest for automated testing.",
      },
      ja: {
        title: "Veeceo",
        role: "創業者 兼 ソフトウェアエンジニア | フルスタック、TypeScript、Next.js、GitHub連携",
        startDateLabel: "2026年9月",
        statusLabel: "進行中",
        tagline:
          "GitHubリポジトリをドメインアーキテクチャの生きたマップへ変換するDomain Map",
        description:
          "GitHubに接続したリポジトリからプロダクトのビジネスドメインをDDD（Domain-Driven Design）の考え方でマッピングするプラットフォームを、企画からエンドツーエンドで自ら設計・開発。Next.js（App Router）とReactで、アーキテクチャ、フロントエンド、バックエンドのルートハンドラーを単独で担当。GitHub（OAuth）によるログインと、読み取り専用権限のGitHub Appのインストールを実装し、ユーザーに個人アクセストークンを求めない設計を実現。Webhookの処理と、リポジトリ、コミット、ディレクトリ構造の読み取りを構築。各リポジトリをドメイン、トップレベルのソースフォルダをサブドメインに変換し、分類、説明、ステータス、最近の変更を抽出するスキャナーを開発。React FlowとELKの自動レイアウトによるインタラクティブなビジュアルマップに加え、マップからのドキュメント生成とプロジェクト管理を実装。クライアント状態にZustand、データ取得にTanStack Query、自動テストにVitestを使用。",
      },
    },
  },
  {
    id: "slackragbot",
    image: "/images/projects/slackragbot/logo_slack_rag_bot_cropped.png",
    background: "/images/projects/slackragbot/bg_slack_rag_bot.png",
    tech: ["Python", "FastAPI", "React", "TypeScript", "Ollama", "SQLite", "Docker", "Claude Code"],
    links: { live: "#", repo: "#" },
    buttons: { viewProject: false, sourceCode: false },
    status: "in_progress",
    startDate: "2026-09",
    text: {
      pt: {
        title: "Slack RAG Bot",
        role: "Engenheiro de Software | Python, FastAPI, LLMs Locais e Sistemas Multiagente",
        startDateLabel: "Setembro de 2026",
        statusLabel: "Em andamento",
        tagline:
          "Plataforma RAG multiagente local-first para Slack e chat web, com respostas citando as fontes",
        description:
          "Engenheiro de software em uma equipe que constrói uma plataforma RAG com privacidade em primeiro lugar, que indexa Slack, e-mail, ClickUp, WhatsApp, Teams e documentos locais por meio de conectores somente leitura e responde perguntas com citações usando LLMs e embeddings locais via Ollama. Contribuí para a evolução de um bot único para uma arquitetura multiagente, guiada por Architecture Decision Records (ADRs) e specs. Construí namespaces de domínio (operações, jurídico, geral) no índice de recuperação para que cada consulta pesquise apenas os dados do seu próprio domínio. Implementei os agentes especialistas Analista Operacional e Advogado, cada um com um namespace fixado na construção para garantir o isolamento dos dados, além de um registro local de agentes. Desenvolvi um roteador de agentes que classifica cada pergunta por domínio e a despacha ao agente certo. Implementei o contrato padrão de Tools/Skills com envelope, códigos de erro, validação de entrada por schema e permissões por agente. Integrei o gateway de orquestração OpenClaw com fallback automático para orquestração local em qualquer falha. Alinhei o endpoint POST /api/chat ao contrato de mensagens multiagente e construí um painel em React que mostra os detalhes de orquestração de cada resposta.",
      },
      en: {
        title: "Slack RAG Bot",
        role: "Software Engineer | Python, FastAPI, Local LLMs & Multi-Agent Systems",
        startDateLabel: "September 2026",
        statusLabel: "In progress",
        tagline:
          "Local-first multi-agent RAG platform for Slack and web chat, with source-cited answers",
        description:
          "Software engineer on a team building a privacy-first RAG platform that indexes Slack, email, ClickUp, WhatsApp, Teams, and local documents through read-only connectors, and answers questions with citations using local LLMs and embeddings via Ollama. Contributed to the evolution from a single bot to a multi-agent architecture, guided by Architecture Decision Records (ADRs) and specs. Built domain namespaces (operations, legal, general) into the retrieval index so each query searches only the data of its own domain. Implemented the specialist agents Analista Operacional and Advogado, each with a namespace fixed at construction to guarantee data isolation, plus a local agent registry. Developed an agent router that classifies each question by domain and dispatches it to the right agent. Implemented the standard Tools/Skills contract with envelope, error codes, schema-based input validation, and per-agent permissions. Integrated the OpenClaw orchestration gateway with automatic fallback to local orchestration on any failure. Aligned the POST /api/chat endpoint to the multi-agent message contract and built a React panel that shows each response's orchestration details.",
      },
      ja: {
        title: "Slack RAG Bot",
        role: "ソフトウェアエンジニア | Python、FastAPI、ローカルLLM、マルチエージェントシステム",
        startDateLabel: "2026年9月",
        statusLabel: "進行中",
        tagline:
          "SlackとWebチャット向けの、出典付きで回答するローカルファーストのマルチエージェントRAGプラットフォーム",
        description:
          "プライバシーを最優先するRAGプラットフォームを構築するチームのソフトウェアエンジニアとして参加。Slack、メール、ClickUp、WhatsApp、Teams、ローカル文書を読み取り専用コネクターでインデックス化し、OllamaによるローカルLLMと埋め込みで、引用付きの回答を提供。Architecture Decision Records（ADR）とスペックに基づき、単一ボットからマルチエージェントアーキテクチャへの進化に貢献。検索インデックスにドメイン名前空間（運用、法務、一般）を構築し、各クエリが自身のドメインのデータのみを検索するように実装。専門エージェントのAnalista OperacionalとAdvogadoを実装し、それぞれ構築時に固定した名前空間でデータ分離を保証、ローカルのエージェントレジストリも整備。質問をドメインごとに分類して適切なエージェントへ振り分けるエージェントルーターを開発。エンベロープ、エラーコード、スキーマに基づく入力検証、エージェント単位の権限を備えた標準のTools/Skillsコントラクトを実装。OpenClawオーケストレーションゲートウェイを統合し、障害時にはローカルのオーケストレーションへ自動フォールバック。POST /api/chatエンドポイントをマルチエージェントのメッセージコントラクトに整合させ、各回答のオーケストレーション詳細を表示するReactパネルを構築。",
      },
    },
  },
  {
    id: "ssf2x",
    image: "/images/projects/ssf2x_rebalance/logo-rebalance-classic.png",
    background: "/images/projects/ssf2x_rebalance/bg_ssf2x.png",
    tech: ["Python", "Capstone", "Unicorn", "Lua", "FBNeo", "IPS Patching", "Git", "ADRs & Specs"],
    links: { live: "#", repo: "https://github.com/ramonvalerio/ssf2x-the-new-balance" },
    buttons: { viewProject: false, sourceCode: true },
    status: "in_progress",
    startDate: "2026-10",
    text: {
      pt: {
        title: "Super Street Fighter 2 X: Rebalance",
        role: "Criador e Desenvolvedor Único | Engenharia Reversa e Balanceamento de Jogos",
        startDateLabel: "14 de outubro de 2026",
        statusLabel: "Em andamento",
        tagline:
          "Projeto independente de engenharia reversa e rebalanceamento competitivo de Super Street Fighter II X (CPS2)",
        description:
          "Projeto independente de engenharia reversa e rebalanceamento competitivo de Super Street Fighter II X (Turbo), romhack para a placa CPS2 rodando no emulador FBNeo/Fightcade. O jogo foi lançado em 1994 e nunca recebeu correções oficiais; o projeto identifica inconsistências de balanceamento (hitboxes, janelas de cancelamento, comandos de golpes) e aplica mudanças mínimas e documentadas por personagem, preservando a identidade original de cada um. O fluxo de trabalho inclui engenharia reversa do binário 68000/CPS2, captura de dados em tempo real via scripts Lua no emulador, diagnóstico e validação em um emulador CPS2 fiel implementado em Python, e distribuição via patches binários (IPS) versionados com verificação de hash, sem redistribuir nenhuma ROM ou material da Capcom.",
      },
      en: {
        title: "Super Street Fighter 2 X: Rebalance",
        role: "Creator & Sole Developer | Reverse Engineering & Game Balance",
        startDateLabel: "October 14, 2026",
        statusLabel: "In progress",
        tagline:
          "An independent reverse-engineering and competitive rebalancing project for Super Street Fighter II X (CPS2)",
        description:
          "Independent reverse-engineering and competitive rebalancing project for Super Street Fighter II X (Turbo), a romhack for the CPS2 board running on the FBNeo/Fightcade emulator. The game was released in 1994 and never received official fixes; the project identifies balance inconsistencies (hitboxes, cancel windows, move inputs) and applies minimal, documented changes per character, preserving each one's original identity. The workflow includes reverse engineering the 68000/CPS2 binary, real-time data capture through Lua scripts in the emulator, diagnosis and validation in a faithful CPS2 emulator implemented in Python, and distribution through versioned binary (IPS) patches with hash verification, without redistributing any ROM or Capcom material.",
      },
      ja: {
        title: "Super Street Fighter 2 X: Rebalance",
        role: "創作者 兼 単独開発者 | リバースエンジニアリング、ゲームバランス調整",
        startDateLabel: "2026年10月14日",
        statusLabel: "進行中",
        tagline:
          "Super Street Fighter II X（CPS2）の独立系リバースエンジニアリング兼競技バランス調整プロジェクト",
        description:
          "FBNeo/Fightcade上で動作するCPS2基板向けROMハック、Super Street Fighter II X（Turbo）の独立系リバースエンジニアリング兼競技バランス調整プロジェクト。1994年に発売されて以来、公式の修正が行われなかったこのゲームについて、当たり判定、キャンセル受付フレーム、技コマンドなどのバランス上の不整合を特定し、各キャラクターの個性を保ちながら、最小限かつ文書化された変更をキャラクターごとに適用。68000/CPS2バイナリのリバースエンジニアリング、エミュレーター上のLuaスクリプトによるリアルタイムのデータ取得、Pythonで実装した忠実なCPS2エミュレーターでの診断と検証、ハッシュ検証付きでバージョン管理したバイナリ（IPS）パッチによる配布までを一貫して行い、ROMやCapcomの素材は一切再配布しません。",
      },
    },
  },
  {
    id: "dreambullet",
    image: "/images/projects/dreambullet/logo_dreambullet_cropped.png",
    background: "/images/projects/dreambullet/background_dreambullet.png",
    tech: ["C++20", "SDL3", "SDL3_mixer", "CMake", "CTest", "Media Foundation", "PowerShell", "Python", "Git"],
    links: { live: "#", repo: "#" },
    buttons: { viewProject: false, sourceCode: false },
    status: "in_progress",
    startDate: "2026-10",
    text: {
      pt: {
        title: "Dream Bullet: Resonance",
        role: "Criador e Desenvolvedor | C++20, SDL3 e Arquitetura de Simulação Determinística",
        startDateLabel: "14 de outubro de 2026",
        statusLabel: "Em andamento",
        tagline:
          "Shmup vertical 2D original em desenvolvimento para lançamento comercial na Steam",
        description:
          "Shmup vertical 2D original em desenvolvimento para lançamento comercial na Steam, inspirado na intensidade e legibilidade do gênero bullet hell. Desenvolvido em C++20 com SDL3 e CMake, com arquitetura de simulação determinística a 60 Hz desacoplada de I/O, tempo real e aleatoriedade, permitindo replays reprodutíveis bit a bit. Implementação própria de pipeline de renderização em camadas (6 layers: solo, estruturas, ar, projéteis e VFX), sistema de áudio via SDL3_mixer, gerenciamento de input, configurações persistentes e sistema de ranking dinâmico. Todo o conteúdo (sprites, assets e regras de jogo) é original, com pesquisa comportamental independente documentada por proveniência e licença. Testes com CTest e uma suíte própria de testes de contrato, além de scripts em PowerShell (build e empacotamento) e Python (geração de arte placeholder). Plataforma alvo: Windows x64, com Media Foundation e Windows Imaging Component para decodificação de imagem e vídeo.",
      },
      en: {
        title: "Dream Bullet: Resonance",
        role: "Creator & Developer | C++20, SDL3 & Deterministic Simulation Architecture",
        startDateLabel: "October 14, 2026",
        statusLabel: "In progress",
        tagline:
          "An original 2D vertical shmup in development for commercial release on Steam",
        description:
          "Original 2D vertical shmup in development for a commercial release on Steam, inspired by the intensity and readability of the bullet hell genre. Built in C++20 with SDL3 and CMake, with a deterministic 60 Hz simulation architecture decoupled from I/O, real time, and randomness, enabling bit-for-bit reproducible replays. Custom layered rendering pipeline (6 layers: ground, structures, air, projectiles, and VFX), SDL3_mixer audio system, input management, persistent settings, and a dynamic ranking system. All content (sprites, assets, and game rules) is original, with independent behavioral research documented by provenance and license. Tested with CTest and a custom contract test suite, with PowerShell (build and packaging) and Python (placeholder art generation) helper scripts. Target platform: Windows x64, using Media Foundation and the Windows Imaging Component for image and video decoding.",
      },
      ja: {
        title: "Dream Bullet: Resonance",
        role: "クリエイター 兼 開発者 | C++20、SDL3、決定論的シミュレーションアーキテクチャ",
        startDateLabel: "2026年10月14日",
        statusLabel: "進行中",
        tagline:
          "Steamでの商用リリースに向けて開発中の、オリジナルの2D縦スクロールシューティング",
        description:
          "Steamでの商用リリースに向けて開発中の、オリジナルの2D縦スクロールシューティング。弾幕系ジャンルの迫力と視認性に着想を得ています。C++20、SDL3、CMakeで構築し、I/O、実時間、乱数から切り離した60Hzの決定論的シミュレーションアーキテクチャにより、ビット単位で再現可能なリプレイを実現。6レイヤー（地面、構造物、空中、弾、VFX）の独自レンダリングパイプライン、SDL3_mixerによるオーディオシステム、入力管理、永続的な設定、動的ランキングシステムを実装。スプライト、アセット、ゲームルールはすべてオリジナルで、独立した挙動調査は出典とライセンスを記録して管理しています。CTestと独自のコントラクトテストスイートでテストし、PowerShell（ビルドとパッケージング）とPython（仮アート生成）の補助スクリプトを用意。対象プラットフォームはWindows x64で、画像と動画のデコードにMedia FoundationとWindows Imaging Componentを使用。",
      },
    },
  },
];

export function getProjects(lang = "pt") {
  return base.map(
    ({ id, image, background, logoBackground, logoSurface, pageTheme, tech, links, buttons, text }) => ({
      id,
      image,
      background,
      logoBackground,
      logoSurface,
      pageTheme,
      tech,
      links,
      buttons: { viewProject: true, sourceCode: true, ...buttons },
      ...(text[lang] ?? text.pt),
    }),
  );
}
