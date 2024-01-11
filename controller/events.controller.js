
const db = require("../config/db.config")
const Pagination = require("../helpers/pagiantion")
const eventsRoute=require("../routes/events.route")
const apiResponse=require("../helpers/apiResponse.helpers")


async function createEvents(req, res) {
    try {
      sqlQuery = 'INSERT INTO events  (name) VALUES(?)'
      const { name } = req.body
      db.query(sqlQuery, [name])
      res.send("ishladi")
    } catch (error) {
      console.error({error:error.message})
      console.log(error)
      }
  }
  
  
  
  
  async function findAllEvents(req,res){
    try {
      const page = req.query.page
      const limit = req.query.limit
  
  
      const countQuery = "SELECT COUNT(id) FROM events";
      const [[result]] = await db.query(countQuery)
      const totalItems = result["COUNT(id)"]
      const pagination = new Pagination(totalItems, +page, +limit)
    
      const [[events]]=await db.query("SELECT * FROM events LIMIT ? OFFSET ? ",[pagination.limit,pagination.offset])
  
   apiResponse(res,201,events,null,pagination)
  } catch (error) {
      console.error({error:error.message});
  }
  
  }
  
  
  
  
  async function findByEvents(req,res){
    try {
      const id = req.params.id
      const query = "SELECT * FROM events WHERE id =?"
      const [[events]] = await db.query(query, id)
      res.json(events)
  } catch (error) {
      res.json({ error: error.message })
  }
  }
  
  
  
  
  async function updateEvents(req, res) {
      try {
      const id = req.params.id;
      const selectSql = "SELECT * FROM events WHERE id = ?";
      const events = await db.query(selectSql, id);
      if (events.length === 0) {
        const error = new Error(`Mahsulot ${id} raqamiga ega bo'lmagan`);
        error.status = 404;
        throw error;
      }
      const { } = req.body;
      const updateSql = "UPDATE events SET ? WHERE id = ?";
      await db.query(updateSql, [req.body, id]);
      res.send("Ma'lumotlar o'zgartirildi");
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
      console.log(error);
    } 
  }
  
  
  
  
  async function deleteEvents(req,res){
    try {
      const eventsId = req.params.id;
      const query = "DELETE FROMc events WHERE id =?";
      await db.query(query, [eventsId]);
      res.json({ message: "muvaffaqiyatli o\'chirildi" });
  
  
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "o\'chirilmadi" });
  }
  }
  
  

  module.exports={
    createEvents,
    findAllEvents,
    findByEvents,
    updateEvents,
    deleteEvents
  }