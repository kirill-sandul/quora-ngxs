import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { map } from 'rxjs';
import { ITag } from 'src/app/shared/interfaces/tag.interface';
import { TagsService } from 'src/app/shared/services/tags.service';
import { TagsActions } from './tags.actions';
import { UserState } from '../user/user.state';

export interface TagsStateModel {
  tags_orig: ITag[]
  tags: ITag[]
  selected_tag: ITag,
  load_more_btn: boolean
}

@State<TagsStateModel>({
  name: 'tags',
  defaults: {
    tags_orig: [],
    tags: [],
    selected_tag: {
      name: '',
      description: '',
      followers: 0
    },
    load_more_btn: true
  }
})
@Injectable()
export class TagsState {
  constructor(
    private store: Store,
    private tags_service: TagsService
  ) { }

  @Selector()
  static tags(state: TagsStateModel) {
    return state.tags;
  }

  @Selector()
  static selected_tag(state: TagsStateModel) {
    return state.selected_tag;
  }

  @Selector()
  static load_more_btn_state(state: TagsStateModel) {
    return state.load_more_btn;
  }

  @Action(TagsActions.SelectTags)
  select_tags({ setState, patchState, getState }: StateContext<TagsStateModel>, { payload }: TagsActions.SelectTags) {
    const { push } = payload;

    const { tags } = getState();

    let start_index = 0;
    let last_index = 5;

    if (push) {
      start_index = tags.length;
      last_index = tags.length + 5;
    }

    return this.tags_service.select(start_index, last_index).pipe(
      map(({ selected }) => {
        if (push) {
          return patchState({
            ...getState(),
            tags_orig: [...tags, ...selected],
            tags: [...tags, ...selected],
            load_more_btn: !!selected.length
          });
        }

        return setState({
          ...getState(),
          tags_orig: selected,
          tags: selected,
          load_more_btn: true
        });
      })
    );
  }

  @Action(TagsActions.AddTag)
  add_tag({ patchState, getState }: StateContext<TagsStateModel>, { payload }: TagsActions.AddTag){
    const { name, description } = payload;
    const { tags } = getState();

    return this.tags_service.add_tag(name, description).pipe(
      map(({ new_tag }) => {
        return patchState({ ...getState(), tags_orig: [...tags, new_tag], tags: [...tags, new_tag] })
      })
    );
  }

  @Action(TagsActions.SelectTag)
  select_tag({ patchState, getState }: StateContext<TagsStateModel>, { payload }: TagsActions.SelectTag) {
    const followed_tags = this.store.selectSnapshot(UserState.followed_tags);
    const default_tag = { name: '', description: '', followers: 0 };
    
    let followed_tag_info = followed_tags.filter(t => t.name === payload)[0];
    if(!payload) followed_tag_info = default_tag;
    
    return patchState({ ...getState(), selected_tag: followed_tag_info });
  }

  @Action(TagsActions.Search)
  search({ patchState, getState }: StateContext<TagsStateModel>, { payload }: TagsActions.Search) {
    const { tags_orig } = getState();

    if (!payload) patchState({ ...getState(), tags: tags_orig })

    patchState({ ...getState(), tags: tags_orig.filter(t => t.name.match(payload)) })
  }
}