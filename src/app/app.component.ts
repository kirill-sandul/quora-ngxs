import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { router_animation } from './app.router-animation';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ router_animation ]
})
export class AppComponent {
  hide_header: Function = (outlet: RouterOutlet) => outlet.activatedRouteData['hide_header'];
  
  constructor(public user_service: UserService){}

  prepare_route(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
  }
}
