const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const deliveryRoute=require("../routes/delivery.route")
const apiResponse=require("../helpers/apiResponse.helpers")

async function createDelivery(req, res) {
  
  try {
    sqlQuery = 'INSERT INTO delivery (note,delivery_fee) VALUES(?,?)'
    const { note,delivery_fee } = req.body
    db.query(sqlQuery, [note,delivery_fee])
    res.send("ishladi")
  } catch (error) {
    console.error({error:error.message})
    }
}




async function findAllDelivery(req,res){
  try {
    const page = req.query.page
    const limit = req.query.limit


    const countQuery = "SELECT COUNT(id) FROM delivery";
    const [[result]] = await db.query(countQuery)
    const totalItems = result["COUNT(id)"]
    const pagination = new Pagination(totalItems, +page, +limit)
  
    const [[delivery]]=await db.query("SELECT * FROM delivery LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])

 apiResponse(res,201,delivery,null,pagination)
} catch (error) {
    console.error({error:error.message});
}

}




async function findByDelivery(req,res){
  try {
    const id = req.params.id
    const query = "SELECT * FROM delivery WHERE id =?"
    const [[delivery]] = await db.query(query, id)
    res.json(delivery)
} catch (error) {
    res.json({ error: error.message })
}
}




async function updateDelivery(req, res) {
    try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM delivery WHERE id = ?";
    const delivery = await db.query(selectSql, id);
    if (delivery.length === 0) {
      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
      error.status = 404;
      throw error;
    }
    const { } = req.body;
    const updateSql = "UPDATE delivery SET note=?,delivery_fee WHERE id = ?";
    await db.query(updateSql, [note,delivery_fee, id]);
    res.send("Ma'lumotlar o'zgartirildi");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  }
}




async function deleteDelivery(req,res){
  try {
    const deliveryId = req.params.id;
    const query = "DELETE FROM delivery WHERE id =?";
    await db.query(query, [deliveryId]);
    res.json({ message: "muvaffaqiyatli o\'chirildi" });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "o\'chirilmadi" });
}
}






module.exports = {
    createDelivery,
    findAllDelivery,
    findByDelivery,
    updateDelivery,
    deleteDelivery

}