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
  
  evtName : string = "";
  evtLocation : string = "";
  slctType : string = "";
  evtDateFrom : string = "";
  evtPicture : string = "";
  evtDescription : string = "";
  evtTermsAndCondition : string = "";

  execCommand(cmd : any) {
    if(cmd === 'createlink') {
      let url = prompt("Enter the link here: ", "http:\/\/");
      document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, null);
    }
  }
  ngOnInit() {
    this.event = JSON.parse(this.data.event)
    document.getElementById("eventDesc").innerHTML = this.event.EventDescription
  }

  update() {
    console.log(this.evtDescription)
    if(this.evtName == "" || this.evtName == undefined) {
      this.errorMsg = "Event Name must be filled"
    }
    else if(this.evtLocation == "" || this.evtLocation == undefined) {
      this.errorMsg = "Location Name must be filled"
    }
    else if(this.slctType == "" || this.slctType == undefined) {
      this.errorMsg = "Choose a filter"
    }
    else if(this.evtDateFrom == "" || this.evtDateFrom == undefined) {
      this.errorMsg = "Date From must be filled"
    }
    else if(this.evtPicture == "" || this.evtPicture == undefined) {
      this.errorMsg = "Picture must be filled"
    }
    else {
      this.eventService.UpdateEvent(this.event.EventId,this.evtName,this.evtLocation,this.slctType,
        this.evtDateFrom, this.evtPicture, this.evtDescription,this.evtTermsAndCondition).subscribe(
          async result => {
            await (
              alert("Update Success!"),
              location.reload()
            )
          }
        )
    }
  }

}
