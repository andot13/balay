System.register([], function(exports_1) {
    var ListingService;
    return {
        setters:[],
        execute: function() {
            ListingService = (function () {
                function ListingService() {
                }
                ListingService.prototype.getListings = function () {
                    return [
                        {
                            name: "List",
                            bedroom: 3,
                            likes: 0,
                            liked: false
                        },
                        {
                            name: "Yeahh!",
                            bedroom: 2,
                            likes: 88,
                            liked: true
                        },
                        {
                            name: "another list",
                            bedroom: 2,
                            likes: 0,
                            liked: false
                        }
                    ];
                };
                return ListingService;
            })();
            exports_1("ListingService", ListingService);
        }
    }
});
//# sourceMappingURL=listing.service.js.map