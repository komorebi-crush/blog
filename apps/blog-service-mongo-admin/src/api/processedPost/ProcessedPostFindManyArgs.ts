import { ProcessedPostWhereInput } from "./ProcessedPostWhereInput";
import { ProcessedPostOrderByInput } from "./ProcessedPostOrderByInput";

export type ProcessedPostFindManyArgs = {
  where?: ProcessedPostWhereInput;
  orderBy?: Array<ProcessedPostOrderByInput>;
  skip?: number;
  take?: number;
};
