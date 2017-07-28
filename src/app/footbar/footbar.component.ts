import { Component, OnInit } from '@angular/core';
import { MiniComponent } from '../mini/mini.component';

@Component({
  selector: 'footbar',
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.css']
})
export class FootbarComponent implements OnInit {
  time;
  constructor() { }

  ngOnInit() {
    setTimeout(()=> {
      this.timer()
    }, 500);
  }


  timer() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();

    var hours = "";
    var minutes = "";
    var ToD = "";

    if(m<10){minutes = "0"+m} else {minutes+=m}
    if(h>12){ToD="PM"} else {ToD="AM"}
    hours+=h%12;

    this.time = h + ":" + m + ToD;
  }

}
