import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from './../auth/user.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import * as AuthActions from '../auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  user: User;
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}
  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }
  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }
  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
