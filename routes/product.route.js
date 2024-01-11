const express = require('express')
const productRoute = express.Router()
const { createProduct, findAllProduct, findByProduct, updateProduct, deleteProduct } = require("../controller/product.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()




const roleGuard = require("../middleware/role.guard")




productRoute.post("/",authGuard ,roleGuard("moderator"), createProduct)
productRoute.get("/products", findAllProduct)
productRoute.get("/:id",authGuard ,roleGuard("moderator"), findByProduct)
productRoute.patch("/:id",authGuard, roleGuard("moderator"), updateProduct)
productRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteProduct)
module.exports = productRoute
