import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarTransactionService {

  constructor(private apollo : Apollo) { }

  createNewCarTransaction(carFromVendorId : number, userId : number, carTransactionDate : string) : Observable<any>{
    return this.apollo.mutate<any>({
      mutation : gql `
        mutation createNewCarTransactions($carFromVendorId : Int, $userId : Int, $carTransactionDate : String){
          createNewCarTransactions(CarFromVendorId : $carFromVendorId, UserId : $userId, CarTransactionDate : $carTransactionDate) {
            CarTransactionId
          }
        }
      `,
      variables : {
        "carFromVendorId" : carFromVendorId,
        "userId" : userId,
        "carTransactionDate" : carTransactionDate
      }
    }) 
  }
}
