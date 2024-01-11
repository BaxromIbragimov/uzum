const express = require('express')
const reviewsRoute = express.Router()
const authGuard = require("../middleware/auth.guard")
const roleGuard = require("../middleware/role.guard")
const app = express()


const { createReviews, findAllReviews, findByReviews, updateReviews, deleteReviews } = require("../controller/reviews.controller")




reviewsRoute.post("/",authGuard ,roleGuard("moderator"), createReviews)
reviewsRoute.get("/reviews", findAllReviews)
reviewsRoute.get("/:id",authGuard ,roleGuard("moderator"), findByReviews)
reviewsRoute.patch("/:id",authGuard, roleGuard("moderator"), updateReviews)
reviewsRoute.delete("/:id",authGuard, roleGuard("moderator"), deleteReviews)



module.exports = reviewsRoute
