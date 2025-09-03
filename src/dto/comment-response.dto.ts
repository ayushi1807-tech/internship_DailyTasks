/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class CommentResponseDto {
  @ApiProperty() id: number;
  @ApiProperty() content: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() postId: number;
  @ApiProperty() userId: number;
}