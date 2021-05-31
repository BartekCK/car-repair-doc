import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Car } from '../../car/schema/car.schema';
import { ReadMechanicDto } from '../dto/read-mechanic.dto';
import { omit } from 'ramda';

export type MechanicDocument = Mechanic & Document;

@Schema()
export class Mechanic extends Document {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }] })
  cars: Car[];

  static toReadMechanicDto = (mechanic: Mechanic): ReadMechanicDto => {
    return {
      id: mechanic._id,
      ...omit(['__v', '_id'], mechanic.toObject()),
      cars: mechanic.cars.map((car) => Car.toReadCar(car)),
    };
  };
}
export const MechanicSchema = SchemaFactory.createForClass(Mechanic);

export const MechanicModelDefinition: ModelDefinition = {
  name: Mechanic.name,
  schema: MechanicSchema,
};
