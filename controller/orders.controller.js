const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const ordersRoute=require("../routes/orders.route")
const apiResponse=require("../helpers/apiResponse.helpers")

async function createOrders(req, res) {
  
  try {
    sqlQuery = 'INSERT INTO orders ( address_id,user_id,product_id,status,count,delivery_id ) VALUES (?,?,?,?,?,?)';
    const {  address_id,user_id,product_id,status,count,delivery_id } = req.body
    db.query(sqlQuery, [ address_id,user_id,product_id,status,count,delivery_id ])
    res.send("ishladi")
  } catch (error) {
    console.error({error:error.message})
    console.log(error)
    }
}




async function findAllOrders(req,res){
  try {
    const page = req.query.page
    const limit = req.query.limit


    const countQuery = "SELECT COUNT(id) FROM orders";
    const [[result]] = await db.query(countQuery)
    const totalItems = result["COUNT(id)"]
    const pagination = new Pagination(totalItems, +page, +limit)
  
    const [[orders]]=await db.query("SELECT * FROM orders LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])

 apiResponse(res,201,orders,null,pagination)
} catch (error) {
    console.error({error:error.message});
}

}




async function findByOrders(req,res){
  try {
    const id = req.params.id
    const query = "SELECT * FROM orders WHERE id =?"
    const [[orders]] = await db.query(query, id)
    res.json(orders)
} catch (error) {
    res.json({ error: error.message })
}
}




async function updateOrders(req, res) {
    try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM orders WHERE id = ?";
    const orders = await db.query(selectSql, id);
    if (orders.length === 0) {
      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
      error.status = 404;
      throw error;
    }
    const { } = req.body;
    const updateSql = "UPDATE orders SET ? WHERE id = ?";
    await db.query(updateSql, [req.body, id]);
    res.send("Ma'lumotlar o'zgartirildi");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  } 
}




async function deleteOrders(req,res){
  try {
    const ordersId = req.params.id;
    const query = "DELETE FROM orders WHERE id =?";
    await db.query(query, [ordersId]);
    res.json({ message: "muvaffaqiyatli o\'chirildi" });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "o\'chirilmadi" });
}
}






module.exports = {
    createOrders,
    findAllOrders,
    findByOrders,
    updateOrders,
    deleteOrders

}