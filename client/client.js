var app = angular.module('myApp', []);

app.controller('TaskController', ['$http', function($http){

  var vm = this;
  vm.entireList = {};
  vm.list = {};
  console.log(vm.entireList);

  vm.getList = function(){
//gets database list items
    $http.get('/list/all').then(function(response){
      console.log("received list");
      console.log(response);
      vm.entireList = response.data;
      vm.list = '';
    });
  };


  vm.sendData = function() {
    // var sendData = {};
    // sendData.list_item = vm.list_item;
    $http.post('/list/add', vm.list).then(function(serverResponse){
      console.log("added",serverResponse);
          vm.getList();

    });


  };

vm.deleteListItem = function(item){
  console.log(item);
  $http.delete('/list/delete/' + item.id, {id: item.id}).then(function(response){
    vm.getList();
  });
  };

vm.getList();

}]);
// 
// vm.completeItem = function() {
//
// };
