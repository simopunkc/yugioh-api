const router = require('express').Router();

const {
  middlewareCheckHeaderAuth,
} = require('../middlewares/cards.middleware');

const {
  getListCards,
  getListSearchCards,
} = require('../controllers/cards.controller');

router.get('/page:page/', middlewareCheckHeaderAuth, getListCards);
router.get('/search/:query', middlewareCheckHeaderAuth, getListSearchCards);

module.exports = router;