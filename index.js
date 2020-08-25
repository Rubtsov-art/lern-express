const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const coursesRoutes = require("./routes/courses")
const cardRoutes = require("./routes/card")
const addRoutes = require("./routes/add")
const homeRouter = require("./routes/home")
const path = require("path")

const app = express()
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use("/courses", coursesRoutes)
app.use("/add", addRoutes)
app.use("/card", cardRoutes)
app.use("/", homeRouter)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = "mongodb+srv://Pavel:uNbkY0RBxHYG7pgD@cluster0.kfqbg.mongodb.net/shop"
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


