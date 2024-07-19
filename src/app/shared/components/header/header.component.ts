import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UserService } from './../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { LoadingState } from 'src/app/store/loading/loading.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() hide: boolean;
  loading$: Observable<boolean> = this.store.select(LoadingState.loading);

  constructor(
    private store: Store,
    private auth_serivce: AuthService,
    public user_service: UserService
  ) {}

  logout(){
    this.auth_serivce.logout_user();
    
    window.location.href = 'auth/login';
  }
}
