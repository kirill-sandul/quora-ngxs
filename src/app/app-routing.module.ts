import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageGuard } from './shared/guards/auth-page.guard';
import { HomePageGuard } from './shared/guards/home-page.guard';

// pages
import { HomeComponent } from './pages/home/home.component';
import { AuthRegisterComponent } from './pages/auth/register/auth-register.component';
import { AuthLoginComponent } from './pages/auth/login/auth-login.component';
import { QuestionComponent } from './pages/question/question.component';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomePageGuard],
    data: { animation: 'HomePage' }
  },
  {
    path: 'auth',
    // component: AuthRegisterComponent,
    canActivate: [AuthPageGuard],
    data: { animation: 'AuthPage', hide_header: true },
    children: [
      {
        path: 'register',
        component: AuthRegisterComponent
      },
      {
        path: 'login',
        component: AuthLoginComponent
      }
    ]
  },
  {
    path: 'q/:id',
    component: QuestionComponent,
    canActivate: [HomePageGuard],
    data: { animation: 'QuestionPage' }
  },
  {
    path: 'create-question',
    component: CreateQuestionComponent,
    canActivate: [HomePageGuard],
    data: { animation: 'CreateQuestionPage' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [HomePageGuard, AuthPageGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
