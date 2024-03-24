const express = require('express');
const router = express.Router();

let dbService;

router.use((req, res, next) => {
    dbService = require(`../services${req.baseUrl}`);
  next();
});

router.get('/', async function (req, res, next) {
  try {
    res.json(await dbService.get(req.query.page));
  } catch (err) {
    console.error(`Error while getting element `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await dbService.add(req.body));
  } catch (err) {
    console.error(`Error while adding element `, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await dbService.change(req.body))
  } catch (err) {
    console.error(`Error while changing element `, err.message);
    next(err);
  }
});

module.exports = router;