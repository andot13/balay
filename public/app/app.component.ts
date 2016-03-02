import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [
      ROUTER_DIRECTIVES
    ],
    providers: [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS
    ]
})
@RouteConfig([
  { path: '/account', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
  { path: '/profile', name: 'Profile', component: ProfileComponent }
])

export class AppComponent implements OnInit{ 
  active:number = 0;

  ngOnInit() {
    this.name = 'Andy';
  }
}
