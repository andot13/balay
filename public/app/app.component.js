System.register(['angular2/core', 'angular2/http', 'angular2/router', './dashboard.component', './profile.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, dashboard_component_1, profile_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.name = 'Andy';
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n      <h1>My {{name}} <span [class.is-awesome]=\"inputElement.value === 'yes' \">it's awesome </span></h1>\n      <ul>\n        <li><a [routerLink]=\"['Dashboard']\" href=\"\">Dashboard</a></li>\n        <li><a [routerLink]=\"['Profile']\" href=\"\">Profile</a></li>\n      </ul>\n      <br>\n      Is it awesome?\n      <input type=\"text\" #inputElement (keyup)=\"0\">\n      <button [disabled]=\"!inputElement.value.length\">Submit</button>\n      <router-outlet></router-outlet>\n    ",
                        styleUrls: ['../stylesheets/test.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            router_1.ROUTER_PROVIDERS
                        ]
                    }),
                    router_1.RouteConfig([
                        { path: '/dashboard', name: 'Dashboard', component: dashboard_component_1.DashboardComponent, useAsDefault: true },
                        { path: '/profile', name: 'Profile', component: profile_component_1.ProfileComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map