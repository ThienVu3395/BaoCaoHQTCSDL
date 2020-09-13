(function () {
    "use strict"
    angular.module("aims.service", ['ngAnimate', 'ui.bootstrap', 'ngSanitize'])
        .constant("appSettings", Settings)
        .factory("loginservice", ["appSettings","$http",
            function (appSettings,$http) {
                this.postdata = function (urlapi, data) {
                    var resp = $http({
                        url: appSettings.serverPath + urlapi,
                        method: "POST",
                        data: data,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    });
                    return resp;
                };

                this.getdata = function (urlapi) {
                    var resp = $http({
                        url: appSettings.serverPath + urlapi,
                        method: "GET",
                    });
                    return resp;
                };

                return {
                    postdata: this.postdata,
                    getdata: this.getdata,
                }
            }
        ])
        ;
})();