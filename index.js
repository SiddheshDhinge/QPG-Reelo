const express = require("express");
const cors = require("cors");

const ShuffledQuestions = require("./ShuffledQuestions");
const { validateAddQuestion, validateGenerateQuestionPaper } = require("./validator");

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());


const categories = {
    // categories are currently used like below-
    // "EASY" : new ShuffledQuestions(),
    // "MEDIUM" : new ShuffledQuestions(),
    // "HARD" : new ShuffledQuestions(),

    // if new filter categories like topic is needed it could be done by this way-
    /* "LOW" : {
        "DATA": new ShuffledQuestions()
    } */
};

app.get("/test", (req, res) => {
    marks = 17;
    sq = categories["EASY"];
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


// Get a randomized Question Paper satisyfing criteria
app.get("/generateQuestionPaper", (req, res) => {
    const {totalMarks, difficulty} = req.body;
    const paperFormatObj = {
        totalMarks,
        difficulty
    };
    
    const validation = validateGenerateQuestionPaper(paperFormatObj);

    if(validation[0] === true)
    {
        // error in posted data
        res.status(validation[1]);
        res.send(validation[2]);
        return;
    }


    res.send("generateQuestionPaper GET");
});


// Add A question to respective category
app.post("/addQuestion", (req, res) => {
    const {questionName, subject, topic, difficulty, marks} = req.body;

    const questionObj = {
        questionName,
        subject,
        topic,
        difficulty,
        marks
    }
    
    const validation = validateAddQuestion(questionObj)

    if(validation[0] === true)
    {
        // error in posted data
        res.status(validation[1]);
        res.send(validation[2]);
        return;
    }

    if (!(questionObj.difficulty in categories)) {
        categories[questionObj.difficulty] = new ShuffledQuestions();
    }
    
    categories[questionObj.difficulty].addQuestion(questionObj);

    res.status(200);
    res.send("Success");
});


app.get("/", (req, res) => {
    res.send(`Server is running at http://localhost:${port}`);
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});