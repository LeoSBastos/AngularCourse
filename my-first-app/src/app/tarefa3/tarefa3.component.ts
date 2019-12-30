import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarefa3',
  templateUrl: './tarefa3.component.html',
  styles: [
    `
      .white {
        color: white;
      }
    `
  ]
})
export class Tarefa3Component implements OnInit {
  displayed = false;
  i = 0;
  arr = [];
  toggleDisplay() {
    this.displayed = !this.displayed;
    this.i++;
    this.arr.push(new Date());
    console.log(this.arr);
  }

  constructor() {}

  ngOnInit() {}
}
