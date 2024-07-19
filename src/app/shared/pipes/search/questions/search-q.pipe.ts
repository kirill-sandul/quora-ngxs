import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../../../interfaces/question.interface';

@Pipe({
  name: 'search_q'
})
export class SearchPipe implements PipeTransform {
  transform(questions: IQuestion[], search: string): IQuestion[] {
    if(!search) return questions;

    return questions.filter(q => q.title.toLowerCase().includes(search.toLowerCase()));
  }
}
