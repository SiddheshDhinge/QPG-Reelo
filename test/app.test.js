const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import your Express app

chai.use(chaiHttp);

const assert = chai.assert;

// Check if routes are reachable
describe('Express Routes Reachable', () => {
    it('should respond with status 200 for GET /', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            assert.equal(res.status, 200);
            done();
        });
    });

    it('should respond with status 400 for GET /generateQuestionPaper', (done) => {
        chai.request(app)
        .get('/generateQuestionPaper')
        .end((err, res) => {
            assert.equal(res.status, 400);
            done();
        });
    });

    it('should respond with status 400 for POST /addQuestion', (done) => {
        chai.request(app)
            .post('/addQuestion')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });
});


// try to add wrong data
describe('Call APIs with wrong / insufficient data', () => {
    it(`Should not add with status 400 for /addQuestion`, (done) => {
        chai.request(app)
            .post('/addQuestion')
            .send({
                "questionName": `Which is the 1st alphabet`,
                "subject": "English",
                "difficulty": "Easy",
                "marks": Math.ceil((Math.random() * 10) + 1)
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });

    
    it(`Should not add with status 400 for /addQuestion`, (done) => {
        chai.request(app)
            .post('/addQuestion')
            .send({
                "questionName": "Which is the 1st alphabet",
                "subject": "English",
                "difficulty": "Easy",
                "marks": Math.ceil((Math.random() * 10) + 1)
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });

    
    it(`Should not add with status 400 for /addQuestion`, (done) => {
        chai.request(app)
            .post('/addQuestion')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });

    
    it(`Should not add with status 400 for /addQuestion`, (done) => {
        chai.request(app)
            .post('/addQuestion')
            .send({
                "questionName": "",
                "subject": "English",
                "difficulty": "Easy",
                "marks": 20
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });

    
    it(`Should not add with status 400 for /addQuestion`, (done) => {
        chai.request(app)
            .post('/addQuestion')
            .send({
                "questionName": `Which is the 1st alphabet`,
                "subject": "English",
                "topic": "1st",
                "difficulty": "Easy",
                "marks": 101
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });

    
    it(`Should not add with status 400 for /addQuestion`, (done) => {
        chai.request(app)
            .post('/addQuestion')
            .send({
                "questionName": `Which is the 1st alphabet`,
                "subject": "English",
                "difficulty": "eas y",
                "marks": Math.ceil((Math.random() * 10) + 1)
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });

    
    it(`Should not return data with status 400 for /generateQuestionPaper`, (done) => {
        chai.request(app)
            .get('/generateQuestionPaper')
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });

    
    it(`Should not return data with status 400 for /generateQuestionPaper`, (done) => {
        chai.request(app)
            .get('/generateQuestionPaper')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });
    
    
    it(`Should not return data with status 400 for /generateQuestionPaper`, (done) => {
        chai.request(app)
            .get('/generateQuestionPaper')
            .send({
                "totalMarks": 800,
                "difficulty": {
                    "easy" : 30,
                    "medium" : 20,
                    "hard" : 50
                }
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });
    
    
    it(`Should not return data with status 400 for /generateQuestionPaper`, (done) => {
        chai.request(app)
            .get('/generateQuestionPaper')
            .send({
                "totalMarks": 100,
                "difficulty": {
                    "easy" : 50,
                    "medium" : 20,
                    "hard" : 50
                }
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });
    
    
    it(`Should not return data with status 400 for /generateQuestionPaper`, (done) => {
        chai.request(app)
            .get('/generateQuestionPaper')
            .send({
                "totalMarks": 100,
                "difficulty": {}
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });
    
    
    it(`Should not return data with status 400 for /generateQuestionPaper`, (done) => {
        chai.request(app)
            .get('/generateQuestionPaper')
            .send({
                "totalMarks": 100,
                "difficulty": {
                    "eas y" : 50,
                }
            })
            .end((err, res) => {
                assert.equal(res.status, 400);
                done();
            });
    });
});


// add 10 questions and check if get questions work
describe('Add Questions and generate a Proper Question paper', () => {
    for(let i=0; i<10; i++)
    {
        it(`should add Easy question ${i + 1} with status 200 for /addQuestion`, (done) => {
            chai.request(app)
                .post('/addQuestion')
                .send({
                    "questionName": `Which is the ${i + 1} numbered alphabet`,
                    "subject": "English",
                    "topic": "Alphabets",
                    "difficulty": "Easy",
                    "marks": Math.ceil((Math.random() * 10) + 1)
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    done();
                });
        });
    }
    
    for(let i=0; i<10; i++)
    {
        it(`should add Medium question ${i + 1} with status 200 for /addQuestion`, (done) => {
            chai.request(app)
                .post('/addQuestion')
                .send({
                    "questionName": `What is the weight of planet ${i + 1}`,
                    "subject": "Science",
                    "topic": "Planets",
                    "difficulty": "Medium",
                    "marks": Math.ceil((Math.random() * 10) + 1)
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    done();
                });
        });
    }

    
    for(let i=0; i<10; i++)
    {
        it(`should add Hard question ${i + 1} with status 200 for /addQuestion`, (done) => {
            chai.request(app)
                .post('/addQuestion')
                .send({
                    "questionName": `What is the ${i + 1} positioned prime number`,
                    "subject": "Math",
                    "topic": "Primes",
                    "difficulty": "Hard",
                    "marks": Math.ceil((Math.random() * 10) + 1)
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    done();
                });
        });
    }


    it('Should respond with status 200 for GET /generateQuestionPaper', (done) => {
        chai.request(app)
        .get('/generateQuestionPaper')
        .send({
            "totalMarks": 80,
            "difficulty": {
                "easy" : 30,
                "medium" : 20,
                "hard" : 50
            }
        })
        .end((err, res) => {
            const questionPaper = JSON.parse(res.text);
            const keys = Object.keys(questionPaper)
            const marksEachDifficulty = [
                (30 * 80) / 100,
                (20 * 80) / 100,
                (50 * 80) / 100
            ];

            for(let i=0; i<keys.length; i++)
            {
                if(keys[i] == "unassignedMarks")
                    continue;

                let sumMarks = 0;
                for(let j=0; j<questionPaper[keys[i]].length; j++)
                {
                    sumMarks += questionPaper[keys[i]][j].marks;
                }
                
                assert.isAtMost(sumMarks, marksEachDifficulty[i]);
            }

            assert.equal(res.status, 200);
            done();
        });
    });
});