const express = require("express")
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require("mongoose")
const coursesRoutes = require("./routes/courses")
const cardRoutes = require("./routes/card")
const addRoutes = require("./routes/add")
const homeRouter = require("./routes/home")
const path = require("path")
const User = require("./models/user")

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  });

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("5f472be7b5cdbb0d3cd6a850")
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }
    
})

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
        await mongoose.connect(url, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false 
        })

        const candidate = await User.findOne()
        if(!candidate) {
            const user = new User({
                email: "vladilen@mail.ru",
                name: "Pavel",
                cart: {items: []}
            })
            await user.save()
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


