const express = require('express');
const { default: mapperService } = require('../service/mapper.service');
const router = express.Router();

router.post("/", (req, res, next)=> {
    mapperService.mapFromSources(req.body)
    res.json({})
})

module.exports = router