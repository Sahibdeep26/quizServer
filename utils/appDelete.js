var con = require('../db');

function deleteData(id){
  const questionQuery = `DELETE questions, options FROM questions INNER JOIN options ON questions.questionId = options.questionId WHERE questions.questionId = ${id}`;

  con.query(questionQuery, (err, result)=>{
      if(err) throw err;
      
  })
  
}

module.exports = {deleteData}