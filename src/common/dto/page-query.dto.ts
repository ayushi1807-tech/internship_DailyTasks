/* eslint-disable prettier/prettier */
// src/common/dto/page-query.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString, Min } from 'class-validator';

import { Type } from 'class-transformer';
 
export class PageQueryDto {

  @ApiPropertyOptional({ example: 1 })

  @Type(() => Number)

  @IsOptional()

  @IsInt()

  @Min(1)

  page?: number = 1;
 
  @ApiPropertyOptional({ example: 10 })

  @Type(() => Number)

  @IsOptional()

  @IsInt()

  @Min(1)

  limit?: number = 10;
 
  @ApiPropertyOptional({ example: 'nestjs' })

  @IsOptional()

  @IsString()

  search?: string;
 
  @ApiPropertyOptional({ example: false, description: 'Include soft-deleted records' })

  @IsOptional()

  includeDeleted?: boolean;

}

 