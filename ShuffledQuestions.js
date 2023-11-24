class ShuffledQuestions{
    constructor(){
        this.questions = []
    }


    /*
    addQuestion- Adds a question
        question => A question object {marks: "...", id: "..."}
        
        TC => O(1)
        SC => O(1)
    */
    addQuestion(question){
        this.questions.push(question);
    }

    
    /*
    getMinimumErrorMarks - returns the number of marks which cant be accomodated with this questions
        example, questions marks = [2, 7], select question of total marks 5, so we have to leave 3 marks
        i => index of this.questions
        marks => marks remaining to fit a question
        dp => a memoization table for reducing time complexity from O(2^n) -> O(n * marks)
        
        TC => O(1)
        SC => O(1)
    */
    getMinimumErrorMarks(i, marks, dp){
        const n = this.questions.length;

        if (i === n){
            return marks;
        }

        if (dp[i][marks] !== -1){
            return dp[i][marks];
        }

        let take = Infinity;
        let notTake = getMinimumErrorMarks(i + 1, marks, dp);

        if (marks >= this.questions[i].marks){
            take = getMinimumErrorMarks(i + 1, marks - this.questions[i].marks, dp);
        }

        dp[i][marks] = Math.min(take, notTake);

        return Math.min(take, notTake);
    }

    
    /*
    generateQuestionSequence - generates such sequences which can be used to get minimum marks error
        row => row index of DP table, denotes the current question index, default = 0
        col => col index of DP table, denotes the current marks, default = total marks
        curSequence => the sequence we are currently generating, default = empty array
        allSequences => all sequences which satisfy minimum marks error criteria, default empty 2d array
        dp => a memoization table which has to be precomputed by getMinimumErrorMarks()

        Note: Removing return statement will return all combinations which add upto lowest marks error but will increase TC. 

        TC => O(n)
        SC => O(n)
    */
    generateQuestionSequence(row, col, curSequence, allSequences, dp){
        const n = this.questions.length;

        if (row === n){
            allSequences.push([...curSequence]);
            return;
        }

        if (col >= this.questions[row]){
            if (row === n - 1 || dp[row + 1][col - this.questions[row].marks] <= dp[row + 1][col]){
                curSequence.push(this.questions[row]);
                generateQuestionSequence(row + 1, col - this.questions[row].marks, curSequence, allSequences, dp);
                curSequence.pop();
                return;
            }

            if (row < n - 1 && dp[row + 1][col - this.questions[row].marks] >= dp[row + 1][col]){
                generateQuestionSequence(row + 1, col, curSequence, allSequences, dp);
                return;
            }
        } 
        else{
            generateQuestionSequence(row + 1, col, curSequence, allSequences, dp);
            return;
        }
    }


    /*
    getQuestionsOfMarks - Generates a random sequence which could be used to get minimum marks error
        marks => total marks allowed to be in sequence

        returns => [allSequnces generated (default - single array), error marks which could not be accomodated]
        TC => O(n)
        SC => O(n)
    */
    getQuestionsOfMarks(marks){
        const n = this.getSize();
        this.shuffleQuestions();

        const dp = Array.from({ length: n }, () => Array(marks + 1).fill(-1));
        const minErrorMarks = this.getMinimumErrorMarks(0, marks, dp);
        const assignedMarks = marks - minErrorMarks;

        const allSequences = [];
        const curSequence = [];

        this.generateQuestionSequence(0, marks, curSequence, allSequences, dp);

        return [allSequences[0], assignedMarks];
    }


    /*
    shuffleQuestions- Shuffles Questions Array
        TC => O(size of questions array)
        SC => O(1)
    */
    shuffleQuestions(){
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.questions[i];
            this.questions[i] = this.questions[j];
            this.questions[j] = temp;
        }
    }


    /*
    getSize- Returns size of questions array
        TC => O(1)
        SC => O(1)
    */
    getSize()
    {
        return this.questions.length;
    }
}

module.exports = ShuffledQuestions;