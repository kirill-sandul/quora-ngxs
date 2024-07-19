import { MinLength } from "class-validator";
import { ICompareVerify } from '../../shared/interfaces/compare-verify.interface';

export class EditAnswerDto {
  q_id: string;

  answer_id: string;

  @MinLength(10, { message: 'Текст должен содержать не меншьше 10 символов' })
  text: string;

  verify: ICompareVerify
}