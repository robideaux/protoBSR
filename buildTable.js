var body = document.getElementById("tables")
var table = document.createElement("table")
var thead = document.createElement("thead")
var trow  = document.createElement("tr")
var tcol = document.createElement("th")
tcol.textContent = "Name"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Bib"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Latitude"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Longitude"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Accuracy"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Min Range"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Max Range"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Captured"
trow.appendChild(tcol)
tcol = document.createElement("th")
tcol.textContent = "Age"
trow.appendChild(tcol)

thead.appendChild(trow)
var tbody = document.createElement("tbody")
tbody.id = "runner_rows"

var style = document.createElement("style")
style.innerHTML = ""

table.appendChild(thead)
table.appendChild(tbody)
body.appendChild(table)

function populateTable(participantData) {
    console.log("Table Data: ")
    console.log(participantData)

    var rows = document.getElementById("runner_rows");
  	rows.innerHTML = "";

    if (participantData) {
        var runners = Object.keys(participantData)
        if (participantData.errorMessage) {
            rows.innerHTML = "<tr><td>Error: " + data.errorMessage + "</td></tr>"
        } else if (runners.length > 0) {
          runners.forEach(function(runner) {
              var stats = participantData[runner]
              rows.innerHTML += "<tr>" + "<td>" + runner + "</td>" +
                  "<td>" + stats.bib + "</td>" +
                  "<td>" + stats.lat + "</td>" +
                  "<td>" + stats.lon + "</td>" +
                  "<td>" + stats.accuracy + "</td>" +
                  "<td>" + stats.minRange + "</td>" +
                  "<td>" + stats.maxRange + "</td>" +
                  "<td>" + stats.capturedTime + "</td>" +
                  "<td>" + stats.age + "</td>" +
                  "</tr>"
          })
        } else {
          rows.innerHTML = "<tr><td>No runner information returned.</td></tr>"
        }
      } else {
        rows.innerHTML = "<tr><td>No results returned from query.</td></tr>"
    }
}
