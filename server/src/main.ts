import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';

configDotenv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: 'Content-Type, Authorization',
    origin: 'http://localhost:3000',
    methods: 'GET", POST, PUT, DELETE',
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('Pricing Query')
    .setDescription('Pricing Query API description')
    .setVersion('1.0')
    .addTag('Pricing Query API Tag')
    .build();

  console.log(config);
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3002);
}
bootstrap();
