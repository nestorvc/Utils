/* ===================
    Variables
   =================== */

// Main dependecies
var Ejemplo = _MONGOOSE.model('Ejemplo');

var _ = require("underscore");
var async = require("async");

//Utils
var title = "Ejemplos";

/* ===================
    Defaults
   =================== */

var renderApp = function(req, res) {
  res.render('layouts/ejemplo', {
    title: title,
    messages: req.flash('info'),
    errors: req.flash('error')
  });
};

exports.login = function(req, res) {
  if (req.xhr) {
    res.render('ejemplos/login');
  } else {
    renderApp(req, res);
  }
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}

exports.index = function(req, res) {
  if (req.xhr) {
    Ejemplo.loadAll(function(err, results) {
      if (err) {
        console.log(_DEBUG + "ERROR:", err); //DEBUG
        req.flash('error', 'Su acción no pudo ser realizada, intente más tarde.');
        res.redirect('/');
      } else {
        res.render('ejemplos/index', {
          ejemplos: results
        });
      }
    });
  } else {
    renderApp(req, res);
  }
};

exports.new = function(req, res) {
  if (req.xhr) {
    res.render('ejemplos/new');
  } else {
    renderApp(req, res);
  }
};

/* ===================
    CRUD
   =================== */

exports.createIt = function(req, res) {
  console.log(_DEBUG + "Req:", req.body); //DEBUG

  var ejemplo = new Ejemplo(req.body);
  Ejemplo.createIt(function(err, result) {
    if (err) {
      console.log(_DEBUG + "ERROR:", err); //DEBUG
      req.flash('error', 'Su acción no pudo ser realizada, intente más tarde.');
      res.redirect('/');
    } else {
      req.flash('info', 'Ejemplo creado.');
      res.redirect('/ejemplos');
    }
  });
}

exports.readIt = function(req, res) {
  if (req.xhr) {
    Ejemplo.readIt(req.params.objectId, function(err, result) {
      if (err) {
        console.log(_DEBUG + "ERROR:", err); //DEBUG
        req.flash('error', 'Su acción no pudo ser realizada, intente más tarde.');
        res.redirect('/');
      } else {
        res.render('ejemplos/show', {
          ejemplo: result
        });
      }
    });

  } else {
    renderApp(req, res);
  }
}

exports.updateIt = function(req, res) {
  var object = req.body;
  var id = req.body.id;
  Ejemplo.updateIt(id, object, function(err, results) {
    if (err) {
      console.log(_DEBUG + "ERROR:", err); //DEBUG
      req.flash('error', 'Su acción no pudo ser realizada, intente más tarde.');
      res.redirect('/');
    } else {
      req.flash('info', 'Ejemplo actualizado.');
      res.redirect('/ejemplos');
    }
  });
}

exports.deleteIt = function(req, res) {
  Ejemplo.deleteIt(function(err, results) {
    if (err) {
      console.log(_DEBUG + "ERROR:", err); //DEBUG
      req.flash('error', 'Su acción no pudo ser realizada, intente más tarde.');
      res.redirect('/');
    } else {
      req.flash('info', 'Ejemplo eliminado.');
      res.redirect('/ejemplos');
    }
  });
}

/* ===================
    Custom
   =================== */