import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {DashboardComponent} from './dashboard.component';
import {ProfileComponent} from './profile.component';

@Component({
    selector: 'my-app',
    template: `
      <h1>My {{name}} <span [class.is-awesome]="inputElement.value === 'yes' ">it's awesome </span></h1>
      <ul>
        <li><a [routerLink]="['Dashboard']" href="">Dashboard</a></li>
        <li><a [routerLink]="['Profile']" href="">Profile</a></li>
      </ul>
      <br>
      Is it awesome?
      <input type="text" #inputElement (keyup)="0">
      <button [disabled]="!inputElement.value.length">Submit</button>
      <router-outlet></router-outlet>
    `,
    styleUrls: ['../stylesheets/test.css'],
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
