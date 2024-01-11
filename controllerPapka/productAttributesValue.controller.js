const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const productsAttributesValueRoute = require("../routePapka/productAttributeValue.route")
const apiResponse = require("../helpers/apiResponse.helpers")

async function createProductsAttributesValue(req, res) {

  try {
      const sqlQuery = 'INSERT INTO products_attribute_value  (attribute_value_id,products_id) VALUES(?,?)'
      const {attribute_value_id,products_id } = req.body
      await db.query(sqlQuery, [attribute_value_id,products_id])
      res.send("ishladi")
  } catch (error) {
      console.error({ error: error.message })
      console.log(error)
      res.status(500).send("Serverda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.")
  }
}



module.exports={createProductsAttributesValue}