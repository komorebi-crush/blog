import { ProcessedPost as TProcessedPost } from "../api/processedPost/ProcessedPost";

export const PROCESSEDPOST_TITLE_FIELD = "contentSummary";

export const ProcessedPostTitle = (record: TProcessedPost): string => {
  return record.contentSummary?.toString() || String(record.id);
};
