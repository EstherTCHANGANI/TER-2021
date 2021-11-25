const express = require('express');
const multer = require('multer');
const { default: sourceService } = require('../service/source.service');
const router = express.Router();

const upload = multer({dest:"/tmp/uploads"})
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.json(await sourceService.getAllNames())
});

router.post("/file", upload.single("source"), async (req, res, next)=> {
    const collection = await sourceService.importFromFile(req.body.name, req.file)
    res.json(collection)
})

module.exports = router