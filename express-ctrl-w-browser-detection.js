// ----–––––––----------------
// Local variables
// ---------------------------

var uaparser = require('ua-parser'),

// ----–––––––----------------
// Controller Actions
// ---------------------------

exports.index = function(req, res) {
  var osfamily = uaparser.parseOS(req.headers['user-agent']).family,
      uafamily = uaparser.parseUA(req.headers['user-agent']).family,
      uaversion = uaparser.parseUA(req.headers['user-agent']).major;

  // console.log(osfamily, uafamily, uaversion);

  // ---------------------------
  // Check browsers
  // ---------------------------

  /* --- Browsers no soportados --- */

  // Es más elegante hacer un array con browsers no soportados y aquí en el if
  //    chequear si la variable está en el array. Pero por falta de tiempo el
  //    ejemplo lo dejo así
  if (osfamily == 'iOS'
    || osfamily == 'Android'
    || (uafamily == 'IE' && uaversion <= 10)) {

    if (osfamily == 'iOS' || osfamily == 'Android') {
      data.mensaje = 'Entrá desde tu computadora para traer un árbol de vuelta';
    }
    else if (uafamily == 'IE') {
      data.mensaje = 'Internet Explorer no es compatible con este sitio Web... Para traer un árbol de vuelta tenés que usar un navegador como <a href="http://www.google.com/chrome/‎">Google Chrome (hacé clic aquí para descargarlo)</a> o Firefox';
    }
    else {
      data.mensaje = 'El navegador que estás utilizando está medio viejo... Para traer un árbol de vuelta tenés que atualizarlo. Te recomendamos <a href="http://www.google.com/chrome/‎">Google Chrome (hacé clic aquí para descargarlo)</a>'; 
    }

    res.render('mobile', data);
  }
  
  /* --- Browsers soportados --- */

  else 
  {
    res.render('index', data);
  }
};