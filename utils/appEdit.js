var con = require('../db');

// Retrieve data
 function updateData(questionId, question, opt1, opt2, opt3, opt4, answer){
     
    const updateQuestionQuery = `Update questions SET questionId= ${questionId},  question = '${question}', answer = '${answer}' WHERE questionId=${questionId}`;
    con.query(updateQuestionQuery, (err, result) => {
        if (err){
            console.log("Error: Bad Request")
            throw err;
        }
    
        con.query(`DELETE FROM options WHERE questionId = ${questionId}`,(error, res)=> {
            if (error) throw error
            
        console.log("Previous Options Are Deleted!!!!")
        if ((opt3 == "") && (opt4 == "") ) {
            var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${questionId}, '${opt1}'), (${questionId}, '${opt2}')`  
        }else if (opt4 == "") {
            var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${questionId}, '${opt1}'), (${questionId}, '${opt2}'),  (${questionId}, '${opt3}')`
        }else{
            var insertOptionsQuery = `INSERT INTO options (questionId, optionValue) Values (${questionId}, '${opt1}'), (${questionId}, '${opt2}'), (${questionId}, '${opt3}'),(${questionId}, '${opt4}')`;
        }

        con.query(insertOptionsQuery, (err, result) => {
            if (err) throw err;
        });
    });
});
        


    
}

 module.exports= {
     updateData
 }