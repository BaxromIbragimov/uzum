const express = require('express')
const ordersRoute = express.Router()
const authGuard = require("../middleware/auth.guard")
const roleGuard = require("../middleware/role.guard")
const app = express()


const { createOrders, findAllOrders, findByOrders, updateOrders, deleteOrders } = require("../controller/orders.controller")




ordersRoute.post("/",authGuard ,roleGuard("user"), createOrders)
ordersRoute.get("/orders", findAllOrders)
ordersRoute.get("/:id",authGuard ,roleGuard("user"), findByOrders)
ordersRoute.patch("/:id",authGuard, roleGuard("user"), updateOrders)
ordersRoute.delete("/:id",authGuard, roleGuard("user"), deleteOrders)




module.exports = ordersRoute
