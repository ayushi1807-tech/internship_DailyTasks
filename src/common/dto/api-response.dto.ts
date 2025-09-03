/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MetadataDto } from './metadata.dto';
 
export class ApiResponseDto<T= any> {
  @ApiProperty({ example: 200 })
  statusCode: number;
 
  @ApiProperty({ example: 'Success' })
  message: string;
 
  @ApiPropertyOptional({ type: MetadataDto })
  metadata?: MetadataDto;
 
  @ApiPropertyOptional()
  data?: T;
}