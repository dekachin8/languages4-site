/**
 * Image Story Data for Homepage Mosaic
 *
 * Each image can have an associated story that displays in a modal when clicked.
 * Stories include title, category, description, and optional article link.
 */

export interface ImageStory {
  imageFilename: string;
  title: string;
  category: string;
  description: string;
  link?: string; // Optional - if blank, CTA goes to /contact
}

/**
 * Hero Images (Always Visible)
 * These 4 images are always displayed in the mosaic
 */
export const heroImageStories: ImageStory[] = [
  {
    imageFilename: "laptop+mobile+mohawk.webp",
    title: "Language Sovereignty in Action",
    category: "Technology",
    description:
      "The Languages 4 platform, built in partnership with the Wahta Mohawk Community, brings Kanien'kéha (Mohawk) language learning to laptops, tablets, and phones. Language sovereignty is the right of Indigenous Peoples to control how their ancestral languages are used, taught, and revitalized. This project puts that principle into practice, with the community guiding every step of the process.",
    link: "/whatarel4/languages-4-core-value-language-sovereignty-the-first-pillar-of-languages-4/",
  },
  {
    imageFilename: "Indigenous_woman_inHat_sofware.webp",
    title: "Learning Without Borders",
    category: "Language Learning",
    description:
      "Digital and hybrid learning tools are connecting Indigenous language learners in remote and underserved communities to their heritage languages. Cloud-based platforms make it possible to access culturally grounded lessons from anywhere, removing geographic barriers that have long limited language education. When learners can study on their own terms and schedule, revitalization becomes part of daily life.",
    link: "/signature-collections/ina-based-education-scaling-indigenous-language-revival/#2%EF%B8%8F%E2%83%A3-digital-and-hybrid-learning-to-connect-remote-communities",
  },
  {
    imageFilename: "indigenous_student_learning_mobilephone.webp",
    title: "Your Language, Your Device",
    category: "Innovation",
    description:
      "The Languages 4 platform is mobile-first by design. With cloud-based delivery, learners can access speech recognition tools, culturally relevant curriculum, and instant pronunciation feedback from their phone. Innovation at Languages 4 is about removing barriers, so learners can connect with their heritage language whenever and wherever they choose.",
    link: "/whatarel4/pillar-3-innovative-tech-in-indigenous-language-revitalization-at-languages-4/",
  },
  {
    imageFilename: "ladies_haka.webp",
    title: "When Movement Carries Language",
    category: "Heritage",
    description:
      "The Māori haka is one of the most recognized ceremonial practices in the world, yet it is often misunderstood. As a tradition that always involves two entities, haka serves as a sign of respect, a celebration, and a process of healing (Singhwi, 2017). Practices like these carry language forward in ways that textbooks alone cannot, embedding words, rhythm, and meaning into the body and the community.",
    link: "/whatarel4/revitalizing-indigenous-languages-through-storytelling-and-ceremonial-practices/",
  },
];

/**
 * Random Images (Rotating Background)
 * Add stories here as they're developed
 * Images without stories will remain decorative only
 */
export const randomImageStories: ImageStory[] = [
  // Add more stories here as they're ready
  // Example:
  // {
  //   imageFilename: 'Leah_R2D2_Navajo-1.webp',
  //   title: 'Star Wars in Navajo',
  //   category: 'Cultural Innovation',
  //   description: '...',
  //   link: '/whatarel4/star-wars-navajo-dub'
  // }
];

/**
 * Get story for a specific image filename
 */
export function getStoryForImage(filename: string): ImageStory | undefined {
  // Check hero images first
  const heroStory = heroImageStories.find(
    (story) => story.imageFilename === filename,
  );
  if (heroStory) return heroStory;

  // Check random images
  const randomStory = randomImageStories.find(
    (story) => story.imageFilename === filename,
  );
  if (randomStory) return randomStory;

  return undefined;
}

/**
 * Check if an image has a story
 */
export function hasStory(filename: string): boolean {
  return getStoryForImage(filename) !== undefined;
}
