const seedData = require("./top250Movies.json")
const Top = require("../models/top")

Top.deleteMany({})
    .then(() => Top.insertMany(seedData))
    .then((data) => console.log(data))
    .catch(console.error)