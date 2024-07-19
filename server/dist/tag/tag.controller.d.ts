import { Response } from 'express';
import { TagService } from './tag.service';
import { AddTagDto } from './add-tag.dto';
export declare class TagController {
    private tag_service;
    constructor(tag_service: TagService);
    get_all(response: Response): Promise<Response<any, Record<string, any>>>;
    get_by_name(name: string, response: Response): Promise<Response<any, Record<string, any>>>;
    select_tags(start_index: number, last_index: number, response: Response): Promise<Response<any, Record<string, any>>>;
    add_tag(add_tag_dto: AddTagDto, response: Response): Promise<Response<any, Record<string, any>>>;
}
