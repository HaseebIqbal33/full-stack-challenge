const csvParser = require("csv-parser");
const fs = require("fs");
const byline = require("byline");

const getShows = async (req, res, next) => {
  //const shows = [];
  const stream = byline(
    fs
      .createReadStream(require("../../assets/tv_shows.csv"), {
        encoding: "utf8",
      })
      .pipe(csvParser())
  );
  stream.on("data", function (line) {
    console.log(line);
  });
  return res.status(200).json({
    message: req.params?.search,
  });
};

module.exports = { getShows };
