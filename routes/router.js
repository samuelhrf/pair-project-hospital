const router = require('express').Router();
const crud = require('./crud');

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.use('/wards', crud);
router.use('/doctors', crud);
router.use('/patients', crud);
router.use('/consultations', crud);

module.exports = router;