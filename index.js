const express = require("express")
const app = express()
const methodOverride = require("method-override")
const topController = require("./controllers/top")

app.use(express.static(__dirname + "public"))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/movies",topController)

const port = process.env.port || 4000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

