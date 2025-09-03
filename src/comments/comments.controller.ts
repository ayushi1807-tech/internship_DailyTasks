/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comments.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorators';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
 
@ApiTags('Comments')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }
 
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin', 'Author')
    @ApiOperation({ summary: 'Soft delete a comment' })
    @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
    async deleteComment(@Param('id') id: number) {
        return this.commentService.deleteComment(id);
    }
 
    @Post(':id/restore')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin', 'Author')
    @ApiOperation({ summary: 'Restore a soft-deleted comment' })
    @ApiResponse({ status: 200, description: 'Comment restored successfully.' })
    async restoreComment(@Param('id') id: number) {
        return this.commentService.restoreComment(id);
    }
}
 
 

