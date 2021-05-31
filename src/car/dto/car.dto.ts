import { ApiProperty } from '@nestjs/swagger';

export class CarDto {
  @ApiProperty()
  mark: string;

  @ApiProperty()
  carModel: string;

  @ApiProperty()
  power: number;

  @ApiProperty()
  engineCapacity: number;
}
