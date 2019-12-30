import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  constructor() {}
  isAuthenticated() {
    const promise = new Promise((res, err) => {
      setTimeout(() => {
        res(this.loggedIn);
      }, 800);
    });
    return promise;
  }
  login() {
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
  }
}
