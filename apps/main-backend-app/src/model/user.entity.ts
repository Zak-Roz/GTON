import { Table, Column, Model, Scopes, DataType } from 'sequelize-typescript';

@Scopes(() => ({
  orderBy: (arrayOfOrders: [[string, string]]) => ({ order: arrayOfOrders }),
  byId: (id: number) => ({ where: { id } }),
  byName: (name: string) => ({ where: { name } }),
  pagination: (query) => ({ limit: query.limit, offset: query.offset }),
}))
@Table({
  tableName: 'users',
  timestamps: true,
  underscored: false,
})
export class User extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  name: string;
}
