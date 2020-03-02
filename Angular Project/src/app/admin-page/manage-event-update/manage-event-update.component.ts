import { Component, OnInit, Inject } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { ManageEventDeleteComponent } from '../manage-event-delete/manage-event-delete.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Events } from 'src/app/models/events';

@Component({
  selector: 'app-manage-event-update',
  templateUrl: './manage-event-update.component.html',
  styleUrls: ['./manage-event-update.component.scss']
})
export class ManageEventUpdateComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageEventDeleteComponent>,
    private eventService : EventsService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  event : Events;
  
  errorMsg : string = "";
  
  evtName : string;
  evtLocation : string;
  slctType : string = "";
  evtDateFrom : string;
  evtPicture : string;
  evtDescription : string;
  evtTermsAndCondition : string;

  ngOnInit() {
    this.event = JSON.parse(this.data.event)


  }

  update() {
    if(this.evtName == "") {
      this.errorMsg = "Event Name must be filled"
    }
    else if(this.evtLocation == "") {
      this.errorMsg = "Location Name must be filled"
    }
    else if(this.slctType == "") {
      this.errorMsg = "Choose a filter"
    }
    else if(this.evtDateFrom == "") {
      this.errorMsg = "Date From must be filled"
    }
    else if(this.evtPicture == "") {
      this.errorMsg = "Picture must be filled"
    }
    else {
      this.eventService.UpdateEvent(this.event.EventId,this.evtName,this.evtLocation,this.slctType,
        this.evtDateFrom, this.evtPicture, this.evtDescription,this.evtTermsAndCondition).subscribe(
          async result => {
            await (
              alert("Update Success!")
            )
          }
        )
    }
  }

}
