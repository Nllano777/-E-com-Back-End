const router = require('express').Router();
const addRoutes = require('./addRoutes');

router.use('/addRoutes', addRoutes);

module.exports = router;