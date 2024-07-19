import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answerPreviewText'
})
export class AnswerPreviewTextPipe implements PipeTransform {
  transform(answer_text: string): string {
    let delimeter: number = 2;

    switch (true){
      case answer_text.length >= 5000: {
        delimeter = 40;
        break;
      }
      case answer_text.length >= 2000: {
        delimeter = 20;
        break;
      }
      case answer_text.length >= 1000: {
        delimeter = 10;
        break;
      }
      case answer_text.length >= 500: {
        delimeter = 4;
        break;
      }
    }

    return answer_text.substring(0, answer_text.length / delimeter) + '...'
  }
}
