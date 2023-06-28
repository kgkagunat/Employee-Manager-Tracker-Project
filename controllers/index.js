const router = require ('express').Router();
const authRoutes = require ("./auth")

router.use('/login', authRoutes)

module.exports = router