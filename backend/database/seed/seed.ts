import { AppDataSource } from './../../config/orm.seed';
import { itemsFactory } from '../factory/items.factory';

async function seed() {
  await AppDataSource.initialize();
  console.log('Seeding...');

  await itemsFactory(50000);

  console.log('Done!');
  process.exit(0); // чтобы ts-node не висел
}

seed();
