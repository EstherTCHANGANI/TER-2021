const express = require('express');
const { default: clusterService } = require('../service/cluster.service');
const router = express.Router();
const _ = require("lodash");



router.get("", async (req, res, next) => {
    let clusters;
    let keywords;
    let allImages;
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

    allImages = req.query.allImages;

    res.json(await clusterService.groupByEvent(clusters, keywords, allImages))
})

router.get("/names", async (req, res, next)=> {
    res.json(await clusterService.getAllClusters())
})

router.get(/\/tree.*/, async (req, res, next) => {
    const path = req.path.replace(/%20/ig, " ")
    console.log(path);
    res.json(await clusterService.getTree(path))
})

module.exports = router;