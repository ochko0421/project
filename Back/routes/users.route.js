const express = require("express")

const router = express.Router();
const user = require("../controllers/user.controller.js")

router.get("/user", user.getAll)
router.post("/user",user.create)
router.delete("/user/:id",user.delete)
router.put("/user/:id",user.update)

module.exports= router