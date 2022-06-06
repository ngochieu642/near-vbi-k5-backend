import { Controller, Get } from '@nestjs/common';
import { ApplicationHealthResponse } from '../boundary/response';

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  getHealth(): ApplicationHealthResponse {
    return new ApplicationHealthResponse('Ok');
  }
}
