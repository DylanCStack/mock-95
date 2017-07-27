import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IconComponent } from './icon/icon.component';
import { NoteComponent } from './note/note.component';
import { PaintComponent } from './paint/paint.component';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    NoteComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
