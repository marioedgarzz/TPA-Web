import { Component, OnInit } from '@angular/core';
import { TrainTransfer } from 'src/app/models/train-transfer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-quick',
  templateUrl: './train-quick.component.html',
  styleUrls: ['./train-quick.component.scss']
})
export class TrainQuickComponent implements OnInit {

  cityFrom : string;
  cityDest : string;
  dateFrom : string;
  dateTo : string;
  numAdults : number;
  numInfants : number;

  constructor(private router : Router) { }

  ngOnInit() {
    if(localStorage.getItem("TrainTransfer") != undefined) {
      var tr : TrainTransfer = JSON.parse(localStorage.getItem("TrainTransfer"));
      this.cityDest= tr.TrainDest;
      console.log(this.cityDest);
      this.cityFrom = tr.TrainFrom;
      this.dateFrom = tr.TrainDateFrom;
      this.dateTo = tr.TrainDateTo;
      this.numAdults = tr.TrainAdult;
      this.numInfants = tr.TrainInfant;
    }
  }

  search() {
    if(this.cityDest == "" || this.cityFrom == "" || this.dateFrom == undefined || this.dateTo == undefined) {
      alert("All field must be filled!");
      return;
    }
    else if(this.numAdults <= 0 && this.numInfants <= 0) {
      alert("There must be at least 1 passenger!");
      return;
    }
    
    var t : TrainTransfer = new TrainTransfer();
    t.TrainFrom = this.cityFrom;
    t.TrainDest = this.cityDest;
    t.TrainDateFrom = this.dateFrom;
    t.TrainDateTo = this.dateTo;
    t.TrainAdult = this.numAdults;
    t.TrainInfant = this.numInfants;
    window.localStorage.setItem("TrainTransfer",JSON.stringify(t));
    
    if(this.router.url == "/train" || this.router.url == "/") {
      this.router.navigate(["/train-header"]);
    }
    else {
      window.location.reload();
    }

  }

}
