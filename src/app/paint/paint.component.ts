import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
