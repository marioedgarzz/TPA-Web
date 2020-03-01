import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/services/trains/train.service';
import { TrainSchedule, Train, TrainClass } from 'src/app/models/train';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ManageTrainUpdateComponent } from '../manage-train-update/manage-train-update.component';
import { ManageTrainDeleteComponent } from '../manage-train-delete/manage-train-delete.component';
import { TrainTransactionService } from 'src/app/services/transactions/train-transaction.service';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';

@Component({
  selector: 'app-manage-train',
  templateUrl: './manage-train.component.html',
  styleUrls: ['./manage-train.component.scss']
})
export class ManageTrainComponent implements OnInit {

  constructor(private trainService : TrainService, 
    private dialog : MatDialog,
    private trainTransactionService : TrainTransactionService,
    private serverService : ServerNotifyService) { }

  trainSchedules : TrainSchedule[];
  trainNameList : Train[];
  trainClassList : TrainClass[];
  slctTrainName : string = "";
  trainTimeFrom : string = "";
  trainTimeTo : string = "";
  slctTrainType : string = "";
  errorMsg : string = "";
  currPage : number = 1;
  filters : string = "All";
  ngOnInit() {
    this.trainService.getEveryTrainSchedule().subscribe(
      async result => {
        await (this.trainSchedules = result);
      }
    )
    this.trainService.getAllTrainNames().subscribe(
      async result => {
        await (this.trainNameList = result,
          this.slctTrainName = this.trainNameList[0].TrainName);
      }
    )

    this.trainService.getAllClasses().subscribe(
      async result => {
        await (this.trainClassList = result,
          this.slctTrainType = this.trainClassList[0].TrainClassName);
      }
    )

      
  }

  insert() {
    if(this.trainTimeFrom == "" || this.trainTimeTo == "") {
      this.errorMsg = "All Fields Must be Filled!"
    }
    else if(this.trainTimeFrom.length != 5 || this.trainTimeTo.length != 5 || 
      this.trainTimeFrom.charAt(2) != ':' || this.trainTimeTo.charAt(2) != ':') {
      this.errorMsg = "Format : XX:XX, X = time";
    }
    else {
      this.trainTransactionService.insertNewTransactionSchedule(this.slctTrainName,
        this.trainTimeFrom, this.trainTimeTo, this.slctTrainType).subscribe(
          async result => {
            await (console.log(result),alert("Insert Success"), 
            this.serverService.emit("train","New Train Has Occured"),
            window.location.reload())
          }
        )
    }
    
  }

  update(item : TrainSchedule) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "90%";
    config.maxHeight = "800px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      train : JSON.stringify(item)
    }
    this.dialog.open(ManageTrainUpdateComponent,config);
  }

  delete(item : TrainSchedule) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "60%";
    config.maxHeight = "600px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      train : JSON.stringify(item)
    }
    this.dialog.open(ManageTrainDeleteComponent,config);
  }

  previous() {
    if(this.currPage == 1) {
      return;
    }
    this.currPage -= 1;
  }

  next() {
    let maxPage = (this.trainSchedules.length / 10) + 1; 
    maxPage = Math.floor(maxPage)
    if(this.currPage < maxPage) {
      this.currPage += 1;
    }
  }

  getCan(i : number) {
    return i > ((this.currPage-1) * 10) && i < (this.currPage*10);
  }

}
