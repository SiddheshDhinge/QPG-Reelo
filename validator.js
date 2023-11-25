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

/*
    validateGenerateQuestionPaper- Validates user input for checking if data is insufficient or bad
    returns => [if error then true, if error then res status, if error then response text]

    TC => O(c) // where c is the number of categories in difficulty
    SC => O(1)
*/
const validateGenerateQuestionPaper = (paperFormatObj) => {
    let err = [false, "", ""]
    if(!paperFormatObj.totalMarks || !paperFormatObj.difficulty || (paperFormatObj.difficulty.length === 0))
    {
        err = [true, 400, "Insufficient data"];
        return err;
    }

    let formatDifficulties = Object.keys(paperFormatObj.difficulty);
    
    for(let i=0; i<formatDifficulties.length; i++){
        const key = formatDifficulties[i];
        console.log(key);
        paperFormatObj.difficulty[key.toUpperCase()] = paperFormatObj.difficulty[key];
        delete paperFormatObj.difficulty[key];
    }

    formatDifficulties = Object.keys(paperFormatObj.difficulty);
    
    const validDifficulty = new Set(["EASY", "MEDIUM", "HARD"]);
    let percentageSum = 0;
    for(let i=0; i<formatDifficulties.length; i++)
    {
        if(
            !validDifficulty.has(formatDifficulties[i]) ||
            typeof paperFormatObj.difficulty[formatDifficulties[i]] !== "number" || 
            Number.isNaN(paperFormatObj.difficulty[formatDifficulties[i]])
        ){
            console.log(
                !validDifficulty.has(formatDifficulties[i]),
                typeof paperFormatObj.difficulty[formatDifficulties[i]] !== "number", 
                Number.isNaN(paperFormatObj.difficulty[formatDifficulties[i]])
            );
            err = [true, 400, "Bad data"];
            return err;
        }
        else{
            percentageSum += paperFormatObj.difficulty[formatDifficulties[i]];
        }
    }
    
    if(paperFormatObj.totalMarks <= 0 || paperFormatObj.totalMarks > 500){
        err = [true, 400, "Constraints not met - totalMarks"];
        return err;
    }

    if(percentageSum !== paperFormatObj.totalMarks){
        err = [true, 400, "Constraint not met - difficulties"];
        return err;
    }

    for(let i=0; i<formatDifficulties.length; i++)
    {
        if(paperFormatObj.difficulty[formatDifficulties[i]] <= 0 || paperFormatObj.difficulty[formatDifficulties[i]] > 100){
            err = [true, 400, "Constraints not met - difficulties"];
            return err;
        }
    }
    
    return err;
}


module.exports = {
    validateAddQuestion,
    validateGenerateQuestionPaper
}