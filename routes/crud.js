const router = require('express').Router();
const Controller = require('../controller/Controller');

// GET Methods
router.get(`/`, Controller.pageList);
router.get(`/add`, Controller.pageAdd);
router.get(`/edit/:id`, Controller.pageEdit);
router.get(`/delete/:id`, Controller.delete);
router.get('/search', Controller.search);

// // POST Methods
// router.post(`/add`, Controller.add);
// router.post(`/edit/:id`, Controller.edit);

module.exports = router;