import { Component, OnInit, DoCheck, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.css']
})
export class MinesweeperComponent implements OnInit {
  opponentId;
  opponent;

  movable;
  localdata;
  mouseX;
  mouseY;
  style;



  title = 'app works!';
  difficulty = "beginner";
  numRows:number = 10;
  numCols:number = 10;
  numBombs:number = null;
  rows = [];
  end:string = null;
  win:boolean = false;
  actualBombs: number = 0;
  score:number = 0;
  finalScore:number = 0;
  timerInterval;

  constructor(){}
  ngOnInit(){
    this.createBoard(this.difficulty);

    this.localdata = {
      filename:"Minesweeper",
      xpos:100,
      ypos:100
    };
    this.mouseX = this.localdata.xpos;
    this.mouseY = this.localdata.ypos;
    this.style = {
      "position":"absolute",
      "top": 100,
      "left": 100
    };
    console.log(this.style);
  }
  getX(){
    return this.localdata.posx;
  }
  getY(){
    return this.localdata.posy;
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
  updateDifficulty(difficulty){
    this.createBoard(difficulty);
  }
  createBoard(difficulty){
    console.log(difficulty);
    if(this.timerInterval){
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.score = 0;
    this.finalScore = 0;
    this.actualBombs = 0;

    this.difficulty = difficulty;
    this.rows = [];
    this.end = "notOver";
    if(this.difficulty === "beginner"){
      this.numRows = 10;
      this.numCols = 10;
      this.numBombs = 10;
    } else if( this.difficulty === "intermediate"){
      this.numRows = 16;
      this.numCols = 16;
      this.numBombs = 40;
    } else if(this.difficulty === "expert"){
      this.numRows = 16;
      this.numCols = 31;
      this.numBombs = 99;
    }

    for(var y = 0; y<=this.numRows; y++){
      let cols = [];

      for(var x = 0; x<= this.numCols; x++){
        var bomb: boolean = false;

        if(Math.random() < (this.numBombs/(this.numRows*this.numCols))){
          bomb = true;
          this.actualBombs++;
        }

        var col = {
          bomb: bomb,
          number: 0,
          visable: false,
          class: "grey",
          x: x,
          y: y
        }

        cols.push(col);
      }
      this.rows.push(cols);
    }
    for(var y=0; y<this.rows.length; y++) {
      for(var x=0; x<this.rows[y].length; x++) {
        if(this.rows[y][x].bomb === false) {
          if( x > 0 && y > 0){
            if(this.rows[y-1][x-1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(x < this.rows[y].length-1 && y > 0){
            if(this.rows[y-1][x+1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(y < this.rows.length-1 && x > 0){
            if(this.rows[y+1][x-1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(y < this.rows.length-1 && x < this.rows[y].length-1){
            if(this.rows[y+1][x+1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if(x > 0){
            if(this.rows[y][x-1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if( y > 0){
            if(this.rows[y-1][x].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if (y < this.rows.length-1){
            if(this.rows[y+1][x].bomb === true) {
              this.rows[y][x].number++;
            }
          }
          if (x < this.rows[y].length-1){
            if(this.rows[y][x+1].bomb === true) {
              this.rows[y][x].number++;
            }
          }
        }
      }
    }
  }
  ifGameOver(){
    if(this.end!="notOver" || this.win){
      return true;
    } else {
      return false;
    }
  }

  checkTile(col){
    if(!this.timerInterval){
      this.timerInterval = setInterval(fat=>{
        this.score++;
      },1000);
    }

    if(col.class != "marked" && col.class != "question" && !this.ifGameOver()){
      col.visible = true;
      var classDict = {
        1:"one",
        2:"two",
        3:"three",
        4:"four",
        5:"five",
        6:"six",
        7:"seven",
        8:"eight"
      };
      if(col.bomb){
        col.class = "bomb";
        this.end ="end";

        for(var y = 0; y <= this.numRows; y++){
          for(var x = 0; x <= this.numCols; x++){
            if(this.rows[y][x].bomb && !this.rows[y][x].visable){
              this.rows[y][x].visable = true;
              this.rows[y][x].class = "bomb";
            }
          }
        }
        // this.checkAgainstOpponent();
        clearInterval(this.timerInterval);
        this.timerInterval = null;

      } else {
        col.class = classDict[col.number];
      }

      if(col.number === 0  && col.bomb === false){
        this.revealEmpty(col);
      }
      this.isGameWon();
    }


  }
  revealEmpty(col){
    if(col.bomb === false && col.visable === false){
      col.visable = true;

      if(col.x > 0){
        this.checkTile(this.rows[col.y][col.x-1]);

      }
      if(col.x < this.numRows){
        this.checkTile(this.rows[col.y][col.x+1]);

      }
      if(col.y < this.numCols){
        this.checkTile(this.rows[col.y+1][col.x]);

      }
      if(col.y > 0){
        this.checkTile(this.rows[col.y-1][col.x]);

      }
    }
  }
  isGameWon(){
    var bombs = 0;
    var marks = 0;

    for(var y = 0; y <= this.numRows; y++){
      for(var x = 0; x <= this.numCols; x++){
        if(this.rows[y][x].class==="grey"){
          break;
        }
        if(this.rows[y][x].bomb && this.rows[y][x].class==="marked"){
          marks++;
        }

      }
    }
    if(this.actualBombs === marks){
      this.win=true;
      this.finalScore = this.score;
      clearInterval(this.timerInterval);
      this.timerInterval = null;

      // this.checkAgainstOpponent();
    }
  }
  // checkAgainstOpponent(){
  //   if(this.opponent){
  //     if(this.finalScore < this.opponent.finalScore && this.end !="end"){
  //       alert("you beat " + this.opponent.initials);
  //     } else if(this.finalScore > this.opponent.finalScore){
  //       alert("you failed to beat your opponent: " + this.opponent.initials);
  //     } else {
  //       alert("You could not beat "+ this.opponent.initials+" Try again.")
  //     }
  //   }
  // }

  markTile(event, col) {
    event.preventDefault();
    if(!this.ifGameOver()){
      if(col.class==="question"){
        col.class="grey";
      } else if (col.class === "marked"){//event.button === 2 &&
        col.class = "question";
      } else if(col.class === "grey"){
        col.class = "marked";
      }
      this.isGameWon();

    }
  }



  ngDoCheck(){
    // this.createBoard();
  }
  // saveScore(scoreObj) {
  //   console.log(scoreObj);
  //   this.ScoreService.addScore(scoreObj);
  // }
}
