import { Model } from 'mongoose';
import { User, UserDocument } from './../shared/schemas/user.schema';
import { TagService } from '../tag/tag.service';
import { FollowDto } from './follow.dto';
export declare class UserService {
    private user_model;
    private tag_service;
    constructor(user_model: Model<UserDocument>, tag_service: TagService);
    get_user_by_id(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    get_logged_user(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    get_followed_tags(user_id: string): Promise<any[]>;
    follow_tag(user_id: string, follow_dto: FollowDto): Promise<{
        error: string;
        tag?: undefined;
    } | {
        error: string;
        tag: import("../shared/schemas/tag.schema").Tag & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
    }>;
    unfollow_tag(user_id: string, follow_dto: FollowDto): Promise<{
        error: string;
        tag?: undefined;
    } | {
        tag: import("../shared/schemas/tag.schema").Tag & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        error?: undefined;
    }>;
}
