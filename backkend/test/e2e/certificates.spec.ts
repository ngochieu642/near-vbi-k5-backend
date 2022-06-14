import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { strict as assert } from 'assert';

describe('CertificateController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/certificates (GET)', () => {
    it('should return all certificates', () => {
      return request(app.getHttpServer())
        .get('/certificates')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (response) {
          assert.ok(response.body.hasOwnProperty('status'));
        });
    });
  });
});
