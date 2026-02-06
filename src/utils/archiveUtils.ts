// archiveUtils.ts - Utility functions for archive pages
import type { CollectionEntry } from "astro:content";

// Type constraint to ensure posts have a pubDate
type PostWithDate = {
  data: {
    pubDate: Date;
  };
};

/**
 * Group posts by year
 */
export function groupByYear<T extends PostWithDate>(
  posts: T[],
): Map<number, T[]> {
  const grouped = new Map<number, T[]>();

  posts.forEach((post) => {
    const year = post.data.pubDate.getFullYear();
    if (!grouped.has(year)) {
      grouped.set(year, []);
    }
    grouped.get(year)!.push(post);
  });

  return grouped;
}

/**
 * Group posts by year and month
 */
export function groupByYearMonth<T extends PostWithDate>(
  posts: T[],
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();

  posts.forEach((post) => {
    const year = post.data.pubDate.getFullYear();
    const month = String(post.data.pubDate.getMonth() + 1).padStart(2, "0");
    const key = `${year}-${month}`;

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(post);
  });

  return grouped;
}

/**
 * Get all unique years from posts (sorted descending)
 */
export function getYears<T extends PostWithDate>(posts: T[]): number[] {
  const years = new Set<number>();
  posts.forEach((post) => {
    years.add(post.data.pubDate.getFullYear());
  });
  return Array.from(years).sort((a, b) => b - a);
}

/**
 * Get all months in a year that have posts
 */
export function getMonthsInYear<T extends PostWithDate>(
  posts: T[],
  year: number,
): number[] {
  const months = new Set<number>();
  posts.forEach((post) => {
    if (post.data.pubDate.getFullYear() === year) {
      months.add(post.data.pubDate.getMonth() + 1);
    }
  });
  return Array.from(months).sort((a, b) => b - a);
}

/**
 * Filter posts by year
 */
export function filterByYear<T extends PostWithDate>(
  posts: T[],
  year: number,
): T[] {
  return posts.filter((post) => post.data.pubDate.getFullYear() === year);
}

/**
 * Filter posts by year and month
 */
export function filterByYearMonth<T extends PostWithDate>(
  posts: T[],
  year: number,
  month: number,
): T[] {
  return posts.filter((post) => {
    return (
      post.data.pubDate.getFullYear() === year &&
      post.data.pubDate.getMonth() + 1 === month
    );
  });
}

/**
 * Get month name from month number
 */
export function getMonthName(month: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1];
}

/**
 * Get archive stats (years with post counts)
 */
export function getArchiveStats<T extends PostWithDate>(
  posts: T[],
): Array<{
  year: number;
  count: number;
  months: Array<{ month: number; count: number }>;
}> {
  const yearMap = groupByYear(posts);
  const stats: Array<{
    year: number;
    count: number;
    months: Array<{ month: number; count: number }>;
  }> = [];

  Array.from(yearMap.keys())
    .sort((a, b) => b - a)
    .forEach((year) => {
      const yearPosts = yearMap.get(year)!;
      const monthCounts = new Map<number, number>();

      yearPosts.forEach((post) => {
        const month = post.data.pubDate.getMonth() + 1;
        monthCounts.set(month, (monthCounts.get(month) || 0) + 1);
      });

      const months = Array.from(monthCounts.entries())
        .map(([month, count]) => ({ month, count }))
        .sort((a, b) => b.month - a.month);

      stats.push({
        year,
        count: yearPosts.length,
        months,
      });
    });

  return stats;
}
