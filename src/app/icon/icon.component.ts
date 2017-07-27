import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() data;
  // @Output() AppOpener = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // OpenNotes(type){
  //   this.AppOpener.emit(type)
  // }
}
