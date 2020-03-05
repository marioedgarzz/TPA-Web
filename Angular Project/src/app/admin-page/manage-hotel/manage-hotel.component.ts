import { Component, OnInit } from '@angular/core';;
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HotelService } from 'src/app/services/hotels/hotel.service';
import { HotelAreas, Hotels, HotelCategories, HotelFacilities, HotelFacilitiesLists } from 'src/app/models/hotels';
import { ManageHotelUpdateComponent } from '../manage-hotel-update/manage-hotel-update.component';
import { ManageHotelDeleteComponent } from '../manage-hotel-delete/manage-hotel-delete.component';
import { ServerNotifyService } from 'src/app/services/chats/server-notify.service';

@Component({
  selector: 'app-manage-hotel',
  templateUrl: './manage-hotel.component.html',
  styleUrls: ['./manage-hotel.component.scss']
})
export class ManageHotelComponent implements OnInit {

  constructor(private hotelService : HotelService, 
    private dialog : MatDialog,
    private serverService : ServerNotifyService) { }

  hotelList : HotelFacilitiesLists[];
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

  // slctHotelList : string = "";
  // trainTimeFrom : string = "";
  // trainTimeTo : string = "";
  // slctTrainType : string = "";
  errorMsg : string = "";
  currPage : number = 1;
  filters : string = "All";
  ngOnInit() {
    
    this.hotelService.getAllHotels().subscribe(
      async result => {
        await (this.assignHotelResult(result));
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

    this.hotelService.getAllArea().subscribe(
      async result => {
        await (this.hotelArea = result),
        console.log(this.hotelArea)
      }
    )
  }

  assignHotelResult(result : HotelFacilitiesLists[]) {
    var newResult : HotelFacilitiesLists[] = Array(result.length);

    result.sort((a,b) => (a.Hotel.HotelId < b.Hotel.HotelId)? -1:1)
    let idx = 0;
    let currId = result[0].Hotel.HotelId;
    let currSize = 0;
    newResult[0] = result[0];
    for(let i = 0 ; i < result.length ; i++) {
      console.log(result[i].Hotel.HotelId)
      if(result[i].Hotel.HotelId == currId) {
        if(newResult[idx].HotelFacilityList == undefined) {
          newResult[idx].HotelFacilityList = Array(result.length);
        }
        newResult[idx].HotelFacilityList[currSize++] = result[i].HotelFacility
      }
      else {
        console.log("new")
        newResult[idx].HotelFacilityList.length = currSize;
        newResult[++idx] = result[i];
        newResult[idx].HotelFacilityList = Array(result.length);
        newResult[idx].HotelFacilityList[0] = result[i].HotelFacility
        currId = result[i].Hotel.HotelId;
        currSize = 1;
      }
    }

    newResult[idx].HotelFacilityList.length = currSize;
    
    newResult.length = idx + 1;

    this.hotelList = newResult;
  }

  insert() {
    console.log(this.blCheckHotelFacility)

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
          await this.check(result)
        }
      )
    }
  }

  check(result : any) {
    if(result.data.insertNewHotel == null) {
      alert("Insert Failed");
    }
    else {
      alert("Insert success!");
        this.serverService.emit('hotel',"New Hotel Has Occured!");
        location.reload()
    }
  }

  update(item : HotelFacilitiesLists) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "90%";
    config.maxHeight = "800px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      hotel : JSON.stringify(item)
    }
    this.dialog.open(ManageHotelUpdateComponent,config);
  }

  delete(item : HotelFacilitiesLists) {
    var config : MatDialogConfig = new MatDialogConfig()
    config.width = "50%";
    config.height = "60%";
    config.maxHeight = "600px";
    config.minWidth = "370px";
    config.maxWidth = "800px";
    config.backdropClass="backdropColor";
    config.panelClass="panelColor";
    config.data = {
      hotel : JSON.stringify(item)
    }
    this.dialog.open(ManageHotelDeleteComponent,config);
  }

  previous() {
    if(this.currPage == 1) {
      return;
    }
    this.currPage -= 1;
  }

  next() {
    let maxPage = (this.hotelList.length / 10) + 1; 
    maxPage = Math.floor(maxPage)
    if(this.currPage < maxPage) {
      this.currPage += 1;
    }
  }

  getCan(i : number) {
    return i > ((this.currPage-1) * 10) && i < (this.currPage*10);
  }

}
