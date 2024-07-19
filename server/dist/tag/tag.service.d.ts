import { Model } from 'mongoose';
import { Tag, TagDocument } from '../shared/schemas/tag.schema';
import { AddTagDto } from './add-tag.dto';
export declare class TagService {
    private tag_model;
    constructor(tag_model: Model<TagDocument>);
    get_all(): Promise<(Tag & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    get_by_name(name: string): Promise<Tag & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    select_tags(start_index: number, last_index: number): Promise<(Tag & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    add(add_tag_dto: AddTagDto): Promise<Tag & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    follow(name: string): Promise<Tag & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    unfollow(name: string): Promise<Tag & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
