

var app = angular.module('library', ['ngResource','ngRoute']);

app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Books = $resource('/api/books');
        Books.query(function(books){
            $scope.books = books;
        });
    }]);

app.controller('AddBookCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Books = $resource('/api/books');
            Books.save($scope.book, function(){
                $location.path('/add-book');
                $scope.book.name = "";
                $scope.book.desc = "";
                $scope.message = false;
            });
        };
    }]);

app.controller('FileCtrl', ['$scope', '$resource', function($scope, $resource){
    $scope.files = {};
    $scope.save = function(){
        
            var Files = $resource('/api/files');
     
            Files.save($scope.files, function(res){
                console.log(res);
            });
        };

    $scope.SelectFiles = function (files) {
            $scope.files.path = files.value;
            $scope.files.filename = files.files[0].name;
            console.log($scope.files);

        }
        $scope.showContent = function(files){
            var reader = new FileReader();
            reader.onload = function(onLoadEvent) {
                var buffer = onLoadEvent.target.result;
            var uint8 = new Uint8Array(buffer);
                console.log(uint8);
            
            };
        }

    }]);



app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-book',
        {
            templateUrl :'partials/book-create.html',
             controller: 'AddBookCtrl'
        })
        .when('/indexfile',
        {
            templateUrl :'partials/indexfile.html',
             controller: 'FileCtrl'
        })
        .when('/insertfile',
        {
            templateUrl :'partials/insertfile.html',
             controller: 'FileCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
