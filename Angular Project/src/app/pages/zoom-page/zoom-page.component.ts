import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.scss']
})
export class ZoomPageComponent implements OnInit {

  constructor(private dialog : MatDialogRef<ZoomPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) { }

  img : string;

  ngOnInit() {
    this.img = this.data.img
  }

}
