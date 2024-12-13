import { Model, Repository } from 'sequelize-typescript';
import { ScopeOptions, Transaction } from 'sequelize';

export class BaseService<T extends Model> {
  protected readonly model: Repository<T>;

  constructor(model: Repository<T>) {
    this.model = model;
  }

  async getById(
    id: number,
    scopes: (string | ScopeOptions)[] = [],
    transaction?: Transaction,
  ): Promise<T> {
    return this.model.scope(scopes).findByPk(id, { transaction });
  }

  async getList(
    scopes: string | ScopeOptions | readonly (string | ScopeOptions)[] = [],
    transaction?: Transaction,
  ): Promise<T[]> {
    return this.model.scope(scopes).findAll({ transaction });
  }

  async getCount(
    scopes: string | ScopeOptions | readonly (string | ScopeOptions)[] = [],
    transaction?: Transaction,
  ): Promise<number> {
    return this.model.scope(scopes).count({ transaction });
  }

  async getOne(
    scopes: string | ScopeOptions | readonly (string | ScopeOptions)[] = [],
    transaction?: Transaction,
  ): Promise<T> {
    return this.model.scope(scopes).findOne({ transaction });
  }
}
