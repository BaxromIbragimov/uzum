const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const categoriesAttributesRoute = require("../routePapka/categoriesAttributes.route")
const apiResponse = require("../helpers/apiResponse.helpers")

async function createCategoriesAttributes(req, res) {

  try {
      const sqlQuery = 'INSERT INTO categories_attributes (categories_id,attributes_id) VALUES(?,?)'
      const {categories_id,attributes_id } = req.body
      await db.query(sqlQuery, [categories_id,attributes_id])
      res.send("ishladi")
  } catch (error) {
      console.error({ error: error.message })
      console.log(error)
      res.status(500).send("Serverda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.")
  }
}


module.exports = {
    createCategoriesAttributes
}
