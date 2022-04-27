const express = require("express");
const Top = require("../models/top");
const axios = require("axios");
const req = require("express/lib/request");
const router = express.Router()

router.get("/", (req, res) => {
    let count = 12;
    let ids = []

    for(let i = 0; i < count; i++) {
    let rand = Math.floor(Math.random() * 250)
    if (ids.includes(rand) === false) {
        ids.push(rand)
    }
    else {
        count += 1
        }
}
    console.log(ids)
    Top.find({
        "rank": {$in: ids}
    })
        .then((data) => res.render("top.ejs", {data}))
        .catch(console.error)
})

router.get("/new", (req, res) => {
    res.render("new.ejs")
})

router.post("/add", (req, res) => {
    Top.create(req.body)
        .then(() => {
        res.redirect("/movies")
    })
})

router.get("/:id/edit", (req, res) => {
    Top.findById(req.params.id)
        .then((data) => {
            res.render("edit.ejs", { data })
            
        })
        .catch(console.error)
})

router.put("/:id", (req, res) => {
    Top.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => res.redirect("/movies"))
})

router.post("/search", (req, res) => {
    console.log(req.body.search)
    res.redirect(`/movies/search/${req.body.search}`)
})

router.get("/search/:input", (req, res) => {
    axios.get(`https://imdb-api.com/en/API/SearchMovie/k_1fn0eocd/${req.params.input}`)
        .then((data) => 
            {res.render("result", { result: data.data})}
        )
        .catch(console.error)
})

router.get("/results/:id", (req, res) => {
    const data = Top.find({ id: req.params.id })
        .then((data) => 
            {data.length > 0
            ? res.redirect(`/movies/${data[0]._id}`)
                : res.redirect("/movies/error")}
        )
        
})

router.get("/error", (req, res) => {
    res.render("error")
})

router.get("/:id", (req, res) => {
    Top.findById(req.params.id)
        .then(async (data) => {
            console.log(data.id)
            const cast = await axios.get(`https://imdb-api.com/en/API/FullCast/k_1fn0eocd/${data.id}`);
            const description = await axios.get(`https://imdb-api.com/en/API/Wikipedia/k_1fn0eocd/${data.id}`);
            const posterInfo = await axios.get(`https://imdb-api.com/en/API/Posters/k_1fn0eocd/${data.id}`)
            res.render("show", {data: data, cast: cast.data, wiki: description.data, poster: posterInfo.data})
        })
        .catch(console.error)
})

router.delete("/:id", (req, res) => {
    Top.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/movies"))
})


module.exports = router