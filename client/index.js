angular.module('regexWars', [
  'regexWars.solve',
  'regexWars.submit',
  'regexWars.list',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/solve', {
    templateUrl: '/solve/solve.html',
    controller: 'solveController'
  })
  .when('/submit', {
    templateUrl: '/submit/submit.html',
    controller: 'submitController'
  })
  .when('/problems', {
    templateUrl: '/list/list.html',
    controller: 'listController'
  })
  .otherwise({
    templateUrl: '/solve/solve.html',
    controller: 'solveController'
  })

})
