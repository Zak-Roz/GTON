import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { RabbitMQService } from './rabbitmq.service';
import { rabbitMQProvider } from 'common/utils/rabbitmq/rabbitmq.provider';
import { LoggerModule } from 'common/utils/logger/logger.module';
import { UsersService } from './users.service';
import { translatorInstance } from 'common/utils/translator/translator.provider';
import { modelProviders } from './models.provider';
import { sequelizeProvider } from 'common/utils/database/database.provider';

@Module({
  imports: [rabbitMQProvider, LoggerModule, translatorInstance],
  controllers: [UsersController],
  providers: [
    RabbitMQService,
    UsersService,
    sequelizeProvider(),
    ...modelProviders,
  ],
})
export class AppModule {}
