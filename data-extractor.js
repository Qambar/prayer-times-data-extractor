var cityFile = "list-of-cities.txt";
var startingMonth = 10;
var prayerTimeNames = ['imsaak', 'dawn', 'sunrise', 'noon', 'sunset', 'maghrib'];

var websiteUrl = "http://www.najaf.org/english/?city=";


function formatTime(dateObj, time) {
  var hourMin = time.split('.');
  
  var date = new Date(dateObj);
  date.setHours(hourMin[0]);
  date.setMinutes(hourMin[1]);
  
  return date.toISOString();
}

function parseTimes(window, city) {

  var $ = window.$;

  var resultRows = [];

  for (var month = startingMonth; month <= 12; month++) {
    var yearAndMonth = "2016-" + month;
    $($('.table.table-hover.push-down-60 > tbody')[month - 1]).each(function () {
        var rows = $.makeArray($(this).find('tr')).splice(2);
        $.each(rows, function (rowIndex, row) {
          var resultRow = {};
          var day = ("0" + (rowIndex + 1)).slice(-2);
          date = yearAndMonth + "-" + day;
          var databaseId = city + "-" + date;
          resultRow['city-date'] = {"s": databaseId};

          var cols = $(row).find('td');

          $.each(cols, function (colIndex, col) {
            if (colIndex != 0) {
              resultRow[prayerTimeNames[colIndex - 1]] = {"s": formatTime(new Date(Date.parse(date)), $(col).text())};
            }
          });

          resultRows.push(resultRow);
        });
      }
    );

  }
  var data = resultRows.map(function(o) {
    return JSON.stringify(o);
  }).join("\n");
  writeData(city, data);


}

function getTimes(city) {
  var jsdom = require("jsdom");

  jsdom.env({
    url: websiteUrl + city,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function(err, window) {
      parseTimes(window, city);
    }
  });

}

function writeData(filename, data){
  var fs = require('fs');
  fs.writeFile("./data/"+filename+".json", data, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

function getAllTimes() {
  var fs = require('fs');
  var cities = fs.readFileSync('list-of-cities.txt').toString().split("\n");
  for(i in cities) {
    getTimes(cities[i]);
  }
}


getAllTimes();

