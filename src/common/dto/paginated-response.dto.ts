/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { MetadataDto } from './metadata.dto';
 
export class PaginatedResponseDto<T = any> {
  @ApiProperty({ example: 200 })
  statusCode: number;
 
  @ApiProperty({ example: 'Success' })
  message: string;
 
  @ApiProperty({ type: MetadataDto })
  metadata: MetadataDto;
 
  @ApiProperty({ isArray: true })
  data: T[];
}