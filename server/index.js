const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

// middleware
app.use(cors());

// Routes

// params => http://localhost:5000/:id => req.parmas
// query parameters => http://localhost:5000/?name=henry = req.query


// partydb database work
app.get("/users", async (req, res) => {
  try {
    const { name } = req.query;
    // first_name last_name => %{}%
    // "Henry Ly" => %ly%
    //
    const users = await pool.query(
      "SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1",
      [`%${name}%`]
    );
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// whatsnew database
// app.get('/content' , (req, res) => {
//     pool.query("SELECT * FROM whats_new" , (err , result)=>{
//         if(!err){
//             res.send(result.rows)
//         }
//     })
//     pool.end;

// })
// pool.connect()

app.listen(5000, () => {
  console.log("server is starting on port 5000");
});
