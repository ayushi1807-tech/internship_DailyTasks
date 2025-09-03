/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class PostResponseDto {
  @ApiProperty() id: number;
  @ApiProperty() title: string;
  @ApiProperty() content: string;
  @ApiProperty() status: string;
  @ApiProperty({ nullable: true }) deletedAt?: Date | null;
}