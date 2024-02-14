const router = require('express').Router();
// const apiRoutes = require('./api');

// router.use('/', 'hello world');

router.get('/', async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    res.status(200).json('Heathly');

  });

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;