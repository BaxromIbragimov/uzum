const db = require("../config/db.config")
const attributesRoute=require("../routes/attributes.route")



async function createAttributes(req, res){
    try {
        sqlQuery = 'INSERT INTO attributes(name_uz,name_ru) VALUES(?,?)'
        const {name_uz,name_ru} = req.body
        db.query(sqlQuery, [name_uz,name_ru])
        res.send("ishladi")
      } catch (error) {
        console.error({error:error.message})
        console.log(error)
        }
}

async function findByAttributes(req, res){
  try {
    const id = req.params.id
    const query = "SELECT * FROM attributes WHERE id =?"
    const [[attributes]] = await db.query(query, id)
    res.json(attributes)
} catch (error) {
    res.json({ error: error.message })
}
}

async function updateAttributes(req, res){
  try {
    const id = req.params.id;
    const selectSql = "SELECT * FROM attributes WHERE id = ?";
    const attributes = await db.query(selectSql, id);
    if (attributes.length === 0) {
      const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
      error.status = 404;
      throw error;
    }
    const { name_uz, name_ru } = req.body;
    const updateSql = "UPDATE attributes SET name_uz = ?, name_ru = ? WHERE id = ?";
    await db.query(updateSql, [name_uz, name_ru, id]);
    res.send("Ma'lumotlar o'zgartirildi");
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
    console.log(error);
  }
}

async function deleteAttributes(req, res){
  try {
    const attributesId = req.params.id;
    const query = "DELETE FROM attributes WHERE id =?";
    await db.query(query, [attributesId]);
    res.json({ message: "muvaffaqiyatli o\'chirildi" });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "o\'chirilmadi" });
}
}


module.exports = {
    createAttributes,
    findByAttributes,
    updateAttributes,
    deleteAttributes
}