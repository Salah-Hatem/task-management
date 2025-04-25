import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Public } from 'src/auth/decorators/puplic.decorator';
import { QueryPaginationDto } from './dto/pagination.dto';
// @Public()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  // @Public()
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAllUserTasks(@Req() req: any, @Query() query?: QueryPaginationDto) {
    return this.tasksService.findAllUserTasks(req.user.id, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch('toggle/:id')
  toggleTask(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.toggleTask(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, req.user.id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.user.id);
  }
}
