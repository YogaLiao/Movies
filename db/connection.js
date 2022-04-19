const mongoose = require("mongoose")

const mongoURI = process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : "mongodb+srv://YujiaLiao:test@cluster0.gedz1.mongodb.net/movie?retryWrites=true&w=majority"

mongoose
    .connect(mongoURI)
    .then((instance) => console.log(`connected to ${instance.connections[0].name}`))
    .catch(console.error)

module.exports = mongoose