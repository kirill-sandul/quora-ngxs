import { IQuestion } from '../../shared/interfaces/question.interface';
import { IQuestionAnswer } from './../../shared/interfaces/question.interface';
import { ITag } from '../../shared/interfaces/tag.interface';
import { ICompareVerify } from '../../shared/interfaces/compare-verify.interface';

export namespace QsActions {
  interface ISelectQ {
    tag_name?: string,
    push?: boolean
  }
  
  interface IEditQ {
    id: string,
    title: string,
    description: string,
    tags: string[],
    verify: ICompareVerify
  }

  export class CreateQ {
    static readonly type = '[qs]:create';
    constructor(public payload: IQuestion){}
  }

  export class Search {
    static readonly type = '[qs]:search';
    constructor(public payload: string) { }
  }

  export class Select {
    static readonly type = '[qs]:select';
    constructor(public payload: ISelectQ = { tag_name: '', push: false }){}
  }

  export class EditQ {
    static readonly type = '[qs]:edit';
    constructor(public payload: IEditQ) { }
  }

  export class RemoveQ {
    static readonly type = '[qs]:remove';
    constructor(public payload: { id: string, verify: ICompareVerify }) { }
  }

  export class GetQ {
    static readonly type = '[qs]:get';
    constructor(public payload: { id: string }) { }
  }

  export class AddAnswer {
    static readonly type = '[qs]:answer:add';
    constructor(public payload: IQuestionAnswer) { }
  }

  export class EditAnswer {
    static readonly type = '[qs]:answer:edit';
    constructor(public payload: { q_id: string, answer_id: string, text: string, verify: ICompareVerify }) { }
  }

  export class RemoveAnswer {
    static readonly type = '[qs]:answer:remove';
    constructor(public payload: { q_id: string, answer_id: string, verify: ICompareVerify }) { }
  }

  export class LikeAnswer {
    static readonly type = '[qs]:answer:like';
    constructor(public payload: { voted_user_id: string; q_id: string; answer_id: string; }) { }
  }

  export class DislikeAnswer {
    static readonly type = '[qs]:answer:dislike';
    constructor(public payload: { voted_user_id: string; q_id: string; answer_id: string }) { }
  }
}