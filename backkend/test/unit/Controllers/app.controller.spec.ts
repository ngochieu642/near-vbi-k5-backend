import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../../src/v1/controllers/app.controller';
import { ApplicationHealthResponse } from '../../../src/v1/boundary/response/ApplicationHealthResponse';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return system status', () => {
      const appHealResponse: ApplicationHealthResponse = appController.getHealth();

      expect(appHealResponse).not.toBeNull();
      expect(appHealResponse.status).not.toBeNull();
    });
  });
});
