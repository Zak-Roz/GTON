import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './model/create-user.dto';
import { UsersService } from './users.service';
import { RabbitMQService } from './rabbitmq.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<void> {
    const user = await this.usersService.create(createUserDto);

    await this.rabbitMQService.sendMessageToWorker(user);
  }
}
