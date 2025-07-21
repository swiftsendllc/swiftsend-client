export interface CreatePostInput {
  caption: string;
  isExclusive: boolean;
  price: number | null;
  assetIds: string[];
}

export interface TimelinePostsInput {
  offset: number;
  limit: number;
}

