const express = require('express')
const categoriesAttributesRoute = express.Router()
const { createCategoriesAttributes } = require("../controllerPapka/categoriesAttributes.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()

const roleGuard = require("../middleware/role.guard")


//findByCategoriesAttributes,updateCategoriesAttributes,deleteCategoriesAttributes,findAllCategoriesAttributes


categoriesAttributesRoute.post("/",authGuard ,roleGuard("moderator"), createCategoriesAttributes)
//categoriesAttributesRoute.get("/categoriesAttributes", findAllCategoriesAttributes)
//categoriesAttributesRoute.get("/:id",authGuard ,roleGuard("moderator"),findByCategoriesAttributes)
//categoriesAttributesRoute.patch("/:id",authGuard, roleGuard("moderator"), updateCategoriesAttributes)
//categoriesAttributesRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteCategoriesAttributes)




module.exports = categoriesAttributesRoute