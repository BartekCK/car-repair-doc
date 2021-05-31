import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MechanicModule } from './mechanic/mechanic.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    ),
    CarModule,
    MechanicModule,
  ],
})
export class AppModule {}
