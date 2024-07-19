import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { last, map } from 'rxjs';

// interfaces
import { IQuestion } from '../../shared/interfaces/question.interface';
import { QsActions } from './questions.actions';

// service
import { QuestionsService } from '../../shared/services/questions.service';

export interface QuestionsStateModel {
  qs_list_orig: IQuestion[],
  qs_list: IQuestion[],
  q: IQuestion,
  load_more_btn: boolean
}

@State<QuestionsStateModel>({
  name: 'questions',
  defaults: {
    qs_list_orig: [],
    qs_list: [],
    q: {
      _id: '',
      autor_id: '',
      title: '',
      description: '',
      answers: [],
      tags: []
    },
    load_more_btn: true
  }
})
@Injectable()
export class QuestionsState {
  constructor(private qs_service: QuestionsService) { }
  
  @Selector()
  static select_q(state: QuestionsStateModel){
    return state.q;
  }

  @Selector()
  static select_qs_list(state: QuestionsStateModel){
    return state.qs_list;
  }

  @Selector()
  static load_more_btn_state(state: QuestionsStateModel) {
    return state.load_more_btn;
  }

  @Action(QsActions.Select)
  select_qs({ setState, patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.Select){
    const { tag_name, push } = payload;
    
    const { qs_list } = getState();

    let start_index = 0;
    let last_index = 5;

    if(push) {
      start_index = qs_list.length;
      last_index = qs_list.length + 5;
    }

    return this.qs_service.select(start_index, last_index, tag_name).pipe(
      map(({ selected }) => {
        if(push) {  
          return patchState({
            ...getState(),
            qs_list_orig: [...qs_list, ...selected],
            qs_list: [...qs_list, ...selected],
            load_more_btn: !!selected.length
          });
        }

        return setState({
          ...getState(),
          qs_list_orig: selected,
          qs_list: selected,
          load_more_btn: true
        });
      })
    );
  }

  @Action(QsActions.GetQ)
  get_q({ setState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.GetQ) {
    return this.qs_service.get_question(payload.id).pipe(
      map(({ selected_q }) => {
        setState({ ...getState(), q: selected_q })
      })
    )
  }

  @Action(QsActions.CreateQ)
  create_q({ setState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.CreateQ) {
    return this.qs_service.create_question(payload).pipe(
      map(({ created_q }) => {
        setState({ ...getState(), q: created_q })
      })
    )
  }

  @Action(QsActions.EditQ)
  edit_q({ patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.EditQ) {
    const { id, title, description, tags, verify } = payload;
    
    return this.qs_service.edit_question(id, title, description, tags, verify).pipe(
      map(() => {
        const { q } = getState();

        patchState({ ...getState(), q: { ...q, title, description, tags } })
      })
    )
  }

  @Action(QsActions.RemoveQ)
  remove_q(_: any, { payload }: QsActions.RemoveQ) {
    return this.qs_service.remove_question(payload.id, payload.verify).subscribe();
  }

  @Action(QsActions.Search)
  search({ patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.Search) {
    const { qs_list_orig } = getState();
    
    if(!payload) patchState({ ...getState(), qs_list: qs_list_orig })
    
    patchState({ ...getState(), qs_list: qs_list_orig.filter(q => q.title.match(payload)) })
  }

  @Action(QsActions.AddAnswer)
  add_answer({ patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.AddAnswer) {
    return this.qs_service.add_answer(payload).pipe(
      map(({ answers }) => {
        const { q } = getState();

        patchState({ ...getState(), q: { ...q, answers } })
      })
    )
  }

  @Action(QsActions.EditAnswer)
  edit_answer({ patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.EditAnswer) {    
    const { q_id, answer_id, text, verify } = payload;
    
    return this.qs_service.edit_answer(q_id, answer_id, text, verify).pipe(
      map(({ answers }) => {
        const { q } = getState();

        patchState({ ...getState(), q: { ...q, answers } })
      })
    )
  }

  @Action(QsActions.RemoveAnswer)
  remove_answer({ patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.RemoveAnswer) {
    const { q_id, answer_id, verify } = payload;

    return this.qs_service.remove_answer(q_id, answer_id, verify).pipe(
      map(() => {
        const { q } = getState();
        const { answers } = q as IQuestion;
        
        const filtered = answers.filter(a => a.id !== payload.answer_id);

        patchState({ ...getState(), q: { ...q, answers: filtered } })
      })
    )
  }

  @Action(QsActions.LikeAnswer)
  like_answer({ patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.LikeAnswer) {
    const { voted_user_id, q_id, answer_id } = payload;

    return this.qs_service.like_answer(voted_user_id, q_id, answer_id).pipe(
      map(({ answers }) => {
        const { q } = getState();

        patchState({ ...getState(), q: { ...q, answers } })
      })
    )
  }

  @Action(QsActions.DislikeAnswer)
  dislike_answer({ patchState, getState }: StateContext<QuestionsStateModel>, { payload }: QsActions.DislikeAnswer) {
    const { voted_user_id, q_id, answer_id } = payload;

    return this.qs_service.dislike_answer(voted_user_id, q_id, answer_id).pipe(
      map(({ answers }) => {
        const { q } = getState();

        patchState({ ...getState(), q: { ...q, answers } })
      })
    )
  }
}