import { ICompareVerify } from '../../shared/interfaces/compare-verify.interface';
export declare class EditAnswerDto {
    q_id: string;
    answer_id: string;
    text: string;
    verify: ICompareVerify;
}
