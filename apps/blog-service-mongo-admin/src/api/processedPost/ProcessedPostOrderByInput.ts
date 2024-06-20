import { SortOrder } from "../../util/SortOrder";

export type ProcessedPostOrderByInput = {
  contentSummary?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  originalPostId?: SortOrder;
  processedAt?: SortOrder;
  updatedAt?: SortOrder;
};
