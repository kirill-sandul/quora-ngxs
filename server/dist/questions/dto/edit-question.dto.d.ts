import { ICompareVerify } from '../../shared/interfaces/compare-verify.interface';
export declare class EditQuestionDto {
    id: string;
    title: string;
    description: string;
    tags: string[];
    verify: ICompareVerify;
}
