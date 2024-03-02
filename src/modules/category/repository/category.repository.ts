import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CustomHttpException } from '../../../exeption/http_error.exeption';

export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const categoryOld = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });
    if (categoryOld) {
      throw CustomHttpException.alreadyExists();
    }
    const categoryNew = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(categoryNew);
  }
  async findAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async deleteCategory(id: string) {
    return await this.categoryRepository.delete(id);
  }

  async findOneCategory(id: string): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['payments'],
    });
  }
}
