import { EditQuestionDto } from './dto/edit-question.dto';
import { Controller, Post, Body, Res, HttpStatus, Get, Param, Delete, Put, Query } from '@nestjs/common';
import { Response } from 'express';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { RemoveQuestionDto } from './dto/remove-question.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { RemoveAnswerDto } from './dto/remove-answer.dto';
import { VoteAnswerDto } from './dto/vote-answer.dto';
import { EditAnswerDto } from './dto/edit-answer.dto';
import { CompareVerify } from '../shared/compare-verify.decorator';

@Controller('questions')
export class QuestionsController {
  constructor(private questions_service: QuestionsService){}

  @Get('get')
  async get_all(@Res() response: Response) {
    const all_q = await this.questions_service.get_all();

    return response.status(HttpStatus.ACCEPTED).json({ message: 'Получены вопросы', all_q });
  }

  @Get('get/:id')
  async get(@Param('id') id: string , @Res() response: Response){
    const selected_q = await this.questions_service.get_by_id(id);

    return response.status(HttpStatus.ACCEPTED).json({ message: 'Получен вопрос', selected_q });
  }

  @Get('search/:search')
  async search(@Param('search') search: string, @Res() response: Response){
    const found = await this.questions_service.get_by_search(search);

    return response.status(HttpStatus.OK).json({ message: 'Получен вопрос', found })
  }

  @Get('select')
  async select(
    @Query('start_index') start_index: number,
    @Query('last_index') last_index: number,
    @Query('tag_name') tag_name: string,
    @Res() response: Response 
  ){
    if(!tag_name) {
      const selected = await this.questions_service.select(start_index, last_index);
      return response.status(HttpStatus.OK).json({ message: 'Получены вопросы', selected });
    }

    const selected = await this.questions_service.get_selected_by_tag(start_index, last_index, tag_name);
  
    return response.status(HttpStatus.OK).json({ message: 'Получены вопросы', selected });
  }

  @Post('create')
  async create_question(@Body() create_q_dto: CreateQuestionDto, @Res() response: Response){
    const { tags } = create_q_dto;

    if(!tags.length) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Тэги должны быть предоставлены' });
    }
    if(tags.length > 5){
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Тэгов должно быть меньше 5' });
    }

    let repeated_tag;
    tags.forEach(tag => {
      repeated_tag = tags.filter(t => t === tag).length > 1;
    });
    if(repeated_tag) return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Повторение тэгов' });

    const created_q = await this.questions_service.create_question(create_q_dto);
    
    return response.status(HttpStatus.CREATED).json({ message: 'Создан вопрос', created_q });
  }

  @Put('edit')
  async edit_question(@CompareVerify() verified: boolean, @Body() edit_q_dto: EditQuestionDto, @Res() response: Response){    
    if(!verified) return;
    
    const edited_q = await this.questions_service.edit_question(edit_q_dto);

    return response.status(HttpStatus.OK).json({ message: 'Изменен вопрос', edited_q })
  }

  @Delete('remove')
  async remove_question(@CompareVerify() verified: boolean, @Body() remove_q_dto: RemoveQuestionDto, @Res() response: Response){
    if (!verified) return;
    
    const removed_q = await this.questions_service.remove_question(remove_q_dto);

    return response.status(HttpStatus.OK).json({ message: 'Удален вопрос', removed_q });
  }

  @Post('answer/create')
  async add_answer(@Body() add_answer_dto: AddAnswerDto, @Res() response: Response){
    const answers = await this.questions_service.add_answer(add_answer_dto);

    return response.status(HttpStatus.CREATED).json({ message: 'Создан ответ', answers });
  }

  @Put('answer/edit')
  async edit_answer(@CompareVerify() verified: boolean, @Body() edit_answer_dto: EditAnswerDto, @Res() response: Response){
    if(!verified) return;
    
    const answers = await this.questions_service.edit_answer(edit_answer_dto);

    return response.status(HttpStatus.OK).json({ message: 'Изменен ответ', answers });
  }

  @Delete('answer/remove')
  async remove_answer(@CompareVerify() verified: boolean, @Body() remove_answer_dto: RemoveAnswerDto, @Res() response: Response){
    if(!verified) return;
  
    const updated_q = await this.questions_service.remove_answer(remove_answer_dto);

    return response.status(HttpStatus.OK).json({ message: 'Удален ответ', updated_q });
  }

  @Put('answer/like')
  async like_answer(@Body() vote_answer_dto: VoteAnswerDto, @Res() response: Response){
    const answers = await this.questions_service.like_answer(vote_answer_dto);

    return response.status(HttpStatus.OK).json({ message: 'Ответ проголосован', answers });
  }

  @Put('answer/dislike')
  async dislike_answer(@Body() vote_answer_dto: VoteAnswerDto, @Res() response: Response) {
    const answers = await this.questions_service.dislike_answer(vote_answer_dto);

    return response.status(HttpStatus.OK).json({ message: 'Ответ проголосован', answers });
  }
}
