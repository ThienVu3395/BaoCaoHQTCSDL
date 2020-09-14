(function () {
    angular.module("oamsapp")
        .controller("homecontroller",
            ["$rootScope", "$document", "$scope", "$uibModal","loginservice",
                function ($rootScope, $document, $scope, $uibModal,loginservice) {
                    $scope.maxSize = 5;
                    $scope.bigCurrentPage = 1;
                    $scope.itemsPerPage = 5;
                    $scope.SearchString = null;
                    $scope.Start = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;

                    GetDSSP();

                    function GetDSSP() {
                        let filter = {
                            SearchString: $scope.SearchString,
                            Start: $scope.Start,
                            End: $scope.itemsPerPage,
                        };
                        var resp = loginservice.postdata("API/QLSP/LayDSSP", $.param(filter));
                        resp.then(function (response) {
                            $scope.dsSP = response.data;
                            $scope.bigTotalItems = $scope.dsSP[0].Total;
                            //console.log($scope.dsSP);
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

                    $scope.TimKiem = function () {
                        $scope.Start = 0;
                        GetDSSP();
                    }

                    $scope.Pagination = function () {
                        $scope.Start = ($scope.bigCurrentPage - 1) * $scope.itemsPerPage;
                        GetDSSP();
                    }
            }])
}());