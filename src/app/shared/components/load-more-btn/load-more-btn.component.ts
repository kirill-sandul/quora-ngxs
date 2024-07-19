import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-load-more-btn',
  templateUrl: './load-more-btn.component.html',
  styleUrls: ['./load-more-btn.component.scss']
})
export class LoadMoreBtnComponent {
  @Input() btn_state$: Observable<boolean>;
  @Input() callback: Function;
  @Input() btn_loading: boolean;

  constructor() {}
}
