import { Request, Response } from 'express';
import { UserService } from './user.service';
import { FollowDto } from './follow.dto';
export declare class UserController {
    private user_service;
    constructor(user_service: UserService);
    get_user_by_id(id: string, response: Response): Promise<Response<any, Record<string, any>>>;
    get_user(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    get_followed_tags(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    follow_tag(follow_dto: FollowDto, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
    unfollow_tag(follow_dto: FollowDto, request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
