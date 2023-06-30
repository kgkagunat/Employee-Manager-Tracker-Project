const router = require ('express').Router();

const homeRoutes = require('./homepage')

router.use('/', homeRoutes)

module.exports = router