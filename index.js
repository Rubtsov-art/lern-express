const express = require("express")
const exphbs = require("express-handlebars")
const coursesRoutes = require("./routes/courses")
const cardRoutes = require("./routes/card")
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
app.use("/courses", coursesRoutes)
app.use("/add", addRoutes)
app.use("/card", cardRoutes)
app.use("/", homeRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})