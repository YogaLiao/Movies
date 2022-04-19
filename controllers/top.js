const express = require("express");
const Top = require("../models/top");
const router = express.Router()

router.get("/", (req, res) => {
    let count = 7;
    let ids = []

    for(let i = 0; i < count; i++) {
    let rand = Math.floor(Math.random() * 250)
    if (ids.includes(rand) === false) {
        ids.push(rand)
    }
}
    console.log(ids)
    Top.find({
        "rank": {$in: ids}
    })
        .then((data) => res.render("top.ejs", {data}))
        .catch(console.error)
})

router.get("/:id", (req, res) => {
    Top.findById(req.params.id)
        .then((data) => res.send(data))
    .catch(console.error)
})


module.exports = router