import { Module } from '@nestjs/common';
import { MechanicModelDefinition } from './schema/mechanic.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MechanicController } from './mechanic.controller';
import { MechanicService } from './mechanic.service';

@Module({
  imports: [MongooseModule.forFeature([MechanicModelDefinition])],
  controllers: [MechanicController],
  providers: [MechanicService],
})
export class MechanicModule {}
