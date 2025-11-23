import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import ormConfig from 'config/orm.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        const orm = config.get('orm.config') as
          | TypeOrmModuleOptions
          | undefined;
        if (!orm) {
          throw new Error('ORM config not found (config key: orm.config)');
        }

        return {
          ...orm,
          autoLoadEntities: true,
        };
      },
    }),
    ItemsModule,
  ],
})
export class AppModule {}
