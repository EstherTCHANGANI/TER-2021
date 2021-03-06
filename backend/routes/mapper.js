const express = require('express');
const { default: mapperService } = require('../service/mapper.service');
const router = express.Router();

router.post("", async (req, res, next)=> {
    await mapperService.mapFromSources(req.body)
    res.json({})
})

module.exports = router