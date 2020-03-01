import { Pipe, PipeTransform } from '@angular/core';
import { TrainClass, TrainSchedule } from '../models/train';

@Pipe({
  name: 'manageTrainFilter'
})
export class ManageTrainFilterPipe implements PipeTransform {

  transform(value: TrainSchedule[], chosenClass : string): any {
    if(chosenClass == "All") return value;
    return value.filter(result => result.TrainClass.TrainClassName == chosenClass);
  }

}
