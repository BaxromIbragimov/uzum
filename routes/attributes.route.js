const express = require('express')
const attributesRoute = express.Router()
const { createAttributes,  findByAttributes, updateAttributes, deleteAttributes } = require("../controller/attributes.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()



const roleGuard = require("../middleware/role.guard")


attributesRoute.post('/',authGuard ,roleGuard("moderator"), createAttributes)
attributesRoute.get('/:id',authGuard ,roleGuard("moderator"), findByAttributes)
attributesRoute.patch('/:id',authGuard ,roleGuard("moderator"), updateAttributes)
attributesRoute.delete('/:id',authGuard ,roleGuard("moderator"), deleteAttributes)










module.exports = attributesRoute
