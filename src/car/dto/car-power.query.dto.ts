import { ApiProperty } from '@nestjs/swagger';

export class CarPowerQueryDto {
  @ApiProperty({ required: false })
  powerFrom?: number;

  @ApiProperty({ required: false })
  powerTo?: number;
}
