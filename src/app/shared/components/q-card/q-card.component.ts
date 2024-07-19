import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from './../../interfaces/question.interface';

@Component({
  selector: 'app-q-card',
  templateUrl: './q-card.component.html',
  styleUrls: ['./q-card.component.scss']
})
export class QCardComponent {
  @Input() question: IQuestion;

  constructor(private router: Router) {}

  get_answers_length(answers_length: number) {
    const last_number = parseInt(answers_length.toString().slice(-1));

    switch (true) {
      case (!answers_length):
        return `Пока нет ответов`;
    
      case (last_number === 0):
        return `${answers_length} ответов`

      case (last_number === 1):
        return `${answers_length} ответ`

      case (last_number <= 4):
        return `${answers_length} ответа`

      case (last_number >= 5):
        return `${answers_length} ответов`
      default:
        return `Пока нет Ответов`
    }
  }

  click(){
    this.router.navigateByUrl(`q/${this.question._id}`);
  }
}
