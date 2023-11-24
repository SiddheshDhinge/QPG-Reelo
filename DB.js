const sqlite3 = require("sqlite3").verbose();
const { QuestionTableQry } = require("./queries");

const db = new sqlite3.Database(":memory:");
// const db = new sqlite3.Database("Questions.db");

const prepareSchema = () => {
    db.all("SELECT * FROM sqlite_schema", (err, rows) => {
        if (err) {
            console.error(err.message);
            throw Error("SQLite: cannot fetch data");
        }
        if(rows.length === 0)
        {
            db.run(QuestionTableQry);
        }
    });
}

const loadDB = () => {

}

module.exports = {
    db,
    prepareSchema,
    loadDB
};