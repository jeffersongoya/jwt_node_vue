const express = require('express');
const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Seja bem vindo a bagaça !!!',
    version: '1.0.0',
  });
});

module.exports = router;