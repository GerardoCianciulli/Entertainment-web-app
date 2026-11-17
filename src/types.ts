export type Category = 'Movie' | 'TV Series';

export interface Video {
  id: number;
  title: string;
  thumbnail: {
    trending?: { small: string; large: string };
    regular: { small: string; medium: string; large: string };
  };
  year: number;
  category: Category;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export interface Member {
  id?: number;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export type PageId = 'home' | 'movies' | 'tv-series' | 'bookmarked';
