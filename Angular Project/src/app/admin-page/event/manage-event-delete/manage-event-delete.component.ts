import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventsService } from 'src/app/services/events/events.service';
import { Events } from 'src/app/models/events';

@Component({
  selector: 'app-manage-event-delete',
  templateUrl: './manage-event-delete.component.html',
  styleUrls: ['./manage-event-delete.component.scss']
})
export class ManageEventDeleteComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageEventDeleteComponent>,
    private eventService : EventsService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  private event : Events;

  

  ngOnInit() {
    this.event = JSON.parse(this.data.event)


  }

  yes() {
    this.eventService.deleteEvent(this.event.EventId).subscribe(
      async result => {
        await (alert("Delete Success!"), window.location.reload());
      }
    )
  }

  no() {
    this.MatRef.close();
  }

}
