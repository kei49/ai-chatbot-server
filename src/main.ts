import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';

import { AppModule } from './modules/app.module';
import { SESSION_SECRET } from './shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AI Chatbot Server')
    .setDescription('The AI Chatbot Server API description')
    .setVersion('0.1')
    .addTag('chatbot')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
