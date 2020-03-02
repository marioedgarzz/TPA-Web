import { Pipe, PipeTransform } from '@angular/core';
import { Events } from '../models/events';

@Pipe({
  name: 'manageEvent'
})
export class ManageEventPipe implements PipeTransform {

  transform(value: Events[], filter : string): any {
    if(filter == "All") return value;
    return value.filter(res => res.EventType == filter);
  }

}
