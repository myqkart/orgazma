export interface Story {
  title: string;
  subtitle: string;
  previewText: string;
  imageUrl: string;
  readTimeMinutes: number;
  isFeatured?: boolean;
  content: string[];
}

export interface StoryWithSlug extends Story {
  slug: string;
}
