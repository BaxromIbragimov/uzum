const express = require('express')
const addressesRoute = express.Router()
const { createAddresses, findAllAddresses, findByAddresses, updateAddresses, deleteAddresses } = require("../controller/addresses.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()



const roleGuard = require("../middleware/role.guard")



addressesRoute.post("/",authGuard ,roleGuard("moderator"), createAddresses)
addressesRoute.get("/addresses", findAllAddresses)
addressesRoute.get("/:id",authGuard ,roleGuard("moderator"), findByAddresses)
addressesRoute.patch("/:id",authGuard, roleGuard("moderator"), updateAddresses)
addressesRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteAddresses)


module.exports = addressesRoute
