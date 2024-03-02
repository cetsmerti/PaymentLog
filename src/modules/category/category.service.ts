import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.findAllCategories();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOneCategory(id);
  }

  async remove(id: string) {
    return await this.categoryRepository.deleteCategory(id);
  }
}
