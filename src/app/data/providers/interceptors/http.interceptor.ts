import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { isDefined } from 'src/app/utils/utils';
import { AuthStore } from 'src/app/presentation/+store/global/auth/auth.store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authStore: AuthStore
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const authUser = this.authStore.getAuthorizedUser;

    if (isDefined(authUser) && isDefined(authUser.accessToken)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authUser.accessToken}`
        }
      });
    }

    if (environment.forTestPurpose) {
      console.log('INTERCEPT > ', request);
    }

    return timer(500) // <== Wait
      .pipe(
        switchMap( // <== Switch to the Http Stream
          () => next.handle(request)
        )
      );
  }
}
