'use strict';

module.exports = {
  up(queryInterface) {
    const createUsersTableSql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        
        name VARCHAR(50) NOT NULL,

        createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=INNODB CHARACTER SET=UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;`
      .replace(/\s+/gi, ' ')
      .trim();

    return queryInterface.sequelize.query(createUsersTableSql);
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TABLE IF EXISTS users;');
  },
};
