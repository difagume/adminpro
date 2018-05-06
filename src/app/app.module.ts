import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// ngx-progressbar
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

// Rutas
import { APP_ROUTES } from './app.routest';

// Servicios
import { ServiceModule } from './services/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';

// Manejo de errores
import { HttpInterceptorService } from './services/errors/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './services/errors/error-handler.service';
import { environment } from '../environments/environment';

// Service worker
import { ServiceWorkerModule } from '@angular/service-worker';

// Social login
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, } from 'angular5-social-login';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('216202075637279')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('458229930749-sr6sma82ppdcr8546mn3qtilsuqbb7a7.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ServiceModule,
    SharedModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    SocialLoginModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
