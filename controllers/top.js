const express = require("express");
const Top = require("../models/top");
const Review = require("../models/review")
const axios = require("axios");
const req = require("express/lib/request");
const { redirect } = require("express/lib/response");
const router = express.Router()

let ids = [];

const randomId = (count) => {
    for(let i = 0; i < count; i++) {
    let rand = Math.floor(Math.random() * 250) + 1
    if (ids.includes(rand) === false) {
        ids.push(rand)
    }
    else {
        count += 1
        }
}
}

router.get("/", (req, res) => {
    if (ids.length > 0) {
        ids = []
    }
    console.log(ids)
    randomId(12)
    console.log(ids)
    Top.find({
        "rank": {$in: ids}
    })
        .then((data) => res.render("top.ejs", {data}))
        .catch(console.error)
})

router.post("/sort", (req, res) => {
    console.log(req.body)
    res.redirect(`/movies/sort/${req.body.sort}`)
})

router.get("/sort/:sort", (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const input = req.params.sort
    Top.find({
        "rank": {$in: ids}
    })
        .then((data) => {
            console.log(data)
            input == "title"
                ? data.sort((a, b) => {
                    let nameA = a.title.toUpperCase();
                    let nameB = b.title.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameB < nameA) {
                        return 1
                    }
                    return 0
            })
            : data.sort((a,b) => a[input] - b[input]);
            res.render("top", {data})
        })
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

router.get("/reviews/:id/new", (req, res) => {
    const id = req.params.id
    Top.findById(id)
    .then((data) => res.render("review/reviewNew.ejs", {data}))
    .catch(console.error)
})

router.post("/reviews/:id", (req, res) => {
    console.log(req.body)
    Review.find({ dbid: req.params.id })
        .then((data) => {
            if (data.length > 0) {
            Review.findOneAndUpdate({dbid: req.params.id}, {$push: {reviews: [{username: req.body.username, reviewTitle: req.body.reviewTitle, content: req.body.content}]}})
            }
            else {
                Review.insertMany({ id: req.body.id, dbid: req.body.dbid, title: req.body.title, reviews:  [{ username: req.body.username, reviewTitle: req.body.reviewTitle, content: req.body.content }]})
            }
    })
        .then(() => Review.find({ dbid: req.params.id }))
        .then((data) => res.send(data))
        .catch(console.error)
})

router.delete("reviews/:id", (req, res) => {
    Review.findOneAndRemove({dbid: req.params.id})
    .then(() => res.redirect(`/movies/${req.params.id}`))
})

router.get("/:id", (req, res) => {
    Top.findById(req.params.id)
        .then((data) => {
            console.log(data.id)
            Review.find({ dbid: req.params.id })
                .then(async (review) => {
                    const cast = await axios.get(`https://imdb-api.com/en/API/FullCast/k_1fn0eocd/${data.id}`);
                    const description = await axios.get(`https://imdb-api.com/en/API/Wikipedia/k_1fn0eocd/${data.id}`);
                    const posterInfo = await axios.get(`https://imdb-api.com/en/API/Posters/k_1fn0eocd/${data.id}`)
                    res.render("show", {data: data, review: review, cast: cast.data, wiki: description.data, poster: posterInfo.data})
        })})
        .catch(console.error)
})

router.delete("/:id", (req, res) => {
    Top.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/movies"))
})


module.exports = router