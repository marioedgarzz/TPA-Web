import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Events } from 'src/app/models/events';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.scss']
})
export class EventSearchComponent implements OnInit {

  constructor(private eventService : EventsService,
    private router : Router) { }

  private eventList : Events[]

  private currLocation : string;
  ngOnInit() {
    var placeToSearch = EventsService.getCurrentPlaceToSearch()
    this.currLocation = placeToSearch;
    this.eventService.getAllEvents().subscribe(
      async result => {
        await this.assign(result, placeToSearch);
      }
    )
    window.addEventListener('scroll',this.scroll);
  }

  filterType : boolean[] = Array(3);
  minPrice : number = 0;
  maxPrice : number = 10000000;
  dateFrom : string;
  dateTo : string;
  searchEvent : string;
  selectedModel : string;

  private map;
  currShown : number = 2;
  scroll = (event) : void => {
    var elem = document.getElementById("main-event");
    var start = elem.offsetTop;
    var height = elem.offsetHeight;
    var end = start + height;
    var curr = window.scrollY + window.innerHeight;
    
    if(curr > end + 100) {
      this.currShown++;
    }
  }

  reset() {
    this.dateFrom = "";
    this.dateTo = "";
    this.minPrice = 0;
    this.maxPrice = 10000000;
    for(let i = 0 ; i < 3 ; i++) {
      this.filterType[i] = false;
    }

    var temp = document.getElementsByTagName("input")

    for(let i = 0 ; i < temp.length ; i++) {
      if(temp[i].type == "checkbox") {
        temp[i].checked = false;
      }
    }

  }

  chngFilterType(num : number) {
    this.filterType[num] = !this.filterType[num];
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

  clickItem(item : Events) {
    this.router.navigate(['/event-detail/' + item.EventId])
  }

}
