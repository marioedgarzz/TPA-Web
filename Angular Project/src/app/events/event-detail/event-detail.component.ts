import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import { Events } from 'src/app/models/events';
import * as L from 'leaflet'
import {icon, Marker} from 'leaflet'
import { MapService } from 'src/app/services/maps/map.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  constructor(private act : ActivatedRoute,
    private eventService : EventsService,
    private mapService : MapService,
    private router : Router) { }

  private id : number;
  private map;
  private currEvent : Events;
  private currOpened : number = 1;
  private dateTransfer : string;

  ngOnInit() {
    this.id =+ this.act.snapshot.paramMap.get("id")  
    this.eventService.getAllEvents().subscribe(
      async result => {
        await (this.assign(result))
      }
    )
    this.initMap();
  }

  open(num : number ) {
    this.currOpened = num;
  }

  assign(result : Events[]) {
    result.forEach(element => {
      if(element.EventId == this.id) {
        this.currEvent = element;
      }
    });
  }

  private initMap() : void {
    this.map = L.map('map', {
      center : [39.8282, -98.6795],
      zoom : 20
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom : 29,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright>OpenStreetMap</a>'
    });
    tiles.addTo(this.map)
    console.log(this.map)
    this.mapService.assign2(this.map, -98.6795, 39.8282)
    
  }

  redirect() {

    if(this.dateTransfer == undefined || this.dateTransfer == "") {
      alert("Date must be filled!")
      return;
    }

    EventsService.setDateTransfer(this.dateTransfer);

    this.router.navigate(["/event-order/" + this.id])
  }


}
