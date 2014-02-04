/* ===================
    Variables
   =================== */


/* ===================
    Defaults
   =================== */

exports.login = function(req, res) {
  res.render('admin/login', {
    title: "Enertiva",
  });
};

exports.logout = function(req, res) {
  //Custom code here
};

exports.cotizaciones = function(req, res) {
  res.render('admin/cotizaciones', {
    title: "Enertiva",
  });
};

exports.configuracion = function(req, res) {
  res.render('admin/configuracion', {
    title: "Enertiva",
  });
};

/* ===================
    Custom
   =================== */