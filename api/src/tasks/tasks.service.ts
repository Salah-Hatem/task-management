import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryPaginationDto } from './dto/pagination.dto';
import {
  paginate,
  paginateOutput,
  PaginateOutput,
} from 'utils/pagination.utils';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTaskDto: CreateTaskDto) {
    //userId is passed in the request body from the frontend
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
      },
    });
  }

  async findAllUserTasks(userId: string, query?: QueryPaginationDto) {
    const [tasks, total] = await Promise.all([
      await this.prisma.task.findMany({
        where: {
          userId,
        },
        ...paginate(query),
        include: {
          category: true,
        },
      }),
      await this.prisma.task.count(),
    ]);

    return paginateOutput(tasks, total, query);
  }

  async findOne(id: string) {
    return await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async toggleTask(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task || task.userId !== userId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        done: !task.done,
      },
    });
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task || task.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this task',
      );
    }
    return await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...updateTaskDto,
      },
    });
  }
  //User Can only delete his own tasks
  async remove(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task || task.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this task',
      );
    }
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
