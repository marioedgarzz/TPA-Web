import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrainTransactionService {

  constructor(private apollo : Apollo) { }



  // getAllTrainTransactionsByUser() {

  // }

  createNewTrainTransaction(trainScheduleId : number, userId : number, trainTransactionDate : string) : Observable<any>{
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation createNewTrainTransactions ($trainScheduleId : Int, $userId : Int, $trainTransactionDate : String){
          createNewTrainTransactions(TrainScheduleId : $trainScheduleId, UserId : $userId, TrainTransactionDate : $trainTransactionDate) {
            TrainTransactionId
          }
        }
      `,
      variables : {
        "trainScheduleId" : trainScheduleId,
        "userId" : userId,
        "trainTransactionDate" : trainTransactionDate
      }
    }) 
  }

  insertNewTransactionSchedule(trainName : string, trainTimeFrom : string, trainTimeTo : string, trainClassName : string) : Observable<any> {
    return this.apollo.mutate<any> ({
      mutation : gql `
        mutation insertNewTrainSchedule($trainName : String, $trainTimeFrom : String, $trainTimeTo : String, $trainClassName : String){
          insertNewTrainSchedule(TrainName : $trainName, TrainTimeFrom : $trainTimeFrom, TrainTimeTo : $trainTimeTo, TrainClassName : $trainClassName) {
            TrainTimeTo
          }
        }
      `,
      variables : {
        "trainName": trainName,
        "trainTimeFrom": trainTimeFrom,
        "trainTimeTo": trainTimeTo,
        "trainClassName": trainClassName
      },
    })
  }

  updateTrainSchedule(trainScheduleId : number,trainName : string, trainTimeFrom : string, trainTimeTo : string, trainClassName : string) : Observable<any> {
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation updateTrainSchedule($trainScheduleId : Int, $trainName : String, $trainTimeFrom : String, $trainTimeTo : String, $trainClassName : String){
          updateTrainSchedule(TrainScheduleId : $trainScheduleId, TrainName : $trainName, TrainTimeFrom : $trainTimeFrom, TrainTimeTo : $trainTimeTo, TrainClassName : $trainClassName) {
            TrainScheduleId
          }
        }`,
        variables : {
          "trainClassName": trainClassName,
          "trainName": trainName,
          "trainScheduleId": trainScheduleId,
          "trainTimeFrom": trainTimeFrom,
          "trainTimeTo": trainTimeTo
        }
    })
  }

  deleteTrainSchedule(trainScheduleId : number) : Observable<any> {
    return this.apollo.mutate({
      mutation : gql `
        mutation deleteTrainSchedule($trainScheduleId : Int){
          deleteTrainSchedule (TrainScheduleId : $trainScheduleId){
            TrainScheduleId
          }
        }
      `,
      variables : {
        "trainScheduleId" : trainScheduleId
      }
    })
  }
}
