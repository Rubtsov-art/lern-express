const express = require("express")
const exphbs = require("express-handlebars")
const cursesRoutes = require("./routes/curses")
const addRoutes = require("./routes/add")
const homeRouter = require("./routes/home")

const app = express()
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use("/curses", cursesRoutes)
app.use("/add", addRoutes)
app.use("/", homeRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})