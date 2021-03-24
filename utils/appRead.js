var con = require('../db');

// Retrieve data
async function getData() {
   
   var rows;
   //Works for doadmin user
   rows = await dbQuery("SELECT questions.questionId, questions.question AS question, questions.answer AS answer, GROUP_CONCAT(options.optionValue SEPARATOR  ', ' ) AS options FROM options JOIN questions ON questions.questionId = options.questionId GROUP by options.questionId");
   rows = JSON.stringify(rows);
   let x = JSON.parse(rows);
   x.forEach(elm => {
    elmOptions = elm.options.split(", ");
    elm.options = elmOptions;
   });
   //console.log( JSON.stringify(x));
   return JSON.stringify(x);
}

function dbQuery(databaseQuery) {
    return new Promise(data => {
        con.query(databaseQuery, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            } try {
                data(result);
            } catch (error) {
                data({});
                throw error;
            }
        });
    });
}

module.exports = {
    getData
};


