const express = require('express');
const { default: clusterService } = require('../service/cluster.service');
const router = express.Router();
const _ = require("lodash");



router.get("", async (req, res, next) => {
    let clusters;
    let keywords;
    if (req.query.cluster === undefined) {
        clusters = []
    }
    else {
        clusters = _.isArray(req.query.cluster) ? req.query.cluster : [req.query.cluster];

    }

    if (req.query.keyword === undefined) {
        keywords = []
    }
    else {
        keywords = _.isArray(req.query.keyword) ? req.query.keyword : [req.query.keyword];
    }

    console.log(clusters, keywords);

    res.json(await clusterService.getAllEvents(clusters, keywords))
})


module.exports = router;