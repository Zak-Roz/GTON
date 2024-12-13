import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MQBackendAppModule } from './mq-backend-app.module';
import { environments } from 'common/resources/environment';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MQBackendAppModule,
    {
      transport: Transport.RMQ,
      options: {
        queue: environments.MQQueueName,
        urls: [environments.MQUrl],
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
