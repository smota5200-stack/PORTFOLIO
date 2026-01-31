// Portfolio Data - Felipe Mota

export const portfolioData = {
  personal: {
    name: "Felipe Mota",
    title: "Designer de iGaming",
    subtitle: "Motion Graphics & Key Visuals para Cassinos",
    email: "contato@felipemota.com",
    location: "Brasil",
    bio: `Sou um designer especializado no universo iGaming, criando experiências visuais impactantes para slots, cassinos online e jogos de azar. Minha paixão é transformar conceitos em visuais que capturam a essência de jogos como Fortune Tiger, Fortune Ox e Fortune Rabbit.

Com anos de experiência em motion graphics e key visuals, desenvolvo projetos que combinam criatividade, técnica e o brilho característico do mundo dos cassinos.`,
  },

  skills: [
    { name: "Motion Graphics", level: 95, icon: "🎬" },
    { name: "Key Visuals", level: 90, icon: "🎨" },
    { name: "After Effects", level: 95, icon: "✨" },
    { name: "Photoshop", level: 90, icon: "🖼️" },
    { name: "Illustrator", level: 85, icon: "✏️" },
    { name: "Figma", level: 80, icon: "📐" },
    { name: "3D Design", level: 75, icon: "🎲" },
    { name: "UI/UX Games", level: 85, icon: "🎮" },
  ],

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

  projects: [
    {
      id: 1,
      title: "Fortune Tiger - Key Visual",
      category: "Key Visual",
      description: "Key visual completo para o jogo Fortune Tiger, incluindo personagem principal e elementos decorativos.",
      tags: ["Photoshop", "Illustrator", "iGaming"],
      image: "/projects/fortune-tiger.jpg",
      images: [] as string[],
    },
    {
      id: 2,
      title: "Fortune Ox - Motion Graphics",
      category: "Motion Graphics",
      description: "Animação promocional para lançamento do jogo Fortune Ox com efeitos de partículas e transições dinâmicas.",
      tags: ["After Effects", "Motion", "3D"],
      image: "/projects/fortune-ox.jpg",
      images: [],
    },
    {
      id: 3,
      title: "Fortune Rabbit - Campaign",
      category: "Campaign",
      description: "Campanha visual completa para o Fortune Rabbit, incluindo banners, key visuals e animações.",
      tags: ["Full Campaign", "iGaming", "Design"],
      image: "/projects/fortune-rabbit.jpg",
      images: [],
    },
    {
      id: 4,
      title: "Slot Machine UI",
      category: "UI/UX",
      description: "Interface completa para máquina de slot, com animações de vitória e sistema de navegação.",
      tags: ["UI Design", "Figma", "Games"],
      image: "/projects/slot-ui.jpg",
      images: [],
    },
    {
      id: 5,
      title: "Casino Promo Video",
      category: "Video",
      description: "Vídeo promocional para cassino online com motion graphics e composição visual.",
      tags: ["Video", "After Effects", "Marketing"],
      image: "/projects/casino-promo.jpg",
      images: [],
    },
    {
      id: 6,
      title: "Lucky Dragon - Character",
      category: "Character Design",
      description: "Design de personagem para novo slot game, incluindo poses e expressões.",
      tags: ["Character", "Illustration", "iGaming"],
      image: "/projects/lucky-dragon.jpg",
      images: [],
    },
  ],

  social: [
    { name: "LinkedIn", url: "https://linkedin.com/in/felipemota", icon: "💼" },
    { name: "Behance", url: "https://behance.net/felipemota", icon: "🎨" },
    { name: "Instagram", url: "https://instagram.com/felipemota", icon: "📸" },
  ],
};

export type PortfolioData = typeof portfolioData;
