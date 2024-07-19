/// <reference types="mongoose/types/pipelinestage" />
import { Document, Types } from 'mongoose';
export declare type AnswerDocument = Answer & Document;
export declare class Answer {
    id: Types.ObjectId;
    autor_id: Types.ObjectId;
    text: string;
    votes: {
        liked_by: Types.ObjectId[];
        disliked_by: Types.ObjectId[];
    };
    date: Date;
}
export declare const AnswerSchema: import("mongoose").Schema<Document<Answer, any, any>, import("mongoose").Model<Document<Answer, any, any>, any, any, any>, any, any>;
