import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReadCarDto } from '../dto/read-car.dto';
import { omit } from 'ramda';
import { Mechanic } from '../../mechanic/schema/mechanic.schema';
import * as mongoose from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car extends Document {
  @Prop()
  mark: string;

  @Prop()
  carModel: string;

  @Prop()
  power: number;

  @Prop()
  engineCapacity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic' })
  mechanic?: Mechanic;

  static toReadCar = (car: Car): ReadCarDto => {
    return {
      id: car.id,
      ...omit(['_id', '__v'], car.toObject()),
    };
  };
}
export const CarSchema = SchemaFactory.createForClass(Car);

export const CarModelDefinition: ModelDefinition = {
  name: Car.name,
  schema: CarSchema,
};
