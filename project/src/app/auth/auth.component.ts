import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    console.log(authObs);
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorRes => {
        console.log(errorRes);
        this.error = errorRes;
        this.showErrorAlert(errorRes);
        this.isLoading = false;
      }
    );
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // const alertComp = new AlertComponent();
    const alertCmpFac = this.cfr.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const alertCmp = hostViewContainerRef.createComponent(alertCmpFac);
    alertCmp.instance.message = message;
    this.closeSub = alertCmp.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
