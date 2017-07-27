import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
