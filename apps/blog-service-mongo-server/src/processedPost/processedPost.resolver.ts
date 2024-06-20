import * as graphql from "@nestjs/graphql";
import { ProcessedPostResolverBase } from "./base/processedPost.resolver.base";
import { ProcessedPost } from "./base/ProcessedPost";
import { ProcessedPostService } from "./processedPost.service";

@graphql.Resolver(() => ProcessedPost)
export class ProcessedPostResolver extends ProcessedPostResolverBase {
  constructor(protected readonly service: ProcessedPostService) {
    super(service);
  }
}
