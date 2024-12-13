import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';
import { MESSAGE_PATTERNS } from 'common/resources/common.constants';
import { environments } from 'common/resources/environment';
import { LoggerService } from 'common/utils/logger/logger.service';
import axios from 'axios';

@Injectable()
export class MQBackendAppService implements OnModuleInit {
  private connection: Connection;
  private channel: Channel;

  constructor(private readonly loggerService: LoggerService) {}

  async onModuleInit() {
    try {
      this.connection = await connect(environments.MQUrl);
      this.channel = await this.connection.createChannel();

      await this.channel.assertExchange(
        environments.MQExchangeName,
        'x-delayed-message',
        {
          durable: true,
          arguments: { 'x-delayed-type': 'direct' },
        },
      );

      await this.channel.assertQueue(environments.MQQueueName, {
        durable: true,
      });

      await this.channel.bindQueue(
        environments.MQQueueName,
        environments.MQExchangeName,
        MESSAGE_PATTERNS.createUserPattern,
      );

      this.channel.consume(environments.MQQueueName, async (msg) => {
        if (msg) {
          const messageContent = JSON.parse(msg.content.toString());
          this.loggerService.log('Received message:', messageContent);

          try {
            await axios.post(environments.webhook, messageContent);
            this.loggerService.log('Push notification sent');
          } catch (error) {
            this.loggerService.error(
              'Error sending push notification:',
              error.message,
            );
          }

          this.channel.ack(msg);
        }
      });

      this.loggerService.log(
        `Listening for messages on queue: ${environments.MQQueueName}`,
      );
    } catch (error) {
      this.loggerService.error(
        'Error initializing MQBackendAppService:',
        error.message,
      );
    }
  }
}
