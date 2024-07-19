/// <reference types="mongoose/types/pipelinestage" />
import { Document, Types } from 'mongoose';
import { IQuestionAnswer } from '../../interfaces/answer.interface';
export declare type QuestionDocument = Question & Document;
export declare class Question {
    autor_id: Types.ObjectId;
    title: string;
    description: string;
    tags: string[];
    answers?: IQuestionAnswer[];
    date: Date;
}
export declare const QuestionSchema: import("mongoose").Schema<Document<Question, any, any>, import("mongoose").Model<Document<Question, any, any>, any, any, any>, any, any>;
