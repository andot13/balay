System.register(['angular2/core', './create-listing.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, create_listing_component_1;
    var AccountListingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (create_listing_component_1_1) {
                create_listing_component_1 = create_listing_component_1_1;
            }],
        execute: function() {
            AccountListingsComponent = (function () {
                function AccountListingsComponent() {
                    this.listingItems = new Array();
                }
                // listingItems = [
                //   {name: 'Test', bedroom: 1},
                //   {name: 'Test', bedroom: 1},
                //   {name: 'Test', bedroom: 1},
                //   {name: 'Test', bedroom: 1}
                // ];
                AccountListingsComponent.prototype.onListingAdded = function (listing) {
                    this.listingItems.push({ name: listing.name, bedroom: listing.bedroom });
                };
                AccountListingsComponent = __decorate([
                    core_1.Component({
                        selector: 'account-listings',
                        directives: [create_listing_component_1.CreateListingComponent],
                        template: "\n  <section>\n    <create-listing (listAdded)=\"onListingAdded($event)\"></create-listing>\n  </section>\n  <section>\n    <h2>This are you listings</h2>\n    <ul>\n      <li *ngFor=\"#listItem of listingItems\">\n        {{ listItem.name }}\n      </li>\n    </ul>\n  </section>\n  <section>\n    Edit item\n  </section>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AccountListingsComponent);
                return AccountListingsComponent;
            })();
            exports_1("AccountListingsComponent", AccountListingsComponent);
        }
    }
});
//# sourceMappingURL=listings.component.js.map