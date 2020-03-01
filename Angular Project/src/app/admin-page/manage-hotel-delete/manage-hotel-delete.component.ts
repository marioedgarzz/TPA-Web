import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotelService } from 'src/app/services/hotels/hotel.service';
import { HotelFacilitiesLists } from 'src/app/models/hotels';

@Component({
  selector: 'app-manage-hotel-delete',
  templateUrl: './manage-hotel-delete.component.html',
  styleUrls: ['./manage-hotel-delete.component.scss']
})
export class ManageHotelDeleteComponent implements OnInit {

  constructor(private MatRef : MatDialogRef<ManageHotelDeleteComponent>,
    private hotelService : HotelService,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  private hotel : HotelFacilitiesLists;

  

  ngOnInit() {
    this.hotel = JSON.parse(this.data.hotel)


  }

  yes() {
    this.hotelService.deleteHotel(this.hotel.Hotel.HotelId).subscribe(
      async result => {
        await (alert("Delete Success!"), window.location.reload());
      }
    )
  }

  no() {
    this.MatRef.close();
  }

}
