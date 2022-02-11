import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from 'src/interface';

@Pipe({
  name: 'searchCategory',
})
export class SearchPipe implements PipeTransform {
  public transform(categories: ICategory[], search = ''): ICategory[] {
    if (!search.trim()) {
      return categories;
    }
    return categories.filter((category) => {
      return category.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
