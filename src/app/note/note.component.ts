import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { MenubarComponent } from '../menubar/menubar.component';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() data;
  movable;
  localdata;
  mouseX;
  mouseY;
  style;
  getX(){
    return this.localdata.posx;
  }
  getY(){
    return this.localdata.posy;
  }

  constructor() { }

  ngOnInit() {
    this.localdata = this.data;
    this.mouseX = this.localdata.xpos;
    this.mouseY = this.localdata.ypos;
    this.style = {
      "width":"50%",
      "position":"absolute",
      "top": this.getY(),
      "left": this.getX()
    };
  }

  @Output() newInstanceEvent = new EventEmitter();
  @Output() openFileEvent = new EventEmitter();
  @Output() saveInstanceEvent = new EventEmitter();
  @Output() saveNewInstanceEvent = new EventEmitter();
  @Output() deleteFileEvent = new EventEmitter();
  @Output() closeAppEvent = new EventEmitter();

  newInstance(){
    this.newInstanceEvent.emit(this.localdata);
  }
  openFile(){
    this.openFileEvent.emit(this.localdata);
  }
  saveInstance(){
    this.saveInstanceEvent.emit(this.localdata);
  }
  saveNewInstance(){
    this.saveNewInstanceEvent.emit(this.localdata);
  }
  deleteFile(){
    console.log(this.localdata)
    this.deleteFileEvent.emit(this.localdata);
  }
  closeApp(){
    this.closeAppEvent.emit(this.localdata);
  }
  minimizeApp(){

  }

  getStyle(){
    let temp = this.style;
    if(!(typeof temp.top === "string")){
      temp.top += "px";
      temp.left += "px";
    }
    return temp;
  }

  canMove(bool, e){
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;

    console.log("Start/End: " + this.mouseX + " , " + this.mouseY);

    this.movable = bool;

  }
  move(e){
    if(this.movable){
      console.log("MOVE:" + this.mouseX + " , " + this.mouseY);
      this.style.top = parseInt(this.style.top.substring(0,this.style.top.length-2));
      this.style.left = parseInt(this.style.left.substring(0,this.style.left.length-2));
      console.log(this.style)
      let xMove = this.mouseX - e.pageX;
      let yMove = this.mouseY - e.pageY;

      this.style.left-=xMove;
      this.style.top-=yMove;

      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }
  }
}
