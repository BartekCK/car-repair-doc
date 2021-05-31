import { ApiProperty } from '@nestjs/swagger';

export class MechanicDto {
  @ApiProperty()
  name: string;
}
