const express=require('express')
const categoryRoute=express.Router()
const {createCategory,findAllCategory,findCategoryById,updateCategory,deleteCategory}=require("../controller/category.controller")
const app = express()
const authGuard = require('../middleware/auth.guard')

const roleGuard=require("../middleware/role.guard")



categoryRoute.post("/",authGuard,roleGuard("moderator"),createCategory)
categoryRoute.get("/categories",findAllCategory)
categoryRoute.get("/:id",authGuard,roleGuard("moderator"),findCategoryById)
categoryRoute.patch("/:id",authGuard,roleGuard("moderator"),updateCategory)
categoryRoute.delete("/:id",authGuard,roleGuard("moderator"),deleteCategory)








module.exports=categoryRoute