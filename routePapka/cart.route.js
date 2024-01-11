const express = require('express')
const cartsRoute = express.Router()
const { createCarts,updateCarts,deleteCarts,findAllCarts,findByCarts } = require("../controllerPapka/cart.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()


const roleGuard = require("../middleware/role.guard")






cartsRoute.post("/",authGuard ,roleGuard("moderator"), createCarts)
cartsRoute.get("/carts", findAllCarts)
cartsRoute.get("/:id",authGuard ,roleGuard("moderator"),findByCarts)
cartsRoute.patch("/:id",authGuard, roleGuard("moderator"), updateCarts)
cartsRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteCarts)




module.exports = cartsRoute
