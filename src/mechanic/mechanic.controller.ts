import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MechanicService } from './mechanic.service';
import { MechanicDto } from './dto/mechanic.dto';
import { ReadMechanicDto } from './dto/read-mechanic.dto';

@ApiTags('mechanics')
@Controller('mechanics')
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Post()
  async createNewMechanic(
    @Body() creteNewMechanic: MechanicDto,
  ): Promise<ReadMechanicDto> {
    return this.mechanicService.create(creteNewMechanic);
  }

  @Patch(':mechanicId/car/:carId')
  async assignCarToMechanic(
    @Param('mechanicId') mechanicId: string,
    @Param('carId') carId: string,
  ): Promise<ReadMechanicDto> {
    return this.mechanicService.assignCarToMechanic(mechanicId, carId);
  }

  @Delete(':mechanicId/car/:carId')
  async deleteCarFromMechanic(
    @Param('mechanicId') mechanicId: string,
    @Param('carId') carId: string,
  ): Promise<ReadMechanicDto> {
    return this.mechanicService.unassignCarFromMechanic(mechanicId, carId);
  }

  @Get(':mechanicId')
  async getMechanicById(
    @Param('mechanicId') mechanicId: string,
  ): Promise<ReadMechanicDto> {
    return this.mechanicService.getById(mechanicId);
  }

  @Get()
  async getAllMechanics(): Promise<ReadMechanicDto[]> {
    return this.mechanicService.getAll();
  }

  @Post('aggregate')
  async aggregate(): Promise<any> {
    return this.mechanicService.calculateMechanicsCars();
  }
}
