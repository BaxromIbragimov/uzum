const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const categoriesProductsRoute = require("../routePapka/categoriesProducts.route")
const apiResponse = require("../helpers/apiResponse.helpers")

async function createCategoriesProducts(req, res) {

  try {
      const sqlQuery = 'INSERT INTO categories_products  (categories_id,products_id) VALUES(?,?)'
      const {categories_id,products_id } = req.body
      await db.query(sqlQuery, [categories_id,products_id])
      res.send("ishladi")
  } catch (error) {
      console.error({ error: error.message })
      console.log(error)
      res.status(500).send("Serverda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.")
  }
}



//async function findAllCategoriesProducts(req,res){
//  try {
//    const page = req.query.page
//    const limit = req.query.limit
//
//
//    const countQuery = "SELECT COUNT(id) FROM categories_products";
//    const [[result]] = await db.query(countQuery)
//    const totalItems = result["COUNT(id)"]
//    const pagination = new Pagination(totalItems, +page, +limit)
//  
//    const [[categories_attributes]]=await db.query("SELECT * FROM categories_products LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
//
// apiResponse(res,201,categories_attributes,null,pagination)
//} catch (error) {
//    console.error({error:error.message});
//}
//
//}
//
//
//
//
//async function findByCategoriesProducts(req,res){
//  try {
//    const id = req.params.id
//    const query = "SELECT * FROM categories_products WHERE id =?"
//    const [[categories_attributes]] = await db.query(query, id)
//    res.json(categories_attributes)
//} catch (error) {
//    res.json({ error: error.message })
//}
//}
//
//
//
//
//async function updateCategoriesProducts(req, res) {
//    try {
//    const id = req.params.id;
//    const selectSql = "SELECT * FROM categories_products WHERE id = ?";
//    const categories_attributes = await db.query(selectSql, id);
//    if (categories_attributes.length === 0) {
//      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
//      error.status = 404;
//      throw error;
//    }
//    const { } = req.body;
//    const updateSql = "UPDATE categories_products SET ? WHERE id = ?";
//    await db.query(updateSql, [req.body, id]);
//    res.send("Ma'lumotlar o'zgartirildi");
//  } catch (error) {
//    res.status(error.status || 500).json({ error: error.message });
//    console.log(error);
//  } 
//}
//
//
//
//
//async function deleteCategoriesProducts(req,res){
//  try {
//    const categories_attributesId = req.params.id;
//    const query = "DELETE FROM categories_products WHERE id =?";
//    await db.query(query, [categories_attributesId]);
//    res.json({ message: "muvaffaqiyatli o\'chirildi" });
//
//
//} catch (error) {
//    console.error(error);
//    res.status(500).json({ error: "o\'chirilmadi" });
//}
//}
//
//
//



module.exports = {
    createCategoriesProducts
   // findAllCategoriesProducts,
   // findByCategoriesProducts,
   // updateCategoriesProducts,
   // deleteCategoriesProducts
}
