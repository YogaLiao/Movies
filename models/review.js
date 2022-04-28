const mongoose = require("../db/connection")

const reviewSchema = new mongoose.Schema({
    id: { type: String, required: true },
    dbid: { type: String, required: true },
    title: { type: String, required: true },
    reviews: [{username: String}, {reviewTitle: String}, {content: String}]
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review