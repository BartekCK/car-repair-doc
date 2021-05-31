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

@Injectable()
export class MechanicService {
  constructor(
    @InjectModel(MechanicModelDefinition.name)
    private readonly mechanicModel: Model<MechanicDocument>,
  ) {}

  async create(createNewMechanic: MechanicDto): Promise<ReadMechanicDto> {
    const mechanic = new this.mechanicModel(createNewMechanic);
    await mechanic.save();

    return Mechanic.toReadMechanicDto(mechanic);
  }

  async getById(mechanicId: string): Promise<ReadMechanicDto> {
    const mechanic = await this.mechanicModel.findById(mechanicId);
    if (!mechanic) {
      throw new NotFoundException(`Mechanic by id ${mechanicId} not found`);
    }
    return Mechanic.toReadMechanicDto(mechanic);
  }

  async getAll(): Promise<ReadMechanicDto[]> {
    const mechanics = await this.mechanicModel.find();
    return mechanics.map((mechanic) => Mechanic.toReadMechanicDto(mechanic));
  }
}
