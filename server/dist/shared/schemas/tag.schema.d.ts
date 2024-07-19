/// <reference types="mongoose/types/pipelinestage" />
import { Document } from 'mongoose';
export declare type TagDocument = Tag & Document;
export declare class Tag {
    name: string;
    description: string;
    followers: number;
}
export declare const TagSchema: import("mongoose").Schema<Document<Tag, any, any>, import("mongoose").Model<Document<Tag, any, any>, any, any, any>, any, any>;
