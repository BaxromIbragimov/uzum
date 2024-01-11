const db = require("../config/db.config")
const attributesValueRoute = require("../routes/attributeValue.route.js")






async function createAttributesValues(req, res) {
    try {
        sqlQuery = 'INSERT INTO attribute_value(name_uz,name_ru,attribute_id) VALUES(?,?,?)'
        const { name_uz, name_ru,attribute_id } = req.body
        db.query(sqlQuery, [name_uz, name_ru,attribute_id])
        res.send("ishladi")
    } catch (error) {
        console.error({ error: error.message })
        console.log(error)
    }
}


async function findByAttributesValues(req, res) {
    try {
        const id = req.params.id
        const query = "SELECT * FROM attribute_value WHERE id =?"
        const [[attribute_value]] = await db.query(query, id)
        res.json(attribute_value)
    } catch (error) {
        res.json({ error: error.message })
    }
}
async function updateAttributesValues(req, res) {
    try {
        const id = req.params.id;
        const selectSql = "SELECT * FROM attribute_value WHERE id = ?";
        const attribute_value = await db.query(selectSql, id);
        if (attribute_value.length === 0) {
            const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
            error.status = 404;
            throw error;
        }
        const { name_uz, name_ru } = req.body;
        const updateSql = "UPDATE attribute_value SET name_uz = ?, name_ru = ? WHERE id = ?";
        await db.query(updateSql, [name_uz, name_ru, id]);
        res.send("Ma'lumotlar o'zgartirildi");
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
        console.log(error);
    }
}




async function deleteAttributesValues(req, res) {
    try {
        const attribute_valueId = req.params.id;
        const query = "DELETE FROM attribute_value WHERE id =?";
        await db.query(query, [attribute_valueId]);
        res.json({ message: "muvaffaqiyatli o\'chirildi" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "o\'chirilmadi" });
    }
}

module.exports={
    createAttributesValues,
    findByAttributesValues,
    updateAttributesValues,
    deleteAttributesValues

}