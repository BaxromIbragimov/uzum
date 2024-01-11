const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const cartsRoute = require("../routePapka/favorites.route")
const apiResponse = require("../helpers/apiResponse.helpers")

async function createFavorites(req, res) {

  try {
      const sqlQuery = 'INSERT INTO favorites  (user_id,product_id) VALUES(?,?)'
      const {user_id, product_id } = req.body
      await db.query(sqlQuery, [user_id, product_id])
      res.send("ishladi")
  } catch (error) {
      console.error({ error: error.message })
      console.log(error)
      res.status(500).send("Serverda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.")
  }
}



async function findAllFavorites(req,res){
  try {
    const page = req.query.page
    const limit = req.query.limit


    const countQuery = "SELECT COUNT(id) FROM favorites";
    const [[result]] = await db.query(countQuery)
    const totalItems = result["COUNT(id)"]
    const pagination = new Pagination(totalItems, +page, +limit)
  
    const [[orders]]=await db.query("SELECT * FROM favorites LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])

 apiResponse(res,201,orders,null,pagination)
} catch (error) {
    console.error({error:error.message});
}

}




async function findByFavorites(req,res){
  try {
    const id = req.params.id
    const query = "SELECT * FROM favorites WHERE id =?"
    const [[favorites]] = await db.query(query, id)
    res.json(favorites)
} catch (error) {
    res.json({ error: error.message })
}
}




async function updateFavorites(req, res) {
    try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM favorites WHERE id = ?";
    const favorites = await db.query(selectSql, id);
    if (favorites.length === 0) {
      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
      error.status = 404;
      throw error;
    }
    const { } = req.body;
    const updateSql = "UPDATE favorites SET ? WHERE id = ?";
    await db.query(updateSql, [req.body, id]);
    res.send("Ma'lumotlar o'zgartirildi");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  } 
}




async function deleteFavorites(req,res){
  try {
    const favoritesId = req.params.id;
    const query = "DELETE FROM favorites WHERE id =?";
    await db.query(query, [favoritesId]);
    res.json({ message: "muvaffaqiyatli o\'chirildi" });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "o\'chirilmadi" });
}
}






module.exports = {
    createFavorites,
    findAllFavorites,
    findByFavorites,
    updateFavorites,
    deleteFavorites
}
