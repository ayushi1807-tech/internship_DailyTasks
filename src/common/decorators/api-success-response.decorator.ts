/* eslint-disable prettier/prettier */
// src/common/decorators/api-success-response.decorator.ts

import { applyDecorators, Type } from '@nestjs/common';

import {
  ApiExtraModels,
  ApiOkResponse,
  ApiCreatedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiResponseDto } from '../dto/api-response.dto';

import { PaginatedResponseDto } from '../dto/paginated-response.dto';

type Options = {
  model: Type<any>;
  paginated?: boolean;
  status?: 200 | 201;
  description?: string;
};

export function ApiSuccessResponse(opts: Options) {
  const {
    model,
    paginated = false,
    status = 200,
    description = 'Success',
  } = opts;

  const base = paginated ? PaginatedResponseDto : ApiResponseDto;

  const schema = paginated
    ? {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },

          {
            properties: {
              data: { type: 'array', items: { $ref: getSchemaPath(model) } },
            },
          },
        ],
      }
    : {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },

          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      };

  const Decorator = status === 201 ? ApiCreatedResponse : ApiOkResponse;

  return applyDecorators(
    ApiExtraModels(base, model),
    Decorator({ description, schema }),
  );
}
