import { faker } from '@faker-js/faker';
import { Items } from '../../src/items/entities/items.entities';
import { AppDataSource } from './../../config/orm.seed';

export const itemsFactory = async (count: number) => {
  const items: Items[] = [];
  const itemsRepo = AppDataSource.getRepository(Items);

  for (let i = 0; i < count; i++) {
      await itemsRepo.insert({
        name: faker.lorem.word(),
        createdAt: new Date(),
      });
  }


  return items;
};
