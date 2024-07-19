import { MinLength } from "class-validator";

export class CreateQuestionDto {
  @MinLength(5, { message: 'Название должно быть не меншьше 5 символов' })
  title: string;
  
  @MinLength(10, { message: 'Описание должно быть не меншьше 10 символов' })
  description: string;

  tags: string[];
  
  date: Date;
}