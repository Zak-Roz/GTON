import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from 'common/resources/environment';

export const rabbitMQProvider = ClientsModule.register([
  {
    name: environments.MQServiceName,
    transport: Transport.RMQ,
    options: {
      urls: [environments.MQUrl],
      queue: environments.MQQueueName,
      queueOptions: {
        durable: true,
      },
    },
  },
]);
