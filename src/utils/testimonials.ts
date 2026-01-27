// testimonials.ts - Central storage for all testimonials
// Add new testimonials here and they'll be available to all testimonial components

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization?: string;
  featured?: boolean; // Mark important testimonials
  category?: "teacher" | "elder" | "student" | "administrator" | "community";
}

// Avatar colors mapped to categories
export const categoryColors = {
  teacher: "bg-primary-600", // Teal
  elder: "bg-[#74a892]", // Green
  student: "bg-accent-600", // Orange
  administrator: "bg-[#005485]", // Blue
  community: "bg-neutral-600", // Gray
};

// Helper to get initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); // Max 2 letters
}

export const testimonials: Testimonial[] = [
  {
    id: "teacher-1",
    quote:
      "The programs are already designed so that students are independent in their learning. My students love being able to continue to progress from home.",
    author: "Stéphanie Savoie",
    role: "Language Teacher",
    organization: "Collège Saint Bernard",
    featured: true,
    category: "teacher",
  },
  {
    id: "teacher-2",
    quote:
      "Before the program, I spent so much time searching for online activities. Now everything is already created and my students know exactly how everything works.",
    author: "Daad Karam",
    role: "French Teacher",
    organization: "York Catholic District School Board",
    featured: true,
    category: "teacher",
  },
  {
    id: "teacher-3",
    quote:
      "The program gives me a lot of flexibility, it is very versatile, and makes teaching fun. Students learn while having fun.",
    author: "Vincent Blais",
    role: "Language Teacher",
    organization: "Cégep de Thetford",
    featured: true,
    category: "teacher",
  },
  {
    id: "teacher-4",
    quote:
      "The different sections cover vocabulary, grammar and culture. Students really like the fun side which allows you to learn and have fun at the same time.",
    author: "Rudder Dávila",
    role: "Language Teacher",
    organization: "Regina Assumpta",
    category: "teacher",
  },
  {
    id: "teacher-5",
    quote:
      "As a seasoned educator, I highly recommend this program! The curriculum is spot on, the activities are varied and engaging, and training support was readily available.",
    author: "Jeanne Monteiro",
    role: "FSL Teacher",
    organization: "St. Margaret School",
    category: "teacher",
  },
  {
    id: "teacher-6",
    quote:
      "The program progressed students very well through learning categories. From a teacher's perspective, this was an excellent way to continue development of oral communication, listening, reading and writing skills.",
    author: "Kimberly Pronk",
    role: "Language Teacher",
    organization: "St. Kateri - LDCSB",
    category: "teacher",
  },
];

// Helper functions to filter testimonials
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

export function getTestimonialsByCategory(
  category: Testimonial["category"],
): Testimonial[] {
  return testimonials.filter((t) => t.category === category);
}

export function getRandomTestimonials(count: number): Testimonial[] {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
