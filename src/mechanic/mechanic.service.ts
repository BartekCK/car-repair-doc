import { Injectable, NotFoundException } from '@nestjs/common';
import { MechanicDto } from './dto/mechanic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Mechanic,
  MechanicDocument,
  MechanicModelDefinition,
} from './schema/mechanic.schema';
import { ReadMechanicDto } from './dto/read-mechanic.dto';
import { CarService } from '../car/car.service';
import { CarDocument } from '../car/schema/car.schema';

@Injectable()
export class MechanicService {
  constructor(
    @InjectModel(MechanicModelDefinition.name)
    private readonly mechanicModel: Model<MechanicDocument>,
    private readonly carService: CarService,
  ) {}

  async create(createNewMechanic: MechanicDto): Promise<ReadMechanicDto> {
    const mechanic = new this.mechanicModel(createNewMechanic);

    await mechanic.save();

    return Mechanic.toReadMechanicDto(mechanic);
  }

  async getById(mechanicId: string): Promise<ReadMechanicDto> {
    const mechanic = await this.mechanicModel
      .findById(mechanicId)
      .populate('cars');

    if (!mechanic) {
      throw new NotFoundException(`Mechanic by id ${mechanicId} not found`);
    }

    return Mechanic.toReadMechanicDto(mechanic);
  }

  async getAll(): Promise<ReadMechanicDto[]> {
    const mechanics = await this.mechanicModel.find().populate('cars');

    return mechanics.map((mechanic) => Mechanic.toReadMechanicDto(mechanic));
  }

  async assignCarToMechanic(
    mechanicId: string,
    carId: string,
  ): Promise<ReadMechanicDto> {
    const car = await this.carService.getById(carId);
    const mechanic = await this.mechanicModel
      .findByIdAndUpdate(
        mechanicId,
        { $addToSet: { cars: carId } },
        { new: true },
      )
      .populate('cars');

    if (!mechanic) {
      throw new NotFoundException(`Mechanic by id ${mechanicId} not found`);
    }

    car.mechanic = mechanic;
    await car.save();

    return Mechanic.toReadMechanicDto(mechanic);
  }

  async unassignCarFromMechanic(mechanicId: string, carId: string) {
    const car = await this.carService.getById(carId);

    const mechanic = await this.mechanicModel
      .findByIdAndUpdate(mechanicId, { $pull: { cars: carId } }, { new: true })
      .populate('cars');

    if (!mechanic) {
      throw new NotFoundException(`Mechanic by id ${mechanicId} not found`);
    }

    car.mechanic = undefined;
    await car.save();

    return Mechanic.toReadMechanicDto(mechanic);
  }
}
