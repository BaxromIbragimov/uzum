const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const cartsRoute = require("../routePapka/cart.route")
const apiResponse = require("../helpers/apiResponse.helpers")

async function createCarts(req, res) {

  try {
      const sqlQuery = 'INSERT INTO carts  (user_id,product_id,count) VALUES(?,?,?)'
      const {user_id, product_id, count } = req.body
      await db.query(sqlQuery, [user_id, product_id, count])
      res.send("ishladi")
  } catch (error) {
      console.error({ error: error.message })
      console.log(error)
      res.status(500).send("Serverda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.")
  }
}



async function findAllCarts(req,res){
  try {
    const page = req.query.page
    const limit = req.query.limit


    const countQuery = "SELECT COUNT(id) FROM carts";
    const [[result]] = await db.query(countQuery)
    const totalItems = result["COUNT(id)"]
    const pagination = new Pagination(totalItems, +page, +limit)
  
    const [[orders]]=await db.query("SELECT * FROM carts LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])

 apiResponse(res,201,orders,null,pagination)
} catch (error) {
    console.error({error:error.message});
}

}




async function findByCarts(req,res){
  try {
    const id = req.params.id
    const query = "SELECT * FROM carts WHERE id =?"
    const [[carts]] = await db.query(query, id)
    res.json(carts)
} catch (error) {
    res.json({ error: error.message })
}
}




async function updateCarts(req, res) {
    try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM carts WHERE id = ?";
    const carts = await db.query(selectSql, id);
    if (carts.length === 0) {
      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
      error.status = 404;
      throw error;
    }
    const { } = req.body;
    const updateSql = "UPDATE carts SET ? WHERE id = ?";
    await db.query(updateSql, [req.body, id]);
    res.send("Ma'lumotlar o'zgartirildi");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  } 
}




async function deleteCarts(req,res){
  try {
    const cartsId = req.params.id;
    const query = "DELETE FROM carts WHERE id =?";
    await db.query(query, [cartsId]);
    res.json({ message: "muvaffaqiyatli o\'chirildi" });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "o\'chirilmadi" });
}
}






module.exports = {
    createCarts,
    findAllCarts,
    findByCarts,
    updateCarts,
    deleteCarts
}
