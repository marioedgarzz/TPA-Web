import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotelService } from 'src/app/services/hotels/hotel.service';
import { HotelFacilitiesLists, HotelAreas, HotelCategories, HotelFacilities } from 'src/app/models/hotels';

@Component({
  selector: 'app-manage-hotel-update',
  templateUrl: './manage-hotel-update.component.html',
  styleUrls: ['./manage-hotel-update.component.scss']
})
export class ManageHotelUpdateComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageHotelUpdateComponent>,
    private hotelService : HotelService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  hotel : HotelFacilitiesLists;
  hotelArea : HotelAreas[];
  hotelCategories : HotelCategories[]
  hotelFacilities : HotelFacilities[]
  
  htlName : string = "";
  htlImage : string = ""
  slctLocation : string = ""
  htlRating : string = "";
  htlAddress : string = "";
  blCheckHotelFacility : boolean[] = [false,false,false,false,false,false,false,false,false,false];
  slctRoomType : string = "";
  htlInfo : string = "";
  chckHotelFacility(num : number) {
    this.blCheckHotelFacility[num] = !this.blCheckHotelFacility[num];
  }
  
  errorMsg : string = "";
  
  ngOnInit() {
    this.hotel = JSON.parse(this.data.hotel)

    this.hotelService.getAllArea().subscribe(
      async result => {
        await (this.hotelArea = result),
        console.log(this.hotelArea)
      }
    )
    this.hotelService.getAllFacilities().subscribe(
      async result => {
        await (this.hotelFacilities = result);
      }
    )

    this.hotelService.getAllHotelCategories().subscribe(
      async result => {
        await (this.hotelCategories = result,
          this.slctRoomType = result[0].HotelCategoryName);
      }
    )

    // this.trainService.getAllClasses().subscribe(
    //   async result => {
    //     await (this.trainClassList = result,
    //       this.slctType = this.trainClassList[0].TrainClassName);
    //   }
    // )
  }

  update() {
    if(this.htlName == "") {
      this.errorMsg = "Hotel Name must be filled"
    }
    else if(this.htlImage == "") {
      this.errorMsg = "Image must be filled"
    }
    else if(this.slctLocation == "") {
      this.errorMsg = "Choose a location!"
    }
    else if(this.htlRating == "") {
      this.errorMsg = "Rating must be filled"
    }
    else if(this.htlAddress == "") {
      this.errorMsg = "Address must be filled"
    }
    else if(this.blCheckHotelFacility.includes(true) == false) {
      this.errorMsg = "At least one facility should be choosed";
    }
    else {

      var facilities : number[] = Array(11)
      var idx = 0;
      for(let i = 0 ; i < this.hotelFacilities.length ; i++) {
        if(this.blCheckHotelFacility[i] == true) {
          facilities[idx++] = i+1;
        }
      }
      facilities.length = idx;

      this.hotelService.insertNewHotel(this.htlName,this.htlImage,this.slctLocation,parseFloat(this.htlRating),
      this.htlAddress,facilities,this.slctRoomType,this.htlInfo).subscribe(
        async result => {
          await (alert("Update success!"), location.reload())
        }
      )
    }
  }

}
