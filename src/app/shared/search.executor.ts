import { BehaviorSubject } from 'rxjs';

class SearchExecutorValue {
  _value: any = '';
  value$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public search_executor: SearchExecutor){}

  clear(){
    this.value$.next('');
    this._value = '';
  }

  typing_start(){
    clearTimeout(this.search_executor.http_req_timer);
  }
  
  typing_end(){
    const { search_executor, after_typing_end } = this;
    
    if (!search_executor.http_req_timer) clearTimeout(search_executor.http_req_timer);
    this.search_executor.http_req_timer = setTimeout(after_typing_end.bind(this), 700);
  }

  after_typing_end(){
    if(this._value !== this.value$.value) this.value$.next(this._value);
  }
}

export class SearchExecutor {
  search: SearchExecutorValue = new SearchExecutorValue(this);
  http_req_timer: any;

  constructor(public environment: string){}
}