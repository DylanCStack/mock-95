import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  @Output() newInstance = new EventEmitter();
  @Output() openFile = new EventEmitter();
  @Output() saveInstance = new EventEmitter();
  @Output() saveNewInstance = new EventEmitter();
  @Output() deleteFile = new EventEmitter();
  @Output() closeApp = new EventEmitter();

  constructor() { }
  selectedOption;

  options = [
    "New",
    "Open",
    "Save",
    "Save as",
    "Delete",
    "Exit"
  ];

  defaultOptions = this.options;

  ngOnInit() {

  }

  FileMenu(){
    if(this.selectedOption === "New"){
      this.newInstance.emit();
    } else if(this.selectedOption === "Open"){
      this.openFile.emit();
    } else if(this.selectedOption === "Save"){
      this.saveInstance.emit();
    } else if(this.selectedOption === "Save as"){
      this.saveNewInstance.emit();
    } else if(this.selectedOption === "Exit"){
      this.closeApp.emit();
    } else if(this.selectedOption === "Delete"){
      this.deleteFile.emit();
    }
    console.log(this.selectedOption);

    this.options = [];
    this.options = this.defaultOptions;
  }

  Exit(){
    this.closeApp.emit();
  }
  Minimize(){
    // this.minimizeApp.emit();
  }

  //onchange for select to change display back to "file" and to call the required functions
}
