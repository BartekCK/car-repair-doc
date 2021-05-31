import { Module } from '@nestjs/common';
import { CarModelDefinition } from './schema/car.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [MongooseModule.forFeature([CarModelDefinition])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
