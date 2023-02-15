
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ContributorsModule } from '../src/contributors/contributors.module';
import { ContributorsService } from '../src/contributors/contributors.service';
import { INVALID_QUERY_PARAMETERS } from '../src/utilities/texts';

describe('Cats', () => {
  let app: INestApplication;
  let contributorsService = { getContributorsFromGithub: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ContributorsModule],
    })
      .overrideProvider(ContributorsService)
      .useValue(contributorsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`gets contributors`, () => {
    return request(app.getHttpServer())
      .get('/contributors?repositoryId=songsApp&githubUser=ejubkadric94')
      .expect(200)
      .expect(contributorsService.getContributorsFromGithub());
  });

  it(`throws invalid query parameters exception`, () => {
    return request(app.getHttpServer())
      .get('/contributors')
      .expect(400)
      .expect({ "statusCode" : 400 , "message" : INVALID_QUERY_PARAMETERS });
  });
});