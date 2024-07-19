import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from '../shared/schemas/tag.schema';
import { AddTagDto } from './add-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tag_model: Model<TagDocument>){}
  
  async get_all(){
    return await this.tag_model.find().exec();
  }

  async get_by_name(name: string){
    return await this.tag_model.findOne({ name });
  }

  async select_tags(start_index: number, last_index: number){
    let all = await this.get_all();

    return all.slice(start_index, last_index);
  }
  
  async add(add_tag_dto: AddTagDto){
    const tag = await new this.tag_model({ ...add_tag_dto });

    return tag.save();
  }

  async follow(name: string){
    const tag = await this.get_by_name(name);

    tag.followers++;

    return await tag.save();
  }

  async unfollow(name: string){
    const tag = await this.get_by_name(name);

    tag.followers--;

    return await tag.save();
  }
}
