import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LoadingActions } from "./loading.actions";

interface LoadingStateModel {
  loading: boolean
}

@State<LoadingStateModel>({
  name: 'loading',
  defaults: {
    loading: false
  }
})
@Injectable()
export class LoadingState {
  constructor(){}

  @Selector()
  static loading(state: LoadingStateModel){
    return state.loading;
  }  

  @Action(LoadingActions.Set)
  set({ patchState }: StateContext<LoadingStateModel>){
    return patchState({ loading: true });
  }

  @Action(LoadingActions.Stop)
  stop({ patchState }: StateContext<LoadingStateModel>) {
    return patchState({ loading: false });
  }
}