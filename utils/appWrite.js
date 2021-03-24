var con = require('../db');

function createTable() {
    const createQuestionQuery = [
      'CREATE TABLE IF NOT EXISTS questions',
      '(questionId INT(6) PRIMARY KEY,',
      'question VARCHAR(255),',
      'answer VARCHAR(255))'
    ].join(' ')
    
    con.query(createQuestionQuery, (err, result) => {
      if (err) throw err;
    });

    const createOptionsQuery = [
      'CREATE TABLE IF NOT EXISTS options',
      '(optionsId INT(6) AUTO_INCREMENT PRIMARY KEY,',
      'questionId INT(6),',
      'optionValue TEXT)'
    ].join(' ')

    con.query(createOptionsQuery, (err, result) => {
      if (err) throw err;
    });
    
}
// Insert data
function insertData(question, opt1, opt2, opt3, opt4, Answer) {
  let questionID = Math.floor(100000 + Math.random() * 900000);

  const insertQuestionQuery = `INSERT INTO questions (questionId, question, answer) VALUES ( ${questionID} , '${question}' , '${Answer}')`;

  con.query(insertQuestionQuery, (err, result) => {
    if (err) throw err;
  });

  if ( (opt3 == "") && (opt4 == "") ) {
    var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${questionID}, '${opt1}'), (${questionID}, '${opt2}')`  
  }else if (opt4 == "") {
    var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${questionID}, '${opt1}'), (${questionID}, '${opt2}'),  (${questionID}, '${opt3}')`
  }else{
    var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${questionID}, '${opt1}'), (${questionID}, '${opt2}'), (${questionID}, '${opt3}'),(${questionID}, '${opt4}')`;
  }

  con.query(insertOptionsQuery, (err, result) => {
    if (err) throw err;
  });
  
}


module.exports = {
  createTable,
  insertData,
}
