import { ITag } from '../../shared/interfaces/tag.interface';

export namespace UserActions {
  export class Get {
    static readonly type = '[user]:get'
    constructor(){}
  }

  export class LoadFollowedTags {
    static readonly type = '[user]:load_followed_tags'
  }

  export class FollowTag {
    static readonly type = '[user]:tag:follow'
    constructor(public payload: ITag){}
  }

  export class UnfollowTag {
    static readonly type = '[user]:tag:unfollow'
    constructor(public payload: ITag){}
  }
}