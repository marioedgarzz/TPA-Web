import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map} from 'rxjs/operators';
import { TrainSchedule, Train, TrainClass } from 'src/app/models/train';
@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(private apollo : Apollo) { }

  getEveryTrainSchedule() : Observable<TrainSchedule[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
      query getEveryTrainSchedules {
        getEveryTrainSchedules {
          Train {
            TrainBasePrice
            TrainId
            TrainName
          }
          TrainClass {
            TrainClassAdultPrice
            TrainClassId
            TrainClassInfantPrice
            TrainClassName
            TrainSubclassName
          }
          TrainDate
          TrainPlaceFrom {
            TrainPlaceId
            TrainPlaceName
          }
          TrainPlaceTo {
            TrainPlaceId
            TrainPlaceName
          }
          TrainScheduleId
          TrainTimeFrom
          TrainTimeTo
        }
      }`
    }).valueChanges.
    pipe(map(result => result.data.getEveryTrainSchedules))
  }

  getAllTrainSchedule(trainPlaceFrom : string, trainPlaceTo : string) : Observable<TrainSchedule[]>{
    return this.apollo.watchQuery<any>({
      query : gql `
        query getAllTrainSchedules ($trainPlaceFrom : String, $trainPlaceTo : String){
          getAllTrainSchedules(trainPlaceFrom : $trainPlaceFrom, trainPlaceTo : $trainPlaceTo){
            TrainScheduleId
            TrainDate
            TrainTimeTo
            TrainTimeFrom
            Train {
              TrainBasePrice
              TrainName
            }
            TrainPlaceFrom {
              TrainPlaceName
            }
            TrainPlaceTo {
              TrainPlaceName
            }
            TrainClass {
              TrainClassName
              TrainSubclassName
              TrainClassAdultPrice
              TrainClassInfantPrice
            }
          }
        }
      `,
      variables : {
        "trainPlaceFrom" : trainPlaceFrom,
        "trainPlaceTo" : trainPlaceTo
      }
      }
    ).valueChanges
    .pipe(
      map(result => result.data.getAllTrainSchedules)
    )
  }

  getAllTrainNames() : Observable<Train[]> {

    return this.apollo.watchQuery<any>({
      query : gql `
        query getAllTrainNames {    
          getAllTrainNames{
            TrainId
            TrainName
          }
        }
      `,
      }
    ).valueChanges
    .pipe(
      map(result => result.data.getAllTrainNames)
    )

  }

  getAllClasses() : Observable<TrainClass[]> {
    return this.apollo.watchQuery<any>({
      query : gql `
        query getAllClasses {
          getAllClasses{
            TrainClassName
          }
        }
      `,
      }
    ).valueChanges
    .pipe(
      map(result => result.data.getAllClasses)
    )
  }


}
