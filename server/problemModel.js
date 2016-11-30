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

module.exports.fetch = function(query) {

  if (query && query._id) {
    return Problem.findOne(query, function(err, resp) {
      if (err) console.log(err);
      else if (resp) return resp;
    })
  }
  else if (query && query.random) {
    console.log('rando')
    return new Promise(function(resolve, reject) {
      Problem.count().exec(function(err, qty) {
        if (err) console.log('error', err);
        else {
          let rand = parseInt(Math.random()*qty);
          Problem.find().skip(rand).limit(1).exec(function(err, data) {
            if (err) reject(err);
            if (data) resolve(data);
          });
        }
      });
    });

  }
  else {
    return Problem.find(function(err, probs) {
      if (err) console.log(err);
      else if (probs) return probs;
    });
  }
};

module.exports.clear = function() {
  return Problem.find().remove().exec();
}
