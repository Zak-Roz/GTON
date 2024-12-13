import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MQBackendAppService } from './mq-backend-app.service';
import { rabbitMQProvider } from 'common/utils/rabbitmq/rabbitmq.provider';
import { LoggerModule } from 'common/utils/logger/logger.module';

@Module({
  imports: [HttpModule, rabbitMQProvider, LoggerModule],
  providers: [MQBackendAppService],
})
export class MQBackendAppModule {}
