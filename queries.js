const QuestionTableQry = `CREATE TABLE Question(
    qId INTEGER PRIMARY KEY, 
    questionName TEXT, 
    subject TEXT, 
    topic TEXT, 
    difficulty TEXT, 
    marks INTEGER
);`
const insertQuery = `
  INSERT INTO Question (questionName, subject, topic, difficulty, marks)
  VALUES (?, ?, ?, ?, ?);
`;

module.exports = {
    QuestionTableQry,
    insertQuery
};