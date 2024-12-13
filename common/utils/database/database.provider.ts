import { Sequelize } from 'sequelize-typescript';
import { entities } from './database-entity.provider';
import { environments } from 'common/resources/environment';

export const sequelizeProvider = () => ({
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize(
      environments.DBDatabase,
      environments.DBUsername,
      environments.DBPassword,
      {
        host: environments.DBHost,
        dialect: 'mysql',
        username: environments.DBUsername,
        password: environments.DBPassword,
        database: environments.DBDatabase,
      },
    );
    sequelize.addModels(entities);
    return sequelize;
  },
});
