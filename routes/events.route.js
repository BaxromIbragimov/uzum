const express = require('express')
const eventsRoute = express.Router()
const authGuard = require("../middleware/auth.guard")
const roleGuard = require("../middleware/role.guard")
const app = express()


const { createEvents, findAllEvents, findByEvents, updateEvents, deleteEvents } = require("../controller/events.controller")




eventsRoute.post("/",authGuard ,roleGuard("user"), createEvents)
eventsRoute.get("/events", findAllEvents)
eventsRoute.get("/:id",authGuard ,roleGuard("user"), findByEvents)
eventsRoute.patch("/:id",authGuard, roleGuard("user"), updateEvents)
eventsRoute.delete("/:id",authGuard, roleGuard("user"), deleteEvents)




module.exports = eventsRoute
