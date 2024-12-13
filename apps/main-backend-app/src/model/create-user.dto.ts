import { IsNotEmpty, IsString } from 'class-validator';

export interface ICreateUser {
  name: string;
}

export class CreateUserDTO implements ICreateUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  toJson(): ICreateUser {
    return {
      name: this.name,
    };
  }

  static newInstanceFromJson(data: ICreateUser) {
    console.log('newInstanceFromJson >> ', data);
    const result = new CreateUserDTO();
    result.name = data.name;

    return result;
  }
}
