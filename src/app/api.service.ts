import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {
  user;
  files;
  http:Http;


  constructor() {
    this.user = this.getUser();
    this.files = this.getFiles();
  }


  getUser(){

    return {
      username: "Dylan"
    }
  }
  getFiles(){
    
  }
  // getFiles(){
  //   return this.files = [
  //     {
  //       type:"note",
  //       filename:"note1",
  //       exe: false,
  //       bodytext: "sample body text for a note"
  //     },
  //     {
  //       type:"note",
  //       filename:"note2",
  //       exe: false,
  //       bodytext: "sample body text for a note"
  //     },
  //     {
  //       type:"note",
  //       filename:"note3",
  //       exe: false,
  //       bodytext: "sample body text for a note"
  //     },
  //     {
  //       type:"paint",
  //       filename:"paint project1",
  //       exe: false
  //     },{
  //       type:"paint",
  //       filename:"paint project2",
  //       exe: false
  //     },
  //   ];
  // }
}
