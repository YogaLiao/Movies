require("dotenv").config()
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const topController = require("./controllers/top")

app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.use(methodOverride("_method"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/favicon.ico', (req, res) => { res.send("dummy") })

app.get("/", (req, res) => {
    res.render("home")
})

app.use("/movies",topController)

const port = process.env.PORT || 4000



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

