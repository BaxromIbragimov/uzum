const express = require('express')
const favoritesRoute = express.Router()
const { createFavorites,updateFavorites,deleteFavorites,findAllFavorites,findByFavorites } = require("../controllerPapka/favorites.controller")
const authGuard = require("../middleware/auth.guard")
const app = express()


const roleGuard = require("../middleware/role.guard")






favoritesRoute.post("/",authGuard ,roleGuard("moderator"), createFavorites)
favoritesRoute.get("/favorites", findAllFavorites)
favoritesRoute.get("/:id",authGuard ,roleGuard("moderator"),findByFavorites)
favoritesRoute.patch("/:id",authGuard, roleGuard("moderator"), updateFavorites)
favoritesRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteFavorites)
module.exports = favoritesRoute
