import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { ProcessedPostService } from "./processedPost.service";
import { ProcessedPostControllerBase } from "./base/processedPost.controller.base";

@swagger.ApiTags("processedPosts")
@common.Controller("processedPosts")
export class ProcessedPostController extends ProcessedPostControllerBase {
  constructor(protected readonly service: ProcessedPostService) {
    super(service);
  }
}
