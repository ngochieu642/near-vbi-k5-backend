import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('User Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
  });

  describe('POST /users/identity-request', () => {
    test('should return 400 if body has at least 1 field not match class validator', () => {
      const body = {
        accountId: 'ngochieu642.testnet',
        userPublicKey: 'ed25519:GEY8FE8xVHnzmRv5k5e24VUncnqFrwDFGJSA11mGRiVo',
        name: 'Hiếu Thái',
        gender: 'male',
        dob: '1997-04-10',
        address: '688 Lê Đức Thọ',
        ccid: '026647335',
        phoneNumber: '0968046516',
        nationality: 'Vietnam',
        faceVector: [1],
      };

      return request(app.getHttpServer())
        .post('/users/identity-request')
        .send(body)
        .set('Accept', 'application/json')
        .expect(400);
    });

    test('should return 201', () => {
      const body = {
        accountId: 'ngochieu642.testnet',
        userPublicKey: 'ed25519:GEY8FE8xVHnzmRv5k5e24VUncnqFrwDFGJSA11mGRiVo',
        name: 'Thái Ngọc Hiếu',
        gender: 'male',
        dob: '1997-04-10',
        address: '688 Lê Đức Thọ',
        ccid: '026647335',
        phoneNumber: '0968046516',
        nationality: 'Vietnam',
        faceVector: [
          [1, 2],
          [3, 4],
        ],
      };

      return request(app.getHttpServer())
        .post('/users/identity-request')
        .send(body)
        .set('Accept', 'application/json')
        .expect(201);
    });
  });

  describe('POST /users/signup', () => {
    test('Should return 400 if "email" is not an email', () => {
      const body = {
        email: 'hieuthai1223',
        password: '1123',
      };

      return request(app.getHttpServer())
        .post('/users/signup')
        .send(body)
        .set('Accept', 'application/json')
        .expect(400);
    });
  });
});
