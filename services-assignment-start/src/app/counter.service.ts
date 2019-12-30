import { UsersService } from './users.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  counter = 0;
  constructor(private usersService: UsersService) {
    this.usersService.userChange.subscribe(() => {
      this.counter++;
    });
  }
}
