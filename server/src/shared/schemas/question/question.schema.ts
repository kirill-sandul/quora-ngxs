import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types, SchemaTypes } from 'mongoose';
import { IQuestionAnswer } from '../../interfaces/answer.interface';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  autor_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, ref: 'Tag' })
  tags: string[];

  @Prop()
  answers?: IQuestionAnswer[];

  @Prop()
  date: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
