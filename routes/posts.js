const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postcontroller');
router.get('/', postControllers.index)
router.get('/:slug', postControllers.show)
router.post('/', postControllers.create)//STORE
router.put('/:slug', postControllers.edit)
router.patch('/:slug', postControllers.update)
router.delete('/:slug', postControllers.destroy)

module.exports = router
