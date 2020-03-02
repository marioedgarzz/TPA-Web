import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';
import { Events } from 'src/app/models/events';
import { ManageEventUpdateComponent } from '../manage-event-update/manage-event-update.component';
import { ManageEventDeleteComponent } from '../manage-event-delete/manage-event-delete.component';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss']
})
export class ManageEventComponent implements OnInit {

  execCommand(cmd : any) {
    if(cmd === 'createlink') {
      let url = prompt("Enter the link here: ", "http:\/\/");
      document.execCommand(cmd, false, url);
    } else {
      document.execCommand(cmd, false, null);
    }
  }

  constructor(private eventService : EventsService, 
    private dialog : MatDialog,
    private serverService : ServerNotifyService) { }

  eventList : Events[];

  errorMsg : string = "";
  currPage : number = 1;
  filters : string = "All";

  evtName : string;
  evtLocation : string;
  slctType : string = "";
  evtDateFrom : string;
  evtPicture : string;
  evtDescription : string;
  evtTermsAndCondition : string;

  ngOnInit() {
    
    this.eventService.getAllEvents().subscribe(
      async result => {
        await (this.eventList = result)
      }
    )
  }

  insert() {
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

      this.eventService.insertNewEvent(this.evtName,this.evtLocation,this.slctType,
        this.evtDateFrom, this.evtPicture, this.evtDescription,this.evtTermsAndCondition).subscribe(
          async result => {
            await (
              alert("Insert Success!"),
              this.serverService.emit('event',"New Event Has Occured!")
            )
          }
        )
    }
  }

  update(item : Events) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "90%";
    config.maxHeight = "800px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      event : JSON.stringify(item)
    }
    this.dialog.open(ManageEventUpdateComponent,config);
  }

  delete(item : Events) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "60%";
    config.maxHeight = "600px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      event : JSON.stringify(item)
    }
    this.dialog.open(ManageEventDeleteComponent,config);
  }

  previous() {
    if(this.currPage == 1) {
      return;
    }
    this.currPage -= 1;
  }

  next() {
    let maxPage = (this.eventList.length / 10) + 1; 
    maxPage = Math.floor(maxPage)
    if(this.currPage < maxPage) {
      this.currPage += 1;
    }
  }

  getCan(i : number) {
    return i > ((this.currPage-1) * 10) && i < (this.currPage*10);
  }

  




}
