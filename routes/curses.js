const {Router} = require("express")
const router = Router()

router.get("/", (req, res) => {
    res.render("curses", {
        title: "Курсы",
        isCurses: true
    })
})

module.exports = router