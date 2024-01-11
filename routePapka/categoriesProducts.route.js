const express = require('express')
const categoriesProductsRoute = express.Router()
const { createCategoriesProducts } = require("../controllerPapka/categoriesProducts.controller")
const authGuard = require("../middleware/auth.guard")

const app = express()

const roleGuard = require("../middleware/role.guard")

//,findAllCategoriesProducts,findByCategoriesProducts,updateCategoriesProducts,deleteCategoriesProducts




categoriesProductsRoute.post("/",authGuard ,roleGuard("moderator"), createCategoriesProducts)
//categoriesProductsRoute.get("/categoriesProducts", findAllCategoriesProducts)
//categoriesProductsRoute.get("/:id",authGuard ,roleGuard("moderator"),findByCategoriesProducts)
//categoriesProductsRoute.patch("/:id",authGuard, roleGuard("moderator"), updateCategoriesProducts)
//categoriesProductsRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteCategoriesProducts)




module.exports = categoriesProductsRoute