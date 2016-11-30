angular.module('regexWars', [
  'regexWars.solve',
  'regexWars.submit',
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
  .otherwise({
    templateUrl: '/solve/solve.html',
    controller: 'solveController'
  })

})
