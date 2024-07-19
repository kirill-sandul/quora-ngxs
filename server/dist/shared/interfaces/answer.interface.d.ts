import { ITag } from './tag.interface';
export interface IQuestionAnswer {
    id: string;
    q_id: string;
    autor_id: string;
    autor: {
        _id: string;
        login: string;
    };
    text: string;
    date: Date;
    tags?: ITag[];
    votes: {
        liked_by: string[];
        disliked_by: string[];
    };
}
