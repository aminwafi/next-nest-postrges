import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

describe('Main', () => {
  let app: any;

  beforeAll(async () => {
    app = await NestFactory.create(AppModule);
  });

  it('should create a Nest application', () => {
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});