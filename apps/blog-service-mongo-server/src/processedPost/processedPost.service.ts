import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProcessedPostServiceBase } from "./base/processedPost.service.base";

@Injectable()
export class ProcessedPostService extends ProcessedPostServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
