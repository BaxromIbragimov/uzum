const express = require('express')
const deliveryRoute = express.Router()
const authGuard = require("../middleware/auth.guard")
const roleGuard = require("../middleware/role.guard")
const app = express()


const { createDelivery, findAllDelivery, findByDelivery, updateDelivery, deleteDelivery } = require("../controller/delivery.controller")




deliveryRoute.post("/",authGuard ,roleGuard("deliver"), createDelivery)
deliveryRoute.get("/deliverys", findAllDelivery)
deliveryRoute.get("/:id",authGuard ,roleGuard("deliver"), findByDelivery)
deliveryRoute.patch("/:id",authGuard, roleGuard("deliver"), updateDelivery)
deliveryRoute.delete("/:id",authGuard, roleGuard("deliver"), deleteDelivery)




module.exports = deliveryRoute
