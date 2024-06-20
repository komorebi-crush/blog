import { Module } from "@nestjs/common";
import { ProcessedPostModuleBase } from "./base/processedPost.module.base";
import { ProcessedPostService } from "./processedPost.service";
import { ProcessedPostController } from "./processedPost.controller";
import { ProcessedPostResolver } from "./processedPost.resolver";

@Module({
  imports: [ProcessedPostModuleBase],
  controllers: [ProcessedPostController],
  providers: [ProcessedPostService, ProcessedPostResolver],
  exports: [ProcessedPostService],
})
export class ProcessedPostModule {}
