const express = require("express");
const cors = require("cors");

const ShuffledQuestions = require("./ShuffledQuestions");

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());


const categories = {
    "LOW" : new ShuffledQuestions(),
    "MID" : new ShuffledQuestions(),
    "HIGH" : new ShuffledQuestions(),
}

app.get("/test", (req, res) => {
    marks = 17;
    sq = new ShuffledQuestions();
    sq.addQuestion({marks: 2, id: 1});
    sq.addQuestion({marks: 4, id: 2});
    sq.addQuestion({marks: 6, id: 3});
    sq.addQuestion({marks: 8, id: 4});
    sq.addQuestion({marks: 10, id: 5});

    const [sequence, assigned] = sq.getQuestionsOfMarks(marks);
    const remMarks = marks - assigned;

    console.log(JSON.stringify(sequence));
    console.log("Fit:", assigned);
    console.log("remaining:", remMarks);

    res.status(200);
    res.send("Test GET")
});

// Get A QP
app.get("/", (req, res) => {
    res.send("GET");
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

    res.send("POST");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});