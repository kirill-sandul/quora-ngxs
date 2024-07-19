import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AddAnswerDto } from './dto/add-answer.dto';
import { EditAnswerDto } from './dto/edit-answer.dto';
import { EditQuestionDto } from './dto/edit-question.dto';
import { RemoveQuestionDto } from './dto/remove-question.dto';
import { RemoveAnswerDto } from './dto/remove-answer.dto';
import { VoteAnswerDto } from './dto/vote-answer.dto';
import { QuestionDocument } from '../shared/schemas/question/question.schema';
import { Question } from '../shared/schemas/question/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private question_model: Model<QuestionDocument>,
    private user_service: UserService
  ){}

  async create_question(create_q_dto: CreateQuestionDto){
    let created_question = new this.question_model({ ...create_q_dto, date: new Date() });
    return created_question.save();
  }

  async edit_question(edit_q_dto: EditQuestionDto){
    const { id, title, description, tags } = edit_q_dto;
    
    return await this.question_model.findByIdAndUpdate(id, { title, description, tags });
  }

  async remove_question(remove_q_dto: RemoveQuestionDto){
    const { id } = remove_q_dto;

    return await this.question_model.findByIdAndDelete(id);
  }

  async get_all(){
    return await this.question_model.find().exec();
  }

  async select(start_index: number, last_index: number){
    const all = await this.get_all();
    
    return all.slice(start_index, last_index);
  }

  async get_selected_by_tag(start_index: number, last_index: number, tag_name: string){
    const all = await this.get_all();
    const filtered = all.filter(q => q.tags.indexOf(tag_name) !== -1);

    return filtered.slice(start_index, last_index);
  }

  async get_by_id(id: string){
    return await this.question_model.findById(id);
  }

  async get_by_search(search: string){
    return await this.question_model.findOne({ title: search });
  }

  async get_answer_by_id(q_id: string, answer_id: string){
    const selected_q = await this.get_by_id(q_id);

    return selected_q.answers.filter(answer => {
      answer.id === answer_id
    })[0];
  }

  async add_answer(add_answer_dto: AddAnswerDto){
    const q_to_answer = await this.get_by_id(add_answer_dto.q_id);
    const { answers } = q_to_answer;

    // const updated = await this.question_model.findOneAndUpdate(
    //   { id: q_id }, { ...q_to_answer, answers: [...answers, {add_answer_dto}] }
    // );

    const extracted_autor = await this.user_service.get_user_by_id(add_answer_dto.autor_id);

    const new_answer = {
      ...add_answer_dto,
      id: new mongoose.Types.ObjectId().toString(),
      autor: { _id: extracted_autor._id, login: extracted_autor.login }
    };
     
    q_to_answer.answers = [
      ...answers,
      { ...new_answer, votes: { liked_by: [], disliked_by: [] }}
    ];

    await q_to_answer.save();

    return q_to_answer.answers;
  }

  async edit_answer(edit_answer_dto: EditAnswerDto){
    const { q_id, answer_id, text } = edit_answer_dto;

    const q = await this.question_model.findById(q_id);
    const answer_example = q.answers.filter(answer => answer.id === answer_id)[0];
    const answer_index = q.answers.indexOf(answer_example);
    const answer = q.answers[answer_index];

    q.answers[answer_index] = {
      ...answer,
      text
    };
    
    // return await this.question_model.findByIdAndUpdate(q_id, { answers: q.answers });
    q.save();

    return q.answers;
  }

  async remove_answer(remove_answer_dto: RemoveAnswerDto){
    const { q_id, answer_id } = remove_answer_dto;
    
    const selected_q = await this.get_by_id(q_id);
    selected_q.answers = selected_q.answers.filter(answer => {
      return answer.id !== answer_id
    });

    return await selected_q.save();
  }

  // async edit_answer(edit_answer_dto: any){
  //   const { original_answer, text } = edit_answer_dto;

  //   const answer_q = await this.question_model.findById(original_answer.q_id);
  //   const answer_index = answer_q.answers.indexOf(original_answer);

  //   answer_q.answers[answer_index] = { ...original_answer, text };

  //   return await answer_q.save();
  // }
  
  async like_answer(vote_answer_dto: VoteAnswerDto){
    const { q_id, voted_user_id, answer_id } = vote_answer_dto;

    const answer_question = await this.get_by_id(q_id);

    const voted_answer = answer_question.answers.filter(a => a.id === answer_id)[0];
    const answer_index = answer_question.answers.indexOf(voted_answer);

    
    // return await this.question_model.findByIdAndUpdate(q_id, { answers: q.answers });
    
    if(!voted_answer.votes.liked_by.includes(voted_user_id)){
      voted_answer.votes.liked_by.push(voted_user_id);
      
      if(voted_answer.votes.disliked_by.includes(voted_user_id)){
        voted_answer.votes.disliked_by = voted_answer.votes.disliked_by.filter(id => id !== voted_user_id);        
      }

    } else {
      voted_answer.votes.liked_by = voted_answer.votes.liked_by.filter(id => id !== voted_user_id);
    }
    
    answer_question.answers[answer_index] = voted_answer;
    
    await answer_question.save();

    return answer_question.answers;
  }

  async dislike_answer(vote_answer_dto: VoteAnswerDto) {
    const { q_id, voted_user_id, answer_id } = vote_answer_dto;

    const answer_question = await this.get_by_id(q_id);

    const voted_answer = answer_question.answers.filter(a => a.id === answer_id)[0];
    const answer_index = answer_question.answers.indexOf(voted_answer);


    // return await this.question_model.findByIdAndUpdate(q_id, { answers: q.answers });

    if (!voted_answer.votes.disliked_by.includes(voted_user_id)) {
      voted_answer.votes.disliked_by.push(voted_user_id);


      if (voted_answer.votes.liked_by.includes(voted_user_id)) {
        voted_answer.votes.liked_by = voted_answer.votes.liked_by.filter(id => id !== voted_user_id);
      }

    } else {
      voted_answer.votes.disliked_by = voted_answer.votes.disliked_by.filter(id => id !== voted_user_id);
    }
    
    answer_question.answers[answer_index] = voted_answer;

    await answer_question.save();

    return answer_question.answers;
  }
}

/*
  const set_vote_user = (type: string) => {
      voted_user.votes[type] = [
        ...user_votes,
        { q_id, answer_id }
      ]
    }

    let vote_index: number;
    const voted: IUserVote[] | [] = user_votes.filter((v, index) => {
      vote_index = index;
      return v.q_id === q_id && v.answer_index === answer_index;
    });

    console.log(voted);
    
    if(voted.length){
      
    }

    let v_index: number;
    const v = voted_user.votes[other_vote].filter((v, index) => {
      v_index = index;

      return v.q_id === q_id && v.answer_index === answer_index
    });

    console.log(other_vote, v);
    if (v.length) {
      voted_user.votes[other_vote].splice(v_index, 1);
      set_vote_user(vote_type);
      answer_q.answers[answer_index] = {
        ...answer,
        votes: {
          ...answer.votes,
          [vote_type]: answer.votes[vote_type] + 1,
          [other_vote]: answer.votes[other_vote] - 1
        }
      }

      return await save_models();
    }

    set_vote_user(vote_type);
    answer_q.answers[answer_index] = {
      ...answer,
      votes: {
        ...answer.votes,
        [vote_type]: answer.votes[vote_type] + 1
      }
    }
*/
