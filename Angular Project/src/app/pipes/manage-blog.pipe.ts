import { Pipe, PipeTransform } from '@angular/core';
import { Blogs } from '../models/blogs';

@Pipe({
  name: 'manageBlog',
  pure : false
})
export class ManageBlogPipe implements PipeTransform {

  transform(value: Blogs[], filter : string): any {
    if(filter == "All" || filter == undefined || filter == "") return value;
    return value.filter(res => res.BlogCategory.BlogCategoryName == filter);
  }

}
