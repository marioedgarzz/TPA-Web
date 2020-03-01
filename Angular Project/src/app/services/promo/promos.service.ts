import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promos } from 'src/app/models/promo';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class PromosService {

  constructor(private apollo : Apollo) {
    
   }

  getAllPromos() : Observable<Promos[]>{
    return this.apollo.watchQuery<any>({
      query : gql`
        query getAllPromos {
          getAllPromos {
            PromoCode
            PromoPicture
            PromoCodeDescription
            PromoDescription
            PromoHeader
            PromoId
            PromoPeriod
            PromoPlatform
            PromoTripPeriod
          }
        }
      `
    }).valueChanges.pipe(
      map(result => result.data.getAllPromos)
    )
  }
}
