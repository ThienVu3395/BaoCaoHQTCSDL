(function () {
    angular.module("oamsapp")
        .controller("homecontroller",
            ["$rootScope", "$document", "$scope", "$uibModal", "$timeout", "$element", "appSettings", "loginservice",
                function ($rootScope, $document, $scope, $uibModal, $timeout, $element, appSettings, loginservice) {
                    var $ctrl = this;

                    GetDSSP();

                    function GetDSSP() {
                        var resp = loginservice.getdata("API/QLSP/LayDSSP");
                        resp.then(function (response) {
                            $scope.dsSP = response.data;
                        }
                            , function errorCallback(response) {
                                console.log(response.data.message);
                            });
                    }                

                    $scope.opennewVanban = function (status,id) {
                        var parentElem =
                            angular.element($document[0].querySelector('.hihi'));
                        var modalInstance = $uibModal.open({
                            animation: true,
                            backdrop: 'static',
                            ariaLabelledBy: 'modal-title',
                            ariaDescribedBy: 'modal-body',
                            templateUrl: 'FormCRUD.html',
                            controller: 'CrudCtrl',
                            controllerAs: '$ctrl',
                            size: 'sm',
                            appendTo: parentElem,
                            resolve: {
                                idselect: function () {
                                    let obj = {};
                                    obj.status = status;
                                    obj.id = id;
                                    //console.log(obj);
                                    return obj;
                                }
                            }
                        });
                        modalInstance.result.then(function (c) {
                            GetDSSP();

                        }, function () {
                            GetDSSP();
                        });
                    }

                    $scope.xoasp = function (id) {
                        var resp = loginservice.getdata("API/QLSP/XoaSP?id=" + id);
                        resp.then(function (response) {
                            alert("xóa thành công");
                            GetDSSP();
                        }
                            , function errorCallback(response) {
                                alert("lỗi");
                            });
                    }
            }])
}());