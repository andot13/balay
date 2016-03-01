import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';

@Component({
    selector: 'my-app',
    template: `
      <ul>
        <li><a href="" [routerLink]="['Dashboard']">Dashboard</a></li>
        <li><a href="" [routerLink]="['Profile']">Profile</a></li>
      </ul>
      <div class="main">
        <router-outlet></router-outlet>
      </div>
    `,
    directives: [
      ROUTER_DIRECTIVES
    ],
    providers: [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS
    ]
})
@RouteConfig([
  { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
  { path: '/profile', name: 'Profile', component: ProfileComponent }
])

export class AppComponent implements OnInit{ 

  ngOnInit() {
    this.name = 'Andy';
  }
}
