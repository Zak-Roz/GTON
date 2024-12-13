import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';
import { MESSAGE_PATTERNS } from 'common/resources/common.constants';
import { LoggerService } from 'common/utils/logger/logger.service';
import { User } from './model/user.entity';
import { environments } from 'common/resources/environment';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
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

      this.loggerService.log(
        'RabbitMQ connection established and delayed exchange created',
      );
    } catch (error) {
      this.loggerService.error(
        'Error initializing RabbitMQService',
        error.message,
      );
      throw error;
    }
  }

  async sendMessageToWorker(user: User) {
    try {
      this.loggerService.log('sendMessageToWorker >> ', JSON.stringify(user));

      const delayInMilliseconds = 24 * 60 * 60 * 1000;
      const message = {
        userId: user.id,
        name: user.name,
      };

      this.channel.publish(
        environments.MQExchangeName,
        MESSAGE_PATTERNS.createUserPattern,
        Buffer.from(JSON.stringify(message)),
        {
          headers: { 'x-delay': delayInMilliseconds },
        },
      );

      this.loggerService.log(
        `Message sent to delayed exchange with ${delayInMilliseconds}ms delay`,
      );
    } catch (error) {
      this.loggerService.error(
        'Error sending message to RabbitMQ',
        error.message,
      );
    }
  }

  async onModuleDestroy() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      this.loggerService.log('RabbitMQ connection closed');
    } catch (error) {
      this.loggerService.error(
        'Error closing RabbitMQ connection',
        error.message,
      );
    }
  }
}
