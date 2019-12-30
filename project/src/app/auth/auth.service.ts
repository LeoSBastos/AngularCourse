import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbm31HD821vjOAj9VCs5by9BwXI3TMTsM',
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(errorRes => {
          let error = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
          } else {
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
            }
            return throwError(error);
          }
        })
      );
  }

  login(email: string, password: string) {
    this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbm31HD821vjOAj9VCs5by9BwXI3TMTsM',
      { email, password, returnSecureToken: true }
    );
  }
}
