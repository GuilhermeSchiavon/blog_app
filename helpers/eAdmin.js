module.exports = {
    eAdmin: (req, res, next) => {
        if (req.isAuthenticated() && req.user.eAdmin) {
            return next()
        } else {
            req.flash("error_msg", "Você precisa ser um administrador")
            res.redirect("/")
        }
    }
}