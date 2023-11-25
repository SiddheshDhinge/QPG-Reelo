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
    "EASY" : new ShuffledQuestions(),
    "MEDIUM" : new ShuffledQuestions(),
    "HARD" : new ShuffledQuestions(),

    // if new filter categories like topic is needed it could be done by this way-
    /* "LOW" : {
        "DATA": new ShuffledQuestions()
    } */
};


// Example endpoint
app.get("/example", (req, res) => {
    marks = 17;
    sq = new ShuffledQuestions();

    sq.addQuestion({
        questionName: "Question 1",
        subject: "Math",
        topic: "Algebra",
        difficulty: "Easy",
        marks: 2
    });

    sq.addQuestion({
        questionName: "Question 2",
        subject: "History",
        topic: "World War II",
        difficulty: "Medium",
        marks: 4
    });

    sq.addQuestion({
        questionName: "Question 3",
        subject: "Physics",
        topic: "Optics",
        difficulty: "Hard",
        marks: 6
    });

    sq.addQuestion({
        questionName: "Question 4",
        subject: "Computer Science",
        topic: "Programming",
        difficulty: "Medium",
        marks: 8
    });

    sq.addQuestion({
        questionName: "Question 5",
        subject: "Chemistry",
        topic: "Organic Chemistry",
        difficulty: "Hard",
        marks: 10
    });

    sq.addQuestion({
        questionName: "Question 6",
        subject: "Literature",
        topic: "Poetry",
        difficulty: "Easy",
        marks: 2
    });

    sq.addQuestion({
        questionName: "Question 7",
        subject: "Geography",
        topic: "Countries and Capitals",
        difficulty: "Medium",
        marks: 4
    });

    sq.addQuestion({
        questionName: "Question 8",
        subject: "Economics",
        topic: "Microeconomics",
        difficulty: "Hard",
        marks: 6
    });

    sq.addQuestion({
        questionName: "Question 9",
        subject: "Biology",
        topic: "Genetics",
        difficulty: "Medium",
        marks: 8
    });

    sq.addQuestion({
        questionName: "Question 10",
        subject: "Art",
        topic: "Renaissance Paintings",
        difficulty: "Easy",
        marks: 10
    });

    const [sequence, assigned] = sq.getQuestionsOfMarks(marks);
    const remMarks = marks - assigned;
    console.log("----------------------------------------------------------------\n");
    console.log("Suppose Questions of marks - (2, 4, 6, 8, 10, 2, 4, 6, 8, 10) in some XYZ difficulty category\n");
    console.log("If we need to create a question paper with only this difficulty of 17 marks there are many ways\n");
    console.log("So here everytime a question paper is genereated it will be of different questions but with same total marks\n");
    
    console.log(sequence);
    console.log("Fit:", assigned);
    console.log("remaining:", remMarks);
    
    console.log("--To crossverify refresh the page and check--\n");
    console.log("----------------------------------------------------------------\n");

    res.status(200);
    res.send("See Console")
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

    const difficulties = Object.keys(paperFormatObj.difficulty);
    questionPaperObj = {}

    let unassignedMarks = 0;
    for(let i=0; i<difficulties.length; i++)
    {
        const difficulty = difficulties[i];
        const marks = paperFormatObj.difficulty[difficulty];
        const [questionSequence, assignedMarks] = categories[difficulty].getQuestionsOfMarks(marks);
        questionPaperObj[difficulty] = questionSequence;
        unassignedMarks += (marks - assignedMarks);
    }

    questionPaperObj.unassignedMarks = unassignedMarks;
    
    res.status(200);
    res.send(questionPaperObj);
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

module.exports = app;