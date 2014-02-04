/* ===================
    Generic require login routing middleware
   =================== */

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl
		req.flash('info', 'Debe autenticarse primero.');
		return res.redirect('/')
	}
	next()
}

exports.requiresAdminLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl
		req.flash('info', 'Debe autenticarse primero.');

		return res.redirect('/')
	}
	next()
}