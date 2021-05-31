import { Injectable, NotFoundException } from '@nestjs/common';
import { CarDto } from './dto/car.dto';
import { CarPowerQueryDto } from './dto/car-power.query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument, CarModelDefinition } from './schema/car.schema';
import { ReadCarDto } from './dto/read-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(CarModelDefinition.name) private carModel: Model<CarDocument>,
  ) {}

  async create(createNewCar: CarDto): Promise<ReadCarDto> {
    const car = new this.carModel(createNewCar);
    await car.save();
    return Car.toReadCar(car);
  }

  async getById(carId: string): Promise<CarDocument> {
    const car = await this.carModel.findById(carId);
    if (!car) {
      throw new NotFoundException(`Car by id ${carId} not found`);
    }
    return car;
  }

  async deleteById(carId: string): Promise<ReadCarDto> {
    const car = await this.carModel.findOneAndRemove({ _id: carId });
    if (!car) {
      throw new NotFoundException(`Car by id ${carId} not found`);
    }
    return Car.toReadCar(car);
  }

  async getByPower(query: CarPowerQueryDto): Promise<ReadCarDto[]> {
    const cars = await this.carModel.find({
      power: this.buildQuery(query),
    });
    return cars.map(Car.toReadCar);
  }

  private buildQuery({ powerFrom, powerTo }: CarPowerQueryDto) {
    if (!powerFrom && !powerTo) {
      return {
        $gte: 0,
      };
    } else if (powerFrom && powerTo) {
      return { $gte: powerFrom, $lte: powerTo };
    }

    return powerFrom ? { $gte: powerFrom } : { $lte: powerTo };
  }
}
