var express = require('express');
const { default: configService } = require('../service/config.service');
const { default: mongoService } = require('../service/mongo.service');
var router = express.Router();


router.get('', async function (req, res, next) {
    const keyword = req.query.keyword;

    res.json(await mongoService.findManyByKeyWord(keyword))
});



module.exports = router;
