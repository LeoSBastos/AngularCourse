import { UsersService } from './users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private usersService: UsersService) {}
  activeUsers = this.usersService.activeUsers;
  inactiveUsers = this.usersService.inactiveUsers;
}
