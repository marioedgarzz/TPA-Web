import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from 'src/app/models/events';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private apollo : Apollo) { }

  getAllEvents() : Observable<Events[]> {
    return this.apollo.watchQuery<any>({
      query : gql`
        query getAllEvents {
          getAllEvents {
            EventAddress
            EventDateFrom
            EventDateTo
            EventDescription
            EventId
            EventLocation
            EventName
            EventPicture
            EventPrice
            EventType
          }
        }`
    }).valueChanges.pipe(
      map(result => result.data.getAllEvents)
    )
  } 

  public static getCurrentPlaceToSearch() : string{
    if(sessionStorage.getItem("event-place") == undefined) {
      return ""
    }
    return sessionStorage.getItem("event-place")
  }

  public static setCurrentPlaceToSearch(place : string) {
    if(place == "" || place == undefined) {
      sessionStorage.setItem("event-place","");
    }
    else sessionStorage.setItem("event-place",place);
  }
}
