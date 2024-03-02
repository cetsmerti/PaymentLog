import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CustomHttpException } from '../../exeption/http_error.exeption';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBody({ type: CreateCategoryDto })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw CustomHttpException.badRequest();
    }

    return this.categoryService.findOne(id);
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw CustomHttpException.badRequest();
    }
    await this.categoryService.remove(id);
    return {
      message: 'Category deleted successfully',
    };
  }
}
