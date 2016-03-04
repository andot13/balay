System.register(['angular2/core', './create-listing.component', './edit-listing.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, create_listing_component_1, edit_listing_component_1;
    var AccountListingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (create_listing_component_1_1) {
                create_listing_component_1 = create_listing_component_1_1;
            },
            function (edit_listing_component_1_1) {
                edit_listing_component_1 = edit_listing_component_1_1;
            }],
        execute: function() {
            AccountListingsComponent = (function () {
                function AccountListingsComponent() {
                    this.listingItems = new Array();
                }
                AccountListingsComponent.prototype.onListingAdded = function (listing) {
                    this.listingItems.push({ name: listing.name, bedroom: listing.bedroom });
                };
                AccountListingsComponent.prototype.onSelect = function (listing) {
                    this.selectedListing = listing;
                };
                AccountListingsComponent.prototype.onRemove = function (listing) {
                    this.listingItems.splice(this.listingItems.indexOf(listing), 1);
                    this.selectedListing = null;
                };
                AccountListingsComponent = __decorate([
                    core_1.Component({
                        selector: 'account-listings',
                        template: "\n  <section>\n    <create-listing (listAdded)=\"onListingAdded($event)\"></create-listing>\n  </section>\n  <section>\n    <h2>This are you listings</h2>\n    <ul>\n      <li \n        *ngFor=\"#listItem of listingItems\"\n        (click)=\"onSelect(listItem)\">\n        {{ listItem.name }}\n        {{ listItem.bedroom }}\n      </li>\n    </ul>\n  </section>\n  <section *ngIf=\"selectedListing != null\">\n    <edit-listing\n      [listing]=\"selectedListing\"\n      (removed)=\"onRemove($event)\"\n    >\n    </edit-listing>\n  </section>\n  ",
                        directives: [
                            create_listing_component_1.CreateListingComponent,
                            edit_listing_component_1.EditListingComponent
                        ]
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