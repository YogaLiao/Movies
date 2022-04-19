const mongoose = require("../db/connection")

const topSchema = new mongoose.Schema({
    id: { type: String, required: true },
    rank: { type: Number, required: true },
    title: { type: String, required: true },
    fullTitle: String,
    year: Number,
    image: String,
    crew: String,
    imDbRating: Number,
    imDbRatingCount: Number
})

const Top = mongoose.model("Top", topSchema)

module.exports = Top