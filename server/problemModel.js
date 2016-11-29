var mongoose = require('mongoose');

var Problem = mongoose.model('Problem', {
  prompt: String,
  text: String,
  expected: String
});

module.exports.addOne = function(probContents) {
  var prob = new Problem(probContents);
  return prob.save(function(err, data) {
    if (err) console.error(err);
    else if (data) console.log('success');
  });
};

module.exports.grabNext = function(last) {
  return Problem.find(function(err, probs) {
    if (err) console.log(err);
    else if (probs) return probs;
  });
};

module.exports.clear = function() {
  return Problem.find().remove().exec();
}
