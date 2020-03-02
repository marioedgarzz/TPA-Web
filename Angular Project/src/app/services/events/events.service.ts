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
            EventTermsAndCondition
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

  public static getDateTransfer() {
    return sessionStorage.getItem("event-date-transfer")
  }

  public static setDateTransfer(date : string) {
    sessionStorage.setItem("event-date-transfer",date);
  }

  insertNewEvent(EventName : string,EventLocation : string, EventCategory : string, EventDateFrom : string,
    EventPicture : string, EventDescription : string, EventTermsAndCondition : string): Observable<any> {
      return this.apollo.mutate<any>({
        mutation : gql `
        mutation insertNewEvent($eventName : String, $eventLocation : String,
          $eventType : String, $eventDateFrom : String, $eventPicture : String,
          $eventDescription : String, $eventTermsAndCondition : String) {
            insertNewEvent(EventName : $eventName,EventLocation : $eventLocation,
              EventType : $eventType,EventDateFrom : $eventDateFrom,
              EventPicture : $eventPicture,EventDescription : $eventDescription,
              EventTermsAndCondition: $eventTermsAndCondition) {
              EventAddress
            }
          }
        `,
        variables : {
          "eventName": EventName,
          "eventLocation": EventLocation,
          "eventType": EventCategory,
          "eventDateFrom": EventDateFrom,
          "eventPicture": EventPicture,
          "eventDescription": EventDescription,
          "eventTermsAndCondition": EventTermsAndCondition
        }
      })
    }

    UpdateEvent(EventId : number,EventName : string,EventLocation : string, EventCategory : string, EventDateFrom : string,
      EventPicture : string, EventDescription : string, EventTermsAndCondition : string) : Observable<any>{
        return this.apollo.mutate<any>({
          mutation: gql `
            mutation updateEvent($eventId : Int,$eventName : String, $eventLocation : String,
              $eventType : String, $eventDateFrom : String, $eventPicture : String,
              $eventDescription : String, $eventTermsAndCondition : String) {
                updateEvent(EventId : $eventId ,EventName : $eventName,EventLocation : $eventLocation,
                  EventType : $eventType,EventDateFrom : $eventDateFrom,
                  EventPicture : $eventPicture,EventDescription : $eventDescription,
                  EventTermsAndCondition: $eventTermsAndCondition) {
                  EventAddress
                }
              }
          `,
          variables : {
            "eventId" : EventId,
            "eventName": EventName,
            "eventLocation": EventLocation,
            "eventType": EventCategory,
            "eventDateFrom": EventDateFrom,
            "eventPicture": EventPicture,
            "eventDescription": EventDescription,
            "eventTermsAndCondition": EventTermsAndCondition
          }
        })
      }

    deleteEvent(EventId : number) : Observable<any> {
      return this.apollo.mutate<any>({
        mutation : gql`
          mutation deleteEvent($eventId : Int) {
            deleteEvent(EventId : $eventId) {
              EventAddress
            }
          }
        `,
        variables : {
          "eventId" : EventId
        }
      })
    }

  
}
