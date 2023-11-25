/*
    validateAddQuestion- Validates user input for checking if data is insufficient or bad
    returns => [if error then true, if error then res status, if error then response text]

    TC => O(1)
    SC => O(1)
*/

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

    if(questionObj.questionName.length === 0 || questionObj.questionName.length > 100){
        err = [true, 400, "Constraints not met - Question"];
        return err;
    }
    
    if(questionObj.subject.length === 0 || questionObj.subject.length > 100){
        err = [true, 400, "Constraints not met - Subject"];
        return err;
    }
    
    if(questionObj.topic.length === 0 || questionObj.topic.length > 100){
        err = [true, 400, "Constraints not met - Topic"];
        return err;
    }
    
    if(questionObj.difficulty.length === 0 || questionObj.difficulty.length > 100){
        err = [true, 400, "Constraints not met - Difficulty"];
        return err;
    }
    
    if(questionObj.marks <= 0 || questionObj.marks > 100){
        err = [true, 400, "Bad data - Marks"];
        return err;
    }

    return err;
}

module.exports = {
    validateAddQuestion
}