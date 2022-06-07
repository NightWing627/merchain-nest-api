import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { SegmentsModule } from './segments/segments.module';
import { ImageUploadController } from './image-upload/image-upload.controller';
import { ImageUploadService } from './image-upload/image-upload.service';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { AdvertisersModule } from './advertisers/advertisers.module';
import { ResponsiblesModule } from './responsibles/responsibles.module';
import { MallsModule } from './malls/malls.module';
import { ProductsModule } from './products/products.module';
import { PartnersModule } from './partners/partners.module';
const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || '111';
@Module({
  imports: [
    EasyconfigModule.register({ path: '.env', safe: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username,
      password,
      database: 'merchanDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TodoModule,
    SegmentsModule,
    ImageUploadModule,
    AdvertisersModule,
    ResponsiblesModule,
    MallsModule,
    ProductsModule,
    PartnersModule,
  ],
  controllers: [AppController, ImageUploadController],
  providers: [AppService, ImageUploadService],
})
export class AppModule { }
