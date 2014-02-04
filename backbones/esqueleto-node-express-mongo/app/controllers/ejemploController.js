// -----------------------
// Variables
// -----------------------

// Main dependecies
var Ejemplo = _MONGOOSE.model('Ejemplo');

var _ = require("underscore");
var async = require("async");

//Utils
var title = "Ejemplos";

// -----------------------
// Defaults
// -----------------------

/**
 * Renders the app
 * - res <Object> express response
 * returns: <undefined>
 */
var renderApp = function(req, res) {
  res.render('layouts/ejemplo', {
    title: title,
    messages: req.flash('info'),
    errors: req.flash('error')
  });
};

/**
 * Renders the app on the login
 * - res <Object> express response
 * returns: <undefined>
 */
exports.login = function(req, res) {
  if (req.xhr) {
    res.render('ejemplos/login');
  } else {
    renderApp(req, res);
  }
}

/**
 * Redirects user to logout
 * - res <Object> express response
 * returns: <undefined>
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * Renders the app on the index
 * - res <Object> express response
 * - ejemplos <Object> all the ejemplos that match the query on the BD
 * returns: <undefined>
 */
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

/**
 * Renders the app on the new
 * - res <Object> express response
 * returns: <undefined>
 */
exports.new = function(req, res) {
  if (req.xhr) {
    res.render('ejemplos/new');
  } else {
    renderApp(req, res);
  }
};

// -----------------------
// CRUD
// -----------------------

/**
 * Create a new ejemplo on the BD with the req.body data
 * Redirects the user to the index
 * - res <Object> express response
 * returns: <undefined>
 */
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

/**
 * Renders the app on an ejemplo
 * - res <Object> express response
 * - ejemplo <Object> the ejemplo that matched the query on the BD
 * returns: <undefined>
 */
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

/**
 * Create or update an ejemplo on the BD with the req.body data
 * Redirects the user to the index
 * - res <Object> express response
 * returns: <undefined>
 */
exports.upsertIt = function(req, res) {
  var object = req.body;
  var id = req.body.id;
  Ejemplo.upsertIt(id, object, function(err, results) {
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

/**
 * Update an existing ejemplo on the BD with the req.body data
 * Redirects the user to the index
 * - res <Object> express response
 * returns: <undefined>
 */
exports.updateIt = function(req, res) {
  var object = req.body;
  var id = req.body.id;
  Ejemplo.updateIt(object, function(err, results) {
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

/**
 * Deletes an ejemplo on the BD that matched the query
 * Redirects the user to the index
 * - res <Object> express response
 * returns: <undefined>
 */
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

// -----------------------
// Custom
// -----------------------