import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() start = new EventEmitter<number>();
  ref;
  i = 0;
  constructor() {}

  ngOnInit() {}
  onStart() {
    this.ref = setInterval(() => {
      this.i++;
      this.start.emit(this.i);
    }, 1000);
  }
  onStop() {
    clearInterval(this.ref);
  }
}
