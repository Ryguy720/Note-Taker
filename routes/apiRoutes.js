const router = require(`express`).Router()
let db = require(`../db/db.json`)
const fs = require(`fs`)

router.get("/api/notes", (req, res) => {
    db = JSON.parse(fs.readFileSync("./db/db.json")) || []

    console.log("GET route", db)
    res.json(db)
})

router.post("/api/notes", (req, res) => {
    let newData = {
        id: Math.floor(Math.random() * 100),
        title: req.body.title, text: req.body.text,
    }
    db.push(newData)
    fs.writeFileSync("./db/db.json", JSON.stringify(db), (err, data) => {
        if (err) throw err
    })
    console.log("post route", db)
     res.json(db)
})

router.delete("/api/notes/:id", (req, res) => {
 var deleteNote = []
 for(i = 0; i < db.length; i++){
     if(db[i].id != req.params.id){
        deleteNote.push(db[i])
     }
 }
 db=deleteNote;
   
    fs.writeFileSync("./db/db.json", JSON.stringify(db), (err, data) => {
        if (err) throw err
    })
    console.log("delete route", db)
     res.json(db)
})

module.exports = router