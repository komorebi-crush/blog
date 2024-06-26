/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, ProcessedPost as PrismaProcessedPost } from "@prisma/client";

export class ProcessedPostServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count(
    args: Omit<Prisma.ProcessedPostCountArgs, "select">
  ): Promise<number> {
    return this.prisma.processedPost.count(args);
  }

  async processedPosts(
    args: Prisma.ProcessedPostFindManyArgs
  ): Promise<PrismaProcessedPost[]> {
    return this.prisma.processedPost.findMany(args);
  }
  async processedPost(
    args: Prisma.ProcessedPostFindUniqueArgs
  ): Promise<PrismaProcessedPost | null> {
    return this.prisma.processedPost.findUnique(args);
  }
  async createProcessedPost(
    args: Prisma.ProcessedPostCreateArgs
  ): Promise<PrismaProcessedPost> {
    return this.prisma.processedPost.create(args);
  }
  async updateProcessedPost(
    args: Prisma.ProcessedPostUpdateArgs
  ): Promise<PrismaProcessedPost> {
    return this.prisma.processedPost.update(args);
  }
  async deleteProcessedPost(
    args: Prisma.ProcessedPostDeleteArgs
  ): Promise<PrismaProcessedPost> {
    return this.prisma.processedPost.delete(args);
  }
}
