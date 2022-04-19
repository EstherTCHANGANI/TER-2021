const express = require('express');
const multer = require('multer');
const { default: sourceService } = require('../service/source.service');
const router = express.Router();

const upload = multer({dest:"/tmp/uploads"})
console.log(upload)
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.json(await sourceService.getAllNames())
});

router.post("/file", upload.single("source"), async (req, res, next)=> {
    console.log(req.file)
    console.log(req.body)
    const collection = await sourceService.importFromFile(req.body.name, req.file)
    res.json(collection)
})

module.exports = router