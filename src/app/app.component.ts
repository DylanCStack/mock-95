import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IconComponent } from './icon/icon.component';
import { PaintComponent } from './paint/paint.component';
import { NoteComponent } from './note/note.component';
import { FootbarComponent } from './footbar/footbar.component';
import { ExeComponent } from './exe/exe.component';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {

  title = 'app works!';
  executables = [
    {
      type:"note",
      exe: true
    },{
      type:"paint",
      exe: true
    }, {
      type:"game",
      exe:true
    }
  ]
  files = [];
  // files = [{
  //   bodytext:"bodytext here boiii",
  //   filename:"something",
  //   id:2,
  //   posx:10,
  //   posy:10,
  //   uid:2
  // }];
  user;
  notes = [];
  paint  = null;
  game = null;
  constructor(private apiService: ApiService, private request:Http){
  }

  ngOnInit(){
    console.log(this.files);
    this.request.get("https://desktopsim-server.herokuapp.com/users/getFiles" ).subscribe(
      files => {
        this.files = files.json().files;
        console.log(this.files);
    });
    // this.files = this.apiService.getFiles();
    this.user = this.apiService.getUser();//if user is empty show login/guest screen


    // apiService.getFiles().subscribe((response)=>{
    //   if(!response.error){
    //     this.files.push(response.files);
    //   }
    // })
  }
  LaunchApp(data){
    if(data.type === "note"){
      this.notes.push({
        filename:"untitled document",
        bodytext:"",
        posx: 100,
        posy: 100
      })
    } else if (data.type==="paint"){
      this.paint ={
          // uid: data.uid,
          // id: data.id,
          filename: "untitled image",
          // bodytext: data.bodytext,
          posx: 100,
          posy: 100

      };
    } else if (data.type ==="game"){
      this.game = true;
    }
  }

  OpenApp(data){
    console.log(data.filename)
    console.log(data.bodytext)
    if(data.bodytext){
      this.notes.push({
        uid: data.uid,
        id: data.id,
        filename: data.filename,
        bodytext: data.bodytext,
        posx: data.posx,
        posy: data.posy
      })
    } else if (data.url){
      if(this.paint){
        if(!confirm("Unsaved changes will be lost.")){
          return null;
        }
      }
      this.paint ={
          // uid: data.uid,
          // id: data.id,
          filename: data.filename,
          // bodytext: data.bodytext,
          posx: 100,
          posy: 100

      };
    }
  }
  getPositionX(){
    return 50;
  }
  getPositionY(){
    return 50;
  }

  newInstanceNote(data){
    this.notes.push({
      filename:"untitled document",
      bodytext:""
    })
  }
  openFileNote(data){
    //open form to open from local files
  }
  saveInstanceNote(data){
    if(data.filename ==="untitled document"){
      if(data.bodytext){
        this.request.post("https://desktopsim-server.herokuapp.com/notes/Save", {
          uid: data.uid,
          id: data.id,
          filename: data.filename,
          bodytext: data.bodytext,
          posx: data.posx,
          posy: data.posy
        } ).subscribe(
          response => {
            let status = response.json()
            console.log(status);
          });
        } else {
          alert("You cannot save an empty document");
        }
    } else {
      this.saveNewInstaneNote(data)
    }
  }
  saveNewInstaneNote(data){
    if(data.bodytext){
      let name = prompt("Save as:");
      if(name){
        this.request.post("https://desktopsim-server.herokuapp.com/notes/SaveNew", {
          filename: name,
          bodytext: data.bodytext,
          posx: this.getPositionX(),
          posy: this.getPositionY()
        } ).subscribe(
          response => {
            let status = response.json()
            console.log(status);
            this.ngOnInit();
          });
        }
    } else {
      alert("You cannot save an empty document.")
    }
  }

  deleteFileNote(data){
    console.log(data.id)
    if(confirm("Are you sure you want to delete this file")){
      this.request.post("https://desktopsim-server.herokuapp.com/notes/delete", {
        uid: data.uid,
        id: data.id,
        filename: name,
        bodytext: data.bodytext,
        posx: this.getPositionX(),
        posy: this.getPositionY()
      } ).subscribe(
        response => {
          let status = response.json()
          console.log(status);
          this.closeAppNote(data)
          this.ngOnInit();
        });
    }
  }

  closeAppNote(data){
    this.notes = this.notes.filter(function(note){
      return note.filename !== data.filename;
    })
  }
  closeAppPaint(data){
    this.paint = null;
  }
  closeAppGame(data){
    this.game = null;
  }
}
