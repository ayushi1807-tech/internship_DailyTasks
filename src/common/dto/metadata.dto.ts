/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from "@nestjs/swagger";


export class MetadataDto{
    @ApiPropertyOptional({example:1}) page ?: number
    @ApiPropertyOptional({example:10}) limit ?: number
    @ApiPropertyOptional({example:50}) total ?: number
}