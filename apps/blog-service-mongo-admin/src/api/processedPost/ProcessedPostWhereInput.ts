import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";

export type ProcessedPostWhereInput = {
  contentSummary?: StringNullableFilter;
  id?: StringFilter;
  originalPostId?: IntNullableFilter;
  processedAt?: DateTimeNullableFilter;
};
