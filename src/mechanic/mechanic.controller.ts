import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
}
