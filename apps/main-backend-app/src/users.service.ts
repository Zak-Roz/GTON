import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { TranslatorService } from 'nestjs-translator';
import { User } from './model/user.entity';
import { BaseService } from 'common/base/base.service';
import { ICreateUser } from './model/create-user.dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    private readonly translator: TranslatorService,
    @Inject('USER_MODEL') protected model: Repository<User>,
  ) {
    super(model);
  }

  async create(body: ICreateUser, transaction?: Transaction): Promise<User> {
    const user = await this.getOne([{ method: ['byName', body.name] }]);

    if (user) {
      throw new BadRequestException({
        message: this.translator.translate('USER_ALREADY_EXIST'),
        errorCode: 'USER_ALREADY_EXIST',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    return this.model.create({ ...body }, { transaction });
  }
}
