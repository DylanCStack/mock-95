import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenubarComponent } from '../menubar/menubar.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.css']
})
export class PaintComponent implements OnInit {
  @Input() data;
  movable;
  localdata;
  mouseX;
  mouseY;
  style;

  color = "#000000";

  canvas;
  ctx;

  getX(){
    return this.localdata.posx;
  }
  getY(){
    return this.localdata.posy;
  }

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.localdata = this.data;
    console.log(this.localdata);

    this.mouseX = this.localdata.xpos;
    this.mouseY = this.localdata.ypos;
    this.style = {
      "position":"absolute",
      "top": this.getY(),
      "left": this.getX()
    };
    console.log(this.style);
  }
  drawing;
  colorChange(color){
    this.color = color;
  }
  canDraw(bool){
    this.drawing = bool;
  }
  draw(e){
    if(this.drawing){
      var rect = this.canvas.getBoundingClientRect();
      let x = Math.floor(e.pageX - rect.left);
      let y = Math.floor(e.pageY - rect.top);
      console.log(x)
      console.log(y)
      console.log(this.color)
      this.ctx.beginPath();
      this.ctx.fillStyle=this.color;
      this.ctx.arc(x,y,10,0,2*Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    }
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
      console.log(temp)
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
