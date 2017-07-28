import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'exe',
  templateUrl: './exe.component.html',
  styleUrls: ['./exe.component.css']
})
export class ExeComponent implements OnInit {
  @Input() data;
  @Output() appLauncher = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  RunApp(data){
    this.appLauncher.emit(data);
  }
}
