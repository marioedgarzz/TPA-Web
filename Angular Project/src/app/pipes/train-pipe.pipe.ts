import { Pipe, PipeTransform } from '@angular/core';
import { TrainSchedule, Train, TrainClass } from '../models/train';

@Pipe({
  name: 'trainPipe',
  pure : false
})
export class TrainPipePipe implements PipeTransform {

  filterByTime(value : TrainSchedule[], isTimeFilter : boolean[])  : TrainSchedule[]{
    var newValue : TrainSchedule[] = Array(value.length + 1);
    let idx = 0;
    var isFilter : boolean = false;

    if(isTimeFilter[0] == true) {
      isFilter = true;
      for(let i = 0 ; i < value.length ; i++) {
        var hourFrom : number = parseInt(value[i].TrainTimeFrom.split(":")[0])
        if(hourFrom >= 0 && hourFrom < 6) {
          newValue[idx++] = value[i];
        }
      }
    }
    if(isTimeFilter[1] == true) {
      isFilter = true;
      for(let i = 0 ; i < value.length ; i++) {
        var hourFrom : number = parseInt(value[i].TrainTimeFrom.split(":")[0])
        if(hourFrom >= 6 && hourFrom < 12) {
          newValue[idx++] = value[i];
        }
      }
    }
    if(isTimeFilter[2] == true) {
      isFilter = true;
      for(let i = 0 ; i < value.length ; i++) {
        var hourFrom : number = parseInt(value[i].TrainTimeFrom.split(":")[0])
        if(hourFrom >= 12 && hourFrom < 18) {
          newValue[idx++] = value[i];
        }
      }
    }
    if(isTimeFilter[3] == true) {
      isFilter = true;
      for(let i = 0 ; i < value.length ; i++) {
        var hourFrom : number = parseInt(value[i].TrainTimeFrom.split(":")[0])
        if(hourFrom >= 18 && hourFrom < 24) {
          newValue[idx++] = value[i];
        }
      }
    }
    
    if(isFilter == false) {
      return value;
    }

    return newValue;
  }

  filterByName(value : TrainSchedule[], trainNames : Train[], isTrainNameFilter : boolean[]) : TrainSchedule[] {
    var newValue : TrainSchedule[] = Array(value.length + 1);
    let idx = 0;
    var isFilter : boolean = false;

    for(let i = 0 ; i < trainNames.length ; i++) {
      if(isTrainNameFilter[i] == true) {
        isFilter = true;
        value.forEach(element => {
          if(element.Train.TrainName == trainNames[i].TrainName) {
            newValue[idx++] = element;
          }
        });
      }
    }

    if(isFilter == false) {
      return value;
    }

    return newValue;
  }

  filterByClass(value : TrainSchedule[], trainClasses: TrainClass[], isTrainClassFilter : boolean[]) : TrainSchedule[] {
    var newValue : TrainSchedule[] = Array(value.length + 1);
    let idx = 0;
    var isFilter : boolean = false;

    for(let i = 0 ; i < trainClasses.length ; i++) {
      if(isTrainClassFilter[i] == true) {
        isFilter = true;
        value.forEach(element => {
          if(element.TrainClass.TrainClassName == trainClasses[i].TrainClassName) {
            newValue[idx++] = element;
          }
        });
      }
    }

    if(isFilter == false) {
      return value;
    }

    return newValue;
  }

  getPrice(item : TrainSchedule) : number {

    let adultPrice = item.TrainClass.TrainClassAdultPrice
    let infantPrice = item.TrainClass.TrainClassInfantPrice
    let basePrice = item.Train.TrainBasePrice

    let totalAdultPrice = basePrice + this.nAdult * adultPrice;
    if(this.nInfant == 0) {
      return totalAdultPrice;
    }
    let totalInfantPrice = basePrice + this.nInfant * infantPrice;
    let totalPrice = totalAdultPrice + totalInfantPrice;

    return totalPrice;
  }

  nAdult : number;
  nInfant : number;

  sort(value : TrainSchedule[], filter : string) {
    if(filter == "Lowest Price") {
      value.sort((a,b) => (this.getPrice(a) < this.getPrice(b)) ? -1 : 1);
    }
    else if(filter == "Earliest Departure") {
      value.sort((a,b) => (a.TrainTimeFrom < b.TrainTimeFrom) ? -1 : 1);
    }
    else if(filter == "Latest Departure") {
      value.sort((a,b) => (a.TrainTimeFrom > b.TrainTimeFrom) ? -1 : 1);
    }
    else if(filter == "Earliest Arrival") {
      value.sort((a,b) => (a.TrainTimeTo < b.TrainTimeTo) ? -1 : 1);
    }
    else if(filter == "Latest Arrival") {
      value.sort((a,b) => (a.TrainTimeTo > b.TrainTimeTo) ? -1 : 1);
    }
    else if(filter == "Shortest Duration") {
      value.sort((a,b) => (this.getDuration(a.TrainTimeFrom,a.TrainTimeTo) < 
        this.getDuration(b.TrainTimeFrom, b.TrainTimeTo)) ? -1 : 1)
    }
  }

  getDuration(a : string , b : string) : number {
    var first : string[] = a.split(":");
    var second : string[] = b.split(":");

    var firstHour : number = parseInt(first[0]);
    var firstMinute : number = parseInt(first[1]);

    var secondHour : number = parseInt(second[0]);
    var secondMinute : number = parseInt(second[1]);

    if(secondMinute < firstMinute) {
      secondHour -= 1
      secondMinute += 60
    }

    var duration = (secondHour - firstHour) * 60 + (secondMinute - firstMinute);

    return duration
  }

  filterSort(value : TrainSchedule[],filter : string[],  isFilter : boolean[]) {

    for(let i = 0 ; i < isFilter.length ; i++) {
      if(isFilter[i] == true) {
        this.sort(value, filter[i]);
      }
    }

  }

  transform(value: TrainSchedule[], isTimeFilter : boolean[], trainNames : Train[], 
    isTrainNameFilter : boolean[], trainClasses : TrainClass[], isTrainClassFilter : boolean[],
    sortString : string[], isSort : boolean[], nAdults : number, nInfants : number): TrainSchedule[] {
      this.nInfant = nInfants;
      this.nAdult = nAdults;
      value = this.filterByTime(value,isTimeFilter);
      value = this.filterByName(value,trainNames,isTrainNameFilter);
      value = this.filterByClass(value,trainClasses,isTrainClassFilter);
      for(let i = 0 ; i < value.length ; i++) {
        if(value[i] == undefined) {
          value.length = i;
          break;
        }
      }

      this.filterSort(value,sortString, isSort)

      return value;
  }

}
