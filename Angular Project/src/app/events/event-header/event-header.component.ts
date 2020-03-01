import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/models/events';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {

  constructor(private eventService : EventsService) { }

  private allEventList : Events[]
  private activitiesList : Events[]
  private eventsList : Events[]
  private attractionList : Events[]

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(
      async result => {
        await this.assign(result);
      }
    )
  }

  assign(res : Events[]) {
    let idxAc = 0
    let idxE = 0
    let idxAt = 0
    
    this.attractionList = Array(res.length+1)
    this.activitiesList = Array(res.length+1)
    this.eventsList = Array(res.length + 1)
    for(let i = 0 ; i < res.length ; i++) {
      if(res[i].EventType == "Attractions") {
        this.attractionList[idxAt++] = res[i];
      }
      else if(res[i].EventType == "Activities") {
        this.activitiesList[idxAc++] = res[i];
      }
      else {
        this.eventsList[idxE++] = res[i];
      }
    }
    this.allEventList = res;
    this.attractionList.length = idxAt;
    this.activitiesList.length = idxAc;
    this.eventsList.length = idxE;

    this.attractionList.sort((a,b) => (new Date(a.EventDateFrom).getTime() < 
      new Date(b.EventDateFrom).getTime())? -1 : 1)
    this.activitiesList.sort((a,b) => (new Date(a.EventDateFrom).getTime() < 
      new Date(b.EventDateFrom).getTime())? -1 : 1)
    this.eventsList.sort((a,b) => (new Date(a.EventDateFrom).getTime() < 
      new Date(b.EventDateFrom).getTime())? -1 : 1)
    this.allEventList.sort((a,b) => (new Date(a.EventDateFrom).getTime() < 
      new Date(b.EventDateFrom).getTime())? -1 : 1)
    
    
  }

  

  

}
