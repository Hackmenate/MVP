angular.module('regexWars', [])

.service('regexChecker', function() {
  this.regexObj = {
    prompt: 'Sample prompt: Match the repeated characters!',
    test: 'abccdee',
    expected: ['cc', 'ee']
  }
  this.checkMatch = function() {
    var matchArray = this.trialString.match(new RegExp(this.input, 'g'));
    if (matchArray === null || matchArray.length !== this.expected.length) {
      return false;
    }
    for (let i = 0; i < this.expected.length; i++) {
      let ind = matchArray.indexOf(this.expected[i]) !== -1;
      if (ind !== -1) {
        matchArray.splice(ind, 1);
      } else {
        return false;
      }
    }

    return true;
  }

})
.controller('regexController', function($scope, regexChecker) {
  $scope.prompt = regexChecker.regexObj.prompt;
  $scope.trialString = regexChecker.regexObj.test;
  $scope.expected = regexChecker.regexObj.expected;
  $scope.input = "(.)";
  $scope.check = function() {
    // this.input = regexChecker.checkMatch.call(this).toString();
    if (regexChecker.checkMatch.call(this)){
      this.input = 'yes';
    } else {
      this.input = 'nope';
    }
  };

});
