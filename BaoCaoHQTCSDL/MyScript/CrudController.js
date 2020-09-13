(function () {
    "use strict"
    angular.module("oamsapp")
        .controller("CrudCtrl",
            ["$rootScope", "$scope", "idselect", "loginservice",
                function ($rootScope, $scope, idselect, loginservice) {
                    var $ctrl = this;

                    CheckTrangThai();

                    function CheckTrangThai() {
                        $scope.status = idselect.status;
                        GetCategory();
                        if (idselect.status == 1 || idselect.status == 2) {
                            GetDetail(idselect.id);
                        }
                    }

                    function GetCategory() {
                        var resp = loginservice.getdata("API/QLSP/LayCategory");
                        resp.then(function (response) {
                            $ctrl.dsCate = response.data;
                            $scope.Cate = $ctrl.dsCate[0];
                            //console.log($ctrl.dsCate);
                        }
                            , function errorCallback(response) {
                                console.log(response.data.message);
                            });
                    }

                    function GetDetail(id) {
                        var resp = loginservice.getdata("API/QLSP/GetDetail?id=" + id);
                        resp.then(function (response) {
                            $ctrl.sp = response.data;
                            let index = $ctrl.dsCate.findIndex(x => x.Id == $ctrl.sp.Category);
                            $scope.Cate = $ctrl.dsCate[index];
                        }
                            , function errorCallback(response) {
                                console.log(response.data.message);
                            });
                    }

                    $scope.ThemMoi = function () {
                        let objThem = {};
                        objThem.ProductName = $scope.ProductName;
                        objThem.CategoryName = $scope.Cate.Id;
                        console.log(objThem);
                        var resp = loginservice.postdata("API/QLSP/ThemSanPham", $.param(objThem));
                        resp.then(function (response) {
                            alert("Thêm Sản Phẩm Thành Công");
                        }
                            , function errorCallback(response) {
                                alert("Lỗi");
                            });
                    }

                    $scope.CapNhat = function () {
                        let objUpdate = {};
                        objUpdate.Id = $ctrl.sp.Id;
                        objUpdate.ProductName = $ctrl.sp.ProductName;
                        objUpdate.CategoryName = $scope.Cate.Id;
                        //console.log(objUpdate);
                        var resp = loginservice.postdata("API/QLSP/CapNhatSanPham?id=" + objUpdate.Id, $.param(objUpdate));
                        resp.then(function (response) {
                            alert("Cập Nhật Sản Phẩm Thành Công");
                        }
                            , function errorCallback(response) {
                                alert("Lỗi");
                            });
                    }
                }]);
}());