import { ICompareVerify } from '../../shared/interfaces/compare-verify.interface';

export class RemoveAnswerDto {
  q_id: string;
  answer_id: string;
  verify: ICompareVerify
}