import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { environment } from './../../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect() authSignup = this.actions$.pipe(ofType());

  @Effect() authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(resData => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate
            });
          }),
          catchError(errorRes => {
            let error = 'An unknown error occurred!';
            if (errorRes.error?.error) {
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  error =
                    'The email address is already in use by another account.';
                  break;
                case 'OPERATION_NOT_ALLOWED':
                  error = 'Password sign-in is disabled for this project.';
                  break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                  error =
                    'We have blocked all requests from this device due to unusual activity. Try again later.';
                  break;
                case 'EMAIL_NOT_FOUND':
                  error =
                    'There is no user record corresponding to this identifier. The user may have been deleted.';
                  break;
                case 'INVALID_PASSWORD':
                  error =
                    'The password is invalid or the user does not have a password.';
                  break;
                case 'USER_DISABLED':
                  error =
                    'The user account has been disabled by an administrator.';
                  break;
              }
              return of(new AuthActions.LoginFail(error));
            }
          })
        );
    })
  );

  @Effect({ dispatch: false }) authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => this.router.navigate(['/']))
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) { }
}
