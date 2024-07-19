import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import russian_locale from '@angular/common/locales/ru';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AppRoutingModule } from './app-routing.module';

// pages
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { QuestionComponent } from './pages/question/question.component';
import { AuthRegisterComponent } from './pages/auth/register/auth-register.component';
import { AuthLoginComponent } from './pages/auth/login/auth-login.component';
// shared
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthPageWrapperComponent } from './shared/components/auth-page-wrapper/auth-page-wrapper.component';
import { QCardComponent } from './shared/components/q-card/q-card.component';
import { CreateQuestionComponent } from './pages/create-question/create-question.component';
import { TagPipe } from './shared/pipes/tag/tag-pipe.pipe';
import { AnswersLengthPipe } from './shared/pipes/answers-length/answers-length.pipe';

// forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// material
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { registerLocaleData } from '@angular/common';
import { AddAnswerWidgetComponent } from './shared/components/add-answer-widget/add-answer-widget.component';
import { AddAnswerFormComponent } from './shared/components/add-answer-form/add-answer-form.component';
import { EditQuestionWidgetComponent } from './shared/components/edit-question-widget/edit-question-widget.component';
import { EditAnswerWidgetComponent } from './shared/components/edit-answer-widget/edit-answer-widget.component';
import { WidgetComponent } from './shared/components/widget/widget.component';
import { ChipsControlComponent } from './shared/components/chips-control/chips-control.component';
import { TagInfoComponent } from './shared/components/tag-info/tag-info.component';
import { TagBlockComponent } from './shared/components/tag-block/tag-block.component';
import { QsBlockComponent } from './shared/components/qs-block/qs-block.component';
import { HomeTagsComponent } from './shared/components/home-tags/home-tags.component';
import { AddTagWidgetComponent } from './shared/components/add-tag-widget/add-tag-widget.component';
import { AnswerPreviewTextPipe } from './shared/pipes/answer-preview-text/answer-preview-text.pipe';
import { SearchPipe } from './shared/pipes/search/questions/search-q.pipe';
import { SearchTagsPipe } from './shared/pipes/search/tags/search-tags.pipe';
import { ReactiveFormComponent } from './shared/components/reactive-form/reactive-form.component';
import { ReactiveFormTagsFieldComponent } from './shared/components/reactive-form-tags-field/reactive-form-tags-field.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserState } from './store/user/user.state';
import { QuestionsState } from './store/questions/questions.state';
import { TagsState } from './store/tags/tags.state';
import { SearchComponent } from './shared/components/search/search.component';
import { LoadingState } from './store/loading/loading.state';
import { LoadMoreBtnComponent } from './shared/components/load-more-btn/load-more-btn.component';

registerLocaleData(russian_locale);

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatStepperModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    DragScrollModule,
    NgxsModule.forRoot([UserState, QuestionsState, TagsState, LoadingState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionComponent,
    AuthRegisterComponent,
    AuthLoginComponent,
    AuthPageWrapperComponent,
    HeaderComponent,
    QCardComponent,
    CreateQuestionComponent,
    AddAnswerWidgetComponent,
    AddAnswerFormComponent,
    EditQuestionWidgetComponent,
    EditAnswerWidgetComponent,
    WidgetComponent,
    TagPipe,
    ChipsControlComponent,
    AnswersLengthPipe,
    AnswerPreviewTextPipe,
    SearchPipe,
    TagInfoComponent,
    SearchTagsPipe,
    TagBlockComponent,
    QsBlockComponent,
    HomeTagsComponent,
    AddTagWidgetComponent,
    ReactiveFormComponent,
    ReactiveFormTagsFieldComponent,
    SearchComponent,
    LoadMoreBtnComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
