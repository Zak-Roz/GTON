import * as dotenv from 'dotenv';
dotenv.config();

export const environments = {
  webhook: process.env.WEBHOOK,
  webServiceUrl: process.env.WEB_SERVICE_URL,
  MQQueueName: process.env.MQ_NAME,
  MQUrl: process.env.MQ_URL,
  MQServiceName: process.env.MQ_SERVICE_NAME,
  MQExchangeName: process.env.MQ_EXCHANGE_NAME,
  DBDialect: process.env.DB_DIALECT,
  DBHost: process.env.DB_HOST,
  DBPort: process.env.DB_PORT,
  DBUsername: process.env.DB_USER,
  DBPassword: process.env.DB_PASS,
  DBDatabase: process.env.DB_NAME,
  DBLogging: process.env.DB_DISABLE_LOG,
};
