import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answersLength'
})
export class AnswersLengthPipe implements PipeTransform {
  transform(answers_length: number): string {
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
}
