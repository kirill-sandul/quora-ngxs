import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from 'mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  id: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  autor_id: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ type: { liked_by: SchemaTypes.ObjectId, dislike: SchemaTypes.ObjectId, ref: 'User' } })
  votes: {
    liked_by: Types.ObjectId[];
    disliked_by: Types.ObjectId[];
  };

  @Prop()
  date: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
