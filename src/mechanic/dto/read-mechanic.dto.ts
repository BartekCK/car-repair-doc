import { ApiProperty } from '@nestjs/swagger';
import { ReadCarDto } from '../../car/dto/read-car.dto';

export class ReadMechanicDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cars: ReadCarDto[];
}
