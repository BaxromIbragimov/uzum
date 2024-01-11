const express = require('express')
const productsAttributesValueRoute= express.Router()
const authGuard = require("../middleware/auth.guard")
const roleGuard = require("../middleware/role.guard")
const app = express()


const { createProductsAttributesValue} = require("../controllerPapka/productAttributesValue.controller")

//,updateCategoriesAttributes,deleteCategoriesAttributes,findAllCategoriesAttributes,findByCategoriesAttributes 



productsAttributesValueRoute.post("/",authGuard ,roleGuard("moderator"), createProductsAttributesValue)
//categoriesAttributesRoute.get("/categoriesAttributes", findAllCategoriesAttributes)
//categoriesAttributesRoute.get("/:id",authGuard ,roleGuard("moderator"),findByCategoriesAttributes)
//categoriesAttributesRoute.patch("/:id",authGuard, roleGuard("moderator"), updateCategoriesAttributes)
//categoriesAttributesRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteCategoriesAttributes)




module.exports = productsAttributesValueRoute