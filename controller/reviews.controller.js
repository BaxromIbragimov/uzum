const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const reviewsRoute=require("../routes/reviews.route")
const apiResponse=require("../helpers/apiResponse.helpers")

async function createReviews(req, res) {
  
  try {
    sqlQuery = 'INSERT INTO reviews  (content,image,rating,answer_to) VALUES(?,?,?,?)'
    const { content,image,rating,answer_to } = req.body
    db.query(sqlQuery, [content,image,rating,answer_to])
    res.send("ishladi")
  } catch (error) {
    console.error({error:error.message})
    console.log(error)
    }
}




async function findAllReviews(req,res){
  try {
    const page = req.query.page
    const limit = req.query.limit


    const countQuery = "SELECT COUNT(id) FROM reviews";
    const [[result]] = await db.query(countQuery)
    const totalItems = result["COUNT(id)"]
    const pagination = new Pagination(totalItems, +page, +limit)
  
    const [[reviews]]=await db.query("SELECT * FROM reviews LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])

 apiResponse(res,201,reviews,null,pagination)
} catch (error) {
    console.error({error:error.message});
}

}




async function findByReviews(req,res){
  try {
    const id = req.params.id
    const query = "SELECT * FROM reviews WHERE id =?"
    const [[reviews]] = await db.query(query, id)
    res.json(reviews)
} catch (error) {
    res.json({ error: error.message })
}
}




async function updateReviews(req, res) {
    try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM reviews WHERE id = ?";
    const reviews = await db.query(selectSql, id);
    if (reviews.length === 0) {
      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
      error.status = 404;
      throw error;
    }
    const { } = req.body;
    const updateSql = "UPDATE reviews SET ? WHERE id = ?";
    await db.query(updateSql, [req.body, id]);
    res.send("Ma'lumotlar o'zgartirildi");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  } 
}




async function deleteReviews(req,res){
  try {
    const reviewsId = req.params.id;
    const query = "DELETE FROM reviews WHERE id =?";
    await db.query(query, [reviewsId]);
    res.json({ message: "muvaffaqiyatli o\'chirildi" });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "o\'chirilmadi" });
}
}






module.exports = {
    createReviews,
    findAllReviews,
    findByReviews,
    updateReviews,
    deleteReviews

}