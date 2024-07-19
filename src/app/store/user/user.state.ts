import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

// interfaces
import { ITag } from '../../shared/interfaces/tag.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { UserActions } from './user.actions';

// service
import { UserService } from '../../shared/services/user.service';

export interface UserStateModel {
  user: IUser,
  followed_tags: ITag[]
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: { _id: '', email: '', login: '', password: '' },
    followed_tags: []
  }
})
@Injectable()
export class UserState {
  constructor(private user_service: UserService){}
  
  @Selector()
  static followed_tags(state: UserStateModel) {
    return state.followed_tags;
  }

  @Selector()
  static select_user(state: UserStateModel){
    return state.user;
  }
  
  @Action(UserActions.Get)
  get_logged_user({ setState, getState }: StateContext<UserStateModel>){
    return this.user_service.get_logged_user().pipe(
      tap(({ logged_user }) => {
        setState({ ...getState(), user: logged_user })
      })
    )
  }

  @Action(UserActions.LoadFollowedTags)
  load_followed_tags({ setState, getState }: StateContext<UserStateModel>) {
    return this.user_service.load_followed_tags().pipe(
      tap(({ followed_tags }) => {
        setState({ ...getState(), followed_tags })
      })
    )
  }
  
  @Action(UserActions.FollowTag)
  follow_tag({ patchState, getState }: StateContext<UserStateModel>, { payload }: UserActions.FollowTag) {
    return this.user_service.follow_tag(payload).pipe(
      tap(({ tag }) => {
        const { followed_tags } = getState();

        patchState({ followed_tags: [...followed_tags, tag] })
      })
    )
  }
  
  @Action(UserActions.UnfollowTag)
  unfollow_tag({ patchState, getState }: StateContext<UserStateModel>, { payload }: UserActions.UnfollowTag) {
    return this.user_service.unfollow_tag(payload).pipe(
      tap(({ tag }) => {
        const { followed_tags } = getState();

        const filtered = followed_tags.filter(t => t._id !== tag._id);
        patchState({ followed_tags: filtered })
      })
    )
  }
}