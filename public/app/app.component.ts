import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@Component({
    selector: 'my-app',
    template: `
      <sidebar></sidebar>
      <div class="main">
        <router-outlet></router-outlet>
        <span [class.is-awesome]="inputElement.value === 'yes' ">it's awesome </span>
        Is it awesome?
        <input type="text" #inputElement (keyup)="0">
        <button [disabled]="!inputElement.value.length">Submit</button>
      </div>
    `,
    styleUrls: ['../stylesheets/test.css'],
    directives: [
      SidebarComponent,
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
