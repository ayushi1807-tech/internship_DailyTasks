/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Posts } from './post.entity';
import { CreatePostDto } from 'src/dto/post.dto';
import { UpdatePostDto } from 'src/dto/UpdatePostDto';
import { CreateCommentDto } from 'src/dto/comment.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorators';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Posts')
@Controller('posts')
@UseInterceptors(CacheInterceptor)
export class PostController {
  constructor(private readonly postService: PostsService) {}

  //  Create Post
@Post()
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('Author')
@ApiOperation({ summary: 'Create a new post' })
@ApiResponse({ status: 201, description: 'Post created successfully.' })
create(@Body() dto: CreatePostDto, @Req() req): Promise<Posts> {
  const userId = req.user.id; 
  return this.postService.create(dto, userId);
}


  @Get(':id')
    @ApiOperation({ summary: 'Get single post with comment' })
    @ApiResponse({ status: 201 })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postService.findOneWithComments(id);
    }

  //  Update Post
  @Put(':id')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('Author')
@ApiOperation({ summary: 'Update a post (only by the author)' })
@ApiResponse({ status: 200, description: 'Post updated successfully.' })
updatepost(
  @Param('id') id: number,
  @Body() dto: UpdatePostDto,
  @Req() req,
): Promise<Omit<Posts, 'user'>> {
  const userId = req.user.id;
  return this.postService.update(id, userId, dto);
}


  //  Soft Delete Post
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Author')
  @ApiOperation({ summary: 'Soft delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully.' })
  deleteone(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }

  //  Restore Post
  @Post('/restore/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Author')
  @ApiOperation({ summary: 'Restore a soft-deleted post' })
  @ApiResponse({ status: 200, description: 'Post restored successfully.' })
  restorepost(@Param('id') id: number) {
    return this.postService.restorePost(id);
  }

  // Add Comment
  @Post(':id/comments')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles('Author', 'Reader')
@ApiOperation({ summary: 'Add a comment to a post' })
@ApiResponse({ status: 201, description: 'Comment added successfully.' })
@ApiResponse({ status: 404, description: 'Post or User not found.' })
addComment(
  @Param('id') postId: number,              
  @Body() dto: CreateCommentDto,            
  @Req() req: any,                          
) {
  const userId = req.user.id;               
  return this.postService.createComment(postId, userId, dto);
}


  


@Get()
@ApiOperation({ summary: 'Get posts with pagination, search, or full list' })
@ApiQuery({ name: 'page', required: false, example: 1, description: 'Page number (only used if paginate=true)' })
@ApiQuery({ name: 'limit', required: false, example: 10, description: 'Items per page (only used if paginate=true)' })
@ApiQuery({ name: 'search', required: false, example: 'NestJS', description: 'Search by title or content' })
@ApiQuery({ name: 'paginate', required: false, example: 'true', description: 'Set to false to return full list' })
@ApiResponse({ status: 200, description: 'List of posts with/without pagination' })
async getPosts(
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
  @Query('search') search?: string,
  @Query('paginate') paginate: string = 'true',
) {
  // Convert safely (avoid crash when paginate=false)
  const pageNum = !isNaN(Number(page)) ? Number(page) : 1;
  const limitNum = !isNaN(Number(limit)) ? Number(limit) : 10;

  return this.postService.findAll(
    pageNum,
    limitNum,
    search,
    paginate !== 'false',
  );
}
}
//                     
