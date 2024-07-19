import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../../interfaces/question.interface';
import { ITag } from '../../interfaces/tag.interface';

@Pipe({
  name: 'tagPipe'
})
export class TagPipe implements PipeTransform {
  transform(questions: IQuestion[], tag: ITag | null): IQuestion[] {
    if(!tag) return questions;

    return questions.filter(q => q.tags.indexOf(tag.name) !== -1);
  }
}
