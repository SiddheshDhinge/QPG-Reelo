const express = require("express");
const cors = require("cors");

const { insertQuery } = require("./queries");
const { db, prepareSchema, loadDB } = require("./DB");
const RandomList = require("./RandomList");

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());


const filters = {
    "LOW" : new RandomList(),
    "MID" : new RandomList(),
    "HIGH" : new RandomList(),
}

app.post("/t", (req, res) => {

});

// Get A QP
app.get("/", (req, res) => {
    db.all("SELECT * FROM Question", (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        else{
            res.send(rows);
        }
    });
});

// Add A question to DB
app.post("/", (req, res) => {
    const {questionName, subject, topic, difficulty, marks} = req.body;
    if(!questionName || !subject || !topic || !difficulty || !marks)
    {
        res.status(400);
        res.send("Insufficient data");
        return;
    }

    db.run(insertQuery, [questionName, subject, topic, difficulty, marks]);
    res.send("POST");
});

app.listen(port, () => {
    prepareSchema();
    console.log(`Server is running at http://localhost:${port}`);
});