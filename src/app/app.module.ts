import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader-interceptor.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteGuardGuard } from './route-guard.guard';
import { StopRouteGuard } from './stop-route.guard';
import { StoploginGuard } from './stoplogin.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { AuthService } from './auth.service';
import { AppService } from './app.service';
import { LoginComponent } from './login/login.component';
import { HoverDirective } from './hover.directive';
import { ErrorComponent } from './error/error.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FooterOnlyComponent } from './footer-only/footer-only.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoaderComponent,
    DashboardComponent,
    LoginComponent,
    HoverDirective,
    ErrorComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    FooterOnlyComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    /*RouterModule.forRoot([
      { path: 'registration', component: FooterOnlyComponent, children: [{ path: '', component: RegistrationComponent }],
        pathMatch: 'full', canActivate: [StopRouteGuard],
        canDeactivate: [CanDeactivateGuard] },
      { path: 'login', component: LoginComponent, pathMatch: 'full', canDeactivate: [CanDeactivateGuard],
        canActivate: [StopRouteGuard] },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full',
        canActivate: [RouteGuardGuard] },
      { path: 'edit', component: EditComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
      { path: '*', component: RegistrationComponent },
      { path: '**', component: RegistrationComponent }
    ]),*/
    RouterModule.forChild([
      {
        path: 'registration',
        component: FooterOnlyComponent,
        children: [
          { path: '', component: RegistrationComponent },
          /*{ path: '', redirectTo: 'registration', pathMatch: 'full' },*/
          { path: '*', component: RegistrationComponent },
          { path: '**', component: RegistrationComponent }
        ],
        pathMatch: 'full', canActivate: [StopRouteGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'login',
        component: FooterOnlyComponent,
        children: [
          {
            path: '',
            component: LoginComponent
          }
        ],
        pathMatch: 'full',
        canDeactivate: [CanDeactivateGuard],
        canActivate: [StopRouteGuard]
      },
      {
        path: 'dashboard',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            component: DashboardComponent
          }
        ],
        pathMatch: 'full',
        canActivate: [RouteGuardGuard]
      },
      {
        path: 'edit',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            component: EditComponent
          }
        ],
        pathMatch: 'full'
      }
    ])
    // {enableTracing: true}),
  ],
  providers: [
    RouteGuardGuard,
    StopRouteGuard,
    StoploginGuard,
    CanDeactivateGuard,
    AppService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
