import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Events } from 'src/app/models/events';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss']
})
export class EventSearchComponent implements OnInit {

  constructor(private eventService : EventsService) { }

  private eventList : Events[]

  ngOnInit() {
    var placeToSearch = EventsService.getCurrentPlaceToSearch()
    this.eventService.getAllEvents().subscribe(
      async result => {
        await this.assign(result, placeToSearch);
      }
    )
  }

  assign(result : Events[], placeToSearch : string) {
    console.log("Place" +placeToSearch)
    if(placeToSearch == undefined || placeToSearch == "") {
      console.log("mask")
      this.eventList = result;
      return;
    }
    this.eventList = Array(result.length + 1)
    let idx = 0;
    for(let i = 0; i < result.length ; i++) {
      if(result[i].EventLocation == placeToSearch) {
        this.eventList[idx++] = result[i]
      }
    }

    this.eventList.length = idx;
  }

}
