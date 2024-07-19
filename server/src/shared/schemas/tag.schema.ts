import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;
@Schema()
export class Tag {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  followers: number;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
