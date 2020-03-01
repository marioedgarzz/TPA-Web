import { Component, OnInit } from '@angular/core';
import { CarRentalService } from 'src/app/services/car-rentals/car-rental.service';
import { CarFromVendors, CarTransfer } from 'src/app/models/car-rental';
import { Subscription } from 'rxjs';
import { CarTransactionService } from 'src/app/services/transactions/car-transaction.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit {

  constructor(private carService : CarRentalService, 
    private carTransactionService : CarTransactionService,
    private router : Router) { }

  private carTransfer : CarTransfer;
  private carDetails : CarFromVendors[];
  private carDetail$ : Subscription;
  ngOnInit() {
    this.carTransfer = JSON.parse(localStorage.getItem("CarRentalTransfer"));

    if(CarRentalService.getCurrentDetail() != 0) {
      let id = CarRentalService.getCurrentDetail();
      this.carDetail$ = this.carService.getCarByFromVendorId(id).subscribe(
        async result => {
          await (this.carDetails = result)
        }
      )
      // console.log("Something")
      // console.log(CarRentalService.getCurrentDetail())
    }
  }

  ngOnDestroy() {
    if(this.carDetail$ != undefined)
      this.carDetail$.unsubscribe();
  }

  getSize() {
    return this.carDetails.length;
  }

  orderItem(car : CarFromVendors) {
    let carFromVendorId = car.CarFromVendorId;
    let userId = UserStorageService.getCurrentUserId();
    if(userId == 0) {
      alert("You must login first!")
      return;
    }
    var currDate : string = new Date().toLocaleDateString();
    console.log(currDate);
    this.carTransactionService.createNewCarTransaction(carFromVendorId,userId, currDate).subscribe(
      async result => {
        console.log(result)
        await ( 
          alert("Car Transaction Success!"),
          this.router.navigate(["/"])
          )
      }
    )
  }

}
