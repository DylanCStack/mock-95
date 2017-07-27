import { Component } from '@angular/core';
import { IconComponent } from './icon/icon.component';
import { PaintComponent } from './paint/paint.component';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  files = [
    {
      type:"note",
      filename:"This is a note"
    },
    {
      type:"note",
      filename:"This is a note"
    },
    {
      type:"note",
      filename:"This is a note"
    },
    {
      type:"paint",
      filename:"This is a paint project"
    },
  ];
  notes = [];
  paints = [];

  OpenApp(type){
    if(type === "note"){
      this.notes.push({
        filename:"untitled document",
        text:""
      })
    } else if (type === "paint"){
      this.paints.push({
        filename:"unnamed masterpiece",
      })
    }
  }
}
