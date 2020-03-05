import { Component, OnInit } from '@angular/core';
import { TrainTransfer } from 'src/app/models/train-transfer';
import { TrainService } from 'src/app/services/trains/train.service';
import { Subscription, of } from 'rxjs';
import { TrainSchedule, TrainClass, Train } from 'src/app/models/train';
import { TrainTransactionService } from 'src/app/services/transactions/train-transaction.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { Router } from '@angular/router';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';

@Component({
  selector: 'app-train-header',
  templateUrl: './train-header.component.html',
  styleUrls: ['./train-header.component.scss']
})
export class TrainHeaderComponent implements OnInit {

  onFocus: boolean ;
  fromCity: string;
  destCity: string;
  DateFrom : string;
  nPassenger : number;
  nAdult : number;
  nInfant : number;
  tripDetail : boolean[];
  priceDetail : boolean[];

  trainClasses: TrainClass[];
  trainNames : Train[];

  filterTrainClasses : boolean[];
  filterTrainNames : boolean[];
  filterTrainTimes: boolean[] = Array(5);

  sortList : string[] = [
    "Lowest Price",
    "Earliest Departure",
    "Latest Departure",
    "Earliest Arrival",
    "Latest Arrival",
    "Shortest Duration"
  ]

  filterSort : boolean[] = Array(7)

  private readMore : boolean;

  sort(num : number) {
    for(let i = 0 ; i < this.sortList.length ; i++) {
      this.filterSort[i] = false;
    }
    this.filterSort[num] = true;
  }

  constructor(private trainService : TrainService, 
    private trainTransactionService : TrainTransactionService,
    private serverNotifyService : ServerNotifyService,
    private router : Router) { 
    this.readMore = false;
  }

  isShowingReadMore : boolean = true;

  getReadMore(item : Train) {
    if(item == undefined || item.TrainId < 4 ) {
      return false;
    }
    return this.isShowingReadMore;
  }

  clickReadMore() {
    this.isShowingReadMore = false;
    this.readMore = true;
  }

  private trainSchedule$ : Subscription;
  private trainSchedules : TrainSchedule[];
  private notifyMessage : any;

  filterTrainClass(num : number) {
    this.filterTrainClasses[num] = !this.filterTrainClasses[num];
  }

  filterTrainTime(num : number) {
    this.filterTrainTimes[num] = !this.filterTrainTimes[num];
  }

  filterTrainName(num : number) {
    this.filterTrainNames[num] = !this.filterTrainNames[num];
  }

  reset() {
    for(let i = 0 ; i < 4 ; i++) {
      this.filterTrainTimes[i] = false;
    }

    for(let i = 0 ; i < this.filterTrainClasses.length; i++) {
      this.filterTrainClasses[i] = false;
    }

    for(let i = 0 ; i < this.filterTrainNames.length ; i++) {
      this.filterTrainNames[i] = false;
    }

    var temp = document.getElementsByTagName("input");

    for(let i = 0 ; i < temp.length ; i++) {
      if(temp[i].type == "checkbox") {
        temp[i].checked = false;
      }
    }

  }

  ngOnInit() {
    this.onFocus = false;

    if(localStorage.getItem("TrainTransfer") != undefined) {
      var tr : TrainTransfer = JSON.parse(localStorage.getItem("TrainTransfer"));
      this.fromCity = tr.TrainFrom;
      this.destCity = tr.TrainDest;
      this.DateFrom = tr.TrainDateFrom;
      this.nPassenger = tr.TrainAdult + tr.TrainInfant;
      this.nAdult = tr.TrainAdult;
      this.nInfant = tr.TrainInfant;
    }
    this.trainService.getAllClasses().subscribe(
      async result => {
        await(
          this.trainClasses = result,
          this.filterTrainClasses = Array(this.trainClasses.length + 1),
          this.initFilterClass()
          )
      }
    )
    this.trainService.getAllTrainNames().subscribe(
      async result => {
        await(
          this.trainNames = result,
          this.filterTrainNames = Array(this.trainNames.length + 1),
          this.initFilterNames()
        )
      }
    )

    this.trainSchedule$ =this.trainService.getAllTrainSchedule(this.fromCity, this.destCity).subscribe(
      async result => {
        await (
          this.trainSchedules = result,
          this.tripDetail = Array(this.trainSchedules.length + 1),
          this.priceDetail = Array(this.trainSchedules.length + 1)  
        );
      }
    )

    this.serverNotifyService.listen("train").subscribe(msg => {
      alert("New Train Has Occured!")
      if(this.notifyMessage != "") {
        this.notifyMessage = msg;
      }
    })

  }

  initFilterClass() {
    for(let i = 0; i < this.trainClasses.length ; i++) {
      this.filterTrainClasses[i] = false;
    }
  }

  initFilterNames() {
    for(let i = 0 ; i < this.trainNames.length ; i++) {
      this.filterTrainNames[i] = false;
    }
  }

  btnChangeClick() {
    this.onFocus = true;
  }

  showTripDetails(i: number) {
    this.tripDetail[i] = !this.tripDetail[i];
  }
  showPriceDetails(i : number) {
    this.priceDetail[i] = !this.priceDetail[i];
  }

  ngOnDestroy() {
    if(this.trainSchedule$ != undefined) {
      this.trainSchedule$.unsubscribe()
    }
  }

  getClicked() {
    this.onFocus = !this.onFocus;
  }

  getPrice(item : TrainSchedule) {

    let adultPrice = item.TrainClass.TrainClassAdultPrice
    let infantPrice = item.TrainClass.TrainClassInfantPrice
    let basePrice = item.Train.TrainBasePrice

    let totalAdultPrice = basePrice + this.nAdult * adultPrice;
    if(this.nInfant == 0) {
      return totalAdultPrice;
    }
    let totalInfantPrice = basePrice + this.nInfant * infantPrice;
    let totalPrice = totalAdultPrice + totalInfantPrice;

    return totalPrice;
  }

  getAdultPrice(item : TrainSchedule) {
    let adultPrice = item.TrainClass.TrainClassAdultPrice
    let basePrice = item.Train.TrainBasePrice

    let totalAdultPrice = basePrice + this.nAdult * adultPrice;

    return totalAdultPrice;
  }

  getInfantPrice(item : TrainSchedule) {
    let infantPrice = item.TrainClass.TrainClassInfantPrice
    let basePrice = item.Train.TrainBasePrice

    let totalInfantPrice = basePrice + this.nInfant * infantPrice;

    return totalInfantPrice;
  }

  sendItem(schedule : TrainSchedule) {
    UserStorageService.setCurrentTransaction(schedule.TrainScheduleId);
    this.router.navigate(["/checkout"])
  }

  showTripDetail(i : number) {
    this.tripDetail[i] = true;
    this.priceDetail[i] = false;
  }

  showPriceDetail(i : number) {
    this.priceDetail[i] = true;
    this.tripDetail[i] = false;
  }

  
 
}
