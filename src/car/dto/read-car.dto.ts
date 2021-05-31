import { ApiProperty } from '@nestjs/swagger';

export class ReadCarDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mark: string;

  @ApiProperty()
  carModel: string;

  @ApiProperty()
  power: number;

  @ApiProperty()
  engineCapacity: number;
}
