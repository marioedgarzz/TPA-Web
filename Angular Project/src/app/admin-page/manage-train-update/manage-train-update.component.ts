import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainSchedule, Train, TrainClass } from 'src/app/models/train';
import { TrainService } from 'src/app/services/trains/train.service';
import { TrainTransactionService } from 'src/app/services/transactions/train-transaction.service';

@Component({
  selector: 'app-manage-train-update',
  templateUrl: './manage-train-update.component.html',
  styleUrls: ['./manage-train-update.component.scss']
})
export class ManageTrainUpdateComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageTrainUpdateComponent>,
    private trainService : TrainService,
    private trainTransactionService : TrainTransactionService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

    
  trainSchedule : TrainSchedule;
  trainNameList : Train[];
  trainClassList : TrainClass[];
  
  slctName : string = "";
  trainTimeFrom : string = "";
  trainTimeTo : string = "";
  slctType : string = "";
  errorMsg : string = "";
  
  ngOnInit() {
    this.trainSchedule = JSON.parse(this.data.train)
    this.trainService.getAllTrainNames().subscribe(
      async result => {
        await (this.trainNameList = result,
          this.slctName = this.trainNameList[0].TrainName);
      }
    )

    this.trainService.getAllClasses().subscribe(
      async result => {
        await (this.trainClassList = result,
          this.slctType = this.trainClassList[0].TrainClassName);
      }
    )
  }

  update() {
    if(this.trainTimeFrom == "" || this.trainTimeTo == "") {
      this.errorMsg = "All Fields Must be Filled!"
    }
    else if(this.trainTimeFrom.length != 5 || this.trainTimeTo.length != 5 || 
      this.trainTimeFrom.charAt(2) != ':' || this.trainTimeTo.charAt(2) != ':') {
      this.errorMsg = "Format : XX:XX, X = time";
    }
    else {
      this.trainTransactionService.updateTrainSchedule(this.trainSchedule.TrainScheduleId,
        this.slctName,this.trainTimeFrom,this.trainTimeTo,this.slctType).subscribe(
          async result => {
            await( alert("Update Success!"),
            window.location.reload());
          }
      )

    }
  }

}
