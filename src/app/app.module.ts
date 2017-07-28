import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { IconComponent } from './icon/icon.component';
import { NoteComponent } from './note/note.component';
import { PaintComponent } from './paint/paint.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FootbarComponent } from './footbar/footbar.component';
import { ExeComponent } from './exe/exe.component';
import { MiniComponent } from './mini/mini.component';
import { MinesweeperComponent } from './minesweeper/minesweeper.component';



@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    NoteComponent,
    PaintComponent,
    MenubarComponent,
    FootbarComponent,
    ExeComponent,
    MiniComponent,
    MinesweeperComponent
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
