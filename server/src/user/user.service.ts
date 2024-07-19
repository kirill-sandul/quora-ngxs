import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './../shared/schemas/user.schema';
import { TagService } from '../tag/tag.service';
import { FollowDto } from './follow.dto';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private user_model: Model<UserDocument>,
    private tag_service: TagService
  ){}
  
  async get_user_by_id(id: string) {
    return await this.user_model.findById(id);
  }

  async get_logged_user(id: string){
    return await this.user_model.findById(id);
  }

  async get_followed_tags(user_id: string){
    const { followings } = await this.get_user_by_id(user_id);
    const _tags = [];
        
    // followings.forEach(async (t, index) => {
    //   const tag = await this.tag_service.get_by_name(t);
      
    //   tags.push(tag);
      
    //   if(index === tags.length - 1) return tags;
    // });
    const tags = await this.tag_service.get_all();

    followings.forEach((t, index) => {
      const tag = tags.filter(t => t.name === followings[index])[0];
            
      _tags.push(tag);
    });
    
    return _tags;
  }

  async follow_tag(user_id: string, follow_dto: FollowDto) {    
    const { tag_name } = follow_dto;

    const user = await this.get_user_by_id(user_id);
    
    const yet_followed = !!user.followings.filter(t => t === tag_name).length;

    if (yet_followed) return { error: 'yet_followed' };

    user.followings.push(tag_name);
    await user.save()    

    return { error: '', tag: await this.tag_service.follow(tag_name) };
  }

  async unfollow_tag(user_id: string, follow_dto: FollowDto){
    const { tag_name } = follow_dto;

    const user = await this.get_user_by_id(user_id);

    const yet_unfollowed = !user.followings.filter(t => t === tag_name).length;

    if (yet_unfollowed) return { error: 'yet_unfollowed' };

    user.followings = user.followings.filter(t => t !== tag_name);
    await user.save();
    
    return { tag: await this.tag_service.unfollow(tag_name) };
  }
}
