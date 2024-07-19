import { MinLength } from "class-validator";
import { ICompareVerify } from '../../shared/interfaces/compare-verify.interface';

export class EditQuestionDto {
  id: string;
  
  @MinLength(5, { message: 'Название должно быть не меншьше 5 символов' })
  title: string;

  @MinLength(5, { message: 'Описание должно быть не меншьше 5 символов' })
  description: string;

  tags: string[];

  verify: ICompareVerify
}