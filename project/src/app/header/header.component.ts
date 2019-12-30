import { User } from './../auth/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  user: User;
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
