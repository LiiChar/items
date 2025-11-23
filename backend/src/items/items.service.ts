import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/get-items.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from './entities/items.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items) private readonly repository: Repository<Items>,
  ) {}

  getItems(pagination: PaginationQueryDto) {
    const query = this.repository.createQueryBuilder('items');

    if (pagination.limit) {
      query.limit(pagination.limit);
    }

    if (pagination.offset) {
      query.offset(pagination.offset);
    }

    return query.getMany().then((items) => items.map((item) => item));
  }
}
