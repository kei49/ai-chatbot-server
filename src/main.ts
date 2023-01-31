import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';
import { getSession } from './shared/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(getSession());

  const config = new DocumentBuilder()
    .setTitle('AI Chatbot Server')
    .setDescription('The AI Chatbot Server API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
