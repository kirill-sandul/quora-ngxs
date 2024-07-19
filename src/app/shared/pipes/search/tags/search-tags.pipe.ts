import { Pipe, PipeTransform } from '@angular/core';
import { ITag } from '../../../interfaces/tag.interface';

@Pipe({
  name: 'searchTags'
})
export class SearchTagsPipe implements PipeTransform {
  transform(tags: ITag[], search: string) {
    if(!tags) return;
    if(!search) return tags;

    return tags.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  }
}
