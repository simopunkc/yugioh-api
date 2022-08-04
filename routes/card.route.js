const router = require('express').Router();

const {
  middlewareCheckHeaderAuth,
} = require('../middlewares/cards.middleware');

const {
  getSingleCard,
} = require('../controllers/cards.controller');

router.get('/:id', middlewareCheckHeaderAuth, getSingleCard);

module.exports = router;