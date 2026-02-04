// platformShowcase.ts
// Data structure for Platform Showcase - Film Strip/Comic Strip feature
// Easy to add more activities - just add objects to the array!

export interface PlatformActivity {
  id: string;
  title: string;
  description: string;
  image: string; // Path to screenshot in /public/images/platform/
  category?: string; // Optional grouping
}

export const platformActivities: PlatformActivity[] = [
  {
    id: "communication-practice",
    title: "Communication Practice",
    description:
      "Practice real conversations with fluent speakers and language partners, building confidence through authentic dialogue.",
    image: "/images/platform/01-communication-practice.webp",
    category: "Interactive Learning",
  },
  {
    id: "sentence-pronunciation",
    title: "Sentence Pronunciation",
    description:
      "Advanced speech recognition provides instant feedback on pronunciation accuracy, helping learners master authentic sounds.",
    image: "/images/platform/02-sentence-pronunciation.webp",
    category: "Speech Recognition",
  },
  {
    id: "storytelling",
    title: "Heritage Speaks",
    description:
      "Listen and read-aloud to traditional stories told by elders, connecting language to culture and heritage through authentic voices.",
    image: "/images/platform/03-storytelling.webp",
    category: "Cultural Connection",
  },
  {
    id: "vocabulary-games",
    title: "Vocabulary Games",
    description:
      "Learn vocabulary through engaging games designed with cultural context, making language learning fun and meaningful.",
    image: "/images/platform/04-vocabulary-games.webp",
    category: "Interactive Learning",
  },
  {
    id: "guided-conversation",
    title: "Guided Conversations",
    description:
      "More exciting features to support your language learning journey.",
    image: "/images/platform/05-guidedconversation.webp",
    category: "Future Features",
  },
];

// Helper: Get all activities
export function getAllActivities(): PlatformActivity[] {
  return platformActivities;
}

// Helper: Get randomized activities (optional)
export function getRandomizedActivities(): PlatformActivity[] {
  const shuffled = [...platformActivities];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper: Get activity by ID
export function getActivityById(id: string): PlatformActivity | undefined {
  return platformActivities.find((activity) => activity.id === id);
}

// Helper: Get activities by category
export function getActivitiesByCategory(category: string): PlatformActivity[] {
  return platformActivities.filter(
    (activity) => activity.category === category,
  );
}

// Configuration: Toggle randomization
export const SHOWCASE_CONFIG = {
  randomize: false, // Set to true to randomize order on each page load
  autoplayDelay: 6000, // Milliseconds between slides (6 seconds)
  transitionDuration: 800, // Milliseconds for transition animation
};
