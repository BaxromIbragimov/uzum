const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const productsEventsRoute = require("../routePapka/productEvents.route")
const apiResponse = require("../helpers/apiResponse.helpers")

async function createProductsEvents(req, res) {

  try {
      const sqlQuery = 'INSERT INTO products_events  (products_id,events_id) VALUES(?,?)'
      const {products_id,events_id} = req.body
      await db.query(sqlQuery, [products_id,events_id])
      res.send("ishladi")
  } catch (error) {
      console.error({ error: error.message })
      console.log(error)
  }
}



module.exports={createProductsEvents}