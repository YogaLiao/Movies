const mongoose = require("mongoose")

const mongoURI = process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : process.env.DEV_DB_URL

mongoose
    .connect(mongoURI)
    .then((instance) => console.log(`connected to ${instance.connections[0].name}`))
    .catch(console.error)

module.exports = mongoose