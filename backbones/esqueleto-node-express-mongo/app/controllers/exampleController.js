/* ===================
    Variables
   =================== */

// Main dependecies

var ExampleModel = _MONGOOSE.model('ExampleModel');

/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
  ExampleModel.loadAll(function(err, result) {
    if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
    else {
      res.render('exampleView/index', {
        title: "Data",
        result: result
      });
    }
  });
};

exports.new = function(req, res) {
  res.render('exampleView/new', {
    title: "Data"
  });
};

exports.createIt = function(req, res) {
  console.log(_DEBUG + "Req:", req.body); //DEBUG

  var example = new ExampleModel(req.body);
  example.createIt(function(err) {
    if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
    else {
      res.redirect('/');
    }
  });
}

exports.readIt = function(req, res) {
  ExampleModel.readIt(req.params.objectId, function(err, result) {
    if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
    else {
      res.render('exampleView/show', {
        title: "Data",
        result: result,
      });
    }
  });
}

exports.updateIt = function(req, res) {
  var object = req.body;
  var id = req.body.id;
  ExampleModel.updateIt(id, object, function(err) {
    if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
    else {
      res.redirect('/');
    }
  });
}

exports.deleteIt = function(req, res) {
  ExampleModel.deleteIt(function(err) {
    if (err) console.log(_DEBUG + "ERROR:", err); //DEBUG
    else {
      res.redirect('/');
    }
  });
}

/* ===================
    Custom
   =================== */