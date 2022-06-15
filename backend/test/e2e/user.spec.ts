import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { appExtensions } from '../../src/main';

const _ = require('lodash');

describe('User Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appExtensions(app);
    await app.init();
  });

  describe('POST /users/identity-request', () => {
    const baseBody = {
      accountId: 'ngochieu642.testnet',
      userPublicKey: 'ed25519:GEY8FE8xVHnzmRv5k5e24VUncnqFrwDFGJSA11mGRiVo',
      name: 'Hiếu Thái',
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

    test.each([
      { body: { ...baseBody, accountId: 123 } },
      { body: { ...baseBody, userPublicKey: 123 } },
      { body: { ...baseBody, name: 123 } },
      { body: { ...baseBody, gender: 123 } },
      { body: { ...baseBody, dob: '12/04/1997' } },
      { body: { ...baseBody, dob: 12 } },
      { body: { ...baseBody, phoneNumber: 12 } },
      { body: { ...baseBody, nationality: 12 } },
      { body: { ...baseBody, faceVector: [1] } },
    ])('should return 400 if body has at least 1 field not match class validator', ({ body }) => {
      return request(app.getHttpServer())
        .post('/users/identity-request')
        .send(body)
        .set('Accept', 'application/json')
        .expect(400);
    });

    test.each([
      { body: _.omit(baseBody, ['accountId']) },
      { body: _.omit(baseBody, ['userPublicKey']) },
      { body: _.omit(baseBody, ['name']) },
      { body: _.omit(baseBody, ['gender']) },
      { body: _.omit(baseBody, ['dob']) },
      { body: _.omit(baseBody, ['phoneNumber']) },
      { body: _.omit(baseBody, ['nationality']) },
      { body: _.omit(baseBody, ['faceVector']) },
    ])('should return 400 if any field is missing', ({ body }) => {
      console.log(body);
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
