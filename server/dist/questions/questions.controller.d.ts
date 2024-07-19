import { EditQuestionDto } from './dto/edit-question.dto';
import { Response } from 'express';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { RemoveQuestionDto } from './dto/remove-question.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { RemoveAnswerDto } from './dto/remove-answer.dto';
import { VoteAnswerDto } from './dto/vote-answer.dto';
import { EditAnswerDto } from './dto/edit-answer.dto';
export declare class QuestionsController {
    private questions_service;
    constructor(questions_service: QuestionsService);
    get_all(response: Response): Promise<Response<any, Record<string, any>>>;
    get(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    search(search: string, response: Response): Promise<Response<any, Record<string, any>>>;
    select(start_index: number, last_index: number, tag_name: string, response: Response): Promise<Response<any, Record<string, any>>>;
    create_question(create_q_dto: CreateQuestionDto, response: Response): Promise<Response<any, Record<string, any>>>;
    edit_question(verified: boolean, edit_q_dto: EditQuestionDto, response: Response): Promise<Response<any, Record<string, any>>>;
    remove_question(verified: boolean, remove_q_dto: RemoveQuestionDto, response: Response): Promise<Response<any, Record<string, any>>>;
    add_answer(add_answer_dto: AddAnswerDto, response: Response): Promise<Response<any, Record<string, any>>>;
    edit_answer(verified: boolean, edit_answer_dto: EditAnswerDto, response: Response): Promise<Response<any, Record<string, any>>>;
    remove_answer(verified: boolean, remove_answer_dto: RemoveAnswerDto, response: Response): Promise<Response<any, Record<string, any>>>;
    like_answer(vote_answer_dto: VoteAnswerDto, response: Response): Promise<Response<any, Record<string, any>>>;
    dislike_answer(vote_answer_dto: VoteAnswerDto, response: Response): Promise<Response<any, Record<string, any>>>;
}
