import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    //userId is passed in the request body from the frontend
    const { userId, name } = createCategoryDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const category = await this.prisma.category.findFirst({
      where: { name, userId },
    });
    if (category) {
      throw new BadRequestException('Category already exists');
    }

    return this.prisma.category.create({
      data: {
        name,
        userId,
      },
    });
  }

  async findAllUserCategories(userId: string) {
    return await this.prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    userId: string,
  ) {
    //Check if the category belongs to the user
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    //Make sure the category Name is unique for the user
    const categoryWithSameName = await this.prisma.category.findFirst({
      where: { name: updateCategoryDto.name, userId },
    });
    if (categoryWithSameName) {
      throw new BadRequestException('Category already exists');
    }
    if (category.userId !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
