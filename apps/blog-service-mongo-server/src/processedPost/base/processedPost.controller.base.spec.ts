import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { ProcessedPostController } from "../processedPost.controller";
import { ProcessedPostService } from "../processedPost.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  contentSummary: "exampleContentSummary",
  createdAt: new Date(),
  id: "exampleId",
  originalPostId: 42,
  processedAt: new Date(),
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  contentSummary: "exampleContentSummary",
  createdAt: new Date(),
  id: "exampleId",
  originalPostId: 42,
  processedAt: new Date(),
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    contentSummary: "exampleContentSummary",
    createdAt: new Date(),
    id: "exampleId",
    originalPostId: 42,
    processedAt: new Date(),
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  contentSummary: "exampleContentSummary",
  createdAt: new Date(),
  id: "exampleId",
  originalPostId: 42,
  processedAt: new Date(),
  updatedAt: new Date(),
};

const service = {
  createProcessedPost() {
    return CREATE_RESULT;
  },
  processedPosts: () => FIND_MANY_RESULT,
  processedPost: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("ProcessedPost", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ProcessedPostService,
          useValue: service,
        },
      ],
      controllers: [ProcessedPostController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /processedPosts", async () => {
    await request(app.getHttpServer())
      .post("/processedPosts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        processedAt: CREATE_RESULT.processedAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /processedPosts", async () => {
    await request(app.getHttpServer())
      .get("/processedPosts")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          processedAt: FIND_MANY_RESULT[0].processedAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /processedPosts/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/processedPosts"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /processedPosts/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/processedPosts"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        processedAt: FIND_ONE_RESULT.processedAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /processedPosts existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/processedPosts")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        processedAt: CREATE_RESULT.processedAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/processedPosts")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
