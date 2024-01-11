const express = require('express')
const productsEventsRoute = express.Router()
const authGuard = require("../middleware/auth.guard")
const roleGuard = require("../middleware/role.guard")
const app = express()


const { createProductsEvents } = require("../controllerPapka/productEvents.controller")

//updateCategoriesAttributes,deleteCategoriesAttributes,findAllCategoriesAttributes,findByCategoriesAttributes



productsEventsRoute.post("/",authGuard ,roleGuard("moderator"), createProductsEvents)
//categoriesAttributesRoute.get("/categoriesAttributes", findAllCategoriesAttributes)
//categoriesAttributesRoute.get("/:id",authGuard ,roleGuard("moderator"),findByCategoriesAttributes)
//categoriesAttributesRoute.patch("/:id",authGuard, roleGuard("moderator"), updateCategoriesAttributes)
//categoriesAttributesRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteCategoriesAttributes)
//



module.exports = productsEventsRoute