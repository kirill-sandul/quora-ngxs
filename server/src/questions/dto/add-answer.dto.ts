import { MinLength } from "class-validator";

export class AddAnswerDto {
  q_id: string;
  autor_id: string;

  @MinLength(10, { message: 'Текст должен содержать не меньше 10 символов' })
  text: string;

  date: Date;
}