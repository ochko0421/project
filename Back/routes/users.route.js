const express = require("express")

const router = express.Router();
const menu = require("../controllers/user.controller.js")

router.get("/user", menu.getAll)
router.post("/user",menu.create)
router.delete("/user/:id",menu.delete)
// router.put("/user",menu.update)

module.exports= router