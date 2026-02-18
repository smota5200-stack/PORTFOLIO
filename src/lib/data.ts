// Portfolio Data - Felipe Mota

export const portfolioData = {
  personal: {
    name: "Felipe Mota",
    title: "Designer de iGaming",
    subtitle: "Motion Graphics & Key Visuals para Cassinos",
    email: "contato@felipemota.com",
    location: "Brasil",
    whatsapp: "5511999999999",
    photo: "",
    bio: `Sou um designer especializado no universo iGaming, criando experiências visuais impactantes para slots, cassinos online e jogos de azar. Minha paixão é transformar conceitos em visuais que capturam a essência de jogos como Fortune Tiger, Fortune Ox e Fortune Rabbit.

Com anos de experiência em motion graphics e key visuals, desenvolvo projetos que combinam criatividade, técnica e o brilho característico do mundo dos cassinos.`,
  },

  stats: [
    { id: 1, label: "Anos de Experiência", value: "5+", icon: "⏱" },
    { id: 2, label: "Projetos Entregues", value: "100+", icon: "◆" },
    { id: 3, label: "Clientes Satisfeitos", value: "50+", icon: "★" },
    { id: 4, label: "Prêmios", value: "10+", icon: "🏆" },
  ],

  skills: [
    { name: "Photoshop", level: 96, icon: "🖼️", showLevel: true, description: "Direção de arte, key visuals e composição avançada. Uso avançado para criação de key visuals, manipulação, tratamento, composição, efeitos de luz, glow, texturas e finalização premium." },
    { name: "After Effects", level: 95, icon: "✨", showLevel: true, description: "Motion graphics e animações para iGaming. Criação de trailers, vinhetas, efeitos especiais e composições visuais dinâmicas." },
    { name: "Figma", level: 92, icon: "📐", showLevel: true, description: "Design de interfaces e prototipagem. Criação de layouts, componentes reutilizáveis e sistemas de design." },
    { name: "Illustrator", level: 85, icon: "✏️", showLevel: true, description: "Ilustração vetorial e criação de ícones. Design de elementos gráficos, logotipos e assets para jogos." },
    { name: "3D Design", level: 75, icon: "🎲", showLevel: true, description: "Modelagem e renderização 3D. Criação de elementos tridimensionais para composições e animações." },
    { name: "UI/UX Games", level: 85, icon: "🎮", showLevel: true, description: "Design de interfaces para jogos. Criação de HUDs, menus e experiência do usuário em jogos." },
  ],

  expertiseTitle: "Expertise & Especialidades",
  expertiseSubtitle: "Áreas de atuação e competências especializadas",
  expertiseAreas: [
    {
      id: 1,
      title: "Design Editorial & Publicações",
      items: [
        "Diagramação de livros impressos e digitais",
        "Estruturação de ePub",
        "Catálogos institucionais",
        "Organização tipográfica e hierarquia visual",
      ],
    },
    {
      id: 2,
      title: "Construção de Key Visual",
      items: [
        "Desenvolvimento de conceito visual",
        "Direção de arte para campanhas",
        "Desdobramento para múltiplos formatos",
        "Padronização estética",
      ],
    },
    {
      id: 3,
      title: "Retoque & Composição Avançada",
      items: [
        "Manipulação e fusão de imagens",
        "Tratamento de luz, sombra e cor",
        "Construção de mockups realistas",
        "Ajustes técnicos para impressão e mídia digital",
      ],
    },
    {
      id: 4,
      title: "Sistemas de Identidade Visual",
      items: [
        "Desenvolvimento de identidade",
        "Aplicação consistente da marca",
        "Criação de guidelines visuais",
        "Adaptação para materiais online e offline",
      ],
    },
  ],

  experienceTitle: "Experiência",
  experienceSubtitle: "Minha jornada no universo iGaming",

  experiences: [
    {
      id: 1,
      role: "Senior Motion Designer",
      company: "iGaming Studio",
      period: "2022 - Presente",
      description: "Criação de animações e key visuals para slots e jogos de cassino. Desenvolvimento de identidade visual para novos jogos.",
    },
    {
      id: 2,
      role: "Motion Graphics Designer",
      company: "Casino Digital",
      period: "2020 - 2022",
      description: "Produção de motion graphics para campanhas de marketing, trailers de jogos e materiais promocionais.",
    },
    {
      id: 3,
      role: "Graphic Designer",
      company: "Creative Agency",
      period: "2018 - 2020",
      description: "Design gráfico para diversos clientes, incluindo primeiros projetos no segmento de iGaming.",
    },
  ],

  projectsTitle: "Projetos",
  projectsSubtitle: "Trabalhos selecionados do universo iGaming",

  projects: [
    {
      id: 1,
      title: "Fortune Tiger - Key Visual",
      category: "Key Visual",
      description: "Key visual completo para o jogo Fortune Tiger, incluindo personagem principal e elementos decorativos.",
      tags: ["Photoshop", "Illustrator", "iGaming"],
      image: "/projects/fortune-tiger.jpg",
      images: [] as string[],
      order: 0,
    },
    {
      id: 2,
      title: "Fortune Ox - Motion Graphics",
      category: "Motion Graphics",
      description: "Animação promocional para lançamento do jogo Fortune Ox com efeitos de partículas e transições dinâmicas.",
      tags: ["After Effects", "Motion", "3D"],
      image: "/projects/fortune-ox.jpg",
      images: [],
      order: 1,
    },
    {
      id: 3,
      title: "Fortune Rabbit - Campaign",
      category: "Campaign",
      description: "Campanha visual completa para o Fortune Rabbit, incluindo banners, key visuals e animações.",
      tags: ["Full Campaign", "iGaming", "Design"],
      image: "/projects/fortune-rabbit.jpg",
      images: [],
      order: 2,
    },
    {
      id: 4,
      title: "Slot Machine UI",
      category: "UI/UX",
      description: "Interface completa para máquina de slot, com animações de vitória e sistema de navegação.",
      tags: ["UI Design", "Figma", "Games"],
      image: "/projects/slot-ui.jpg",
      images: [],
      order: 3,
    },
    {
      id: 5,
      title: "Casino Promo Video",
      category: "Video",
      description: "Vídeo promocional para cassino online com motion graphics e composição visual.",
      tags: ["Video", "After Effects", "Marketing"],
      image: "/projects/casino-promo.jpg",
      images: [],
      order: 4,
    },
    {
      id: 6,
      title: "Lucky Dragon - Character",
      category: "Character Design",
      description: "Design de personagem para novo slot game, incluindo poses e expressões.",
      tags: ["Character", "Illustration", "iGaming"],
      image: "/projects/lucky-dragon.jpg",
      images: [],
      order: 5,
    },
  ],

  social: [
    { name: "LinkedIn", url: "https://linkedin.com/in/felipemota", icon: "💼" },
    { name: "Behance", url: "https://behance.net/felipemota", icon: "🎨" },
    { name: "Instagram", url: "https://instagram.com/felipemota", icon: "📸" },
  ],

  footer: {
    copyrightText: "Todos os direitos reservados.",
    taglineIcon: "♠",
    tagline: "Feito com ♠ para iGaming",
  },
};

export type PortfolioData = typeof portfolioData;
