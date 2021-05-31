import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarDto } from './dto/car.dto';
import { CarPowerQueryDto } from './dto/car-power.query.dto';
import { ReadCarDto } from './dto/read-car.dto';

@ApiTags('cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async createNewCar(@Body() createNewCar: CarDto): Promise<ReadCarDto> {
    return this.carService.create(createNewCar);
  }

  @Get(':carId')
  async getCarById(@Param('carId') carId: string): Promise<ReadCarDto> {
    return this.carService.getById(carId);
  }

  @Get()
  async getCarByPower(
    @Query() carPowerQueryDto: CarPowerQueryDto,
  ): Promise<ReadCarDto[]> {
    return this.carService.getByPower(carPowerQueryDto);
  }

  @Delete(':carId')
  async deleteCarById(@Param('carId') carId: string): Promise<ReadCarDto> {
    return this.carService.deleteById(carId);
  }
}
