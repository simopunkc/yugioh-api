const router = require('express').Router();

const {
  middlewareCheckHeaderAuth,
} = require('../middlewares/cards.middleware');

const {
  updateCacheCards,
} = require('../controllers/cards.controller');

router.put('/', middlewareCheckHeaderAuth, updateCacheCards);

module.exports = router;