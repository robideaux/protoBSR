var locationsUrl = "https://script.google.com/macros/s/AKfycbxIw-74yPSw2whrwVLfcZrMz-isu2a0jWArhpvBzShjsRmgPGjB4OqrGnPCFPbA4XKk/exec"

function fetchData(magic, callback) {
    var path = locationsUrl + "/" + magic
    fetch(path)
        .then(res => {
            var d = res.json()
            return res.json()
        })
        .then(data => {
            console.log(data)
            callback(data)
        })
        .catch(err => {
            console.log("Error: " + err)
            callback(null)
        })
}

async function fetchDataAsync(magic, callback) {
    var path = locationsUrl + "/" + magic
    var response = await fetch(path)

    if (!response.ok) {
        console.log("Error: " + err)
        callback(null)
    }

    var data = await response.json()
    console.log(data)
    callback(data)
}
