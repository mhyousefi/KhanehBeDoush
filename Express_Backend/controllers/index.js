const router = require('express').Router()

router.use('/api/users', require('./userRoutes'))
router.use('/api/homes', require('./homeRoutes'))
router.use('/api/phoneNumbers', require('./phoneNumberRoutes'))

module.exports = router