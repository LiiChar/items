import { registerAs } from '@nestjs/config';
import { env } from 'helper/env';
import { Items } from '../src/items/entities/items.entities';
import { join } from 'path';

export default registerAs('orm.config', () => ({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [Items],
  synchronize: false,
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
}));
