// generationsExamples.ts
// Data structure for Languages 4 Generations showcase
// Easy to add more examples - just add objects to the array!

export interface GenerationExample {
  id: string;
  category: string;
  child: {
    title: string;
    description: string;
    icon: string; // SVG path or emoji for now
    color: string; // Tailwind color class
  };
  adult: {
    title: string;
    description: string;
    icon: string;
    color: string;
  };
  connection: {
    text: string;
    icon: string;
  };
}

export const generationsExamples: GenerationExample[] = [
  {
    id: "vocabulary",
    category: "Vocabulary",
    child: {
      title: "School Words",
      description:
        "Desk, pencil, teacher, classroom - essential vocabulary for young learners",
      icon: "🎒", // Replace with SVG path later
      color: "bg-accent-400", // Bright orange for kids
    },
    adult: {
      title: "Work Words",
      description:
        "Meeting, schedule, project, leadership - professional language skills",
      icon: "💼",
      color: "bg-primary-800", // Dark teal for adults
    },
    connection: {
      text: "Daily Life Communication",
      icon: "💬",
    },
  },
  {
    id: "activities",
    category: "Activities",
    child: {
      title: "Play & Games",
      description:
        "Interactive games, playground activities, and fun challenges",
      icon: "🎮",
      color: "bg-[#74a892]/30", // Light green for kids
    },
    adult: {
      title: "Traditional Practices",
      description:
        "Hunting, gathering, fishing - connecting language to land-based skills",
      icon: "🏹",
      color: "bg-[#74a892]", // Full green for adults
    },
    connection: {
      text: "Seasonal Activities",
      icon: "🍂",
    },
  },
  {
    id: "stories",
    category: "Stories",
    child: {
      title: "Hero Stories & Legends",
      description:
        "Age-appropriate cultural stories with heroes and adventures",
      icon: "📖",
      color: "bg-primary-300", // Light teal for kids
    },
    adult: {
      title: "Oral Histories",
      description:
        "Ceremonial knowledge, origin stories, and sacred narratives",
      icon: "📜",
      color: "bg-primary-900", // Deep teal for adults
    },
    connection: {
      text: "Cultural Heritage",
      icon: "🌿",
    },
  },
  {
    id: "community",
    category: "Community",
    child: {
      title: "Family Roles",
      description:
        "Brother, grandmother, cousin - understanding kinship systems",
      icon: "👥",
      color: "bg-accent-300", // Light orange for kids
    },
    adult: {
      title: "Leadership & Governance",
      description:
        "Council protocols, decision-making, community responsibility",
      icon: "🤝",
      color: "bg-accent-800", // Dark orange for adults
    },
    connection: {
      text: "Community Structure",
      icon: "🏛️",
    },
  },
  {
    id: "cultural-practices",
    category: "Cultural Practices",
    child: {
      title: "Traditional Arts & Crafts",
      description: "Beadwork, pottery, weaving - hands-on cultural expression",
      icon: "🎨",
      color: "bg-[#e5c185]", // Warm wheat color for kids
    },
    adult: {
      title: "Ceremonies & Protocols",
      description:
        "Sacred practices, seasonal ceremonies, and cultural protocols",
      icon: "🪶",
      color: "bg-primary-950", // Darkest teal for adults
    },
    connection: {
      text: "Cultural Continuity",
      icon: "❤️",
    },
  },
];

// Helper function to get a specific example by ID
export function getExampleById(id: string): GenerationExample | undefined {
  return generationsExamples.find((example) => example.id === id);
}

// Helper function to get total count (useful for animations)
export function getExamplesCount(): number {
  return generationsExamples.length;
}
