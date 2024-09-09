import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MultipleChoiceExercisesService } from '../providers/multiple-choice-exercises.service';
import { CreateMultipleChoiceExerciseDto } from '../dto/create-multiple-choice-exercise.dto';
import { UpdateMultipleChoiceExerciseDto } from '../dto/update-multiple-choice-exercise.dto';

@Controller('multiple-choice-exercises')
export class MultipleChoiceExercisesController {
  constructor(
    private readonly multipleChoiceExercisesService: MultipleChoiceExercisesService,
  ) {}

  @Post()
  create(
    @Body() createMultipleChoiceExerciseDto: CreateMultipleChoiceExerciseDto,
  ) {
    return this.multipleChoiceExercisesService.create(
      createMultipleChoiceExerciseDto,
    );
  }

  @Get()
  findAll() {
    return this.multipleChoiceExercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multipleChoiceExercisesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMultipleChoiceExerciseDto: UpdateMultipleChoiceExerciseDto,
  ) {
    return this.multipleChoiceExercisesService.update(
      +id,
      updateMultipleChoiceExerciseDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multipleChoiceExercisesService.remove(+id);
  }
}
