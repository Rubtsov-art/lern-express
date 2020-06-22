const {Router} = require("express")
const router = Router()

router.get("/", (req, res) => {
    res.render("add", {
        title: "Добавить курс",
        isAdd: true
    })
})

router.post("/", (req, res) => {
    console.log(req.body)

    res.redirect("/curses")
})

module.exports = router