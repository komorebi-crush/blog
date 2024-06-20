export type ProcessedPost = {
  contentSummary: string | null;
  createdAt: Date;
  id: string;
  originalPostId: number | null;
  processedAt: Date | null;
  updatedAt: Date;
};
