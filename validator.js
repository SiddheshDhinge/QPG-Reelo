const validateAddQuestion = (questionObj) => {
    let err = [false, "", ""]
    if(!questionObj.questionName || !questionObj.subject || !questionObj.topic || !questionObj.difficulty || !questionObj.marks)
    {
        err = [true, 400, "Insufficient data"];
        return err;
    }

    questionObj.difficulty = questionObj.difficulty.toUpperCase();
    console.log(questionObj);
    const validDifficulty = new Set(["EASY", "MEDIUM", "HARD"]);

    if((typeof questionObj.marks !== "number" || Number.isNaN(questionObj.marks)) || !validDifficulty.has(questionObj.difficulty))
    {
        err = [true, 400, "Bad data"];
        return err;
    }

    return err;
}

module.exports = {
    validateAddQuestion
}