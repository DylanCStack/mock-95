import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() data;
  @Output() AppOpener = new EventEmitter();

  localdata;


  OpenFile(){
    this.AppOpener.emit(this.data)
  }
  mouseX;
  mouseY;
  style;
  movable;
  getX(){
    return Math.random()*window.innerWidth;
  }
  getY(){
    return Math.random()*window.innerHeight;
  }
  constructor() {

  }

  ngOnInit() {
    this.localdata = this.data;
    this.style = {
      "position":"absolute",
      "top": this.getX(),
      "left": this.getY()
    };
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


    this.movable = bool;

  }
  move(e){
    if(this.movable){
      this.style.top = parseInt(this.style.top.substring(0,this.style.top.length-2));
      this.style.left = parseInt(this.style.left.substring(0,this.style.left.length-2));
      let xMove = this.mouseX - e.pageX;
      let yMove = this.mouseY - e.pageY;

      this.style.left-=xMove;
      this.style.top-=yMove;

      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }
  }
}
