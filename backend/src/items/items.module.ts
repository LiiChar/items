import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './entities/items.entities';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  imports: [TypeOrmModule.forFeature([Items])],
  exports: [ItemsService],
})
export class ItemsModule {}
