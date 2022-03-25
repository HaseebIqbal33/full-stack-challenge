const fs = require("fs");
const path = require('path')
const csv = require('fast-csv')


const getShows = async (req, res, next) => {
  const dataPath = path.resolve(__dirname, '../../assets/tv_shows.csv')
  
  csv
 .parseStream( fs.createReadStream(dataPath), {headers : true , coding:"utf8"})
 .on("data", function(data){
     console.log('I am one line of data', data);
 })
 .on("end", function(){
     console.log("done");
 });
};

module.exports = { getShows };
