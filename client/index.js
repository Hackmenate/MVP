angular.module('regexWars', [])

.service('regexChecker', function($http, $location) {
  this.regexObj = {
    prompt: 'Sample prompt: Match the repeated characters!',
    text: 'abccdee',
    expected: ['cc', 'ee']
  }
  this.checkMatch = function() {
    let {prob: {text, expected}, input} = this;
    let matchArray = text.match(new RegExp(input, 'g'));
    if (matchArray === null || matchArray.length !== expected.length) {
      return matchArray;
    }
    let matchArrayOG = matchArray.slice();
    for (let i = 0; i < expected.length; i++) {
      let ind = matchArray.indexOf(expected[i]) !== -1;
      if (ind !== -1) {
        matchArray.splice(ind, 1);
      } else {
        return matchArrayOG;
      }
    }

    return true;
  }

  this.getPrompts = function() {
    return $http({
      method: 'GET',
      url: '/api/prompt'
    }).then(function(resp) {
      return resp.data;
    });
  };

  this.getRandomPrompt = function($scope) {
    return this.getPrompts()
    .then(function(data) {
      $scope.prob = data[parseInt(Math.random()*data.length)];
      $scope.prob.expected = JSON.parse($scope.prob.expected)
    })
    .catch(function(err) {
      $scope.input = err;
    });
  }

})

.controller('regexController', function($scope, regexChecker, $location) {
  $scope.prob = regexChecker.regexObj;
  $scope.input = "(.)";
  $scope.check = function() {
    // this.input = regexChecker.checkMatch.call(this).toString();
    if (regexChecker.checkMatch.call(this) === true){
      this.newPrompt();
    } else {
      this.input = 'nope';
    }
  };

  $scope.newPrompt = function() {
    regexChecker.getRandomPrompt($scope);
  };

});
