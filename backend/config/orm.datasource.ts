import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';
import { Items } from '../src/items/entities/items.entities';
import { join } from 'path';

dotenvConfig();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Items],
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],

  synchronize: false,
});
