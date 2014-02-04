/* ===================
    Variables
   =================== */


/* ===================
    Defaults
   =================== */

// Index
exports.index = function(req, res) {
  res.render('main/index', {
    title: "Enertiva",
  });
};

exports.result = function(req, res) {
  res.render('main/result', {
    title: "Enertiva",
  });
};

/* ===================
    Custom
   =================== */