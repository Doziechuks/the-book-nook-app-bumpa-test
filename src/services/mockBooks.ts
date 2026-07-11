import { Book, Review } from '@/src/types/book';

const CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Sci-Fi',
  'Fantasy',
  'Mystery',
  'Romance',
  'Biography',
  'Self-Help',
  'History',
  'Children',
];

const TITLE_PREFIXES = [
  'The Silent',
  'Whispers of',
  'Shadows over',
  'Beyond the',
  'Echoes of',
  'The Last',
  'A Tale of',
  'The Hidden',
  'Journey to',
  'The Forgotten',
  'Rise of the',
  'The Secret',
  'Chronicles of',
  'The Broken',
  'Under the',
  'The Quiet',
  'Legacy of',
  'The Long',
  'Return to',
  'The Wandering',
];

const TITLE_SUFFIXES = [
  'Garden',
  'Ocean',
  'Mountain',
  'Kingdom',
  'Storm',
  'City',
  'Forest',
  'Star',
  'River',
  'Empire',
  'Library',
  'Horizon',
  'Winter',
  'Flame',
  'Shadow',
  'Harbor',
  'Meadow',
  'Tower',
  'Valley',
  'Coastline',
];

const FIRST_NAMES = [
  'Amara',
  'Daniel',
  'Elena',
  'Kwame',
  'Sofia',
  'James',
  'Priya',
  'Lucas',
  'Naomi',
  'Oliver',
  'Yuki',
  'Miguel',
  'Ada',
  'Ethan',
  'Chidi',
  'Grace',
];

const LAST_NAMES = [
  'Okafor',
  'Bennett',
  'Ivanova',
  'Mensah',
  'Rossi',
  'Carter',
  'Sharma',
  'Fischer',
  'Reid',
  'Adeyemi',
  'Tanaka',
  'Silva',
  'Whitfield',
  'Osei',
];

const REVIEWERS = [
  'BookWormBella',
  'PageTurner22',
  'QuietReaderJay',
  'NovelNerd',
  'InkAndPaper',
  'ChapterChaser',
  'TheLitCritic',
  'MidnightReader',
];

const REVIEW_COMMENTS = [
  "Couldn't put it down, finished it in two days.",
  'The pacing dragged a bit in the middle but the ending made up for it.',
  'Beautifully written, the imagery really stuck with me.',
  'Solid read, though I expected a bit more from the plot twist.',
  "One of the best books I've read this year.",
  'Characters felt real and the dialogue was sharp.',
  'A bit predictable, but still enjoyable.',
  'The world-building here is incredible.',
];

const DESCRIPTIONS = [
  'A gripping story that explores the depths of human resilience against an unforgettable backdrop.',
  'An intimate portrait of family, loss, and the ties that bind us together across generations.',
  'A fast-paced adventure that blends mystery and heart in equal measure.',
  'A thought-provoking exploration of identity, belonging, and the search for home.',
  "A sweeping saga that spans decades, following one family's fortune and folly.",
];

const BOOK_COUNT = 72;

const seededPick = <T>(arr: T[], seed: number): T => arr[seed % arr.length];

const generateReviews = (bookIndex: number): Review[] => {
  const count = (bookIndex % 3) + 2;
  return Array.from({ length: count }, (_, i) => {
    const seed = bookIndex * 7 + i * 13;
    return {
      id: `review-${bookIndex}-${i}`,
      user: seededPick(REVIEWERS, seed),
      rating: 3 + (seed % 3),
      comment: seededPick(REVIEW_COMMENTS, seed + 3),
      date: new Date(2025, seed % 12, (seed % 27) + 1).toISOString(),
    };
  });
};

const generateBook = (index: number): Book => {
  const title = `${seededPick(TITLE_PREFIXES, index)} ${seededPick(TITLE_SUFFIXES, index * 3 + 1)}`;
  const author = `${seededPick(FIRST_NAMES, index * 2)} ${seededPick(LAST_NAMES, index * 5 + 2)}`;
  const category = seededPick(CATEGORIES, index);
  const reviews = generateReviews(index);
  const rating =
    Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;
  const price = Number((8 + ((index * 37) % 42) + 0.99).toFixed(2));

  return {
    id: `book-${index + 1}`,
    title,
    author,
    description: `${seededPick(DESCRIPTIONS, index)} A ${category.toLowerCase()} novel by ${author}.`,
    price,
    coverImage: `https://picsum.photos/seed/booknook-${index + 1}/400/600`,
    reviews,
    rating,
    category,
    stock: index % 7,
  };
};

export const MOCK_BOOKS: Book[] = Array.from({ length: BOOK_COUNT }, (_, i) => generateBook(i));

export const CATEGORY_LIST = CATEGORIES;
