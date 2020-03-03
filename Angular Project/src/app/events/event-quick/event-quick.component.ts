import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { Router } from '@angular/router';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';

@Component({
  selector: 'app-event-quick',
  templateUrl: './event-quick.component.html',
  styleUrls: ['./event-quick.component.scss']
})
export class EventQuickComponent implements OnInit {


  private txtSearch : string;
  constructor(private eventService : EventsService,
    private router: Router,
    private serverService : ServerNotifyService) { }

    private notifyMsg : any;

  ngOnInit() {
    this.serverService.listen('event').subscribe(
      (msg) => {
        alert(msg)
        this.notifyMsg = msg;
      }
    )
  }

  searchEvent() {
    EventsService.setCurrentPlaceToSearch(this.txtSearch);
    this.router.navigate(['/event-search'])
  }

}
