import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {DashboardComponent} from '../dashboard/dashboard.component';
import {ProfileComponent} from '../profile.component';

@Component({
  selector: 'sidebar',
  templateUrl: 'app/sidebar/sidebar.component.html', 
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS
  ]
})
@RouteConfig([
  { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
  { path: '/profile', name: 'Profile', component: ProfileComponent }
])
export class SidebarComponent{}
