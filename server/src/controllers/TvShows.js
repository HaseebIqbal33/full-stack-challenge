const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

function capitalizeName(name) {
  const words = name.split(" ");

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

function age(age) {
  return age.split("+")[0];
}

const getShows = async (req, res, next) => {
  const params = req.params.search;
  const dataPath = path.resolve(__dirname, "../../assets/tv_shows.csv");
  let shows = [];
  csv
    .parseStream(fs.createReadStream(dataPath), {
      headers: true,
      coding: "utf8",
    })
    .on("data", function (data) {
      shows.push(data);
    })
    .on("end", function () {
      const show = shows.find(
        (show) => show.Title === capitalizeName(req.params.search)
      );
      const showAge = shows.filter(
        (show) => age(show.Age) === req.params.search
      );
      if (show) {
        res.status(200).json({
          search: params,
          data: {
            Name: show.Title,
            IMDb: show.IMDb,
            Source:
              show.Netflix === "1"
                ? "Netflix"
                : show.Hulu === "1"
                ? "Hulu"
                : show["Prime Video"] === "1"
                ? "Prime Video"
                : "Disney+",
            Age: show.Age,
          },
        });
      } else if (showAge.length) {
        res.status(200).json({
          search: params,
          data: showAge,
        });
      } else {
        res.status(200).json({
          message: "No Data Found",
        });
      }
    });
};

module.exports = { getShows };
