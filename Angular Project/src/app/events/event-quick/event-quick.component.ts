import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-quick',
  templateUrl: './event-quick.component.html',
  styleUrls: ['./event-quick.component.scss']
})
export class EventQuickComponent implements OnInit {


  private txtSearch : string;
  constructor(private eventService : EventsService,
    private router: Router) { }

  ngOnInit() {

  }

  searchEvent() {
    EventsService.setCurrentPlaceToSearch(this.txtSearch);
    this.router.navigate(['/event-search'])
  }

}
