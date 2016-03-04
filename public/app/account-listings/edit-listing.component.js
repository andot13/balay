System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var EditListingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            EditListingComponent = (function () {
                function EditListingComponent() {
                    this.listing = { name: '', bedroom: 0 };
                }
                EditListingComponent = __decorate([
                    core_1.Component({
                        selector: 'edit-listing',
                        template: "\n    <form action=\"\">\n      <label for=\"name\">Name</label>\n      <input type=\"text\" [(ngModel)]=\"listing.name\" id=\"name\">\n      <label for=\"name\">Bedroom</label>\n      <input type=\"text\" [(ngModel)]=\"listing.bedroom\" id=\"bedroom\">\n      <button (click)=\"onDelete()\">Delete listing</button>\n    </form>\n  ",
                        inputs: ['listing']
                    }), 
                    __metadata('design:paramtypes', [])
                ], EditListingComponent);
                return EditListingComponent;
            })();
            exports_1("EditListingComponent", EditListingComponent);
        }
    }
});
//# sourceMappingURL=edit-listing.component.js.map