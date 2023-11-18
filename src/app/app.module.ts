import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiCoreModule } from './presentation/shared/modules/ui-core/ui-core.module';
import { LayoutModule } from './presentation/layout/layout.module';
import { Services } from './presentation/shared/services';
import { DevTestModule } from './presentation/modules/dev-test/dev-test.module';
import { BaseHostModalDialogModule } from './presentation/shared/components/base-host-modal-dialog/base-host-modal-dialog.module';
import { HttpInterceptorService } from './data/providers/interceptors/http.interceptor';
import { ErrorInterceptor } from './data/providers/interceptors/error.interceptor';
import { UserRepo } from './domain/repository/user.repo';
import { TourRepo } from './domain/repository/tour.repo';
import { ExposeRepo } from './domain/repository/expose.repo';
import { UserRepoService } from './data/repos-services/user/user-repo.service';
import { TourRepoService } from './data/repos-services/tour/tour-repo.service';
import { ExposeRepoService } from './data/repos-services/expose/expose-repo.service';
import { UsecaseServices } from './domain/usecase-services';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),

    // UI core
    UiCoreModule,

    // Global
    BaseHostModalDialogModule,

    // Core "singleton" modules (not feature modules)
    LayoutModule,

    // DEV TESTING
    DevTestModule,

    // App routing - should be the last import!
    AppRoutingModule
  ],
  providers: [
    UsecaseServices,

    // Core "singleton" services
    Services,

    // Material dialog
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: true, } },

    // INTERCEPTORS
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // ====
    // every services from repos-services should be import like this
    // use abstract class for (provide: ) and map it to the repo service (useClass: )
    // in this way you will use only abstract class everywhere in the app
    { provide: UserRepo, useClass: UserRepoService },
    { provide: TourRepo, useClass: TourRepoService },
    { provide: ExposeRepo, useClass: ExposeRepoService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/locales/app/', '.json');
}
