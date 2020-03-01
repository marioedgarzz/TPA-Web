import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainService } from 'src/app/services/trains/train.service';
import { TrainTransactionService } from 'src/app/services/transactions/train-transaction.service';
import { TrainSchedule } from 'src/app/models/train';

@Component({
  selector: 'app-manage-train-delete',
  templateUrl: './manage-train-delete.component.html',
  styleUrls: ['./manage-train-delete.component.scss']
})
export class ManageTrainDeleteComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageTrainDeleteComponent>,
    private trainTransactionService : TrainTransactionService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  private trainSchedule : TrainSchedule;

  ngOnInit() {
    this.trainSchedule = JSON.parse(this.data.train)


  }

  yes() {
    this.trainTransactionService.deleteTrainSchedule(this.trainSchedule.TrainScheduleId).subscribe(
      async result => {
        await (alert("Delete Success!"), window.location.reload());
      }
    )
  }

  no() {
    this.MatRef.close();
  }

}
