var yike = angular.module("yike", ["ngRoute", "ctrl01"]);

yike.run(['$rootScope', function($rootscope) {

    $rootscope.collapseed = false;
    //加载图标
    $rootscope.loaded = false;
    //页面标题
    $rootscope.title = "今日一刻";
    $rootscope.current = 0;

    //点击menu事件
    $rootscope.menu = function() {
        $rootscope.collapseed = !$rootscope.collapseed;
        slide();
    }

    //点击左边菜单会收起左边菜单
    $rootscope.change = function() {
        $rootscope.collapseed = !$rootscope.collapseed;
        slide();
    }

    function slide() {
        var navs = document.querySelectorAll(".navs dd");

        if ($rootscope.collapseed) {
            //向右 => 展开
            for (var i = 0; i < navs.length; i++) {
                navs[i].style.transform = "translate(0)";
                navs[i].style.transitionDuration = (i + 1) * 0.15 + "s";
                navs[i].style.transitionDelay = "0.25s";
            }
        } else {
            //向左 => 收回
            var len = navs.length - 1;
            for (var i = len; i >= 0; i--) {
                navs[i].style.transform = "translate(-100%)";
                navs[i].style.transitionDuration = (len - i + 1) * 0.15 + "s";
                navs[i].style.transitionDelay = "0s";
            }
        }
    }

}]);


//配置路由
yike.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/today", {
        templateUrl: "./views/today.html",
        controller: "todayCtrl"
    }).when("/older", {
        templateUrl: "./views/older.html",
        controller: "olderCtrl"
    }).when("/author", {
        templateUrl: "./views/author.html",
        controller:"authorCtrl"
    }).when("/list", {
        templateUrl: "./views/list.html",
        controller: "listCtrl"
    }).when("/favourite", {
        templateUrl: "./views/favourite.html"
    }).when("/settings", {
        templateUrl: "./views/settings.html"
    }).otherwise({
        redirectTo: "/today"
    })
}])
