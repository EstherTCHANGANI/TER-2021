const express = require('express');
const { default: subjectService } = require('../service/subject.service');
const router = express.Router();
const _ = require("lodash");

router.get("", async (req, res, next)=> {
    const ID_wanted = req.query.ID_doc;
    res.json(await subjectService.getSubject(ID_wanted))
})

module.exports = router;