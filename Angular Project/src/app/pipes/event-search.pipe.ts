import { Pipe, PipeTransform } from '@angular/core';
import { Events } from '../models/events';

@Pipe({
  name: 'eventSearch',
  pure : false
})
export class EventSearchPipe implements PipeTransform {

  filterPrice(value : Events[], minPrice : number, maxPrice : number) {
    return value.filter(res => res.EventPrice >= minPrice && res.EventPrice <= maxPrice)
  }

  filterDate(value : Events[], dateFrom : string, dateTo : string) {
    if(dateFrom == "" || dateFrom == undefined || dateTo == "" || dateTo == undefined) {
      return value;
    }

    console.log((dateTo))
    console.log(new Date(value[0].EventDateFrom).getTime())
    return value.filter(res =>  new Date(dateFrom).getTime() <= new Date(res.EventDateFrom).getTime()
       && new Date(res.EventDateFrom).getTime() <= new Date(dateTo).getTime() )
  }

  filterType(value : Events[], filterType : boolean[]) {
    var isFiltering = false;

    var newValue : Events[] = Array(value.length);
    let idx = 0;
    if(filterType[0] == true) {
      isFiltering = true;
      for(let i = 0 ; i < value.length ; i++) {
        if(value[i].EventType == "Activities") {
          newValue[idx++] = value[i];   
        }
      }
    }
    if(filterType[1] == true) {
      isFiltering = true;
      for(let i = 0 ; i < value.length ; i++) {
        if(value[i].EventType == "Attractions") {
          newValue[idx++] = value[i];   
        }
      }
    }
    if(filterType[2] == true) {
      isFiltering = true;
      for(let i = 0 ; i < value.length ; i++) {
        if(value[i].EventType == "Events") {
          newValue[idx++] = value[i];   
        }
      }
    }

    if(!isFiltering) return value;

    newValue.length = idx;

    return newValue;
  }

  filterName(value : Events[], inputEvent : string) {
    if(inputEvent == "" || inputEvent == undefined) {
      return value
    }
    return value.filter(res => res.EventName.startsWith(inputEvent))
  }

  // <option value="Newest"> Newest</option>
  // <option value="High To Low Price"> High To Low Price</option>
  // <option value="Low To High Price"> Low To High Price</option>
  // <option value="Recommended"> Recommended</option>
  sort(value : Events[], selectedSort : string) {
    if(selectedSort == "" || selectedSort == undefined) {
      return value;
    }
    else if(selectedSort == "Newest") {
      return value.sort((a,b) => (new Date(a.EventDateFrom).getTime() < new Date(b.EventDateFrom).getTime())? -1:1)
    }
    else if(selectedSort == "High To Low Price") {
      return value.sort((a,b) => (a.EventPrice > b.EventPrice) ? -1 : 1);
    }
    else if(selectedSort == "Low To High Price") {
      return value.sort((a,b) => (a.EventPrice < b.EventPrice) ? -1 : 1);
    }
    else if(selectedSort == "Recommended") {
      return value.sort((a,b) => (a.EventPrice < b.EventPrice) ? -1 : 1);
    }

  }

  transform(value: Events[], minPrice : number, maxPrice : number, dateFrom : string, dateTo : string,
    filterType : boolean[],inputEvent : string, selectedSort : string): any {
      value = this.filterPrice(value,minPrice,maxPrice)
      value = this.filterDate(value, dateFrom, dateTo)
      value = this.filterType(value,filterType);
      value = this.filterName(value,inputEvent);
      value = this.sort(value, selectedSort);
      return value;
  }

}
