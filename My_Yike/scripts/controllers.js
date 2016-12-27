//定义控制模块
//ctrl01为一个模块，在app里面需要依赖注入

angular.module("ctrl01", [])

//将后台的数据放到视图上
.controller("navCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootscope) {
    //情况1：
    //通常情况下左侧导航的数据一般都来自后端
    // $http({

    // }).success(function(data){
    //  $scope.navs = data;
    // })
    //假如导航内容是固定不变的就没有必要再发送请求了，
    //可以用数组进行模拟

    //情况2：
    //用一个数组写死 =>  数据
    var navs = [
        { text: "今日一刻", link: "#/today", icon: "icon-home" },
        { text: "往期内容", link: "#/older", icon: "icon-file-empty" },
        { text: "热门作者", link: "#/author", icon: "icon-pencil" },
        { text: "栏目浏览", link: "#/list", icon: "icon-menu" },
        { text: "我的喜欢", link: "#/favourite", icon: "icon-heart" },
        { text: "设置", link: "#/settings", icon: "icon-cog" }
    ];

    $scope.navs = navs;
}])


//today 今日内容
.controller("todayCtrl", ["$http", "$scope", "$rootScope", "$filter", function($http, $scope, $rootscope, $filter) {
    $rootscope.loaded = false;
    $rootscope.title = "今日一刻";
    $rootscope.current = 0;

    var day = new Date();
    day = $filter("date")(day, "yyyy-MM-dd");

    $http({
        url: "api/today.php",
        params: {
            date: day
        }
    }).success(function(data) {
        $scope.posts = data.posts;
        $scope.date = data.date;
        $rootscope.loaded = true;
    })
}])

//older 往期内容
.controller("olderCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootscope) {
    $rootscope.loaded = false;
    $rootscope.loadingFooter = true;
    $rootscope.title = "往期内容";
    $rootscope.current = 1;
    $scope.date = -1;

    var falg = true;
    $scope.posts = [];

    //获取数据的函数
    function getData(date) {

        if (falg) {
            falg = false;
            $http({
                url: "api/older.php",
                params: {
                    date: date
                }
            }).success(function(data) {

                $scope.posts = $scope.posts.concat(data.result.posts);
                $scope.date = data.date;
                $rootscope.loaded = true;
                $rootscope.loadingFooter = true;
                $scope.date = data.date;
                falg = true;
            })
        }

    }

    getData($scope.date);

    //滚动监听事件
    window.addEventListener("scroll", function() {
        var space = 200;
        //下面这句主要是获取网页的总高度，主要是考虑兼容性所以把Ie支持的documentElement也写了，这个方法至少支持IE8
        var htmlHeight = document.body.offsetHeight || document.documentElement.scrollHeight;
        //clientHeight是网页在浏览器中的可视高度，
        var clientHeight = document.documentElement.clientHeight;
        //scrollTop是浏览器滚动条的top位置，
        var scrollTop = document.body.scrollTop;
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
        if (scrollTop + clientHeight + space > htmlHeight) {
            getData($scope.date);


        }
    })
}])

//author 作者介绍
.controller("authorCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootscope) {
    $rootscope.loaded = false;
    $rootscope.title = "热门作者";
    $rootscope.current = 2;

    $http({
        url: "api/author.php"
    }).success(function(data) {
        $scope.hots = data.hot.authors;
        $scope.recs = data.rec.authors;
        $rootscope.loaded = true;
    })

}])

//list 栏目浏览 
.controller("listCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootscope) {
    $rootscope.loaded = false;
    $rootscope.title = "栏目浏览";
    $rootscope.current = 3;

    $http({
        url: "api/list.php"
    }).success(function(data) {
        $scope.column = data.column;
        $scope.posts = data.posts;
        $rootscope.loaded = true;
    })
}])
