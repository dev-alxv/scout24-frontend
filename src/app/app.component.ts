import { AfterViewInit, Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UiStateService } from './presentation/+store/+services/ui-state/ui-state.service';
import { AuthService } from './presentation/+store/+services/auth/auth.service';
import { AuthStore } from './presentation/+store/global/auth/auth.store';
import { TourService } from './presentation/+store/+services/tour/tour.service';
import { ExposeService } from './presentation/+store/+services/expose/expose.service';
import { AuthenticationState } from './presentation/+store/global/auth/auth.state';
import { UserService } from './presentation/+store/+services/user/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  public title = 'ImmobilienScout24';

  constructor(
    private uiStateService: UiStateService,
    private authService: AuthService,
    private autStore: AuthStore,
    private userService: UserService,
    private tourService: TourService,
    private exposeService: ExposeService
  ) { }

  public ngOnInit(): void {
    this.authService.init();
    this.observeAuthenticationState();
  }

  public ngAfterViewInit(): void {
    this.uiStateService.init();
  }

  private observeAuthenticationState(): void {
    this.autStore.stateStream$
      .pipe(first())
      .subscribe({
        next: (state: AuthenticationState) => this.handleAuthenticationState(state)
      });
  }

  private handleAuthenticationState(state: AuthenticationState): void {
    if (state.haveToken) {
      this.userService.init();
      this.tourService.init();
      this.exposeService.init();
    }
  }

}
