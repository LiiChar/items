import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { PaginationQueryDto } from './dto/get-items.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @HttpCode(200)
  async getItems(@Query() pagination: PaginationQueryDto) {
    return this.itemsService.getItems(pagination);
  }
}
