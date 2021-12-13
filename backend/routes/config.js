var express = require('express');
const { default: configService } = require('../service/config.service');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    res.json(await configService.listAll())
});


router.get('/:configName', async function (req, res, next) {
    res.json(await configService.get(req.params.configName))
});

router.post('/:configName', async function (req, res, next) {
    res.json(await configService.addOrUpdate(req.params.configName, req.body))
});

module.exports = router;
