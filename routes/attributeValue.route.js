const express = require('express')
const attributesValueRoute= express.Router()
const { createAttributesValues, findByAttributesValues ,updateAttributesValues, deleteAttributesValues } = require("../controller/attributesValues.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()



const roleGuard = require("../middleware/role.guard")
const { findByAttributes } = require('../controller/attributes.controller')


attributesValueRoute.post("/",authGuard ,roleGuard("moderator"), createAttributesValues)
attributesValueRoute.get("/attributefind",authGuard ,roleGuard("moderator"),findByAttributesValues)
attributesValueRoute.patch("/:id",authGuard, roleGuard("moderator"), updateAttributesValues)
attributesValueRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteAttributesValues)


module.exports = attributesValueRoute
