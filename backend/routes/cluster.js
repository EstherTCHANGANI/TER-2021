const express = require('express');
const { default: clusterService } = require('../service/cluster.service');
const { default: mongoService } = require('../service/mongo.service');
const router = express.Router();
const _ = require("lodash")



router.get("", async (req, res, next) => {
    const clusters = _.isArray(req.query.cluster) ? req.query.cluster : [req.query.cluster];
    const keywords = _.isArray(req.query.keyword) ? req.query.keyword : [req.query.keyword];

    console.log(clusters, keywords);

    res.json(await clusterService.groupByEvent(clusters, keywords))
})

module.exports = router;